import json
from pathlib import Path
from datetime import datetime, timezone

# Parse seed from drywall.ts roughly by reading the built approach - hardcode from known catalog
items_spec = [
  ("seed-hercules-220-pack", 'Hercules 9" Drywall Sanding Discs 220 Grit (5-Pack)', 'Hercules HA2DWS-220. Sealed 5-pack of 9" hook-and-loop aluminum oxide drywall discs, fine 220 grit, for 9-hole drywall sanders.', 1, 11.99, "hercules-220-pack.jpg"),
  ("seed-hercules-120-pack", 'Hercules 9" Drywall Sanding Discs 120 Grit (5-Pack)', 'Hercules HA2DWS-120. Sealed 5-pack of 9" hook-and-loop aluminum oxide drywall discs, medium 120 grit, fits 9-hole drywall sanders.', 1, 11.99, "hercules-120-pack.jpg"),
  ("seed-hercules-p120-disc", 'Hercules 9" Drywall Sanding Disc P120 (loose)', 'Single loose Hercules 9" hook-and-loop drywall sanding disc, P120 grit, multi-hole dust extraction.', 1, 2.40, "hercules-p120-disc.jpg"),
  ("seed-bauer-60-discs", 'Bauer 9" Drywall Sanding Discs 60 Grit (loose)', 'Loose Bauer 9" hook-and-loop drywall discs, 60 grit (coarse), 8-hole pattern. Premium zirconia.', 2, 1.50, "bauer-60-discs.jpg"),
  ("seed-bauer-120-discs", 'Bauer 9" Drywall Sanding Discs 120 Grit (loose)', 'Loose Bauer 9" hook-and-loop drywall discs, 120 grit (medium), 8-hole pattern.', 2, 1.50, "bauer-120-discs.jpg"),
  ("seed-bauer-220-discs", 'Bauer 9" Drywall Sanding Discs 220 Grit (loose)', 'Loose Bauer 9" hook-and-loop drywall discs, 220 grit (fine), 8-hole pattern.', 2, 1.50, "bauer-220-discs.jpg"),
  ("seed-3m-80-sheets", '3M Drywall Sanding Sheets 80 Grit (25-Pack)', '3M coarse 80 grit drywall sanding sheets, approx 4-3/16" x 11-1/4", package marked 25 sheets. Fits hand sanders.', 1, 18.00, "3m-80-sheets.jpg"),
  ("seed-3m-120-screens", '3M Drywall Sanding Screens 120 Grit (10-Pack)', '3M medium 120 grit drywall sanding screens, 4-3/16" x 11-1/4", 10-pack. Open mesh, washable.', 1, 16.47, "3m-120-screens.jpg"),
  ("seed-paper-joint-tape", "Paper Drywall Joint Tape (Sheetrock)", "Large roll of paper drywall joint tape (Sheetrock branding on core). Standard seam reinforcement tape.", 1, 5.00, "paper-joint-tape.jpg"),
  ("seed-mesh-tape-rolls", "Fiberglass Mesh Drywall Joint Tape", "Self-adhesive fiberglass mesh drywall joint tape rolls (white). One fuller, one partially used.", 2, 7.00, "mesh-tape-rolls.jpg"),
  ("seed-hand-sander", "Husky Drywall Hand Sander", "Husky clamp-style drywall hand sander, aluminum base with black D-handle. Holds sanding sheets/screens. Used, dusty.", 1, 12.00, "hand-sander.jpg"),
  ("seed-sanding-sponges", "Sanding Sponges / Blocks (assorted)", "Assorted rectangular dual-grit sanding sponges/blocks (dark abrasive faces, purple foam). Includes used pieces with drywall dust.", 5, 2.00, "sanding-sponges.jpg"),
]

import base64
loc = "top shelf of black closet"
app = "Drywall finishing"
now = int(datetime.now(timezone.utc).timestamp() * 1000)
photos = Path("/workspace/inventory-app/public/seed-photos")
items = []
for id_, name, desc, qty, cost, photo in items_spec:
    blob = (photos / photo).read_bytes()
    b64 = base64.b64encode(blob).decode("ascii")
    # guess mime
    mime = "image/jpeg"
    items.append({
        "id": id_,
        "name": name,
        "description": desc,
        "quantity": qty,
        "cost": cost,
        "recommendedPrice": round(cost * 1.2, 2),
        "location": loc,
        "application": app,
        "hasPhoto": True,
        "createdAt": now,
        "updatedAt": now,
        "photoDataUrl": f"data:{mime};base64,{b64}",
    })

out = {
    "version": 1,
    "exportedAt": datetime.now(timezone.utc).isoformat(),
    "items": items,
}
path = Path("/workspace/inventory-app/inventory-backup-top-shelf.json")
path.write_text(json.dumps(out))
print("wrote", path, "items", len(items), "bytes", path.stat().st_size)
