import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64 images
  app.use(express.json({ limit: '50mb' }));

  const DATA_FILE = path.join(process.cwd(), "portfolio_data.json");
  const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

  // Ensure uploads directory exists
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  // Helper to save base64 image and return path
  const saveImage = (base64Str: string, prefix: string) => {
    if (!base64Str || !base64Str.startsWith("data:image")) return base64Str;

    try {
      const match = base64Str.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!match) return base64Str;

      const ext = match[1];
      const data = match[2];
      const filename = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
      const filePath = path.join(UPLOADS_DIR, filename);

      fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
      return `/uploads/${filename}`;
    } catch (e) {
      console.error("Error saving image:", e);
      return base64Str;
    }
  };

  // API Routes
  app.get("/api/data", (req, res) => {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, "utf-8");
        res.json(JSON.parse(data));
      } else {
        res.json(null);
      }
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  app.post("/api/data", (req, res) => {
    try {
      const data = req.body;

      // Process images in the data structure
      if (data.hero && data.hero.profileImage) {
        data.hero.profileImage = saveImage(data.hero.profileImage, "profile");
      }

      if (data.projects) {
        data.projects = data.projects.map((proj: any) => {
          if (proj.logo) {
            proj.logo = saveImage(proj.logo, "logo");
          }
          if (proj.image) {
            proj.image = saveImage(proj.image, "project");
          }
          if (proj.images) {
            proj.images = proj.images.map((img: string, idx: number) => saveImage(img, `project_item_${idx}`));
          }
          return proj;
        });
      }

      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      console.log("Data saved and images processed");
      res.json({ success: true, data });
    } catch (error) {
      console.error("Save error:", error);
      res.status(500).json({ success: false, error: String(error) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
