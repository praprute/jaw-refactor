// Per-tenant settings, selected by REACT_APP_PROJECT_NAME — the same switch
// Sidebar.js and store/layout/reducer.js already use. Set that one variable in
// .env and everything below follows; no more commenting blocks in and out.
//
// The old comment headers in this file had the two labels swapped. This is the
// correct mapping, matching what git history shipped:
//   255aad9 "jaw"  -> PROJECT_NAME=JAW,  port 8001, Rungroj Fish Sauce
//   d11a5af "veit" -> PROJECT_NAME=VEIT, port 8000, Viet Huong
const TENANTS = {
  JAW: {
    api: `http://134.209.107.161:8001/api`,
    company: {
      Name: `RUNGROJ FISH SAUCE CO., LTD.`,
      Address: `8/4 Samutjadee Rd. Paknum Mueang Rayong, Rayong 21000 Thailand`,
      Phone: `Tel: 66-38-940388 Fax: 66-38-940086`,
      Web: `https://www.rungrojfishsauce.com`,
      Email: `Email: fishsauce@rungrojfishsauce.com`,
    },
  },
  VEIT: {
    api: `http://134.209.107.161:8000/api`,
    company: {
      Name: `VIET HUONG CO., LTD.`,
      Address: `89 Moo 4, Makamku, Nikhom Phatthana, Rayong 21180`,
      Phone: `Tel: 66-94-8562698 Fax: 66-38-940086`,
      // Blank spaces, not "" — this tenant prints no web/email on its COA and
      // the forms interpolate these values straight into the output.
      Web: ` `,
      Email: `   `,
    },
  },
}

const PROJECT_NAME = process.env.REACT_APP_PROJECT_NAME
const tenant = TENANTS[PROJECT_NAME]

// Fail at startup rather than silently printing "undefined" onto a COA that
// someone sends to a customer. CRA inlines env vars at build time, so a typo
// gets baked into the bundle and would otherwise surface only on export.
if (!tenant) {
  throw new Error(
    `REACT_APP_PROJECT_NAME is "${PROJECT_NAME}" — expected one of: ` +
      `${Object.keys(TENANTS).join(", ")}. Check your .env file.`
  )
}

// REACT_APP_APIKEY still wins when set, so a local or staging backend can be
// pointed at without touching this file. Leave it unset to use the tenant's own.
export const API = process.env.REACT_APP_APIKEY || tenant.api

export const Company = tenant.company
