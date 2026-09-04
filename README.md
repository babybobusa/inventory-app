# Inventory app (for your phone)

This is a simple list of things you have — tools, supplies, leftover materials.
You open it in the phone's web browser. The list is saved **on the phone**,
not in the cloud.

It already starts with the drywall finishing supplies and the Black closet 2nd shelf pack (photos included).

## How to open it

On the computer, in a terminal window:

1. Go to the app folder:
   `cd /workspace/inventory-app`
2. Install the pieces it needs (only needed once).
3. Start it so the phone can reach this computer.

Copy these commands:

```
cd /workspace/inventory-app
npm install
npm run build
npm run dev -- --host 0.0.0.0
```

The computer will print an address like `http://192.168.x.x:5173`.
On your phone (same Wi-Fi), open Safari or Chrome and type that address.

To keep it handy: in the phone browser, use **Add to Home Screen**.
It will look like a regular app.

## What you can do

- Browse a dense **2–3 column photo grid**. Each card shows the **primary** photo (slot 0), name, quantity, cost / recommended markup, a short description, and location. Extra photos show as a tiny **+N** badge — open the item for the full gallery.
- Search the box at the top (name, notes, location, application).
- Filter or group by **location** or **application**.
- Tap an item to see the big card (photo gallery on top / left, details below). Each item can have up to 3 photos.
- Tap the big **+** button to add something (`/add`).
- Edit or delete from an item's page. On add/edit you can attach **up to 3 photos**, and turn on a **low stock alert** with a quantity threshold.
- The warning icon in the header lists low-stock alerts. A red dot means there is something new to check.
- The three dots let you **export** a backup file or **import** one.

New items default location to **TBD**. The starter drywall set uses
application **Drywall finishing**. Closet2 seeds use location **Black closet 2nd shelf**
and application **Hardware / plumbing supplies**.

Recommended price is always **cost x 1.20**. You don't type it; the app fills it in.

## Where the data lives

Photos (up to 3 per item) and item info are stored in the browser (IndexedDB).
If you clear the browser's site data, the list goes away — use Export first.

Later this storage can be swapped for a NAS without changing the screens.

## For Data Dov (bot field names)

Use these stable `id` / `name` attributes. Do not rename them.

### Add / edit form (`/add` or `/items/:id/edit`)

| Field | id | name |
| --- | --- | --- |
| Form | `item-form` | `item-form` |
| Photo slot 1 (max 3) | `item-photo-1` | `photo1` |
| Photo slot 2 | `item-photo-2` | `photo2` |
| Photo slot 3 | `item-photo-3` | `photo3` |
| Clear photo 1 | `item-clear-photo-1` | `clearPhoto1` |
| Clear photo 2 | `item-clear-photo-2` | `clearPhoto2` |
| Clear photo 3 | `item-clear-photo-3` | `clearPhoto3` |
| Photo slots wrapper | `item-photo-slots` | |
| Name (required) | `item-name` | `name` |
| Description | `item-description` | `description` |
| Quantity | `item-quantity` | `quantity` |
| Cost | `item-cost` | `cost` |
| Recommended price (read only) | `item-recommended-price` | `recommendedPrice` |
| Location | `item-location` | `location` |
| Application | `item-application` | `application` |
| Low stock alert (toggle) | `item-low-stock-alert` | `lowStockAlert` |
| Low stock threshold | `item-low-stock-threshold` | `lowStockThreshold` |
| Save | `item-save` | `save` |
| Cancel | `item-cancel` | `cancel` |
| Delete (edit only) | `item-delete` | `delete` |

Suggestion lists: `#location-options`, `#application-options`.

**Multi-photo upload for Data Dov (max 3):**

- Upload with `#item-photo-1`, `#item-photo-2`, `#item-photo-3` (`name` = `photo1` / `photo2` / `photo3`, `accept="image/*"`).
- Clear with `#item-clear-photo-1` / `#item-clear-photo-2` / `#item-clear-photo-3`.
- Cap message: `#item-photo-cap` (always) and `#item-photo-limit-message` when a 4th photo is attempted. Plain text: **You can add up to 3 photos per item.**
- List card shows **only photo slot 0** (optional `+N` badge if more photos). Detail gallery = `#detail-photos` with `#detail-photo-count` (“Photo N of M”) when there is more than one photo.
- Legacy `#item-photo` is gone — always use the numbered slots.

**Import / export JSON photos (Data Dov):**

| Field | Meaning |
| --- | --- |
| `photoCount` | `0`–`3` (preferred on the item record) |
| `photoDataUrls` | string array of data-URLs, **max 3** (preferred for multi-photo import) |
| `photoDataUrl` | legacy single data-URL → becomes photo 1 |
| `hasPhoto` | legacy boolean; treated as one photo when `photoCount` is missing |
| `lowStockAlertEnabled` | boolean — alert toggle |
| `lowStockThreshold` | number — alert when quantity ≤ this (default `2`) |

Prefer `photoDataUrls` on import (trim to 3). Export writes `photoDataUrls`, plus `photoDataUrl` (first) and `hasPhoto` for older readers. Backup `version` stays `1`. Export/import also include `lowStockAlertEnabled` and `lowStockThreshold`.

**Low stock alert (Data Dov):**

- An item is alerting when `lowStockAlertEnabled && quantity <= lowStockThreshold`.
- Toggle: `#item-low-stock-alert` (`name`=`lowStockAlert`).
- Threshold: `#item-low-stock-threshold` (`name`=`lowStockThreshold`, `type=number`, `min=0`). Shown/enabled when the toggle is on.
- Labels: “Low stock alert” and “Alert when quantity is at or below”.
- List/detail show a subtle **Low** badge on alerting items (`#item-low-badge-<id>`, `#detail-low-badge`).

### List page (`/`)

| Control | id | name |
| --- | --- | --- |
| Search | `search-query` | `search` |
| Location filter | `filter-location` | `location` |
| Application filter | `filter-application` | `application` |
| Group by | `group-by` | `groupBy` |
| Add button | `btn-add` | `add` |
| Alerts button | `btn-alerts` | `alerts` |
| Alerts red dot | `alerts-dot` | |
| Alerts panel | `alerts-panel` | |
| More menu | `btn-menu` | `menu` |
| Export | `btn-export` | `export` |
| Import | `btn-import` | `import` |
| Import file | `import-file` | `importFile` |
| Item count | `item-count` | |
| Filtered summary | `list-summary` (`list-summary-qty`, `list-summary-total`) | |

Alerts: `#btn-alerts` opens `#alerts-panel`. Red `#alerts-dot` shows for new/active low-stock alerts until the panel is opened (seen ids stored in `localStorage` key `inventory-alerts-seen-ids`). Empty copy: **No low stock alerts**. Each row links to the item detail.

Each row: `#item-card-<item-id>`.

Starter item ids:

Drywall (top shelf):

- `seed-hercules-220-pack`
- `seed-hercules-120-pack`
- `seed-hercules-p120-disc`
- `seed-bauer-60-discs`
- `seed-bauer-120-discs`
- `seed-bauer-220-discs`
- `seed-3m-80-sheets`
- `seed-3m-120-screens`
- `seed-paper-joint-tape`
- `seed-mesh-tape-rolls`
- `seed-hand-sander`
- `seed-sanding-sponges`

Black closet 2nd shelf (34 items, dual photos): see `src/seed/closet2.ts` (`CLOSET2_SEED`, ids `closet2-*`). Sample: `closet2-pvc-elbow-1in`.

### Routes

- List: `/`
- Add: `/add`
- Item card: `/items/:id`
- Edit: `/items/:id/edit`

## If the list is empty

`ensureSeeded` loads the 12 drywall items (one photo each from `public/seed-photos/`)
and backfills any missing Black closet 2nd shelf items from `CLOSET2_SEED`
(crop + retailer listing photos under `public/seed-photos/closet2/` and
`public/seed-photos/closet2-listing/`). Existing item ids are never wiped —
missing closet2 ids are inserted only. Drywall `SEED_PHOTO_VERSION` refresh
behavior is unchanged.
