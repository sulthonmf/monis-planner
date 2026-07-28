# Monis.rent — Interactive Virtual Workspace Builder

> **Note**: This project is developed as part of the **Code Challenge Test at [desent.io](https://desent.io)**.

An interactive, high-performance 2D virtual workspace builder web application for **monis.rent**. Users can design, customize, arrange, and estimate weekly rentals for their ideal work, streaming, and gaming room setups.

---

## 🚀 Key Features

- **Clean Slate Initial Render**: Starts with an empty room canvas so users can freely select and assemble their setup from scratch.
- **100% Free-form Drag & Drop**: Click and drag any item (desk, chair, monitors, PC, lamps, plants, peripherals) anywhere across the room canvas with pixel-exact precision (`dragMomentum={false}`).
- **16 High-Quality Vector SVG Assets**:
  - **Desks**: Standing Desk Pro, Wooden Desk, Bamboo Eco Desk, Minimalist White Desk.
  - **Chairs**: Ergonomic Pro Chair, Executive Leather Chair, Gaming Racing Chair, Minimalist Task Chair.
  - **Monitors & Tech**: Single 24" Monitor, Dual 24" Monitors, 34" Ultrawide Curved Display, Gaming PC Rig.
  - **Lighting & Decor**: Adjustable Lamp, Cyber RGB Lightbar, Monstera Plant, Zen Bonsai Tree.
  - **Peripherals**: Mechanical Keyboard, Wireless Mouse, Laptop Riser Stand, Over-Ear Headset.
- **4 Bedroom Wall Background Themes**:
  - Gaming Room (Ambient RGB LED glow & acoustic panels)
  - Streamer Studio Room
  - Cozy Bedroom (Wood slat wall & warm lighting)
  - Modern Loft (Daylight window glow)
- **Real-Time Price & Discount Calculator**: Live weekly subtotal, tiered duration discounts (5% / 10% / 15% OFF for 2 / 4 / 8 weeks + Custom weeks), and checkout breakdown.
- **Glassmorphism UI**: Built with modern typography (Plus Jakarta Sans) and fluid micro-animations.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations & Drag Physics**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 💻 How to Run the Source Code

### Prerequisites

Ensure you have **Node.js 18.x** or higher installed on your machine.

### 1. Clone or Navigate to Project Directory

```bash
cd f:\project\monis-virtual
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application.

---

## 🏗️ Production Build & Type Checking

To build the production bundle and verify TypeScript types:

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
monis-virtual/
├── public/assets/
│   ├── backgrounds/          # Bedroom wall background SVGs (Gaming, Streamer, Cozy, Loft)
│   ├── desks/                # Desk vector SVGs (Standing Pro, Wooden, Bamboo, White)
│   ├── chairs/               # Chair vector SVGs (Ergonomic, Executive, Racing, Task)
│   └── accessories/          # Monitor, Tech, Lighting & Peripheral SVGs
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with Plus Jakarta Sans font
│   │   ├── page.tsx          # Main application page
│   │   └── globals.css       # Tailwind v4 configuration
│   ├── components/
│   │   ├── Header.tsx        # Top navigation header & branding
│   │   ├── SidebarCatalog.tsx # Left product selection sidebar
│   │   ├── WorkspaceCanvas.tsx # Center interactive drag & drop room canvas
│   │   ├── SetupSummary.tsx  # Right rental price breakdown & checkout
│   │   └── DurationSelector.tsx # Bottom rental duration & discount picker
│   ├── store/
│   │   └── useWorkspaceStore.ts # Zustand global state management
│   ├── data/
│   │   └── products.ts       # Product catalog, prices, and backgrounds data
│   └── types/
│       └── workspace.ts      # TypeScript interfaces & types
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 📄 License & Attribution

This project is created for **Code Challenge Test at desent.io**. All rights reserved.
