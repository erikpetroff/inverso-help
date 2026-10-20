/* @ds-bundle: {"format":4,"namespace":"InversoDesignSystem_fbeb27","components":[{"name":"DataTable","sourcePath":"ui_kits/dashboard/DataTable.jsx"},{"name":"RightRail","sourcePath":"ui_kits/dashboard/RightRail.jsx"},{"name":"Sidebar","sourcePath":"ui_kits/dashboard/Sidebar.jsx"},{"name":"StatTile","sourcePath":"ui_kits/dashboard/StatTile.jsx"},{"name":"TopBar","sourcePath":"ui_kits/dashboard/TopBar.jsx"}],"sourceHashes":{"app/feature-adoption.jsx":"e129363370d8","data/events.js":"e677da1c4f76","deck-stage.js":"aa08491f8fd6","design-canvas.jsx":"3b0e985041dd","design_handoff_feature_adoption/app/feature-adoption.jsx":"e129363370d8","design_handoff_feature_adoption/data/events.js":"e677da1c4f76","doc-page.js":"371bab66f42d","export/feature-adoption-standalone.jsx":"de093b8d6821","image-slot.js":"fff26d081c8d","ios-frame.jsx":"be3343be4b51","logo-variants/app.jsx":"db9805ea409d","logo-variants/inverso-marks.jsx":"15a8f10274d8","mobile/screens.jsx":"78460ab40e88","ui_kits/dashboard/DataTable.jsx":"ffe1771076aa","ui_kits/dashboard/RightRail.jsx":"0e0b27e8f700","ui_kits/dashboard/Sidebar.jsx":"bcd93c3cd202","ui_kits/dashboard/StatTile.jsx":"bea91b3cc5dd","ui_kits/dashboard/TopBar.jsx":"d0ad919bc220","ui_kits/invoice/ios-frame.jsx":"d67eb3ffe562"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.InversoDesignSystem_fbeb27 = window.InversoDesignSystem_fbeb27 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// app/feature-adoption.jsx
try { (() => {
const {
  useState,
  useMemo
} = React;

/* ── Plan mapping ───────────────────────────────────────────────
   The event export carries no plan column, so plans below are DERIVED
   from billing/team signals in the events themselves (see derivePlan).
   Paste the real values here to override — key is the account id:
   PLAN_OVERRIDES = { 34: 'team', 731: 'enterprise', ... }            */
const PLAN_OVERRIDES = {};
const D = window.EVENT_DATA;
const PLANS = [{
  k: 'free',
  label: 'Free'
}, {
  k: 'solo',
  label: 'Solo'
}, {
  k: 'team',
  label: 'Team'
}, {
  k: 'enterprise',
  label: 'Enterprise'
}];
const TEAM_SIGNALS = ['accountant_invited', 'accountant_joined', 'member_joined', 'partner_portal_accessed'];
const PAID_SIGNALS = ['checkout_completed', 'subscription_created', 'plan_changed'];

/* ── Capability taxonomy ────────────────────────────────────────
   Raw events grouped into the things a customer actually switches on.
   Add or re-cut a capability by editing one line here.               */
const CAPABILITIES = [{
  f: 'Invoicing',
  name: 'Create & edit invoices',
  kind: 'core',
  ev: ['invoice_created', 'invoice_updated']
}, {
  f: 'Invoicing',
  name: 'Download PDFs',
  kind: 'core',
  ev: ['invoice_downloaded', 'invoice_viewed_by_owner']
}, {
  f: 'Invoicing',
  name: 'Send invoices to clients',
  kind: 'core',
  ev: ['invoice_sent']
}, {
  f: 'Invoicing',
  name: 'Client portal (viewed / downloaded)',
  kind: 'core',
  ev: ['invoice_viewed_by_client', 'invoice_downloaded_by_client']
}, {
  f: 'Invoicing',
  name: 'Mark paid / unpaid',
  kind: 'core',
  ev: ['invoice_paid', 'invoice_unpaid']
}, {
  f: 'Invoicing',
  name: 'Automatic payment reminders',
  kind: 'opt-in',
  ev: ['invoice_reminder_toggled', 'invoice_reminder_sent']
}, {
  f: 'Invoicing',
  name: 'Custom invoice templates',
  kind: 'opt-in',
  ev: ['template_created', 'invoice_template_changed', 'invoice_template_settings_changed']
}, {
  f: 'Invoicing',
  name: 'Quotes & proformas',
  kind: 'opt-in',
  ev: ['quote_created', 'quote_updated']
}, {
  f: 'Invoicing',
  name: 'Recurring invoices',
  kind: 'opt-in',
  ev: ['recurring_invoice_created']
}, {
  f: 'Invoicing',
  name: 'Import invoices',
  kind: 'opt-in',
  ev: ['invoices_imported']
}, {
  f: 'Invoicing',
  name: 'Bulk invoice actions',
  kind: 'opt-in',
  ev: ['bulk_invoices_updated', 'bulk_invoices_deleted']
}, {
  f: 'Invoicing',
  name: 'Custom numbering sequences',
  kind: 'opt-in',
  ev: ['invoice_sequence_created', 'invoice_sequence_updated']
}, {
  f: 'Invoicing',
  name: 'Cancel / delete invoices',
  kind: 'core',
  ev: ['invoice_canceled', 'invoice_uncanceled', 'invoice_deleted']
}, {
  f: 'Invoicing',
  name: 'Bulk export',
  kind: 'opt-in',
  ev: ['invoices_exported']
}, {
  f: 'Reporting',
  name: 'View reports',
  kind: 'core',
  ev: ['report_viewed', 'dashboard_viewed']
}, {
  f: 'Reporting',
  name: 'Filter & segment reports',
  kind: 'opt-in',
  ev: ['report_filter_changed']
}, {
  f: 'Reporting',
  name: 'Drill into report charts',
  kind: 'opt-in',
  ev: ['report_drilldown_opened', 'report_graph_toggled']
}, {
  f: 'Reporting',
  name: 'Export reports & documents',
  kind: 'opt-in',
  ev: ['report_exported', 'documents_exported']
}, {
  f: 'Reporting',
  name: 'Chase overdue from report',
  kind: 'opt-in',
  ev: ['report_overdue_clicked']
}, {
  f: 'Documents',
  name: 'Transaction documents',
  kind: 'opt-in',
  ev: ['transaction_document_uploaded', 'transaction_document_deleted']
}, {
  f: 'Documents',
  name: 'Inbound document inbox',
  kind: 'opt-in',
  ev: ['inbound_document_matched', 'inbound_document_unmatched', 'inbound_document_discarded']
}, {
  f: 'Documents',
  name: 'Automatic document matching',
  kind: 'opt-in',
  ev: ['transaction_document_auto_matched']
}, {
  f: 'Customers',
  name: 'Customer records',
  kind: 'core',
  ev: ['customer_created']
}, {
  f: 'Customers',
  name: 'Maintain customer details',
  kind: 'core',
  ev: ['customer_updated', 'customer_deleted']
}, {
  f: 'Banking',
  name: 'Bank account connected',
  kind: 'opt-in',
  ev: ['bank_account_connected', 'bank_account_disconnected']
}, {
  f: 'Banking',
  name: 'Bank feed import',
  kind: 'opt-in',
  ev: ['bank_transactions_imported']
}, {
  f: 'Banking',
  name: 'Match payments to invoices',
  kind: 'opt-in',
  ev: ['invoice_transaction_matched', 'invoice_transaction_unmatched']
}, {
  f: 'Banking',
  name: 'Card checkout / subscription',
  kind: 'opt-in',
  ev: ['checkout_completed', 'subscription_created']
}, {
  f: 'Banking',
  name: 'Plan changes',
  kind: 'lifecycle',
  ev: ['plan_changed', 'subscription_status_changed']
}, {
  f: 'Banking',
  name: 'Cancellation flow',
  kind: 'lifecycle',
  ev: ['subscription_canceled', 'subscription_cancellation_portal_opened', 'subscription_cancellation_feedback_submitted', 'subscription_cancellation_confirmed']
}, {
  f: 'Banking',
  name: 'Payment friction (failed / 3DS)',
  kind: 'lifecycle',
  ev: ['payment_failed', 'payment_action_required']
}, {
  f: 'Banking',
  name: 'Trial lifecycle',
  kind: 'lifecycle',
  ev: ['trial_will_end', 'trial_expired']
}, {
  f: 'Team',
  name: 'Accountant access',
  kind: 'opt-in',
  ev: ['accountant_invited', 'accountant_joined']
}, {
  f: 'Team',
  name: 'Accounting software integration',
  kind: 'opt-in',
  ev: ['accountant_integration_connected']
}, {
  f: 'Team',
  name: 'Team members',
  kind: 'opt-in',
  ev: ['member_joined']
}, {
  f: 'Team',
  name: 'Partner portal',
  kind: 'opt-in',
  ev: ['partner_portal_accessed']
}, {
  f: 'AI',
  name: 'AI assistant',
  kind: 'opt-in',
  ev: ['ai_assistant_used']
}, {
  f: 'Setup',
  name: 'Onboarding completed',
  kind: 'lifecycle',
  ev: ['onboarding_completed', 'registration']
}, {
  f: 'Setup',
  name: 'Company profile & logo',
  kind: 'opt-in',
  ev: ['organization_updated', 'organization_logo_uploaded', 'organization_logo_removed']
}, {
  f: 'Setup',
  name: 'Service catalog',
  kind: 'opt-in',
  ev: ['service_created', 'service_updated', 'service_deleted']
}];
const fmt = n => n.toLocaleString('en-US');
const nice = e => e.replace(/_/g, ' ');
const pct = (a, b) => b ? a / b * 100 : 0;

/* ── index the export ─────────────────────────────────────────── */
const EV_FEATURE = {};
CAPABILITIES.forEach(c => c.ev.forEach(e => EV_FEATURE[e] = c.f));

/* The export carries first_seen / last_seen per account × event, not a full time
   series — so a date range selects activity that OVERLAPS the window. Counts stay
   export totals; re-run data/supabase-export.sql with a narrower window for exact
   per-period counts. */
function indexCells(from, to) {
  const byOrg = D.orgs.map(() => ({
    ev: {},
    feat: {},
    total: 0,
    last: '',
    first: ''
  }));
  D.cells.forEach(([o, e, n, first, last]) => {
    if (from && last < from) return;
    if (to && first > to) return;
    const ev = D.events[e],
      b = byOrg[o],
      f = EV_FEATURE[ev.e] || ev.f;
    b.ev[ev.e] = {
      n,
      first,
      last,
      f
    };
    b.feat[f] = (b.feat[f] || 0) + n;
    b.total += n;
    if (last > b.last) b.last = last;
    if (!b.first || first < b.first) b.first = first;
  });
  return byOrg;
}
const byOrg = indexCells();
const PLAN_KEYS = PLANS.map(p => p.k);
let PLANS_ARE_REAL = false;
function derivePlan(i) {
  const org = D.orgs[i],
    ev = byOrg[i].ev;
  if (PLAN_OVERRIDES[org.id]) return PLAN_OVERRIDES[org.id];
  // real plan straight off the export (data/supabase-export.sql emits orgs[].plan)
  const real = (org.plan || (D.plans || {})[org.id] || '').toLowerCase();
  if (PLAN_KEYS.includes(real)) {
    PLANS_ARE_REAL = true;
    return real;
  }
  const team = TEAM_SIGNALS.some(k => ev[k]);
  const paid = PAID_SIGNALS.some(k => ev[k]);
  if (team) return org.total > 800 ? 'enterprise' : 'team';
  return paid ? 'solo' : 'free';
}
const PLAN_OF = D.orgs.map((_, i) => derivePlan(i));
function buildAccounts(from, to) {
  const idx = from || to ? indexCells(from, to) : byOrg;
  return D.orgs.map((org, i) => ({
    ...org,
    i,
    plan: PLAN_OF[i],
    feat: idx[i].feat,
    ev: idx[i].ev,
    total: idx[i].total,
    last: idx[i].last,
    first: idx[i].first
  })).filter(a => a.total > 0);
}
const ACCOUNTS = buildAccounts();
const RANGES = [{
  k: 'all',
  label: 'All time'
}, {
  k: '30',
  label: 'Last 30 days'
}, {
  k: '90',
  label: 'Last 90 days'
}, {
  k: 'ytd',
  label: 'Year to date'
}, {
  k: 'custom',
  label: 'Custom'
}];
const shiftDays = (iso, d) => {
  const t = new Date(iso + 'T00:00:00Z');
  t.setUTCDate(t.getUTCDate() + d);
  return t.toISOString().slice(0, 10);
};
function rangeDates(k, from, to) {
  if (k === 'all') return [D.start, D.asof];
  if (k === 'custom') return [from, to];
  if (k === 'ytd') return [D.asof.slice(0, 4) + '-01-01', D.asof];
  return [shiftDays(D.asof, -(+k - 1)), D.asof];
}
const EV_TOTAL = {};
D.events.forEach(e => EV_TOTAL[e.e] = e.n);
const FEATURE_NAMES = [];
CAPABILITIES.forEach(c => {
  if (!FEATURE_NAMES.includes(c.f)) FEATURE_NAMES.push(c.f);
});
const FEATURES = FEATURE_NAMES.map(name => ({
  name,
  n: CAPABILITIES.filter(c => c.f === name).reduce((s, c) => s + c.ev.reduce((t, e) => t + (EV_TOTAL[e] || 0), 0), 0),
  caps: CAPABILITIES.filter(c => c.f === name).length
})).sort((a, b) => b.n - a.n);
const FEATURE_ORDER = FEATURES.map(f => f.name);
const FEATURE_ICON = {
  Invoicing: 'receipt',
  Reporting: 'chart-line',
  Customers: 'users-three',
  Banking: 'bank',
  Setup: 'sliders-horizontal',
  Team: 'user-plus',
  AI: 'sparkle',
  Documents: 'files'
};
const KIND_LABEL = {
  core: 'Core flow',
  'opt-in': 'Opt-in',
  lifecycle: 'Lifecycle'
};

/* ── shared bits ──────────────────────────────────────────────── */
function Seg({
  options,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "seg"
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.k,
    "aria-pressed": value === o.k,
    onClick: () => onChange(o.k)
  }, o.label)));
}
function Bar({
  v,
  max,
  color = '#AAE1C9'
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "track"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: Math.max(pct(v, max), 1.5) + '%',
      background: color
    }
  }));
}
function Tile({
  label,
  value,
  foot,
  tone
}) {
  const bg = {
    blue: '#E3F5FF',
    mint: 'rgba(170,225,201,.35)',
    grey: '#F7F9FB',
    slate: '#E5ECF6'
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    className: "tile",
    style: {
      background: bg
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lab"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "val"
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "foot"
  }, foot));
}
function heatStyle(share) {
  if (!share) return {};
  const a = 0.08 + Math.sqrt(Math.min(share, 1)) * 0.72;
  return {
    background: `rgba(170,225,201,${a.toFixed(3)})`,
    fontWeight: share > 0.45 ? 600 : 400
  };
}
function adoptionColor(p) {
  return p >= 60 ? '#AAE1C9' : p >= 25 ? '#B9E1F5' : '#FFCB9E';
}

/* ── app ──────────────────────────────────────────────────────── */
function App() {
  const [view, setView] = useState('features');
  const [plans, setPlans] = useState([]);
  const [feats, setFeats] = useState(FEATURE_ORDER);
  const [kinds, setKinds] = useState([]); // [] = all kinds
  const [measure, setMeasure] = useState('events');
  const [sort, setSort] = useState({
    key: 'total',
    dir: -1
  });
  const [capSort, setCapSort] = useState('adoption');
  const [grain, setGrain] = useState('caps'); // caps | events
  const [capQ, setCapQ] = useState('');
  const [q, setQ] = useState('');
  const [selUser, setSelUser] = useState(null);
  const [selCap, setSelCap] = useState(null);
  const [allRows, setAllRows] = useState(false);
  const [range, setRange] = useState('all');
  const [cFrom, setCFrom] = useState(D.start);
  const [cTo, setCTo] = useState(D.asof);
  const [from, to] = rangeDates(range, cFrom, cTo);
  const dated = range !== 'all';
  const accounts = useMemo(() => dated ? buildAccounts(from, to) : ACCOUNTS, [dated, from, to]);
  const togglePlan = k => setPlans(p => p.includes(k) ? p.filter(x => x !== k) : [...p, k]);
  const toggleFeat = k => setFeats(f => f.includes(k) ? f.length > 1 ? f.filter(x => x !== k) : f : FEATURE_ORDER.filter(n => f.includes(n) || n === k));
  const toggleKind = k => setKinds(s => s.includes(k) ? s.filter(x => x !== k) : [...s, k]);
  const inScope = useMemo(() => accounts.filter(a => !plans.length || plans.includes(a.plan)), [accounts, plans]);
  const caps = useMemo(() => {
    const N = inScope.length || 1;
    const base = CAPABILITIES.filter(c => feats.includes(c.f) && (!kinds.length || kinds.includes(c.kind)));
    const units = grain === 'events' ? base.flatMap(c => c.ev.filter(e => EV_TOTAL[e] != null).map(e => ({
      ...c,
      name: nice(e),
      cap: c.name,
      ev: [e]
    }))) : base;
    const needle = capQ.trim().toLowerCase().replace(/ /g, '_');
    return units.filter(c => !needle || c.ev.some(e => e.includes(needle)) || c.name.toLowerCase().replace(/ /g, '_').includes(needle) || c.f.toLowerCase().includes(needle)).map(c => {
      const users = inScope.filter(a => c.ev.some(e => a.ev[e]));
      const n = inScope.reduce((s, a) => s + c.ev.reduce((t, e) => t + ((a.ev[e] || {}).n || 0), 0), 0);
      const last = users.reduce((m, a) => {
        const l = c.ev.map(e => (a.ev[e] || {}).last).filter(Boolean).sort().pop() || '';
        return l > m ? l : m;
      }, '');
      const byPlan = {};
      PLANS.forEach(p => {
        const pool = inScope.filter(a => a.plan === p.k);
        byPlan[p.k] = {
          pool: pool.length,
          used: pool.filter(a => c.ev.some(e => a.ev[e])).length
        };
      });
      return {
        ...c,
        users,
        n,
        last,
        byPlan,
        adoption: pct(users.length, N),
        avg: users.length ? n / users.length : 0
      };
    });
  }, [inScope, feats, kinds, grain, capQ]);
  const capsSorted = useMemo(() => {
    const arr = [...caps];
    if (capSort === 'adoption') arr.sort((a, b) => b.adoption - a.adoption || b.n - a.n);else if (capSort === 'volume') arr.sort((a, b) => b.n - a.n);else if (capSort === 'gap') arr.sort((a, b) => a.adoption - b.adoption || b.n - a.n);else arr.sort((a, b) => FEATURE_ORDER.indexOf(a.f) - FEATURE_ORDER.indexOf(b.f) || b.adoption - a.adoption);
    return arr;
  }, [caps, capSort]);
  const rows = useMemo(() => {
    let r = inScope.filter(a => !q || a.email.toLowerCase().includes(q.toLowerCase()) || String(a.id).includes(q));
    r = r.map(a => ({
      ...a,
      inView: feats.reduce((s, f) => s + (a.feat[f] || 0), 0),
      used: feats.filter(f => a.feat[f]).length
    }));
    const val = (x, key) => key === 'email' ? x.email : key === 'plan' ? x.plan : key === 'used' ? x.used : key === 'last' ? x.last : key === 'total' ? x.inView : x.feat[key] || 0;
    return r.sort((a, b) => {
      const va = val(a, sort.key),
        vb = val(b, sort.key);
      return (va > vb ? 1 : va < vb ? -1 : 0) * sort.dir;
    });
  }, [inScope, feats, q, sort]);
  const scope = useMemo(() => {
    const eventsInView = caps.reduce((s, c) => s + c.n, 0);
    const colMax = {};
    feats.forEach(f => colMax[f] = Math.max(1, ...rows.map(r => r.feat[f] || 0)));
    const wide = caps.filter(c => c.adoption >= 50).length;
    const dormant = caps.filter(c => c.users.length <= 1).length;
    const optin = caps.filter(c => c.kind === 'opt-in');
    const avgOptin = optin.length ? optin.reduce((s, c) => s + c.adoption, 0) / optin.length : 0;
    return {
      eventsInView,
      colMax,
      wide,
      dormant,
      avgOptin
    };
  }, [caps, rows, feats]);
  const planLabel = plans.length ? plans.map(p => PLANS.find(x => x.k === p).label).join(' + ') : 'All plans';
  function cellValue(r, f) {
    const n = r.feat[f] || 0;
    if (!n) return {
      text: '—',
      share: 0,
      title: `${r.email} has never used ${f}`
    };
    if (measure === 'share') {
      const s = pct(n, r.inView);
      return {
        text: s.toFixed(0) + '%',
        share: s / 100,
        title: `${fmt(n)} events — ${s.toFixed(1)}% of this account's activity in view`
      };
    }
    if (measure === 'reach') {
      const list = CAPABILITIES.filter(c => c.f === f);
      const used = list.filter(c => c.ev.some(e => r.ev[e])).length;
      return {
        text: `${used}/${list.length}`,
        share: used / list.length,
        title: `Uses ${used} of ${list.length} ${f} capabilities`
      };
    }
    return {
      text: fmt(n),
      share: n / scope.colMax[f],
      title: `${fmt(n)} ${f} events`
    };
  }
  const sortIcon = k => sort.key === k ? sort.dir === -1 ? ' ↓' : ' ↑' : '';
  const clickSort = k => setSort(s => s.key === k ? {
    key: k,
    dir: -s.dir
  } : {
    key: k,
    dir: k === 'email' ? 1 : -1
  });
  const headline = capsSorted.filter(c => c.kind === 'opt-in').sort((a, b) => b.adoption - a.adoption)[0];
  return /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/inverso-logo.svg",
    alt: "Inverso"
  })), /*#__PURE__*/React.createElement("div", {
    className: "navlab"
  }, "Insights"), /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "on"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-squares-four"
  }), "Feature adoption")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    },
    className: "note"
  }, from, " \u2192 ", to)), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-sidebar",
    style: {
      fontSize: 18
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "crumb"
  }, "Insights"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(28,28,28,.2)'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", null, "Feature adoption"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, fmt(D.total), " events tracked \xB7 ", fmt(D.orgs.length), " accounts")), /*#__PURE__*/React.createElement("div", {
    className: "canvas"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, view === 'features' ? 'What actually gets switched on' : 'Who uses what'), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, view === 'features' ? /*#__PURE__*/React.createElement(React.Fragment, null, "Adoption of every capability inside the product, across ", fmt(inScope.length), " accounts. ", planLabel, dated ? ` · ${from} → ${to}` : '', ".") : /*#__PURE__*/React.createElement(React.Fragment, null, "Every tracked event rolled up per account. ", planLabel, " \xB7 ", feats.length, " of ", FEATURE_ORDER.length, " features shown."))), /*#__PURE__*/React.createElement(Seg, {
    value: view,
    onChange: v => {
      setView(v);
      setSelUser(null);
      setSelCap(null);
    },
    options: [{
      k: 'features',
      label: 'By capability'
    }, {
      k: 'accounts',
      label: 'By account'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Period"), /*#__PURE__*/React.createElement(Seg, {
    value: range,
    onChange: k => {
      setRange(k);
      setSelUser(null);
      setSelCap(null);
    },
    options: RANGES
  }), range === 'custom' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: cFrom,
    min: D.start,
    max: cTo,
    onChange: e => setCFrom(e.target.value),
    "aria-label": "From date"
  }), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, "\u2192"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: cTo,
    min: cFrom,
    max: D.asof,
    onChange: e => setCTo(e.target.value),
    "aria-label": "To date"
  })) : /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, from, " \u2192 ", to), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, fmt(accounts.length), " account", accounts.length === 1 ? '' : 's', " active in period")), /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Plans"), /*#__PURE__*/React.createElement("div", {
    className: "seg"
  }, /*#__PURE__*/React.createElement("button", {
    "aria-pressed": !plans.length,
    onClick: () => setPlans([])
  }, "All users"), PLANS.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.k,
    "aria-pressed": plans.includes(p.k),
    onClick: () => togglePlan(p.k)
  }, p.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 6,
      fontSize: 11
    }
  }, accounts.filter(a => a.plan === p.k).length)))), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, "Combine plans by clicking more than one.")), /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Features"), /*#__PURE__*/React.createElement("div", {
    className: "chips"
  }, FEATURES.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.name,
    className: "chip",
    "aria-pressed": feats.includes(f.name),
    onClick: () => toggleFeat(f.name)
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ph-${FEATURE_ICON[f.name] || 'circle'}`
  }), f.name, /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, f.caps, " caps")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "linkbtn",
    onClick: () => setFeats(FEATURE_ORDER)
  }, "All"), /*#__PURE__*/React.createElement("button", {
    className: "linkbtn",
    onClick: () => setFeats([FEATURE_ORDER[0]])
  }, "Reset"))), view === 'features' ? /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Capabilities"), /*#__PURE__*/React.createElement("div", {
    className: "chips"
  }, Object.keys(KIND_LABEL).map(k => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: "chip",
    "aria-pressed": kinds.includes(k),
    onClick: () => toggleKind(k)
  }, KIND_LABEL[k]))), /*#__PURE__*/React.createElement(Seg, {
    value: capSort,
    onChange: setCapSort,
    options: [{
      k: 'adoption',
      label: 'Most adopted'
    }, {
      k: 'volume',
      label: 'Most used'
    }, {
      k: 'gap',
      label: 'Least adopted'
    }, {
      k: 'feature',
      label: 'By feature'
    }]
  })) : null, view === 'features' ? /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Granularity"), /*#__PURE__*/React.createElement(Seg, {
    value: grain,
    onChange: g => {
      setGrain(g);
      setSelCap(null);
    },
    options: [{
      k: 'caps',
      label: 'Capabilities'
    }, {
      k: 'events',
      label: 'Single events'
    }]
  }), /*#__PURE__*/React.createElement("input", {
    type: "search",
    list: "evlist",
    value: capQ,
    onChange: e => {
      setCapQ(e.target.value);
      setSelCap(null);
    },
    style: {
      width: 250
    },
    placeholder: "Filter by event, e.g. reminder\u2026",
    "aria-label": "Filter by event"
  }), /*#__PURE__*/React.createElement("datalist", {
    id: "evlist"
  }, D.events.map(e => /*#__PURE__*/React.createElement("option", {
    key: e.e,
    value: nice(e.e)
  }))), capQ && /*#__PURE__*/React.createElement("button", {
    className: "linkbtn",
    onClick: () => setCapQ('')
  }, "clear"), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, caps.length, " ", grain === 'events' ? 'events' : 'capabilities', " shown")) : /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Show cells as"), /*#__PURE__*/React.createElement(Seg, {
    value: measure,
    onChange: setMeasure,
    options: [{
      k: 'events',
      label: 'Event count'
    }, {
      k: 'share',
      label: '% of account'
    }, {
      k: 'reach',
      label: 'Capabilities used'
    }]
  }), /*#__PURE__*/React.createElement("input", {
    type: "search",
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Find an account\u2026",
    "aria-label": "Find an account"
  }))), view === 'features' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "tiles"
  }, /*#__PURE__*/React.createElement(Tile, {
    tone: "mint",
    label: grain === 'events' ? 'Events tracked' : 'Capabilities tracked',
    value: caps.length,
    foot: `across ${feats.length} feature${feats.length > 1 ? 's' : ''}`
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "blue",
    label: "Broadly adopted",
    value: scope.wide,
    foot: "used by half the accounts or more"
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "grey",
    label: "Avg opt-in adoption",
    value: scope.avgOptin.toFixed(0) + '%',
    foot: "of accounts, per optional capability"
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "slate",
    label: "Effectively dormant",
    value: scope.dormant,
    foot: "one account or none"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: '4px 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '14px 18px 8px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, "Capability adoption"), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, "Click a row to see exactly which accounts are in")), /*#__PURE__*/React.createElement("div", {
    className: "tblwrap"
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, grain === 'events' ? 'Event' : 'Capability'), /*#__PURE__*/React.createElement("th", {
    style: {
      minWidth: 190
    }
  }, "Adoption"), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Accounts"), PLANS.map(p => /*#__PURE__*/React.createElement("th", {
    key: p.k,
    className: "mid"
  }, p.label)), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Events"), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Avg / account"), /*#__PURE__*/React.createElement("th", null, "Last used"))), /*#__PURE__*/React.createElement("tbody", null, capsSorted.map(c => /*#__PURE__*/React.createElement("tr", {
    key: c.f + c.name,
    className: selCap === c.f + c.name ? 'sel' : '',
    onClick: () => setSelCap(selCap === c.f + c.name ? null : c.f + c.name),
    title: c.ev.map(nice).join(', ')
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "acct",
    style: {
      maxWidth: 260
    }
  }, /*#__PURE__*/React.createElement("b", null, c.name), /*#__PURE__*/React.createElement("small", null, c.f, c.cap ? ' · ' + c.cap : '', " \xB7 ", KIND_LABEL[c.kind]))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 90
    }
  }, /*#__PURE__*/React.createElement(Bar, {
    v: c.adoption,
    max: 100,
    color: adoptionColor(c.adoption)
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 600,
      width: 38,
      textAlign: 'right'
    }
  }, c.adoption.toFixed(0), "%"))), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, c.users.length, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(28,28,28,.35)'
    }
  }, "/", inScope.length)), PLANS.map(p => {
    const b = c.byPlan[p.k];
    const share = b.pool ? b.used / b.pool : 0;
    return /*#__PURE__*/React.createElement("td", {
      key: p.k,
      className: "mid",
      title: b.pool ? `${b.used} of ${b.pool} ${p.label} accounts` : `No ${p.label} accounts in view`
    }, /*#__PURE__*/React.createElement("span", {
      className: 'heat' + (b.used ? '' : ' zero'),
      style: heatStyle(b.pool ? share : 0)
    }, b.pool ? `${b.used}/${b.pool}` : '·'));
  }), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, fmt(c.n)), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, c.users.length ? c.avg.toFixed(1) : '—'), /*#__PURE__*/React.createElement("td", {
    className: "note",
    style: {
      fontSize: 12
    }
  }, c.last || '—'))))), !capsSorted.length && /*#__PURE__*/React.createElement("div", {
    className: "empty"
  }, "No capabilities match these filters."))), /*#__PURE__*/React.createElement(CapDetail, {
    caps: capsSorted,
    selCap: selCap,
    inScope: inScope,
    headline: headline
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "tiles"
  }, /*#__PURE__*/React.createElement(Tile, {
    tone: "mint",
    label: "Accounts in view",
    value: rows.length,
    foot: `of ${D.orgs.length} tracked`
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "blue",
    label: "Events in view",
    value: fmt(scope.eventsInView),
    foot: `${pct(scope.eventsInView, D.total).toFixed(0)}% of all activity`
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "grey",
    label: "Features per account",
    value: rows.length ? (rows.reduce((s, r) => s + r.used, 0) / rows.length).toFixed(1) : '0',
    foot: `average, of ${feats.length} shown`
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "slate",
    label: "Widest optional capability",
    value: headline ? headline.adoption.toFixed(0) + '%' : '—',
    foot: headline ? `${headline.name} · ${headline.users.length} of ${rows.length} accounts` : '—'
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: '4px 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '14px 18px 8px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, "Accounts \xD7 features"), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, "Click a row for the capability-level breakdown")), /*#__PURE__*/React.createElement("div", {
    className: "tblwrap"
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    onClick: () => clickSort('email')
  }, "Account", sortIcon('email')), /*#__PURE__*/React.createElement("th", {
    onClick: () => clickSort('plan')
  }, "Plan", sortIcon('plan')), /*#__PURE__*/React.createElement("th", {
    className: "num",
    onClick: () => clickSort('total')
  }, "Events", sortIcon('total')), /*#__PURE__*/React.createElement("th", {
    className: "num",
    onClick: () => clickSort('used')
  }, "Features", sortIcon('used')), feats.map(f => /*#__PURE__*/React.createElement("th", {
    key: f,
    className: "mid",
    onClick: () => clickSort(f)
  }, f, sortIcon(f))), /*#__PURE__*/React.createElement("th", {
    onClick: () => clickSort('last')
  }, "Last seen", sortIcon('last')))), /*#__PURE__*/React.createElement("tbody", null, (allRows ? rows : rows.slice(0, 50)).map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.id,
    className: selUser === r.i ? 'sel' : '',
    onClick: () => setSelUser(selUser === r.i ? null : r.i)
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "acct"
  }, /*#__PURE__*/React.createElement("b", null, r.email), /*#__PURE__*/React.createElement("small", null, "#", r.id))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: 'badge pl-' + r.plan
  }, PLANS.find(p => p.k === r.plan).label)), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, fmt(r.inView)), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, r.used, "/", feats.length), feats.map(f => {
    const c = cellValue(r, f);
    return /*#__PURE__*/React.createElement("td", {
      key: f,
      className: "mid",
      title: c.title
    }, /*#__PURE__*/React.createElement("span", {
      className: 'heat' + (c.share ? '' : ' zero'),
      style: heatStyle(c.share)
    }, c.text));
  }), /*#__PURE__*/React.createElement("td", {
    className: "note",
    style: {
      fontSize: 12
    }
  }, r.last || '—'))))), !rows.length && /*#__PURE__*/React.createElement("div", {
    className: "empty"
  }, "No accounts match this filter."), rows.length > 50 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 18px',
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "linkbtn",
    onClick: () => setAllRows(v => !v)
  }, allRows ? 'show top 50 only' : `show all ${fmt(rows.length)} accounts`), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, allRows ? `all ${fmt(rows.length)}` : `showing 50 of ${fmt(rows.length)}`, " \xB7 narrow with the plan filter or search")))), /*#__PURE__*/React.createElement(UserDetail, {
    selUser: selUser,
    rows: rows,
    feats: feats,
    accounts: accounts
  }))), dated && /*#__PURE__*/React.createElement("div", {
    className: "note",
    style: {
      display: 'flex',
      gap: 7,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-info",
    style: {
      fontSize: 14,
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("span", null, "The export stores first/last seen per account \xD7 event, so a period selects accounts and capabilities ", /*#__PURE__*/React.createElement("b", null, "active between ", from, " and ", to), "; the event counts remain totals for the full export window. Re-run ", /*#__PURE__*/React.createElement("code", null, "data/supabase-export.sql"), " with a narrower ", /*#__PURE__*/React.createElement("code", null, "from_ts"), " for exact per-period counts.")), PLANS_ARE_REAL ? /*#__PURE__*/React.createElement("div", {
    className: "note"
  }, "Plans read from the export \xB7 capability groupings live in ", /*#__PURE__*/React.createElement("code", null, "CAPABILITIES"), " in ", /*#__PURE__*/React.createElement("code", null, "app/feature-adoption.jsx"), " \xB7 refresh the numbers per ", /*#__PURE__*/React.createElement("code", null, "data/README-supabase.md"), ".") : /*#__PURE__*/React.createElement("div", {
    className: "flag"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-warning-circle",
    style: {
      fontSize: 16,
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Plans are derived, not imported."), " This export has no plan column, so each account is classified from its own billing and team events (checkout / subscription / invite signals). Run the refresh in ", /*#__PURE__*/React.createElement("code", null, "data/README-supabase.md"), " \u2014 the query in ", /*#__PURE__*/React.createElement("code", null, "data/supabase-export.sql"), " joins the real plan per account and this warning disappears.")))));
}
function CapDetail({
  caps,
  selCap,
  inScope,
  headline
}) {
  const [showAll, setShowAll] = useState(false);
  const cap = caps.find(c => c.f + c.name === selCap);
  React.useEffect(() => setShowAll(false), [selCap]);
  if (cap) {
    const users = cap.users.map(a => ({
      email: a.email,
      plan: a.plan,
      n: cap.ev.reduce((s, e) => s + ((a.ev[e] || {}).n || 0), 0),
      since: cap.ev.map(e => (a.ev[e] || {}).first).filter(Boolean).sort()[0] || ''
    })).sort((a, b) => b.n - a.n);
    const nonUsers = inScope.filter(a => !cap.ev.some(e => a.ev[e]));
    const max = users.length ? users[0].n : 1;
    const shown = showAll ? users : users.slice(0, 15);
    return /*#__PURE__*/React.createElement("div", {
      className: "panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "note"
    }, cap.f, " \xB7 ", KIND_LABEL[cap.kind]), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        margin: '2px 0 6px'
      }
    }, cap.name), /*#__PURE__*/React.createElement("div", {
      className: "note"
    }, cap.adoption.toFixed(0), "% adoption \xB7 ", fmt(cap.n), " events \xB7 ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)'
      }
    }, cap.ev.join(', '))), /*#__PURE__*/React.createElement("div", {
      className: "note",
      style: {
        marginTop: 14,
        marginBottom: 2
      }
    }, "In (", fmt(users.length), ")", users.length > shown.length ? ` · top ${shown.length} by volume` : ''), /*#__PURE__*/React.createElement("div", {
      className: "rowlist"
    }, shown.map(u => /*#__PURE__*/React.createElement("div", {
      className: "ri",
      key: u.email
    }, /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, /*#__PURE__*/React.createElement("span", null, u.email), /*#__PURE__*/React.createElement("b", null, fmt(u.n))), /*#__PURE__*/React.createElement(Bar, {
      v: u.n,
      max: max
    }), /*#__PURE__*/React.createElement("div", {
      className: "note",
      style: {
        fontSize: 11,
        marginTop: 3
      }
    }, PLANS.find(p => p.k === u.plan).label, " \xB7 since ", u.since))), !users.length && /*#__PURE__*/React.createElement("div", {
      className: "note"
    }, "Nobody in this scope has used it.")), users.length > 15 && /*#__PURE__*/React.createElement("button", {
      className: "linkbtn",
      style: {
        marginTop: 10
      },
      onClick: () => setShowAll(s => !s)
    }, showAll ? 'show top 15 only' : `show all ${fmt(users.length)}`), !!nonUsers.length && /*#__PURE__*/React.createElement("p", {
      className: "note",
      style: {
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement("b", null, "Not in (", fmt(nonUsers.length), "):"), " ", nonUsers.slice(0, 10).map(a => a.email).join(', '), nonUsers.length > 10 ? ', …' : ''));
  }
  const top = [...caps].sort((a, b) => b.adoption - a.adoption).slice(0, 6);
  const bottom = [...caps].sort((a, b) => a.adoption - b.adoption || a.n - b.n).slice(0, 5);
  return /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "note"
  }, "Read of the base"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      margin: '2px 0 8px'
    }
  }, "Switched on vs. sitting idle"), headline && /*#__PURE__*/React.createElement("p", {
    className: "note",
    style: {
      marginBottom: 12
    }
  }, "The most adopted optional capability is ", /*#__PURE__*/React.createElement("b", null, headline.name), " at ", headline.adoption.toFixed(0), "% of accounts."), /*#__PURE__*/React.createElement("div", {
    className: "note",
    style: {
      marginBottom: 2
    }
  }, "Highest adoption"), /*#__PURE__*/React.createElement("div", {
    className: "rowlist"
  }, top.map(c => /*#__PURE__*/React.createElement("div", {
    className: "ri",
    key: c.f + c.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, /*#__PURE__*/React.createElement("span", null, c.name), /*#__PURE__*/React.createElement("b", null, c.adoption.toFixed(0), "%")), /*#__PURE__*/React.createElement(Bar, {
    v: c.adoption,
    max: 100
  })))), /*#__PURE__*/React.createElement("div", {
    className: "note",
    style: {
      marginTop: 16,
      marginBottom: 2
    }
  }, "Barely touched"), /*#__PURE__*/React.createElement("div", {
    className: "rowlist"
  }, bottom.map(c => /*#__PURE__*/React.createElement("div", {
    className: "ri",
    key: c.f + c.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, /*#__PURE__*/React.createElement("span", null, c.name), /*#__PURE__*/React.createElement("b", null, c.adoption.toFixed(0), "%")), /*#__PURE__*/React.createElement(Bar, {
    v: c.adoption,
    max: 100,
    color: "#FFCB9E"
  })))), /*#__PURE__*/React.createElement("p", {
    className: "note",
    style: {
      marginTop: 16
    }
  }, "Select a capability row to list the accounts in and out of it."));
}
function UserDetail({
  selUser,
  rows,
  feats,
  accounts
}) {
  if (selUser == null) {
    const ranked = [...rows].sort((a, b) => b.used - a.used || b.inView - a.inView);
    return /*#__PURE__*/React.createElement("div", {
      className: "panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "note"
    }, "Breadth"), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        margin: '2px 0 8px'
      }
    }, "Who spreads out, who doesn't"), /*#__PURE__*/React.createElement("div", {
      className: "rowlist"
    }, ranked.slice(0, 6).map(r => /*#__PURE__*/React.createElement("div", {
      className: "ri",
      key: r.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, /*#__PURE__*/React.createElement("span", null, r.email), /*#__PURE__*/React.createElement("b", null, r.used, "/", feats.length)), /*#__PURE__*/React.createElement(Bar, {
      v: r.used,
      max: feats.length
    })))), /*#__PURE__*/React.createElement("div", {
      className: "note",
      style: {
        marginTop: 16,
        marginBottom: 2
      }
    }, "Narrowest usage"), /*#__PURE__*/React.createElement("div", {
      className: "rowlist"
    }, ranked.slice(-4).reverse().map(r => /*#__PURE__*/React.createElement("div", {
      className: "ri",
      key: r.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, /*#__PURE__*/React.createElement("span", null, r.email), /*#__PURE__*/React.createElement("b", null, r.used, "/", feats.length)), /*#__PURE__*/React.createElement(Bar, {
      v: r.used,
      max: feats.length,
      color: "#FFCB9E"
    })))), /*#__PURE__*/React.createElement("p", {
      className: "note",
      style: {
        marginTop: 16
      }
    }, "Select an account row to drill in."));
  }
  const a = accounts.find(x => x.i === selUser);
  if (!a) return null;
  const list = CAPABILITIES.filter(c => feats.includes(c.f)).map(c => ({
    ...c,
    n: c.ev.reduce((s, e) => s + ((a.ev[e] || {}).n || 0), 0)
  }));
  const used = list.filter(c => c.n).sort((x, y) => y.n - x.n).slice(0, 15);
  const missing = list.filter(c => !c.n && c.kind === 'opt-in');
  const max = used.length ? used[0].n : 1;
  return /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "note"
  }, "Account #", a.id), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      margin: '2px 0 2px',
      overflowWrap: 'anywhere'
    }
  }, a.email), /*#__PURE__*/React.createElement("div", {
    className: "note"
  }, PLANS.find(p => p.k === a.plan).label, " plan \xB7 ", fmt(a.total), " events \xB7 active ", a.first, " \u2192 ", a.last), /*#__PURE__*/React.createElement("div", {
    className: "note",
    style: {
      marginTop: 14,
      marginBottom: 2
    }
  }, "Capabilities in use (", list.filter(c => c.n).length, ")"), /*#__PURE__*/React.createElement("div", {
    className: "rowlist"
  }, used.map(c => /*#__PURE__*/React.createElement("div", {
    className: "ri",
    key: c.f + c.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, /*#__PURE__*/React.createElement("span", null, c.name), /*#__PURE__*/React.createElement("b", null, fmt(c.n))), /*#__PURE__*/React.createElement(Bar, {
    v: c.n,
    max: max
  })))), !!missing.length && /*#__PURE__*/React.createElement("p", {
    className: "note",
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("b", null, "Never switched on:"), " ", missing.map(c => c.name).join(', '), "."));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "app/feature-adoption.jsx", error: String((e && e.message) || e) }); }

// data/events.js
try { (() => {
window.EVENT_DATA = {
  "asof": "2026-08-12",
  "start": "2026-01-01",
  "total": 57895,
  "plans": {
    "2": "enterprise",
    "15": "enterprise",
    "27": "enterprise",
    "32": "enterprise",
    "33": "solo",
    "34": "enterprise",
    "36": "enterprise",
    "37": "solo",
    "58": "solo",
    "67": "enterprise",
    "75": "solo",
    "85": "enterprise",
    "135": "enterprise",
    "150": "enterprise",
    "157": "enterprise",
    "163": "solo",
    "170": "solo",
    "181": "enterprise",
    "194": "solo",
    "215": "free",
    "224": "enterprise",
    "226": "enterprise",
    "242": "enterprise",
    "258": "solo",
    "262": "solo",
    "280": "team",
    "299": "free",
    "302": "solo",
    "307": "solo",
    "309": "solo",
    "328": "solo",
    "333": "solo",
    "335": "team",
    "337": "solo",
    "341": "enterprise",
    "357": "solo",
    "374": "solo",
    "376": "solo",
    "383": "solo",
    "404": "solo",
    "407": "solo",
    "408": "solo",
    "439": "enterprise",
    "441": "solo",
    "442": "team",
    "451": "solo",
    "517": "solo",
    "524": "free",
    "533": "solo",
    "543": "enterprise",
    "550": "solo",
    "553": "enterprise",
    "571": "team",
    "585": "enterprise",
    "592": "solo",
    "600": "solo",
    "605": "team",
    "608": "team",
    "609": "team",
    "614": "solo",
    "618": "free",
    "620": "team",
    "636": "solo",
    "642": "enterprise",
    "644": "solo",
    "652": "solo",
    "653": "solo",
    "670": "solo",
    "673": "solo",
    "676": "solo",
    "690": "solo",
    "692": "team",
    "695": "solo",
    "700": "free",
    "705": "solo",
    "709": "solo",
    "710": "solo",
    "711": "enterprise",
    "717": "solo",
    "731": "enterprise",
    "734": "solo",
    "740": "solo",
    "746": "solo",
    "765": "solo",
    "771": "solo",
    "773": "team",
    "777": "solo",
    "779": "solo",
    "780": "team",
    "782": "free",
    "784": "team",
    "795": "solo",
    "798": "solo",
    "799": "team",
    "802": "enterprise",
    "804": "team",
    "811": "solo",
    "819": "solo",
    "826": "enterprise",
    "827": "team",
    "834": "solo",
    "839": "solo",
    "841": "solo",
    "842": "solo",
    "846": "team",
    "848": "solo",
    "853": "solo",
    "854": "team",
    "863": "solo",
    "869": "enterprise",
    "897": "solo",
    "899": "solo",
    "913": "solo",
    "928": "team",
    "936": "free",
    "939": "solo",
    "949": "solo",
    "952": "team",
    "953": "enterprise",
    "955": "solo",
    "956": "solo",
    "965": "free",
    "970": "solo",
    "971": "solo",
    "972": "solo",
    "987": "team",
    "992": "enterprise",
    "993": "team",
    "998": "team",
    "1002": "solo",
    "1004": "enterprise",
    "1021": "solo",
    "1024": "solo",
    "1029": "solo",
    "1034": "team",
    "1057": "solo",
    "1059": "solo",
    "1063": "solo",
    "1069": "team",
    "1070": "solo",
    "1078": "team",
    "1083": "enterprise",
    "1085": "enterprise",
    "1086": "team",
    "1090": "solo",
    "1098": "solo",
    "1101": "solo",
    "1111": "solo",
    "1113": "solo",
    "1117": "team",
    "1119": "team",
    "1120": "solo",
    "1130": "solo",
    "1138": "team",
    "1150": "solo",
    "1155": "solo",
    "1156": "solo",
    "1161": "team",
    "1166": "solo",
    "1168": "free",
    "1171": "solo",
    "1185": "solo",
    "1191": "solo",
    "1195": "enterprise",
    "1201": "enterprise",
    "1216": "team",
    "1217": "solo",
    "1220": "solo",
    "1227": "free",
    "1232": "solo",
    "1234": "team",
    "1235": "solo",
    "1238": "free",
    "1254": "solo",
    "1263": "solo",
    "1270": "solo",
    "1272": "team",
    "1274": "team",
    "1281": "team",
    "1283": "team",
    "1284": "team",
    "1304": "solo",
    "1320": "solo",
    "1331": "solo",
    "1333": "solo",
    "1335": "solo",
    "1338": "enterprise",
    "1347": "solo",
    "1355": "solo",
    "1357": "team",
    "1361": "enterprise",
    "1365": "solo",
    "1371": "solo",
    "1376": "solo",
    "1382": "team",
    "1389": "enterprise",
    "1401": "team",
    "1408": "solo",
    "1430": "team",
    "1446": "team",
    "1449": "enterprise",
    "1455": "team",
    "1458": "solo",
    "1460": "solo",
    "1469": "solo",
    "1477": "solo",
    "1498": "solo",
    "1502": "solo",
    "1511": "solo",
    "1516": "solo",
    "1521": "solo",
    "1532": "enterprise",
    "1536": "team",
    "1538": "solo",
    "1539": "solo",
    "1541": "solo",
    "1549": "solo",
    "1550": "solo",
    "1555": "enterprise",
    "1560": "solo",
    "1563": "solo",
    "1586": "solo",
    "1599": "solo",
    "1607": "solo",
    "1608": "team",
    "1609": "solo",
    "1610": "team",
    "1614": "solo",
    "1626": "solo",
    "1636": "solo",
    "1644": "solo",
    "1653": "solo",
    "1658": "solo",
    "1665": "solo",
    "1670": "solo",
    "1683": "team",
    "1695": "team",
    "1697": "solo",
    "1710": "team",
    "1716": "team",
    "1725": "solo",
    "1729": "team",
    "1732": "enterprise",
    "1734": "solo",
    "1735": "solo",
    "1738": "solo",
    "1743": "solo",
    "1747": "team",
    "1749": "solo",
    "1750": "solo",
    "1756": "solo",
    "1764": "team",
    "1774": "solo",
    "1782": "solo",
    "1783": "solo",
    "1784": "solo",
    "1794": "solo",
    "1796": "solo",
    "1812": "solo",
    "1818": "solo",
    "1823": "solo",
    "1844": "solo",
    "1851": "enterprise",
    "1861": "team",
    "1866": "team",
    "1877": "free",
    "1888": "solo",
    "1889": "solo",
    "1892": "free",
    "1897": "solo",
    "1920": "free",
    "1925": "solo",
    "1926": "solo",
    "1929": "solo",
    "1930": "solo",
    "1932": "solo",
    "1934": "solo",
    "1935": "solo",
    "1936": "solo",
    "1938": "team",
    "1940": "solo",
    "1947": "solo",
    "1949": "solo",
    "1950": "solo",
    "1952": "solo",
    "1953": "solo",
    "1963": "team",
    "1968": "solo",
    "1980": "team",
    "1988": "solo",
    "1993": "solo",
    "2002": "solo",
    "2003": "solo",
    "2007": "solo",
    "2010": "solo",
    "2011": "solo",
    "2012": "solo",
    "2013": "solo",
    "2014": "enterprise",
    "2015": "solo",
    "2017": "solo",
    "2018": "solo",
    "2023": "solo",
    "2024": "solo",
    "2025": "free",
    "2026": "solo",
    "2027": "team",
    "2028": "solo",
    "2029": "solo",
    "2030": "solo",
    "2031": "solo",
    "2032": "solo",
    "2033": "enterprise",
    "2034": "team",
    "2035": "solo",
    "2036": "solo",
    "2037": "solo",
    "2039": "solo",
    "2040": "solo",
    "2042": "team",
    "2044": "solo",
    "2045": "team",
    "2046": "solo",
    "2048": "solo",
    "2049": "team",
    "2051": "solo",
    "2052": "team",
    "2057": "solo",
    "2058": "solo",
    "2060": "solo",
    "2061": "solo",
    "2062": "solo",
    "2063": "solo",
    "2064": "solo",
    "2067": "solo",
    "2068": "solo",
    "2069": "solo",
    "2071": "solo",
    "2072": "team",
    "2073": "solo",
    "2074": "solo",
    "2075": "solo",
    "2076": "free",
    "2077": "solo",
    "2078": "solo",
    "2079": "free",
    "2080": "free",
    "2081": "solo",
    "2082": "solo",
    "2083": "solo",
    "2084": "solo",
    "2085": "solo",
    "2086": "solo",
    "2087": "solo",
    "2090": "solo",
    "2091": "solo",
    "2092": "solo",
    "2093": "free",
    "2094": "solo",
    "2095": "solo",
    "2097": "solo",
    "2098": "solo",
    "2099": "solo",
    "2100": "team",
    "2101": "solo",
    "2102": "solo",
    "2103": "solo",
    "2104": "team",
    "2105": "enterprise",
    "2106": "solo",
    "2107": "solo",
    "2108": "solo",
    "2109": "solo",
    "2110": "solo",
    "2111": "solo",
    "2113": "solo",
    "2114": "enterprise",
    "2116": "solo",
    "2117": "solo",
    "2118": "solo",
    "2119": "solo",
    "2120": "solo",
    "2121": "solo",
    "2122": "solo",
    "2123": "free",
    "2124": "solo",
    "2125": "solo",
    "2126": "solo",
    "2127": "solo",
    "2128": "solo",
    "2130": "solo",
    "2131": "solo",
    "2132": "solo",
    "2133": "solo",
    "2134": "solo",
    "2135": "solo",
    "2136": "solo",
    "2137": "solo",
    "2138": "solo",
    "2139": "solo",
    "2140": "solo",
    "2141": "solo",
    "2142": "solo",
    "2143": "solo",
    "2144": "solo",
    "2145": "solo",
    "2146": "solo",
    "2147": "solo",
    "2148": "solo",
    "2150": "solo",
    "2151": "solo",
    "2152": "solo",
    "2153": "solo",
    "2154": "team",
    "2155": "solo",
    "2156": "solo",
    "2157": "solo",
    "2158": "solo",
    "2159": "solo",
    "2160": "solo",
    "2161": "solo",
    "2162": "solo",
    "2163": "enterprise",
    "2164": "solo",
    "2165": "solo",
    "2166": "solo",
    "2167": "solo",
    "2168": "solo",
    "2169": "solo",
    "2170": "solo",
    "2171": "solo",
    "2172": "solo",
    "2173": "solo",
    "2174": "solo",
    "2175": "solo",
    "2176": "enterprise",
    "2177": "solo",
    "2178": "solo",
    "2179": "free",
    "2180": "solo",
    "2181": "enterprise",
    "2182": "solo",
    "2183": "solo",
    "2184": "solo",
    "2185": "solo",
    "2186": "solo",
    "2187": "solo",
    "2188": "enterprise",
    "2189": "solo",
    "2190": "solo",
    "2191": "solo",
    "2192": "solo",
    "2193": "solo",
    "2194": "solo",
    "2196": "solo",
    "2197": "solo",
    "2198": "solo",
    "2199": "solo",
    "2201": "solo",
    "2202": "solo",
    "2203": "solo",
    "2208": "solo",
    "2209": "solo",
    "2210": "solo",
    "2211": "solo",
    "2212": "solo",
    "2213": "solo",
    "2214": "solo",
    "2216": "solo",
    "2217": "solo",
    "2218": "solo",
    "2219": "solo",
    "2220": "solo",
    "2221": "solo",
    "2222": "solo",
    "2223": "team",
    "2224": "solo",
    "2225": "solo",
    "2226": "solo",
    "2227": "solo",
    "2228": "solo",
    "2229": "solo",
    "2230": "solo",
    "2231": "solo",
    "2233": "team",
    "2234": "solo",
    "2236": "solo",
    "2237": "solo",
    "2239": "solo",
    "2240": "solo",
    "2241": "solo",
    "2243": "solo",
    "2244": "solo",
    "2246": "solo",
    "2247": "solo",
    "2248": "solo",
    "2250": "solo",
    "2252": "solo",
    "2254": "solo",
    "2256": "team",
    "2257": "solo",
    "2258": "solo",
    "2259": "solo",
    "2260": "solo",
    "2261": "solo",
    "2263": "solo",
    "2264": "solo",
    "2265": "enterprise",
    "2266": "solo",
    "2267": "solo",
    "2269": "solo",
    "2270": "solo",
    "2271": "solo",
    "2272": "solo",
    "2273": "solo",
    "2274": "solo",
    "2275": "solo",
    "2276": "solo",
    "2278": "solo",
    "2279": "solo",
    "2281": "solo",
    "2282": "solo",
    "2283": "solo",
    "2284": "solo",
    "2285": "solo",
    "2286": "solo",
    "2287": "solo",
    "2290": "solo",
    "2291": "solo",
    "2292": "solo",
    "2293": "solo",
    "2294": "solo",
    "2295": "enterprise",
    "2296": "solo",
    "2298": "solo",
    "2299": "solo",
    "2300": "solo",
    "2301": "solo",
    "2303": "solo",
    "2304": "solo",
    "2306": "free",
    "2307": "solo",
    "2308": "free",
    "2309": "solo",
    "2310": "solo",
    "2311": "solo",
    "2312": "solo",
    "2313": "solo",
    "2314": "solo",
    "2316": "solo",
    "2318": "solo",
    "2320": "solo",
    "2322": "solo",
    "2323": "solo",
    "2324": "solo",
    "2325": "solo",
    "2326": "solo",
    "2327": "solo",
    "2328": "solo"
  },
  "orgs": [{
    "id": 1980,
    "email": "office@unisped.bg",
    "plan": "team",
    "total": 8531,
    "types": 26
  }, {
    "id": 952,
    "email": "ekatrade1@gmail.com",
    "plan": "team",
    "total": 2886,
    "types": 21
  }, {
    "id": 34,
    "email": "office@kj-cars.com",
    "plan": "enterprise",
    "total": 2224,
    "types": 18
  }, {
    "id": 731,
    "email": "info@hersher.bg",
    "plan": "enterprise",
    "total": 2012,
    "types": 24
  }, {
    "id": 992,
    "email": "redpanda.supplements@gmail.com",
    "plan": "enterprise",
    "total": 1791,
    "types": 23
  }, {
    "id": 1195,
    "email": "emil@paypercut.co",
    "plan": "enterprise",
    "total": 1754,
    "types": 14
  }, {
    "id": 1710,
    "email": "dizz.trading@mail.bg",
    "plan": "team",
    "total": 1605,
    "types": 20
  }, {
    "id": 439,
    "email": "didi_2008_eood@abv.bg",
    "plan": "enterprise",
    "total": 1462,
    "types": 21
  }, {
    "id": 846,
    "email": "sales.skat@gmail.com",
    "plan": "team",
    "total": 1380,
    "types": 17
  }, {
    "id": 1389,
    "email": "nikolay@weelectricity.com",
    "plan": "enterprise",
    "total": 1210,
    "types": 19
  }, {
    "id": 1004,
    "email": "babucha77.logistics@gmail.com",
    "plan": "enterprise",
    "total": 954,
    "types": 14
  }, {
    "id": 1117,
    "email": "hr@jobjungle-bg.com",
    "plan": "team",
    "total": 941,
    "types": 25
  }, {
    "id": 1732,
    "email": "maria@conversion-century.com",
    "plan": "enterprise",
    "total": 889,
    "types": 10
  }, {
    "id": 1764,
    "email": "billing@smartico.ai",
    "plan": "team",
    "total": 671,
    "types": 31
  }, {
    "id": 1539,
    "email": "office@vizualnatehnika.bg",
    "plan": "solo",
    "total": 659,
    "types": 17
  }, {
    "id": 1695,
    "email": "maniusha0406@gmail.com",
    "plan": "team",
    "total": 642,
    "types": 21
  }, {
    "id": 1083,
    "email": "mariela@desm.pro",
    "plan": "enterprise",
    "total": 638,
    "types": 18
  }, {
    "id": 854,
    "email": "doroteya@57studio.bg",
    "plan": "team",
    "total": 602,
    "types": 26
  }, {
    "id": 1304,
    "email": "sg.powergarage@gmail.com",
    "plan": "solo",
    "total": 533,
    "types": 13
  }, {
    "id": 67,
    "email": "georgi.k@voidweb.eu",
    "plan": "enterprise",
    "total": 526,
    "types": 43
  }, {
    "id": 2014,
    "email": "veronicamilanova@gmail.com",
    "plan": "enterprise",
    "total": 490,
    "types": 23
  }, {
    "id": 1866,
    "email": "irena.ilieva@sales-spot.com",
    "plan": "team",
    "total": 476,
    "types": 34
  }, {
    "id": 2,
    "email": "erik@voidweb.eu",
    "plan": "enterprise",
    "total": 476,
    "types": 24
  }, {
    "id": 2100,
    "email": "yavomitev@gmail.com",
    "plan": "team",
    "total": 463,
    "types": 32
  }, {
    "id": 608,
    "email": "stadiona.bg@abv.bg",
    "plan": "team",
    "total": 433,
    "types": 9
  }, {
    "id": 928,
    "email": "venelin@studiovoila.bg",
    "plan": "team",
    "total": 377,
    "types": 16
  }, {
    "id": 224,
    "email": "translogistic95@abv.bg",
    "plan": "enterprise",
    "total": 353,
    "types": 11
  }, {
    "id": 953,
    "email": "office@logador.com",
    "plan": "enterprise",
    "total": 346,
    "types": 20
  }, {
    "id": 2042,
    "email": "neda@thesuperhumanpodcast.net",
    "plan": "team",
    "total": 344,
    "types": 26
  }, {
    "id": 1281,
    "email": "martin@educoconsult.com",
    "plan": "team",
    "total": 333,
    "types": 10
  }, {
    "id": 571,
    "email": "dtyanakiev@gmail.com",
    "plan": "team",
    "total": 314,
    "types": 20
  }, {
    "id": 2027,
    "email": "j.karabinov@contro.bg",
    "plan": "team",
    "total": 313,
    "types": 24
  }, {
    "id": 1274,
    "email": "blagaangelova_83@abv.bg",
    "plan": "team",
    "total": 310,
    "types": 18
  }, {
    "id": 1120,
    "email": "lodi75ltd@abv.bg",
    "plan": "solo",
    "total": 304,
    "types": 15
  }, {
    "id": 1401,
    "email": "gabriela@daotheagency.com",
    "plan": "team",
    "total": 300,
    "types": 16
  }, {
    "id": 711,
    "email": "vsg.elektro@gmail.com",
    "plan": "enterprise",
    "total": 294,
    "types": 10
  }, {
    "id": 1446,
    "email": "ves@passion4growth.biz",
    "plan": "team",
    "total": 285,
    "types": 16
  }, {
    "id": 869,
    "email": "office.bek@gmail.com",
    "plan": "enterprise",
    "total": 284,
    "types": 13
  }, {
    "id": 1238,
    "email": "info@paleam.com",
    "plan": "free",
    "total": 283,
    "types": 24
  }, {
    "id": 2181,
    "email": "demos@test.com",
    "plan": "enterprise",
    "total": 280,
    "types": 28
  }, {
    "id": 2034,
    "email": "georgi.k@voidweb.eu",
    "plan": "team",
    "total": 274,
    "types": 38
  }, {
    "id": 1161,
    "email": "bozhidar@alabasterfilms.co",
    "plan": "team",
    "total": 269,
    "types": 14
  }, {
    "id": 692,
    "email": "nbtrans123@gmail.com",
    "plan": "team",
    "total": 266,
    "types": 9
  }, {
    "id": 135,
    "email": "kostadinov91@yahoo.com",
    "plan": "enterprise",
    "total": 259,
    "types": 11
  }, {
    "id": 2154,
    "email": "dungyov@agencyhype.com",
    "plan": "team",
    "total": 258,
    "types": 30
  }, {
    "id": 592,
    "email": "office@fs-logistic.com",
    "plan": "solo",
    "total": 253,
    "types": 10
  }, {
    "id": 1449,
    "email": "matrikstransood@gmail.com",
    "plan": "enterprise",
    "total": 247,
    "types": 16
  }, {
    "id": 642,
    "email": "hello@elevatix.bg",
    "plan": "enterprise",
    "total": 247,
    "types": 13
  }, {
    "id": 1338,
    "email": "stefangogov@proton.me",
    "plan": "enterprise",
    "total": 231,
    "types": 28
  }, {
    "id": 1216,
    "email": "office@bliasachno-pochistvane.com",
    "plan": "team",
    "total": 230,
    "types": 9
  }, {
    "id": 1086,
    "email": "galinix@abv.bg",
    "plan": "team",
    "total": 230,
    "types": 15
  }, {
    "id": 826,
    "email": "instaling77@gmail.com",
    "plan": "enterprise",
    "total": 227,
    "types": 18
  }, {
    "id": 357,
    "email": "mstoichkova@gmail.com",
    "plan": "solo",
    "total": 215,
    "types": 15
  }, {
    "id": 998,
    "email": "sultanaoriental@gmail.com",
    "plan": "team",
    "total": 214,
    "types": 17
  }, {
    "id": 949,
    "email": "iva.nesheva1991@gmail.com",
    "plan": "solo",
    "total": 204,
    "types": 19
  }, {
    "id": 2049,
    "email": "martin@craftpolicy.com",
    "plan": "team",
    "total": 204,
    "types": 26
  }, {
    "id": 1749,
    "email": "theodlo@gmail.com",
    "plan": "solo",
    "total": 198,
    "types": 19
  }, {
    "id": 1747,
    "email": "shepadobrina@gmail.com",
    "plan": "team",
    "total": 198,
    "types": 14
  }, {
    "id": 1283,
    "email": "cityglass21@abv.bg",
    "plan": "team",
    "total": 196,
    "types": 17
  }, {
    "id": 1138,
    "email": "bs.still@abv.bg",
    "plan": "team",
    "total": 190,
    "types": 11
  }, {
    "id": 799,
    "email": "valentin_fdm@abv.bg",
    "plan": "team",
    "total": 190,
    "types": 8
  }, {
    "id": 2079,
    "email": "hello@dveochichki.com",
    "plan": "free",
    "total": 185,
    "types": 21
  }, {
    "id": 1877,
    "email": "krasi_e34@yahoo.com",
    "plan": "free",
    "total": 184,
    "types": 14
  }, {
    "id": 442,
    "email": "krustev_iliq9@abv.bg",
    "plan": "team",
    "total": 180,
    "types": 16
  }, {
    "id": 1029,
    "email": "ralica86@abv.bg",
    "plan": "solo",
    "total": 173,
    "types": 11
  }, {
    "id": 2265,
    "email": "slavovgergana@gmail.com",
    "plan": "enterprise",
    "total": 170,
    "types": 17
  }, {
    "id": 1361,
    "email": "kristin.karagyozova@gmail.com",
    "plan": "enterprise",
    "total": 163,
    "types": 13
  }, {
    "id": 1357,
    "email": "hristo.dobrev@360stepsforward.com",
    "plan": "team",
    "total": 162,
    "types": 20
  }, {
    "id": 673,
    "email": "stealth_airless2024@abv.bg",
    "plan": "solo",
    "total": 159,
    "types": 13
  }, {
    "id": 609,
    "email": "klimathermbg@gmail.com",
    "plan": "team",
    "total": 159,
    "types": 13
  }, {
    "id": 1455,
    "email": "osmanovaa.niran@gmail.com",
    "plan": "team",
    "total": 156,
    "types": 12
  }, {
    "id": 1555,
    "email": "titko.titev@affility.co",
    "plan": "enterprise",
    "total": 152,
    "types": 16
  }, {
    "id": 773,
    "email": "vasil.vatev@abv.bg",
    "plan": "team",
    "total": 144,
    "types": 9
  }, {
    "id": 1234,
    "email": "h.dimitrov90@abv.bg",
    "plan": "team",
    "total": 143,
    "types": 14
  }, {
    "id": 585,
    "email": "bestsun.bg@gmail.com",
    "plan": "enterprise",
    "total": 140,
    "types": 13
  }, {
    "id": 1382,
    "email": "nvasilevbg@gmail.com",
    "plan": "team",
    "total": 139,
    "types": 22
  }, {
    "id": 1034,
    "email": "youbetrade@abv.bg",
    "plan": "team",
    "total": 129,
    "types": 11
  }, {
    "id": 780,
    "email": "boris.luchezarov@gmail.com",
    "plan": "team",
    "total": 128,
    "types": 21
  }, {
    "id": 2152,
    "email": "vstefcheva@gmail.com",
    "plan": "solo",
    "total": 128,
    "types": 11
  }, {
    "id": 802,
    "email": "kirilbojkov@gmail.com",
    "plan": "enterprise",
    "total": 126,
    "types": 14
  }, {
    "id": 2080,
    "email": "ivomirs@gmail.com",
    "plan": "free",
    "total": 125,
    "types": 14
  }, {
    "id": 1430,
    "email": "s.hristov@sh-speditionbg.eu",
    "plan": "team",
    "total": 125,
    "types": 12
  }, {
    "id": 804,
    "email": "etiudite@gmail.com",
    "plan": "team",
    "total": 123,
    "types": 9
  }, {
    "id": 524,
    "email": "silvistar@abv.bg",
    "plan": "free",
    "total": 123,
    "types": 11
  }, {
    "id": 1078,
    "email": "poli_681@abv.bg",
    "plan": "team",
    "total": 120,
    "types": 17
  }, {
    "id": 839,
    "email": "ayarevolut@mail.bg",
    "plan": "solo",
    "total": 119,
    "types": 9
  }, {
    "id": 1963,
    "email": "ivan.angelovkz@gmail.com",
    "plan": "team",
    "total": 118,
    "types": 19
  }, {
    "id": 2256,
    "email": "intrinsica25@gmail.com",
    "plan": "team",
    "total": 117,
    "types": 23
  }, {
    "id": 987,
    "email": "ivailo_gatev@abv.bg",
    "plan": "team",
    "total": 117,
    "types": 14
  }, {
    "id": 1823,
    "email": "mimidt@abv.bg",
    "plan": "solo",
    "total": 114,
    "types": 7
  }, {
    "id": 1697,
    "email": "nn190225@yahoo.com",
    "plan": "solo",
    "total": 113,
    "types": 6
  }, {
    "id": 2295,
    "email": "creator.flow.bussines@gmail.com",
    "plan": "enterprise",
    "total": 111,
    "types": 33
  }, {
    "id": 936,
    "email": "elisaveta.g@gmail.com",
    "plan": "free",
    "total": 110,
    "types": 12
  }, {
    "id": 605,
    "email": "bibimondeshka@gmail.com",
    "plan": "team",
    "total": 109,
    "types": 11
  }, {
    "id": 690,
    "email": "wingoldkey@gmail.com",
    "plan": "solo",
    "total": 108,
    "types": 9
  }, {
    "id": 1371,
    "email": "dimitrov.dimitar83@gmail.com",
    "plan": "solo",
    "total": 108,
    "types": 9
  }, {
    "id": 1725,
    "email": "mgpishimarov@gmail.com",
    "plan": "solo",
    "total": 107,
    "types": 9
  }, {
    "id": 2074,
    "email": "zahargeto@abv.bg",
    "plan": "solo",
    "total": 106,
    "types": 19
  }, {
    "id": 2030,
    "email": "office@bibs.bg",
    "plan": "solo",
    "total": 106,
    "types": 14
  }, {
    "id": 1683,
    "email": "boyan@veda.works",
    "plan": "team",
    "total": 105,
    "types": 18
  }, {
    "id": 2026,
    "email": "sea2mountainltd@gmail.com",
    "plan": "solo",
    "total": 105,
    "types": 8
  }, {
    "id": 620,
    "email": "anihuajeva@gmail.com",
    "plan": "team",
    "total": 104,
    "types": 7
  }, {
    "id": 2093,
    "email": "mihaela.mihaylova@mindmosaicgroup.com",
    "plan": "free",
    "total": 103,
    "types": 16
  }, {
    "id": 2104,
    "email": "gipsprobg@gmail.com",
    "plan": "team",
    "total": 101,
    "types": 17
  }, {
    "id": 36,
    "email": "mari.digitalmedia@gmail.com",
    "plan": "enterprise",
    "total": 98,
    "types": 10
  }, {
    "id": 1272,
    "email": "hi@ninavation.com",
    "plan": "team",
    "total": 98,
    "types": 16
  }, {
    "id": 376,
    "email": "puldinshop@gmail.com",
    "plan": "solo",
    "total": 97,
    "types": 7
  }, {
    "id": 1284,
    "email": "bnbachev@gmail.com",
    "plan": "team",
    "total": 97,
    "types": 11
  }, {
    "id": 2072,
    "email": "docho9497@gmail.com",
    "plan": "team",
    "total": 95,
    "types": 18
  }, {
    "id": 2123,
    "email": "zevstatiev@gmail.com",
    "plan": "free",
    "total": 95,
    "types": 22
  }, {
    "id": 1844,
    "email": "support@forjobhunters.com",
    "plan": "solo",
    "total": 94,
    "types": 11
  }, {
    "id": 1608,
    "email": "doncheva@castle.bg",
    "plan": "team",
    "total": 93,
    "types": 16
  }, {
    "id": 2052,
    "email": "antonio.v.nikolov@gmail.com",
    "plan": "team",
    "total": 90,
    "types": 22
  }, {
    "id": 15,
    "email": "aleks.angelov14@gmail.com",
    "plan": "enterprise",
    "total": 87,
    "types": 10
  }, {
    "id": 543,
    "email": "teodor.t.georgiev@gmail.com",
    "plan": "enterprise",
    "total": 87,
    "types": 10
  }, {
    "id": 1930,
    "email": "stoqnmk6@gmail.com",
    "plan": "solo",
    "total": 87,
    "types": 10
  }, {
    "id": 782,
    "email": "iren.veselinova@gmail.com",
    "plan": "free",
    "total": 82,
    "types": 20
  }, {
    "id": 1940,
    "email": "rositsad@gmail.com",
    "plan": "solo",
    "total": 80,
    "types": 6
  }, {
    "id": 150,
    "email": "joretok79@gmail.com",
    "plan": "enterprise",
    "total": 80,
    "types": 11
  }, {
    "id": 1729,
    "email": "ivelin.peychev@cad-automation.eu",
    "plan": "team",
    "total": 79,
    "types": 16
  }, {
    "id": 226,
    "email": "pi_petrov@mail.bg",
    "plan": "enterprise",
    "total": 79,
    "types": 8
  }, {
    "id": 1090,
    "email": "prorentsltd@gmail.com",
    "plan": "solo",
    "total": 78,
    "types": 6
  }, {
    "id": 2045,
    "email": "coumenova@gmail.com",
    "plan": "team",
    "total": 77,
    "types": 17
  }, {
    "id": 1469,
    "email": "nspeykova@gmail.com",
    "plan": "solo",
    "total": 76,
    "types": 15
  }, {
    "id": 1069,
    "email": "danail.enchew@gmail.com",
    "plan": "team",
    "total": 75,
    "types": 15
  }, {
    "id": 1716,
    "email": "office@brandoria.bg",
    "plan": "team",
    "total": 74,
    "types": 17
  }, {
    "id": 1950,
    "email": "1719success@gmail.com",
    "plan": "solo",
    "total": 74,
    "types": 5
  }, {
    "id": 335,
    "email": "krisi.tsoneva@gmail.com",
    "plan": "team",
    "total": 73,
    "types": 11
  }, {
    "id": 670,
    "email": "meglenamisheva@gmail.com",
    "plan": "solo",
    "total": 72,
    "types": 12
  }, {
    "id": 1610,
    "email": "adrianakancheva@gmail.com",
    "plan": "team",
    "total": 71,
    "types": 8
  }, {
    "id": 897,
    "email": "office.notevigroup@gmail.com",
    "plan": "solo",
    "total": 71,
    "types": 9
  }, {
    "id": 2233,
    "email": "ivelin.sladunov01@gmail.com",
    "plan": "team",
    "total": 70,
    "types": 17
  }, {
    "id": 1220,
    "email": "denyslavangelov@gmail.com",
    "plan": "solo",
    "total": 70,
    "types": 9
  }, {
    "id": 2011,
    "email": "benzingazbg@gmail.com",
    "plan": "solo",
    "total": 70,
    "types": 10
  }, {
    "id": 307,
    "email": "nodramallamaproduction@gmail.com",
    "plan": "solo",
    "total": 69,
    "types": 5
  }, {
    "id": 1217,
    "email": "milan@nankov.com",
    "plan": "solo",
    "total": 65,
    "types": 10
  }, {
    "id": 157,
    "email": "pacoalexiev@gmail.com",
    "plan": "enterprise",
    "total": 64,
    "types": 7
  }, {
    "id": 652,
    "email": "info@illusiontravel.eu",
    "plan": "solo",
    "total": 64,
    "types": 19
  }, {
    "id": 2217,
    "email": "daskalov.mebeli@gmail.com",
    "plan": "solo",
    "total": 63,
    "types": 20
  }, {
    "id": 1532,
    "email": "djdarkstep@gmail.com",
    "plan": "enterprise",
    "total": 62,
    "types": 8
  }, {
    "id": 784,
    "email": "makridaltd1@gmail.com",
    "plan": "team",
    "total": 62,
    "types": 11
  }, {
    "id": 993,
    "email": "discovererspernik@gmail.com",
    "plan": "team",
    "total": 62,
    "types": 15
  }, {
    "id": 700,
    "email": "elena_still@abv.bg",
    "plan": "free",
    "total": 60,
    "types": 9
  }, {
    "id": 32,
    "email": "christiyanag13@gmail.com",
    "plan": "enterprise",
    "total": 60,
    "types": 7
  }, {
    "id": 1168,
    "email": "daniel@severalclouds.com",
    "plan": "free",
    "total": 60,
    "types": 18
  }, {
    "id": 1263,
    "email": "office@dad-studio.com",
    "plan": "solo",
    "total": 58,
    "types": 9
  }, {
    "id": 1609,
    "email": "breadnsoul@gmail.com",
    "plan": "solo",
    "total": 57,
    "types": 10
  }, {
    "id": 600,
    "email": "p.towey@dorin.bg",
    "plan": "solo",
    "total": 57,
    "types": 9
  }, {
    "id": 972,
    "email": "miroslav.todorov@terrafusion.solutions",
    "plan": "solo",
    "total": 57,
    "types": 10
  }, {
    "id": 404,
    "email": "n_koleva@abv.bg",
    "plan": "solo",
    "total": 54,
    "types": 4
  }, {
    "id": 1935,
    "email": "artfields.eu@gmail.com",
    "plan": "solo",
    "total": 53,
    "types": 7
  }, {
    "id": 1070,
    "email": "fibercom@abv.bg",
    "plan": "solo",
    "total": 53,
    "types": 5
  }, {
    "id": 441,
    "email": "petyabogdanova@ascend360.net",
    "plan": "solo",
    "total": 53,
    "types": 4
  }, {
    "id": 965,
    "email": "autorentroom@gmail.com",
    "plan": "free",
    "total": 53,
    "types": 9
  }, {
    "id": 2117,
    "email": "viki.lia@abv.bg",
    "plan": "solo",
    "total": 52,
    "types": 12
  }, {
    "id": 517,
    "email": "office@97crewing.com",
    "plan": "solo",
    "total": 52,
    "types": 5
  }, {
    "id": 2279,
    "email": "zgurovskideyan@gmail.com",
    "plan": "solo",
    "total": 52,
    "types": 10
  }, {
    "id": 85,
    "email": "kichukovadenitsa@gmail.com",
    "plan": "enterprise",
    "total": 51,
    "types": 8
  }, {
    "id": 2304,
    "email": "tsetso777@gmail.com",
    "plan": "solo",
    "total": 51,
    "types": 12
  }, {
    "id": 333,
    "email": "iin_solar_trade_ltd@abv.bg",
    "plan": "solo",
    "total": 50,
    "types": 9
  }, {
    "id": 1002,
    "email": "neichevnikola@gmail.com",
    "plan": "solo",
    "total": 49,
    "types": 11
  }, {
    "id": 1150,
    "email": "rumi.pavlova@hotmail.co.uk",
    "plan": "solo",
    "total": 49,
    "types": 11
  }, {
    "id": 2025,
    "email": "casadesigninvest@gmail.com",
    "plan": "free",
    "total": 48,
    "types": 16
  }, {
    "id": 1232,
    "email": "petrov.todor.p@gmail.com",
    "plan": "solo",
    "total": 48,
    "types": 12
  }, {
    "id": 1166,
    "email": "vladi@vividfilms.eu",
    "plan": "solo",
    "total": 47,
    "types": 16
  }, {
    "id": 1155,
    "email": "ognyan.sokolov@pipehack.co",
    "plan": "solo",
    "total": 47,
    "types": 13
  }, {
    "id": 2040,
    "email": "alexandyrzph@gmail.com",
    "plan": "solo",
    "total": 46,
    "types": 4
  }, {
    "id": 819,
    "email": "office@kamtex84.com",
    "plan": "solo",
    "total": 46,
    "types": 7
  }, {
    "id": 1897,
    "email": "m.georgieva17@icloud.com",
    "plan": "solo",
    "total": 45,
    "types": 10
  }, {
    "id": 2076,
    "email": "nestor.notov@gmail.com",
    "plan": "free",
    "total": 44,
    "types": 13
  }, {
    "id": 2084,
    "email": "sn1001rmc@gmail.com",
    "plan": "solo",
    "total": 44,
    "types": 13
  }, {
    "id": 242,
    "email": "studio.gemini.bg@gmail.com",
    "plan": "enterprise",
    "total": 44,
    "types": 8
  }, {
    "id": 863,
    "email": "gergana_jeleva_@abv.bg",
    "plan": "solo",
    "total": 44,
    "types": 7
  }, {
    "id": 1331,
    "email": "gevi.georgieva@gmail.com",
    "plan": "solo",
    "total": 43,
    "types": 7
  }, {
    "id": 1408,
    "email": "info@povarchitects.com",
    "plan": "solo",
    "total": 43,
    "types": 4
  }, {
    "id": 2071,
    "email": "renetakonarska@gmail.com",
    "plan": "solo",
    "total": 42,
    "types": 7
  }, {
    "id": 2201,
    "email": "soleybattery@mail.bg",
    "plan": "solo",
    "total": 41,
    "types": 10
  }, {
    "id": 1516,
    "email": "getsetdev@icloud.com",
    "plan": "solo",
    "total": 41,
    "types": 7
  }, {
    "id": 1653,
    "email": "dreamtrainingbulgaria@gmail.com",
    "plan": "solo",
    "total": 41,
    "types": 6
  }, {
    "id": 1936,
    "email": "eli135q@gmail.com",
    "plan": "solo",
    "total": 40,
    "types": 8
  }, {
    "id": 913,
    "email": "gipsprobg@gmail.com",
    "plan": "solo",
    "total": 40,
    "types": 8
  }, {
    "id": 1550,
    "email": "top.mobile@abv.bg",
    "plan": "solo",
    "total": 39,
    "types": 10
  }, {
    "id": 215,
    "email": "info@angelaboeva.com",
    "plan": "free",
    "total": 38,
    "types": 13
  }, {
    "id": 1892,
    "email": "lukas.kapusta@rebelhare.com",
    "plan": "free",
    "total": 38,
    "types": 6
  }, {
    "id": 1644,
    "email": "invoice@samitas.com",
    "plan": "solo",
    "total": 37,
    "types": 5
  }, {
    "id": 1536,
    "email": "taniel07@gmail.com",
    "plan": "team",
    "total": 37,
    "types": 13
  }, {
    "id": 853,
    "email": "nina.nikolovska1901@abv.bg",
    "plan": "solo",
    "total": 35,
    "types": 6
  }, {
    "id": 848,
    "email": "contact@imnextgen.bg",
    "plan": "solo",
    "total": 35,
    "types": 9
  }, {
    "id": 827,
    "email": "hrisi.gp@gmail.com",
    "plan": "team",
    "total": 35,
    "types": 5
  }, {
    "id": 644,
    "email": "maria.v.aleksieva@gmail.com",
    "plan": "solo",
    "total": 35,
    "types": 4
  }, {
    "id": 341,
    "email": "spas.kanovv@gmail.com",
    "plan": "enterprise",
    "total": 35,
    "types": 9
  }, {
    "id": 1171,
    "email": "renetakonarska@gmail.com",
    "plan": "solo",
    "total": 34,
    "types": 8
  }, {
    "id": 2116,
    "email": "artpartners7@gmail.com",
    "plan": "solo",
    "total": 34,
    "types": 8
  }, {
    "id": 1376,
    "email": "jiktakruk@abv.bg",
    "plan": "solo",
    "total": 34,
    "types": 9
  }, {
    "id": 614,
    "email": "simpartsautoeood@gmail.com",
    "plan": "solo",
    "total": 34,
    "types": 7
  }, {
    "id": 971,
    "email": "milkog@abv.bg",
    "plan": "solo",
    "total": 33,
    "types": 5
  }, {
    "id": 1861,
    "email": "avanthouse2025@gmail.com",
    "plan": "team",
    "total": 33,
    "types": 7
  }, {
    "id": 2105,
    "email": "tocapas767@daerdy.com",
    "plan": "enterprise",
    "total": 33,
    "types": 11
  }, {
    "id": 2023,
    "email": "djtedd.official@gmail.com",
    "plan": "solo",
    "total": 33,
    "types": 7
  }, {
    "id": 1607,
    "email": "nestorycreative@gmail.com",
    "plan": "solo",
    "total": 33,
    "types": 7
  }, {
    "id": 181,
    "email": "info@inverso.bg",
    "plan": "enterprise",
    "total": 32,
    "types": 6
  }, {
    "id": 1201,
    "email": "id@contiant.com",
    "plan": "enterprise",
    "total": 32,
    "types": 11
  }, {
    "id": 1227,
    "email": "annie.ang09@gmail.com",
    "plan": "free",
    "total": 32,
    "types": 5
  }, {
    "id": 299,
    "email": "pavkataa882@gmail.com",
    "plan": "free",
    "total": 32,
    "types": 7
  }, {
    "id": 1320,
    "email": "office@codnetix.com",
    "plan": "solo",
    "total": 32,
    "types": 8
  }, {
    "id": 1929,
    "email": "presinvestmant@abv.bg",
    "plan": "solo",
    "total": 32,
    "types": 9
  }, {
    "id": 1818,
    "email": "cholakovdimitar66@gmail.com",
    "plan": "solo",
    "total": 31,
    "types": 4
  }, {
    "id": 27,
    "email": "contact@voidweb.eu",
    "plan": "enterprise",
    "total": 31,
    "types": 4
  }, {
    "id": 1782,
    "email": "bg.travel.service@gmail.com",
    "plan": "solo",
    "total": 30,
    "types": 9
  }, {
    "id": 2134,
    "email": "ivan.jelev2@gmail.com",
    "plan": "solo",
    "total": 29,
    "types": 9
  }, {
    "id": 1498,
    "email": "contacts@toyitya.bg",
    "plan": "solo",
    "total": 29,
    "types": 7
  }, {
    "id": 2188,
    "email": "antonio.nikolov@italceramicgroup.com",
    "plan": "enterprise",
    "total": 29,
    "types": 9
  }, {
    "id": 811,
    "email": "sburgudzhieva@gmail.com",
    "plan": "solo",
    "total": 29,
    "types": 4
  }, {
    "id": 2002,
    "email": "ianis7811@abv.bg",
    "plan": "solo",
    "total": 28,
    "types": 9
  }, {
    "id": 1460,
    "email": "sladkatafeyalin@gmail.com",
    "plan": "solo",
    "total": 28,
    "types": 5
  }, {
    "id": 1347,
    "email": "i.marinov@sky-prime.com",
    "plan": "solo",
    "total": 28,
    "types": 8
  }, {
    "id": 2187,
    "email": "boginyastefanova8@gmail.com",
    "plan": "solo",
    "total": 27,
    "types": 10
  }, {
    "id": 1059,
    "email": "office@vitalitygym.bg",
    "plan": "solo",
    "total": 27,
    "types": 7
  }, {
    "id": 1796,
    "email": "nadia_brankova@yahoo.com",
    "plan": "solo",
    "total": 27,
    "types": 9
  }, {
    "id": 2173,
    "email": "kadeeadmin@gmail.com",
    "plan": "solo",
    "total": 27,
    "types": 11
  }, {
    "id": 2132,
    "email": "stanislav@topicpartition.com",
    "plan": "solo",
    "total": 26,
    "types": 9
  }, {
    "id": 1541,
    "email": "kallnoob11@gmail.com",
    "plan": "solo",
    "total": 26,
    "types": 5
  }, {
    "id": 328,
    "email": "r.dinev@mail.bg",
    "plan": "solo",
    "total": 26,
    "types": 4
  }, {
    "id": 2179,
    "email": "denismilanoff@gmail.com",
    "plan": "free",
    "total": 25,
    "types": 12
  }, {
    "id": 1750,
    "email": "eli135q@gmail.com",
    "plan": "solo",
    "total": 25,
    "types": 6
  }, {
    "id": 408,
    "email": "g.topev@papagaio.bg",
    "plan": "solo",
    "total": 25,
    "types": 9
  }, {
    "id": 1185,
    "email": "yulianuk@gmail.com",
    "plan": "solo",
    "total": 25,
    "types": 6
  }, {
    "id": 1586,
    "email": "bohoria.studio.apartments@gmail.com",
    "plan": "solo",
    "total": 24,
    "types": 7
  }, {
    "id": 1614,
    "email": "swiftgap@gmail.com",
    "plan": "solo",
    "total": 24,
    "types": 7
  }, {
    "id": 2061,
    "email": "padelpartnersbulgaria@gmail.com",
    "plan": "solo",
    "total": 24,
    "types": 8
  }, {
    "id": 1235,
    "email": "bobby9@abv.bg",
    "plan": "solo",
    "total": 24,
    "types": 8
  }, {
    "id": 765,
    "email": "oblachebabystore@gmail.com",
    "plan": "solo",
    "total": 24,
    "types": 6
  }, {
    "id": 1926,
    "email": "natur.aqua.group@gmail.com",
    "plan": "solo",
    "total": 23,
    "types": 6
  }, {
    "id": 2254,
    "email": "dtyanakiev@sky-interactive.com",
    "plan": "solo",
    "total": 23,
    "types": 10
  }, {
    "id": 2266,
    "email": "filip@octacore.solutions",
    "plan": "solo",
    "total": 22,
    "types": 8
  }, {
    "id": 2198,
    "email": "martin.ivanov@braindonors.agency",
    "plan": "solo",
    "total": 22,
    "types": 4
  }, {
    "id": 2024,
    "email": "edrina1996@gmail.com",
    "plan": "solo",
    "total": 22,
    "types": 15
  }, {
    "id": 618,
    "email": "pawchokapitana@gmail.com",
    "plan": "free",
    "total": 21,
    "types": 10
  }, {
    "id": 1333,
    "email": "mshentova@abv.bg",
    "plan": "solo",
    "total": 21,
    "types": 5
  }, {
    "id": 2308,
    "email": "diegorodriguezgalindez@gmail.com",
    "plan": "free",
    "total": 20,
    "types": 11
  }, {
    "id": 1599,
    "email": "office.udros@gmail.com",
    "plan": "solo",
    "total": 20,
    "types": 5
  }, {
    "id": 553,
    "email": "valentina@valkrea.house",
    "plan": "enterprise",
    "total": 20,
    "types": 11
  }, {
    "id": 1626,
    "email": "martina.pidakeva@samitas.com",
    "plan": "solo",
    "total": 20,
    "types": 6
  }, {
    "id": 533,
    "email": "imotibektasheva@gmail.com",
    "plan": "solo",
    "total": 20,
    "types": 5
  }, {
    "id": 2035,
    "email": "georgi.test@voidweb.eu",
    "plan": "solo",
    "total": 20,
    "types": 6
  }, {
    "id": 2145,
    "email": "stoycho.a.iliev@gmail.com",
    "plan": "solo",
    "total": 19,
    "types": 5
  }, {
    "id": 2143,
    "email": "monika.ivanova@braindonors.agency",
    "plan": "solo",
    "total": 19,
    "types": 10
  }, {
    "id": 779,
    "email": "vinkisoffice@gmail.com",
    "plan": "solo",
    "total": 19,
    "types": 7
  }, {
    "id": 2221,
    "email": "860313mp@gmail.com",
    "plan": "solo",
    "total": 19,
    "types": 6
  }, {
    "id": 1953,
    "email": "office@simplybae.com",
    "plan": "solo",
    "total": 19,
    "types": 6
  }, {
    "id": 2320,
    "email": "contact@goflowai.ai",
    "plan": "solo",
    "total": 18,
    "types": 6
  }, {
    "id": 407,
    "email": "dinko359@gmail.com",
    "plan": "solo",
    "total": 18,
    "types": 3
  }, {
    "id": 2285,
    "email": "contact@devids.eu",
    "plan": "solo",
    "total": 18,
    "types": 10
  }, {
    "id": 2158,
    "email": "sicavo9165@4heats.com",
    "plan": "solo",
    "total": 18,
    "types": 7
  }, {
    "id": 2081,
    "email": "stherapy95@gmail.com",
    "plan": "solo",
    "total": 18,
    "types": 9
  }, {
    "id": 636,
    "email": "eventoria.space@gmail.com",
    "plan": "solo",
    "total": 18,
    "types": 7
  }, {
    "id": 1938,
    "email": "floristik.t@abv.bg",
    "plan": "team",
    "total": 18,
    "types": 2
  }, {
    "id": 2111,
    "email": "riselab.eood@gmail.com",
    "plan": "solo",
    "total": 17,
    "types": 9
  }, {
    "id": 1952,
    "email": "lyubomir.olchev@gmail.com",
    "plan": "solo",
    "total": 17,
    "types": 3
  }, {
    "id": 2017,
    "email": "officeunisped@gmail.com",
    "plan": "solo",
    "total": 17,
    "types": 8
  }, {
    "id": 1988,
    "email": "tedych2003@gmail.com",
    "plan": "solo",
    "total": 17,
    "types": 5
  }, {
    "id": 939,
    "email": "zapatanasoff@gmail.com",
    "plan": "solo",
    "total": 16,
    "types": 5
  }, {
    "id": 2223,
    "email": "dyankova.mila@gmail.com",
    "plan": "team",
    "total": 16,
    "types": 9
  }, {
    "id": 740,
    "email": "georgkiryakov@gmail.com",
    "plan": "solo",
    "total": 16,
    "types": 5
  }, {
    "id": 899,
    "email": "notevibuildgroup@gmail.com",
    "plan": "solo",
    "total": 16,
    "types": 7
  }, {
    "id": 2106,
    "email": "kostov_s@ksc-bg.com",
    "plan": "solo",
    "total": 15,
    "types": 10
  }, {
    "id": 956,
    "email": "ofleur.contacts@gmail.com",
    "plan": "solo",
    "total": 15,
    "types": 3
  }, {
    "id": 1743,
    "email": "an.tanchev@abv.bg",
    "plan": "solo",
    "total": 15,
    "types": 6
  }, {
    "id": 258,
    "email": "moni.zarko@abv.bg",
    "plan": "solo",
    "total": 15,
    "types": 7
  }, {
    "id": 2237,
    "email": "demos@test.com",
    "plan": "solo",
    "total": 15,
    "types": 3
  }, {
    "id": 2077,
    "email": "moni.zarko@abv.bg",
    "plan": "solo",
    "total": 15,
    "types": 4
  }, {
    "id": 1119,
    "email": "polisunduni@abv.bg",
    "plan": "team",
    "total": 15,
    "types": 2
  }, {
    "id": 2310,
    "email": "hilyal.sami@outlook.com",
    "plan": "solo",
    "total": 15,
    "types": 9
  }, {
    "id": 842,
    "email": "veronikavvelkova5@gmail.com",
    "plan": "solo",
    "total": 14,
    "types": 6
  }, {
    "id": 2083,
    "email": "sn1001rmc@gmail.com",
    "plan": "solo",
    "total": 14,
    "types": 3
  }, {
    "id": 2095,
    "email": "ida.golemanova@gmail.com",
    "plan": "solo",
    "total": 14,
    "types": 8
  }, {
    "id": 280,
    "email": "kirqkaaa@abv.bg",
    "plan": "team",
    "total": 14,
    "types": 8
  }, {
    "id": 2114,
    "email": "samuel.diethelm+inverso@revolut.com",
    "plan": "enterprise",
    "total": 14,
    "types": 5
  }, {
    "id": 374,
    "email": "pavlin140@gmail.com",
    "plan": "solo",
    "total": 14,
    "types": 7
  }, {
    "id": 2269,
    "email": "desi850@abv.bg",
    "plan": "solo",
    "total": 14,
    "types": 8
  }, {
    "id": 2193,
    "email": "svetla.vasileva@braindonors.agency",
    "plan": "solo",
    "total": 14,
    "types": 5
  }, {
    "id": 2316,
    "email": "ivvestrans2010@gmail.com",
    "plan": "solo",
    "total": 14,
    "types": 7
  }, {
    "id": 2326,
    "email": "tgspedition2026@abv.bg",
    "plan": "solo",
    "total": 14,
    "types": 8
  }, {
    "id": 2303,
    "email": "rjetcheva@gmail.com",
    "plan": "solo",
    "total": 13,
    "types": 7
  }, {
    "id": 1538,
    "email": "cmstudiobg@gmail.com",
    "plan": "solo",
    "total": 13,
    "types": 10
  }, {
    "id": 2230,
    "email": "m.tsanchev@gmail.com",
    "plan": "solo",
    "total": 13,
    "types": 9
  }, {
    "id": 1502,
    "email": "demsyst@gmail.com",
    "plan": "solo",
    "total": 13,
    "types": 3
  }, {
    "id": 2306,
    "email": "creator.flow.bussines@gmail.com",
    "plan": "free",
    "total": 13,
    "types": 8
  }, {
    "id": 262,
    "email": "jordanova7878@abv.bg",
    "plan": "solo",
    "total": 13,
    "types": 5
  }, {
    "id": 2250,
    "email": "velislavi.biz@gmail.com",
    "plan": "solo",
    "total": 13,
    "types": 6
  }, {
    "id": 2174,
    "email": "tenev.bh2o@gmail.com",
    "plan": "solo",
    "total": 13,
    "types": 8
  }, {
    "id": 1511,
    "email": "inffo@trakciashop.com",
    "plan": "solo",
    "total": 13,
    "types": 3
  }, {
    "id": 550,
    "email": "swormylolz+inverso@gmail.com",
    "plan": "solo",
    "total": 12,
    "types": 4
  }, {
    "id": 734,
    "email": "solaris.spa@proton.me",
    "plan": "solo",
    "total": 12,
    "types": 4
  }, {
    "id": 2261,
    "email": "igechev2@gmail.com",
    "plan": "solo",
    "total": 11,
    "types": 7
  }, {
    "id": 1021,
    "email": "yanos.stm@gmail.com",
    "plan": "solo",
    "total": 11,
    "types": 4
  }, {
    "id": 2176,
    "email": "jorkata@test.com",
    "plan": "enterprise",
    "total": 11,
    "types": 7
  }, {
    "id": 2155,
    "email": "batonok931@bmoar.com",
    "plan": "solo",
    "total": 11,
    "types": 9
  }, {
    "id": 1636,
    "email": "pavlin@viprent.eu",
    "plan": "solo",
    "total": 11,
    "types": 5
  }, {
    "id": 1521,
    "email": "radotravel@abv.bg",
    "plan": "solo",
    "total": 10,
    "types": 3
  }, {
    "id": 841,
    "email": "emilycleaning7574@gmail.com",
    "plan": "solo",
    "total": 10,
    "types": 1
  }, {
    "id": 1335,
    "email": "siti_montana@abv.bg",
    "plan": "solo",
    "total": 10,
    "types": 7
  }, {
    "id": 2210,
    "email": "stelastoycheva2001@gmail.com",
    "plan": "solo",
    "total": 10,
    "types": 5
  }, {
    "id": 1756,
    "email": "dpoibrenski05@gmail.com",
    "plan": "solo",
    "total": 9,
    "types": 3
  }, {
    "id": 1734,
    "email": "vi-as@abv.bg",
    "plan": "solo",
    "total": 9,
    "types": 3
  }, {
    "id": 1085,
    "email": "sostaxi2023@gmail.com",
    "plan": "enterprise",
    "total": 9,
    "types": 3
  }, {
    "id": 2270,
    "email": "viktorkabakchiev@gmail.com",
    "plan": "solo",
    "total": 9,
    "types": 6
  }, {
    "id": 2264,
    "email": "snedev@gmail.com",
    "plan": "solo",
    "total": 9,
    "types": 6
  }, {
    "id": 695,
    "email": "office.blueshields.vts@gmail.com",
    "plan": "solo",
    "total": 9,
    "types": 3
  }, {
    "id": 777,
    "email": "petya_mitoncheva@abv.bg",
    "plan": "solo",
    "total": 9,
    "types": 5
  }, {
    "id": 1794,
    "email": "dimitar050279@gmail.com",
    "plan": "solo",
    "total": 9,
    "types": 3
  }, {
    "id": 1130,
    "email": "suzunov@rockit.bg",
    "plan": "solo",
    "total": 8,
    "types": 5
  }, {
    "id": 710,
    "email": "denitsamarinova_@abv.bg",
    "plan": "solo",
    "total": 8,
    "types": 2
  }, {
    "id": 1156,
    "email": "mk.wealthy2024@gmail.com",
    "plan": "solo",
    "total": 8,
    "types": 6
  }, {
    "id": 1365,
    "email": "elitsa_velcheva@abv.bg",
    "plan": "solo",
    "total": 8,
    "types": 4
  }, {
    "id": 2191,
    "email": "stela.stoycheva@braindonors.agency",
    "plan": "solo",
    "total": 8,
    "types": 5
  }, {
    "id": 2239,
    "email": "zfzznphzyk@privaterelay.appleid.com",
    "plan": "solo",
    "total": 8,
    "types": 2
  }, {
    "id": 2178,
    "email": "denismilanoff@gmail.com",
    "plan": "solo",
    "total": 8,
    "types": 4
  }, {
    "id": 2284,
    "email": "neri.m@voidweb.eu",
    "plan": "solo",
    "total": 8,
    "types": 4
  }, {
    "id": 2231,
    "email": "daylerov@gmail.com",
    "plan": "solo",
    "total": 8,
    "types": 4
  }, {
    "id": 771,
    "email": "timeless.tastes.group@gmail.com",
    "plan": "solo",
    "total": 8,
    "types": 6
  }, {
    "id": 2064,
    "email": "atanastanev362@gmail.com",
    "plan": "solo",
    "total": 8,
    "types": 2
  }, {
    "id": 2259,
    "email": "georgiev.gg99@gmail.com",
    "plan": "solo",
    "total": 8,
    "types": 5
  }, {
    "id": 2301,
    "email": "nasko_kolev@abv.bg",
    "plan": "solo",
    "total": 8,
    "types": 6
  }, {
    "id": 2082,
    "email": "erik@voidweb.eu",
    "plan": "solo",
    "total": 8,
    "types": 4
  }, {
    "id": 163,
    "email": "ndimitrov9@mail.bg",
    "plan": "solo",
    "total": 7,
    "types": 3
  }, {
    "id": 2229,
    "email": "summitinvest.eu@gmail.com",
    "plan": "solo",
    "total": 7,
    "types": 4
  }, {
    "id": 2291,
    "email": "georgi.k@voidweb.eu",
    "plan": "solo",
    "total": 7,
    "types": 2
  }, {
    "id": 1477,
    "email": "radina.baramova@gmail.com",
    "plan": "solo",
    "total": 7,
    "types": 5
  }, {
    "id": 2293,
    "email": "rvd18@abv.bg",
    "plan": "solo",
    "total": 7,
    "types": 3
  }, {
    "id": 2196,
    "email": "monika.ivanova@braindonors.agency",
    "plan": "solo",
    "total": 7,
    "types": 3
  }, {
    "id": 795,
    "email": "bahf.bg@gmail.com",
    "plan": "solo",
    "total": 7,
    "types": 4
  }, {
    "id": 2212,
    "email": "lg@b23.online",
    "plan": "solo",
    "total": 7,
    "types": 6
  }, {
    "id": 2092,
    "email": "kallnoob11@gmail.com",
    "plan": "solo",
    "total": 7,
    "types": 2
  }, {
    "id": 170,
    "email": "daniel.bratov@gmail.com",
    "plan": "solo",
    "total": 7,
    "types": 4
  }, {
    "id": 2109,
    "email": "konelid847@pckage.com",
    "plan": "solo",
    "total": 7,
    "types": 5
  }, {
    "id": 1783,
    "email": "stellargroupp@gmail.com",
    "plan": "solo",
    "total": 7,
    "types": 2
  }, {
    "id": 746,
    "email": "iron-factory@abv.bg",
    "plan": "solo",
    "total": 7,
    "types": 1
  }, {
    "id": 2121,
    "email": "bkb24@abv.bg",
    "plan": "solo",
    "total": 7,
    "types": 5
  }, {
    "id": 2060,
    "email": "office@dafiniti.bg",
    "plan": "solo",
    "total": 7,
    "types": 6
  }, {
    "id": 37,
    "email": "woney11875@devncie.com",
    "plan": "solo",
    "total": 7,
    "types": 3
  }, {
    "id": 2063,
    "email": "lamozcho@gmail.com",
    "plan": "solo",
    "total": 7,
    "types": 4
  }, {
    "id": 1889,
    "email": "office.info.kingsman@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 2
  }, {
    "id": 2160,
    "email": "selika441@4heats.com",
    "plan": "solo",
    "total": 6,
    "types": 4
  }, {
    "id": 2283,
    "email": "novebuild@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 4
  }, {
    "id": 2057,
    "email": "gergana.paraskevova@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 2267,
    "email": "r.velkov@msve.io",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 2211,
    "email": "svetla.test1905@proton.me",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 2328,
    "email": "systemomailbox@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 4
  }, {
    "id": 2209,
    "email": "georgia33666@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 2314,
    "email": "emilexinfo@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 2192,
    "email": "dimana.mihailova@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 4
  }, {
    "id": 2322,
    "email": "office@v-itsolutions.bg",
    "plan": "solo",
    "total": 6,
    "types": 4
  }, {
    "id": 2189,
    "email": "monika.ivanova@braindonors.agency",
    "plan": "solo",
    "total": 6,
    "types": 3
  }, {
    "id": 1738,
    "email": "vskirchev@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 2
  }, {
    "id": 2046,
    "email": "alexander@formulatechbg.com",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 2186,
    "email": "eli_siyana@abv.bg",
    "plan": "solo",
    "total": 6,
    "types": 4
  }, {
    "id": 2102,
    "email": "alexfromsofia@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 3
  }, {
    "id": 2170,
    "email": "test@onboarding.test",
    "plan": "solo",
    "total": 6,
    "types": 4
  }, {
    "id": 1665,
    "email": "ivan.nakov123@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 3
  }, {
    "id": 2168,
    "email": "babanago@abv.bg",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 1560,
    "email": "info@bullhomes.eu",
    "plan": "solo",
    "total": 6,
    "types": 2
  }, {
    "id": 2119,
    "email": "yoxoxo5360@onbap.com",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 2142,
    "email": "plamen.polimenov@braindonors.agency",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 2234,
    "email": "dobrinovamira@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 3
  }, {
    "id": 2157,
    "email": "erik@voideb.eu",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 2144,
    "email": "testerrik@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 3
  }, {
    "id": 2161,
    "email": "info@eltar.group",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 2167,
    "email": "eriktesttttt@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 1254,
    "email": "silgeorgieva98@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 3
  }, {
    "id": 2107,
    "email": "terragreen1@abv.bg",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 676,
    "email": "marina_kusheva@abv.bg",
    "plan": "solo",
    "total": 5,
    "types": 2
  }, {
    "id": 383,
    "email": "dimitar.t.ivanov@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 1
  }, {
    "id": 2324,
    "email": "tcvetanova51@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 834,
    "email": "elitza.koleva@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 3
  }, {
    "id": 33,
    "email": "boris.b@voidweb.eu",
    "plan": "solo",
    "total": 5,
    "types": 3
  }, {
    "id": 2163,
    "email": "gehevoj520@4heats.com",
    "plan": "enterprise",
    "total": 5,
    "types": 5
  }, {
    "id": 2275,
    "email": "sevgin_sirakov@abv.bg",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 2202,
    "email": "martinivanoviv955@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 2124,
    "email": "pahak67233@fun4k.com",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 2165,
    "email": "dtanev92@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 3
  }, {
    "id": 302,
    "email": "boyan@hireworks.digital",
    "plan": "solo",
    "total": 5,
    "types": 1
  }, {
    "id": 2218,
    "email": "svetla.georgieva@fourmate.com",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 2169,
    "email": "jorkatabate@test.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 1932,
    "email": "dtk@sigdir.com",
    "plan": "solo",
    "total": 4,
    "types": 2
  }, {
    "id": 2272,
    "email": "sddimitrova@abv.bg",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2273,
    "email": "office@futurex.bg",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 337,
    "email": "pimcombg@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2296,
    "email": "my.shop.anelia@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2299,
    "email": "gysamuby@fxzig.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 75,
    "email": "petya.eftimova@abv.bg",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2098,
    "email": "kerojay138@ostahie.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2101,
    "email": "arsovski225@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2108,
    "email": "ven.mihaylov@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2110,
    "email": "unishtojiteli@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 1563,
    "email": "drsracce@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 2
  }, {
    "id": 2003,
    "email": "gkb@mail.bg",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 1355,
    "email": "bul.pol.group@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 1
  }, {
    "id": 2135,
    "email": "kalin252@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 1920,
    "email": "info@intsy.eu",
    "plan": "free",
    "total": 4,
    "types": 1
  }, {
    "id": 2140,
    "email": "jonidev@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 2
  }, {
    "id": 2150,
    "email": "barko.invest@yahoo.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2159,
    "email": "philipkolev9991@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2162,
    "email": "gehevoj529@4heats.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2175,
    "email": "copotij505@iapapi.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 1098,
    "email": "hikbgcom@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 2
  }, {
    "id": 2183,
    "email": "a7nipp2c0e@wnbaldwy.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2184,
    "email": "aa@abv.bg",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2190,
    "email": "koliji3301@anawebs.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2194,
    "email": "d.mihaylova@italceramicgroup.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2197,
    "email": "stela.stoycheva@braindonors.agency",
    "plan": "solo",
    "total": 4,
    "types": 2
  }, {
    "id": 2219,
    "email": "rovera.space@outlook.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2220,
    "email": "advokatdimitrov4@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 1934,
    "email": "kraevabelyana477@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 2
  }, {
    "id": 2243,
    "email": "stroitel2000@abv.bg",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2244,
    "email": "mitkovgeorgi065@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2246,
    "email": "stela.stoycheva@braindonors.agency",
    "plan": "solo",
    "total": 4,
    "types": 2
  }, {
    "id": 2248,
    "email": "mladenov77@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 1113,
    "email": "andrey.petrov@braindonors.agency",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2125,
    "email": "glimpseoog@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2122,
    "email": "stefysps@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2164,
    "email": "cewote8545@donumart.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2241,
    "email": "bussinessplusadm@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2177,
    "email": "milanovdenis2002@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2182,
    "email": "stefangogov@proton.me",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2263,
    "email": "alasbulgaria@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 1925,
    "email": "thecupcake.socials@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2048,
    "email": "rositca_77@abv.bg",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2247,
    "email": "nerimutafova01@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2318,
    "email": "ilianpetev67@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2260,
    "email": "skinnylaural@wshu.net",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 58,
    "email": "erikpetrovweb@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 1
  }, {
    "id": 2276,
    "email": "petya_mitoncheva@abv.bg",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 955,
    "email": "angel.guygov@icloud.com",
    "plan": "solo",
    "total": 3,
    "types": 1
  }, {
    "id": 2199,
    "email": "stefaniivanova2612@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2203,
    "email": "jorkataqa@test.qa",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2078,
    "email": "moni.zarko@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2307,
    "email": "magacademy2@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 194,
    "email": "stu2201681036@uni-plovdiv.bg",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2213,
    "email": "balansvarna@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2216,
    "email": "dbstroyltd@gmai.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2032,
    "email": "sybev.dimitar@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2271,
    "email": "manolova.monika@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2222,
    "email": "chilltobone@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2294,
    "email": "bastosgroup@outlook.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2224,
    "email": "evhristovltd@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2225,
    "email": "ivanov955@mail.bg",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2226,
    "email": "s_manchev@yahoo.co.uk",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2227,
    "email": "alextest@abv.bg",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2228,
    "email": "office@aomeda.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2282,
    "email": "atanasmilcev787@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2141,
    "email": "eli135q@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2146,
    "email": "ihawxgbusiness@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2147,
    "email": "schetovodstvo_sv@abv.bg",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2151,
    "email": "andonb@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2131,
    "email": "pb27mir@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2156,
    "email": "m.ivvanova53@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2127,
    "email": "dimsinvest@abv.bg",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2278,
    "email": "boris.stoilov@proton.me",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2312,
    "email": "ikundevska@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2148,
    "email": "lassfed@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2290,
    "email": "denislavpetkov1809@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2311,
    "email": "doormann111@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2091,
    "email": "gold6314@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2126,
    "email": "glimpseoog@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 1
  }, {
    "id": 2086,
    "email": "snyvx@mailto.plus",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2240,
    "email": "miroslav_IIVANOV@ABV.BG",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2286,
    "email": "desislava.dicheva87@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 717,
    "email": "info@mnlogistic.bg",
    "plan": "solo",
    "total": 2,
    "types": 1
  }, {
    "id": 2120,
    "email": "mazen@tradelane.ai",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2166,
    "email": "rvd18@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2118,
    "email": "pi_petrov@mail.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2113,
    "email": "rosi.detinska@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 1658,
    "email": "dmistoykov@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 1
  }, {
    "id": 2013,
    "email": "galiana.vasileva@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2171,
    "email": "rvd18@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2172,
    "email": "rvd18@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2044,
    "email": "nedev.group@aol.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 1888,
    "email": "anackhov.i.e@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2300,
    "email": "naskoshefa@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2257,
    "email": "Ivailo8101daskalov@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2281,
    "email": "enjoigooddays@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2103,
    "email": "donsandini@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2099,
    "email": "kallnoob11@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2180,
    "email": "monika.ivanova@braindonors.agency",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 1063,
    "email": "d.petkova29@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 1
  }, {
    "id": 798,
    "email": "h.s.atanasov@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 1
  }, {
    "id": 653,
    "email": "viki.peicheva@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2051,
    "email": "ivan.donkov@smartity.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2012,
    "email": "vityashevcov1@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2097,
    "email": "todosbackendmail.service@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2274,
    "email": "zaharievboyan@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2128,
    "email": "office@consulting-vi.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2327,
    "email": "nero8322@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 309,
    "email": "vipzoo@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 1
  }, {
    "id": 2323,
    "email": "ivaylo.g@smartico.ai",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2139,
    "email": "nianed3007@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 970,
    "email": "nikolovk1992@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 1270,
    "email": "hristiana@sharlopova.com",
    "plan": "solo",
    "total": 2,
    "types": 1
  }, {
    "id": 2069,
    "email": "hristo.v.hristov@outlook.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2007,
    "email": "l_borisova@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 1191,
    "email": "cankovpantev@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2133,
    "email": "denislava.koeva@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2313,
    "email": "billy.dimitrov@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2018,
    "email": "ngerzilova@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2010,
    "email": "pspavlov75@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2028,
    "email": "arsainvestbg@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2029,
    "email": "zhuj8119@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2031,
    "email": "divestavarna@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2033,
    "email": "stefangogov@proton.me",
    "plan": "enterprise",
    "total": 1,
    "types": 1
  }, {
    "id": 1993,
    "email": "aspar.software@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2036,
    "email": "stoyan.n@voidweb.eu",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2037,
    "email": "rradoslavova@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2039,
    "email": "alexandyrfreelance@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1968,
    "email": "ilcho.eftimov@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1949,
    "email": "hello@drvelev.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1947,
    "email": "miladima@veda.finance",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2058,
    "email": "yordankgeorgiev@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2062,
    "email": "testbaitacount@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2067,
    "email": "mimisteli2@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2068,
    "email": "office@vizualnatehnika.bg",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2073,
    "email": "venchan.valkov@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2075,
    "email": "elena.paskova68@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1851,
    "email": "samarovdimitar@gmail.com",
    "plan": "enterprise",
    "total": 1,
    "types": 1
  }, {
    "id": 1812,
    "email": "todor@cosmonavt.studio",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1784,
    "email": "stanimirstefanov105@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1774,
    "email": "astyle.studio.asya@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2085,
    "email": "hristov@aquaconsult.biz",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2087,
    "email": "ksvetieva@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2090,
    "email": "rzasohin@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2094,
    "email": "stefaniya.tzvetkova89@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1735,
    "email": "gneissbg.com@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1670,
    "email": "airblasterbulgaria@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1549,
    "email": "wizard97@abv.bg",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1458,
    "email": "splay333@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2130,
    "email": "zevstatiev@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2136,
    "email": "erikkkkk@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2137,
    "email": "mst2027@abv.bg",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2138,
    "email": "testerikkkkk@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2153,
    "email": "vstefcheva@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1111,
    "email": "setndq@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1101,
    "email": "org #1101",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2185,
    "email": "antondjingarov7@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1057,
    "email": "office@reflect-studio.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1024,
    "email": "sergey@finbiztech.eu",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2208,
    "email": "svetla.test2026@proton.me",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2214,
    "email": "erikk@voidweb.eu",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2236,
    "email": "ivaylo.g@smartico.ai",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2252,
    "email": "z299npsh4h@privaterelay.appleid.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 709,
    "email": "anlimltd@hotmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 705,
    "email": "tvishnevski@enivid.net",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2258,
    "email": "erik@voidweb.eu",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 451,
    "email": "sanjaracic77@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2287,
    "email": "desislava.dicheva87@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2292,
    "email": "rvd18@abv.bg",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2298,
    "email": "georgitestingverification@test.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2309,
    "email": "nick_stankov@abv.bg",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2325,
    "email": "tgspedition2026@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2015,
    "email": "opetrova.bg@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }],
  "events": [{
    "e": "invoice_downloaded",
    "n": 16520,
    "o": 278
  }, {
    "e": "invoice_created",
    "n": 11253,
    "o": 285
  }, {
    "e": "report_viewed",
    "n": 6960,
    "o": 348
  }, {
    "e": "invoice_updated",
    "n": 6572,
    "o": 217
  }, {
    "e": "invoice_paid",
    "n": 3559,
    "o": 117
  }, {
    "e": "invoice_sent",
    "n": 1976,
    "o": 158
  }, {
    "e": "invoice_viewed_by_client",
    "n": 1515,
    "o": 87
  }, {
    "e": "template_created",
    "n": 1218,
    "o": 121
  }, {
    "e": "customer_created",
    "n": 1002,
    "o": 169
  }, {
    "e": "invoice_downloaded_by_client",
    "n": 971,
    "o": 92
  }, {
    "e": "invoice_viewed_by_owner",
    "n": 964,
    "o": 145
  }, {
    "e": "subscription_status_changed",
    "n": 795,
    "o": 145
  }, {
    "e": "ai_assistant_used",
    "n": 549,
    "o": 74
  }, {
    "e": "organization_updated",
    "n": 407,
    "o": 240
  }, {
    "e": "payment_failed",
    "n": 373,
    "o": 80
  }, {
    "e": "report_filter_changed",
    "n": 338,
    "o": 100
  }, {
    "e": "invoices_exported",
    "n": 256,
    "o": 37
  }, {
    "e": "onboarding_completed",
    "n": 241,
    "o": 241
  }, {
    "e": "partner_portal_accessed",
    "n": 233,
    "o": 97
  }, {
    "e": "invoice_reminder_toggled",
    "n": 217,
    "o": 30
  }, {
    "e": "invoice_deleted",
    "n": 203,
    "o": 97
  }, {
    "e": "customer_updated",
    "n": 178,
    "o": 54
  }, {
    "e": "registration",
    "n": 117,
    "o": 117
  }, {
    "e": "invoice_canceled",
    "n": 97,
    "o": 46
  }, {
    "e": "service_updated",
    "n": 92,
    "o": 16
  }, {
    "e": "checkout_completed",
    "n": 90,
    "o": 81
  }, {
    "e": "invoice_unpaid",
    "n": 87,
    "o": 38
  }, {
    "e": "subscription_canceled",
    "n": 81,
    "o": 78
  }, {
    "e": "subscription_created",
    "n": 72,
    "o": 68
  }, {
    "e": "plan_changed",
    "n": 68,
    "o": 36
  }, {
    "e": "trial_will_end",
    "n": 62,
    "o": 62
  }, {
    "e": "bank_account_connected",
    "n": 61,
    "o": 30
  }, {
    "e": "bulk_invoices_updated",
    "n": 58,
    "o": 15
  }, {
    "e": "service_created",
    "n": 56,
    "o": 20
  }, {
    "e": "organization_logo_uploaded",
    "n": 50,
    "o": 24
  }, {
    "e": "invoice_sequence_updated",
    "n": 43,
    "o": 6
  }, {
    "e": "quote_updated",
    "n": 43,
    "o": 7
  }, {
    "e": "invoice_reminder_sent",
    "n": 42,
    "o": 2
  }, {
    "e": "service_deleted",
    "n": 38,
    "o": 8
  }, {
    "e": "report_drilldown_opened",
    "n": 33,
    "o": 3
  }, {
    "e": "report_graph_toggled",
    "n": 30,
    "o": 1
  }, {
    "e": "transaction_document_uploaded",
    "n": 29,
    "o": 7
  }, {
    "e": "invoice_template_settings_changed",
    "n": 26,
    "o": 19
  }, {
    "e": "organization_logo_removed",
    "n": 24,
    "o": 12
  }, {
    "e": "invoice_template_changed",
    "n": 22,
    "o": 16
  }, {
    "e": "quote_created",
    "n": 20,
    "o": 7
  }, {
    "e": "payment_action_required",
    "n": 20,
    "o": 12
  }, {
    "e": "invoice_uncanceled",
    "n": 18,
    "o": 16
  }, {
    "e": "bulk_invoices_deleted",
    "n": 17,
    "o": 16
  }, {
    "e": "recurring_invoice_created",
    "n": 17,
    "o": 5
  }, {
    "e": "report_exported",
    "n": 16,
    "o": 4
  }, {
    "e": "trial_expired",
    "n": 15,
    "o": 15
  }, {
    "e": "bank_transactions_imported",
    "n": 13,
    "o": 3
  }, {
    "e": "invoice_sequence_created",
    "n": 13,
    "o": 9
  }, {
    "e": "invoices_imported",
    "n": 12,
    "o": 7
  }, {
    "e": "bank_account_disconnected",
    "n": 11,
    "o": 3
  }, {
    "e": "accountant_integration_connected",
    "n": 11,
    "o": 9
  }, {
    "e": "accountant_invited",
    "n": 11,
    "o": 9
  }, {
    "e": "inbound_document_unmatched",
    "n": 9,
    "o": 3
  }, {
    "e": "inbound_document_matched",
    "n": 9,
    "o": 4
  }, {
    "e": "accountant_joined",
    "n": 9,
    "o": 8
  }, {
    "e": "documents_exported",
    "n": 8,
    "o": 3
  }, {
    "e": "customer_deleted",
    "n": 8,
    "o": 8
  }, {
    "e": "dashboard_viewed",
    "n": 8,
    "o": 3
  }, {
    "e": "member_joined",
    "n": 6,
    "o": 4
  }, {
    "e": "inbound_document_discarded",
    "n": 4,
    "o": 2
  }, {
    "e": "transaction_document_auto_matched",
    "n": 4,
    "o": 1
  }, {
    "e": "subscription_cancellation_portal_opened",
    "n": 3,
    "o": 3
  }, {
    "e": "transaction_document_deleted",
    "n": 3,
    "o": 3
  }, {
    "e": "subscription_cancellation_feedback_submitted",
    "n": 3,
    "o": 3
  }, {
    "e": "subscription_cancellation_confirmed",
    "n": 2,
    "o": 2
  }, {
    "e": "invoice_transaction_matched",
    "n": 2,
    "o": 1
  }, {
    "e": "report_overdue_clicked",
    "n": 1,
    "o": 1
  }, {
    "e": "invoice_transaction_unmatched",
    "n": 1,
    "o": 1
  }],
  "cells": [[0, 0, 4724, "2026-01-02", "2026-08-11"], [0, 1, 2655, "2026-01-02", "2026-08-11"], [0, 3, 570, "2026-02-26", "2026-08-10"], [0, 7, 225, "2026-01-02", "2026-02-25"], [0, 2, 128, "2026-04-21", "2026-07-30"], [0, 8, 115, "2026-02-26", "2026-08-11"], [0, 10, 50, "2026-01-02", "2026-08-07"], [0, 11, 11, "2026-01-05", "2026-08-06"], [0, 16, 10, "2026-01-05", "2026-07-23"], [0, 23, 7, "2026-01-20", "2026-04-07"], [0, 14, 5, "2026-02-05", "2026-02-26"], [0, 12, 5, "2026-01-02", "2026-03-12"], [0, 21, 4, "2026-03-02", "2026-07-15"], [0, 15, 4, "2026-06-23", "2026-07-07"], [0, 5, 3, "2026-01-02", "2026-02-25"], [0, 18, 3, "2026-01-07", "2026-01-16"], [0, 47, 2, "2026-02-04", "2026-02-04"], [0, 20, 2, "2026-03-10", "2026-06-25"], [0, 19, 1, "2026-08-10", "2026-08-10"], [0, 29, 1, "2026-08-06", "2026-08-06"], [0, 27, 1, "2026-02-26", "2026-02-26"], [0, 25, 1, "2026-03-06", "2026-03-06"], [0, 30, 1, "2026-01-02", "2026-01-02"], [0, 28, 1, "2026-03-06", "2026-03-06"], [0, 4, 1, "2026-07-07", "2026-07-07"], [0, 26, 1, "2026-07-07", "2026-07-07"], [1, 1, 760, "2026-01-05", "2026-08-05"], [1, 0, 686, "2026-01-05", "2026-08-11"], [1, 3, 613, "2026-02-27", "2026-08-07"], [1, 4, 547, "2026-01-05", "2026-08-07"], [1, 2, 139, "2026-04-21", "2026-08-11"], [1, 8, 36, "2026-03-05", "2026-08-04"], [1, 7, 32, "2026-01-05", "2026-02-23"], [1, 24, 18, "2026-05-18", "2026-05-18"], [1, 11, 9, "2026-03-07", "2026-03-20"], [1, 38, 8, "2026-05-18", "2026-05-18"], [1, 10, 8, "2026-02-14", "2026-07-30"], [1, 20, 6, "2026-01-20", "2026-06-05"], [1, 14, 6, "2026-03-07", "2026-03-20"], [1, 26, 5, "2026-02-23", "2026-06-16"], [1, 23, 4, "2026-01-23", "2026-07-30"], [1, 21, 3, "2026-04-01", "2026-04-28"], [1, 16, 2, "2026-08-03", "2026-08-04"], [1, 18, 1, "2026-03-10", "2026-03-10"], [1, 45, 1, "2026-04-28", "2026-04-28"], [1, 9, 1, "2026-06-16", "2026-06-16"], [1, 36, 1, "2026-04-28", "2026-04-28"], [2, 0, 701, "2026-01-05", "2026-08-10"], [2, 2, 275, "2026-02-27", "2026-08-11"], [2, 1, 264, "2026-01-05", "2026-08-10"], [2, 3, 254, "2026-02-27", "2026-08-10"], [2, 4, 208, "2026-01-05", "2026-08-07"], [2, 6, 187, "2026-01-13", "2026-08-05"], [2, 5, 124, "2026-01-13", "2026-08-04"], [2, 8, 72, "2026-02-26", "2026-08-10"], [2, 7, 42, "2026-01-09", "2026-02-19"], [2, 9, 39, "2026-02-28", "2026-07-22"], [2, 21, 17, "2026-03-02", "2026-08-10"], [2, 15, 17, "2026-02-27", "2026-07-22"], [2, 11, 8, "2026-01-15", "2026-07-15"], [2, 26, 4, "2026-03-09", "2026-06-22"], [2, 10, 4, "2026-04-04", "2026-08-04"], [2, 12, 4, "2026-07-22", "2026-07-22"], [2, 16, 3, "2026-01-16", "2026-07-22"], [2, 13, 1, "2026-07-22", "2026-07-22"], [3, 2, 350, "2026-03-19", "2026-08-11"], [3, 0, 304, "2026-01-08", "2026-08-06"], [3, 1, 298, "2026-01-14", "2026-08-10"], [3, 4, 213, "2026-01-07", "2026-08-11"], [3, 3, 188, "2026-02-26", "2026-08-11"], [3, 5, 185, "2026-01-05", "2026-08-10"], [3, 6, 173, "2026-01-05", "2026-08-10"], [3, 19, 109, "2026-03-19", "2026-08-10"], [3, 9, 75, "2026-02-26", "2026-08-10"], [3, 10, 34, "2026-01-19", "2026-08-10"], [3, 37, 27, "2026-04-29", "2026-08-12"], [3, 8, 25, "2026-03-11", "2026-08-10"], [3, 21, 8, "2026-02-26", "2026-08-10"], [3, 26, 8, "2026-02-11", "2026-08-04"], [3, 18, 3, "2026-03-19", "2026-06-10"], [3, 31, 2, "2026-06-10", "2026-06-10"], [3, 11, 2, "2026-03-13", "2026-03-13"], [3, 15, 2, "2026-03-19", "2026-04-04"], [3, 17, 1, "2026-06-09", "2026-06-09"], [3, 13, 1, "2026-06-09", "2026-06-09"], [3, 42, 1, "2026-06-09", "2026-06-09"], [3, 16, 1, "2026-03-09", "2026-03-09"], [3, 7, 1, "2026-02-05", "2026-02-05"], [3, 20, 1, "2026-06-29", "2026-06-29"], [4, 0, 492, "2026-01-05", "2026-08-11"], [4, 2, 405, "2026-04-15", "2026-08-11"], [4, 1, 218, "2026-01-04", "2026-08-07"], [4, 3, 206, "2026-02-27", "2026-08-11"], [4, 5, 132, "2026-01-05", "2026-08-11"], [4, 4, 97, "2026-01-19", "2026-08-11"], [4, 6, 60, "2026-01-05", "2026-08-11"], [4, 7, 45, "2026-01-05", "2026-02-24"], [4, 16, 38, "2026-05-05", "2026-08-04"], [4, 38, 16, "2026-05-02", "2026-05-02"], [4, 9, 15, "2026-03-16", "2026-06-05"], [4, 24, 13, "2026-05-04", "2026-05-04"], [4, 15, 13, "2026-04-15", "2026-08-01"], [4, 8, 12, "2026-04-11", "2026-07-24"], [4, 10, 6, "2026-03-11", "2026-07-28"], [4, 21, 5, "2026-04-28", "2026-06-26"], [4, 31, 5, "2026-04-21", "2026-05-27"], [4, 12, 3, "2026-01-06", "2026-04-30"], [4, 26, 3, "2026-02-24", "2026-05-07"], [4, 20, 3, "2026-05-04", "2026-06-10"], [4, 23, 2, "2026-02-24", "2026-06-22"], [4, 49, 1, "2026-03-20", "2026-03-20"], [4, 19, 1, "2026-03-11", "2026-03-11"], [5, 3, 579, "2026-03-06", "2026-08-11"], [5, 1, 400, "2026-03-06", "2026-08-11"], [5, 0, 313, "2026-01-09", "2026-08-11"], [5, 4, 297, "2026-01-09", "2026-08-11"], [5, 7, 65, "2026-01-09", "2026-02-09"], [5, 8, 52, "2026-03-06", "2026-08-10"], [5, 2, 27, "2026-05-08", "2026-07-13"], [5, 21, 8, "2026-04-06", "2026-07-28"], [5, 20, 4, "2026-05-11", "2026-07-06"], [5, 26, 3, "2026-01-09", "2026-06-06"], [5, 23, 2, "2026-01-09", "2026-01-09"], [5, 16, 2, "2026-06-28", "2026-06-28"], [5, 15, 1, "2026-06-28", "2026-06-28"], [5, 48, 1, "2026-07-06", "2026-07-06"], [6, 3, 467, "2026-03-07", "2026-06-08"], [6, 0, 450, "2026-01-02", "2026-06-08"], [6, 1, 296, "2026-02-02", "2026-05-30"], [6, 4, 153, "2026-04-04", "2026-05-09"], [6, 9, 44, "2026-03-09", "2026-04-09"], [6, 6, 42, "2026-01-03", "2026-04-09"], [6, 5, 42, "2026-01-02", "2026-04-09"], [6, 7, 40, "2026-01-02", "2026-02-04"], [6, 2, 28, "2026-05-04", "2026-07-01"], [6, 11, 11, "2026-01-13", "2026-08-04"], [6, 20, 7, "2026-02-02", "2026-05-13"], [6, 14, 7, "2026-01-26", "2026-03-19"], [6, 16, 5, "2026-01-08", "2026-04-04"], [6, 12, 5, "2026-04-04", "2026-05-06"], [6, 32, 3, "2026-04-04", "2026-05-09"], [6, 8, 1, "2026-05-06", "2026-05-06"], [6, 25, 1, "2026-04-04", "2026-04-04"], [6, 27, 1, "2026-03-19", "2026-03-19"], [6, 29, 1, "2026-08-04", "2026-08-04"], [6, 28, 1, "2026-04-04", "2026-04-04"], [7, 0, 325, "2026-01-05", "2026-08-11"], [7, 1, 278, "2026-01-05", "2026-08-11"], [7, 2, 198, "2026-04-24", "2026-08-10"], [7, 4, 189, "2026-01-05", "2026-08-08"], [7, 3, 177, "2026-02-26", "2026-08-08"], [7, 6, 89, "2026-01-05", "2026-07-02"], [7, 5, 88, "2026-01-05", "2026-08-10"], [7, 8, 50, "2026-03-02", "2026-08-10"], [7, 9, 22, "2026-02-26", "2026-06-24"], [7, 21, 14, "2026-02-26", "2026-07-17"], [7, 15, 5, "2026-06-03", "2026-07-10"], [7, 26, 4, "2026-02-16", "2026-06-05"], [7, 7, 4, "2026-01-14", "2026-01-29"], [7, 11, 4, "2026-06-17", "2026-06-18"], [7, 24, 4, "2026-05-27", "2026-05-27"], [7, 23, 3, "2026-04-07", "2026-07-06"], [7, 19, 2, "2026-06-24", "2026-06-24"], [7, 14, 2, "2026-06-17", "2026-06-18"], [7, 47, 2, "2026-04-07", "2026-07-06"], [7, 46, 1, "2026-06-18", "2026-06-18"], [7, 20, 1, "2026-07-01", "2026-07-01"], [8, 0, 534, "2026-01-06", "2026-08-11"], [8, 1, 271, "2026-01-06", "2026-08-10"], [8, 3, 197, "2026-02-26", "2026-08-11"], [8, 4, 195, "2026-01-21", "2026-08-11"], [8, 2, 102, "2026-04-02", "2026-08-11"], [8, 16, 36, "2026-01-07", "2026-04-16"], [8, 7, 22, "2026-01-06", "2026-02-25"], [8, 11, 6, "2026-04-06", "2026-04-06"], [8, 18, 4, "2026-02-20", "2026-04-28"], [8, 26, 3, "2026-01-21", "2026-06-19"], [8, 15, 2, "2026-04-02", "2026-05-27"], [8, 33, 2, "2026-04-29", "2026-06-03"], [8, 8, 2, "2026-05-25", "2026-07-20"], [8, 27, 1, "2026-04-06", "2026-04-06"], [8, 14, 1, "2026-04-06", "2026-04-06"], [8, 20, 1, "2026-04-18", "2026-04-18"], [8, 23, 1, "2026-04-02", "2026-04-02"], [9, 1, 196, "2026-01-14", "2026-08-10"], [9, 2, 185, "2026-04-21", "2026-08-10"], [9, 0, 176, "2026-01-11", "2026-08-06"], [9, 4, 134, "2026-01-11", "2026-07-29"], [9, 5, 134, "2026-01-11", "2026-08-10"], [9, 6, 130, "2026-01-05", "2026-07-31"], [9, 3, 129, "2026-03-02", "2026-07-29"], [9, 9, 45, "2026-03-02", "2026-07-31"], [9, 8, 31, "2026-03-12", "2026-08-10"], [9, 10, 22, "2026-02-23", "2026-07-28"], [9, 16, 11, "2026-02-27", "2026-07-11"], [9, 21, 4, "2026-03-14", "2026-07-11"], [9, 7, 3, "2026-02-25", "2026-02-25"], [9, 23, 3, "2026-03-18", "2026-04-09"], [9, 31, 2, "2026-05-04", "2026-05-05"], [9, 11, 2, "2026-07-21", "2026-07-21"], [9, 20, 1, "2026-05-04", "2026-05-04"], [9, 47, 1, "2026-04-09", "2026-04-09"], [9, 26, 1, "2026-03-17", "2026-03-17"], [10, 0, 383, "2026-01-06", "2026-08-11"], [10, 1, 175, "2026-01-08", "2026-08-11"], [10, 2, 115, "2026-04-20", "2026-08-11"], [10, 3, 111, "2026-02-28", "2026-08-11"], [10, 4, 101, "2026-01-08", "2026-07-08"], [10, 8, 34, "2026-02-28", "2026-08-11"], [10, 10, 11, "2026-04-01", "2026-07-24"], [10, 12, 9, "2026-02-13", "2026-02-13"], [10, 26, 4, "2026-04-09", "2026-04-27"], [10, 23, 3, "2026-04-20", "2026-08-11"], [10, 7, 3, "2026-01-08", "2026-01-14"], [10, 20, 2, "2026-04-20", "2026-08-11"], [10, 21, 2, "2026-02-28", "2026-03-10"], [10, 47, 1, "2026-05-13", "2026-05-13"], [11, 2, 279, "2026-03-23", "2026-08-11"], [11, 0, 152, "2026-02-26", "2026-08-10"], [11, 1, 146, "2026-02-12", "2026-08-10"], [11, 3, 113, "2026-02-26", "2026-08-10"], [11, 4, 83, "2026-02-23", "2026-08-10"], [11, 9, 71, "2026-03-18", "2026-07-24"], [11, 8, 37, "2026-02-26", "2026-08-04"], [11, 11, 10, "2026-01-09", "2026-06-25"], [11, 23, 9, "2026-03-17", "2026-08-04"], [11, 12, 6, "2026-04-20", "2026-07-11"], [11, 10, 5, "2026-04-17", "2026-06-24"], [11, 15, 5, "2026-03-23", "2026-08-07"], [11, 14, 5, "2026-01-09", "2026-01-30"], [11, 26, 4, "2026-02-23", "2026-05-04"], [11, 18, 3, "2026-03-23", "2026-07-11"], [11, 31, 2, "2026-05-30", "2026-05-30"], [11, 16, 2, "2026-07-02", "2026-07-02"], [11, 13, 2, "2026-04-20", "2026-07-11"], [11, 28, 1, "2026-03-25", "2026-03-25"], [11, 25, 1, "2026-03-25", "2026-03-25"], [11, 21, 1, "2026-07-13", "2026-07-13"], [11, 27, 1, "2026-01-30", "2026-01-30"], [11, 43, 1, "2026-07-11", "2026-07-11"], [11, 34, 1, "2026-07-11", "2026-07-11"], [11, 17, 1, "2026-04-20", "2026-04-20"], [12, 1, 327, "2026-01-09", "2026-08-06"], [12, 0, 285, "2026-01-09", "2026-08-10"], [12, 3, 203, "2026-02-26", "2026-08-06"], [12, 2, 38, "2026-04-29", "2026-08-10"], [12, 7, 21, "2026-01-09", "2026-02-25"], [12, 8, 7, "2026-04-06", "2026-07-23"], [12, 20, 5, "2026-03-13", "2026-06-29"], [12, 12, 1, "2026-02-07", "2026-02-07"], [12, 52, 1, "2026-02-27", "2026-02-27"], [12, 31, 1, "2026-02-27", "2026-02-27"], [13, 3, 150, "2026-02-27", "2026-08-10"], [13, 1, 138, "2026-01-07", "2026-08-10"], [13, 0, 82, "2026-01-07", "2026-08-10"], [13, 2, 60, "2026-03-05", "2026-08-10"], [13, 7, 54, "2026-01-07", "2026-02-18"], [13, 5, 32, "2026-01-07", "2026-06-05"], [13, 21, 22, "2026-03-05", "2026-08-04"], [13, 10, 19, "2026-01-07", "2026-06-08"], [13, 11, 16, "2026-01-15", "2026-08-10"], [13, 9, 15, "2026-04-06", "2026-04-15"], [13, 4, 13, "2026-02-06", "2026-05-04"], [13, 6, 13, "2026-01-07", "2026-03-05"], [13, 14, 11, "2026-02-05", "2026-08-10"], [13, 18, 6, "2026-01-07", "2026-08-10"], [13, 16, 5, "2026-02-18", "2026-08-04"], [13, 20, 5, "2026-01-07", "2026-04-06"], [13, 25, 4, "2026-01-07", "2026-08-10"], [13, 8, 4, "2026-03-05", "2026-08-04"], [13, 28, 3, "2026-01-07", "2026-04-06"], [13, 27, 3, "2026-01-21", "2026-08-06"], [13, 54, 3, "2026-01-07", "2026-07-14"], [13, 15, 2, "2026-03-05", "2026-08-04"], [13, 13, 2, "2026-04-06", "2026-06-11"], [13, 12, 2, "2026-01-07", "2026-01-07"], [13, 30, 1, "2026-01-18", "2026-01-18"], [13, 62, 1, "2026-08-04", "2026-08-04"], [13, 29, 1, "2026-08-10", "2026-08-10"], [13, 46, 1, "2026-08-10", "2026-08-10"], [13, 44, 1, "2026-04-06", "2026-04-06"], [13, 31, 1, "2026-05-12", "2026-05-12"], [13, 42, 1, "2026-04-06", "2026-04-06"], [14, 0, 312, "2026-01-01", "2026-07-10"], [14, 6, 97, "2026-01-06", "2026-05-21"], [14, 5, 69, "2026-01-08", "2026-03-30"], [14, 1, 31, "2026-01-09", "2026-03-30"], [14, 2, 27, "2026-04-22", "2026-07-10"], [14, 7, 23, "2026-01-12", "2026-02-20"], [14, 4, 20, "2026-01-27", "2026-04-14"], [14, 3, 20, "2026-03-02", "2026-04-14"], [14, 16, 18, "2026-01-01", "2026-05-07"], [14, 9, 15, "2026-03-04", "2026-05-21"], [14, 10, 12, "2026-01-26", "2026-02-11"], [14, 11, 8, "2026-01-01", "2026-05-05"], [14, 23, 2, "2026-01-03", "2026-01-09"], [14, 19, 2, "2026-03-30", "2026-03-30"], [14, 20, 1, "2026-02-17", "2026-02-17"], [14, 8, 1, "2026-03-05", "2026-03-05"], [14, 27, 1, "2026-06-01", "2026-06-01"], [15, 6, 111, "2026-02-08", "2026-08-11"], [15, 1, 97, "2026-02-25", "2026-08-10"], [15, 0, 90, "2026-02-26", "2026-08-04"], [15, 2, 67, "2026-02-27", "2026-08-10"], [15, 5, 62, "2026-02-08", "2026-08-10"], [15, 3, 58, "2026-02-26", "2026-08-10"], [15, 9, 51, "2026-02-26", "2026-08-11"], [15, 4, 43, "2026-05-02", "2026-08-10"], [15, 8, 28, "2026-02-25", "2026-08-10"], [15, 10, 9, "2026-05-05", "2026-08-07"], [15, 21, 7, "2026-03-30", "2026-08-10"], [15, 11, 6, "2026-03-12", "2026-07-26"], [15, 13, 3, "2026-03-12", "2026-04-07"], [15, 44, 2, "2026-03-12", "2026-03-31"], [15, 23, 2, "2026-02-26", "2026-05-12"], [15, 25, 1, "2026-03-12", "2026-03-12"], [15, 28, 1, "2026-03-12", "2026-03-12"], [15, 20, 1, "2026-05-13", "2026-05-13"], [15, 15, 1, "2026-02-27", "2026-02-27"], [15, 34, 1, "2026-03-12", "2026-03-12"], [15, 30, 1, "2026-03-23", "2026-03-23"], [16, 0, 137, "2026-01-05", "2026-08-10"], [16, 1, 113, "2026-01-29", "2026-08-10"], [16, 5, 109, "2026-01-29", "2026-08-10"], [16, 6, 105, "2026-01-02", "2026-08-11"], [16, 9, 40, "2026-02-25", "2026-08-11"], [16, 4, 37, "2026-02-16", "2026-04-27"], [16, 10, 33, "2026-01-29", "2026-06-16"], [16, 2, 23, "2026-04-27", "2026-08-10"], [16, 3, 14, "2026-03-31", "2026-08-10"], [16, 19, 10, "2026-05-12", "2026-05-12"], [16, 21, 7, "2026-03-31", "2026-05-12"], [16, 20, 3, "2026-04-27", "2026-07-08"], [16, 11, 2, "2026-04-10", "2026-04-10"], [16, 8, 1, "2026-03-31", "2026-03-31"], [16, 23, 1, "2026-04-27", "2026-04-27"], [16, 48, 1, "2026-02-25", "2026-02-25"], [16, 26, 1, "2026-03-31", "2026-03-31"], [16, 15, 1, "2026-07-08", "2026-07-08"], [17, 0, 178, "2026-01-03", "2026-08-06"], [17, 3, 114, "2026-03-04", "2026-08-06"], [17, 1, 85, "2026-01-03", "2026-08-06"], [17, 4, 61, "2026-02-04", "2026-08-06"], [17, 7, 42, "2026-01-03", "2026-02-10"], [17, 2, 40, "2026-03-04", "2026-08-10"], [17, 39, 23, "2026-03-04", "2026-03-04"], [17, 16, 12, "2026-03-04", "2026-08-11"], [17, 11, 9, "2026-02-14", "2026-08-06"], [17, 15, 6, "2026-03-04", "2026-05-02"], [17, 14, 5, "2026-02-14", "2026-03-07"], [17, 26, 5, "2026-02-04", "2026-06-03"], [17, 8, 3, "2026-05-02", "2026-07-01"], [17, 9, 3, "2026-08-04", "2026-08-04"], [17, 10, 2, "2026-08-04", "2026-08-05"], [17, 50, 2, "2026-04-07", "2026-04-07"], [17, 25, 2, "2026-04-04", "2026-05-15"], [17, 28, 2, "2026-04-04", "2026-05-15"], [17, 27, 1, "2026-03-07", "2026-03-07"], [17, 42, 1, "2026-04-04", "2026-04-04"], [17, 29, 1, "2026-08-06", "2026-08-06"], [17, 21, 1, "2026-04-14", "2026-04-14"], [17, 12, 1, "2026-08-04", "2026-08-04"], [17, 44, 1, "2026-04-04", "2026-04-04"], [17, 17, 1, "2026-04-04", "2026-04-04"], [17, 13, 1, "2026-04-04", "2026-04-04"], [18, 0, 175, "2026-01-14", "2026-06-24"], [18, 1, 112, "2026-01-14", "2026-06-24"], [18, 4, 68, "2026-01-15", "2026-06-24"], [18, 3, 67, "2026-02-26", "2026-06-24"], [18, 2, 62, "2026-04-22", "2026-07-16"], [18, 8, 26, "2026-02-26", "2026-06-18"], [18, 7, 10, "2026-01-14", "2026-02-24"], [18, 14, 5, "2026-06-23", "2026-07-14"], [18, 11, 3, "2026-06-22", "2026-06-23"], [18, 20, 2, "2026-03-06", "2026-05-11"], [18, 27, 1, "2026-07-14", "2026-07-14"], [18, 23, 1, "2026-02-24", "2026-02-24"], [18, 47, 1, "2026-03-04", "2026-03-04"], [19, 2, 144, "2026-02-27", "2026-07-30"], [19, 1, 71, "2026-01-30", "2026-07-16"], [19, 15, 34, "2026-02-27", "2026-07-23"], [19, 40, 30, "2026-02-27", "2026-02-27"], [19, 19, 27, "2026-02-27", "2026-07-16"], [19, 5, 24, "2026-01-30", "2026-06-15"], [19, 37, 15, "2026-06-26", "2026-07-16"], [19, 36, 15, "2026-05-28", "2026-07-16"], [19, 3, 14, "2026-02-25", "2026-06-12"], [19, 0, 14, "2026-01-30", "2026-07-16"], [19, 7, 14, "2026-01-06", "2026-02-10"], [19, 16, 11, "2026-01-06", "2026-05-14"], [19, 4, 11, "2026-01-30", "2026-06-15"], [19, 50, 10, "2026-02-27", "2026-02-27"], [19, 13, 10, "2026-02-25", "2026-07-16"], [19, 45, 9, "2026-05-28", "2026-07-16"], [19, 32, 7, "2026-02-11", "2026-06-15"], [19, 18, 6, "2026-01-23", "2026-07-23"], [19, 58, 6, "2026-04-15", "2026-04-15"], [19, 23, 5, "2026-01-30", "2026-06-12"], [19, 42, 5, "2026-03-31", "2026-06-03"], [19, 39, 5, "2026-02-27", "2026-02-27"], [19, 10, 4, "2026-01-30", "2026-03-31"], [19, 59, 4, "2026-04-15", "2026-04-15"], [19, 44, 4, "2026-02-25", "2026-07-16"], [19, 57, 3, "2026-02-25", "2026-03-24"], [19, 6, 3, "2026-01-30", "2026-05-05"], [19, 34, 2, "2026-02-25", "2026-02-25"], [19, 60, 2, "2026-02-25", "2026-03-24"], [19, 53, 2, "2026-03-31", "2026-03-31"], [19, 31, 2, "2026-04-15", "2026-04-15"], [19, 41, 2, "2026-04-15", "2026-04-15"], [19, 48, 1, "2026-02-11", "2026-02-11"], [19, 54, 1, "2026-01-07", "2026-01-07"], [19, 21, 1, "2026-05-05", "2026-05-05"], [19, 8, 1, "2026-02-27", "2026-02-27"], [19, 62, 1, "2026-02-27", "2026-02-27"], [19, 38, 1, "2026-02-27", "2026-02-27"], [19, 24, 1, "2026-05-05", "2026-05-05"], [19, 35, 1, "2026-03-31", "2026-03-31"], [19, 43, 1, "2026-02-25", "2026-02-25"], [19, 47, 1, "2026-06-12", "2026-06-12"], [19, 33, 1, "2026-02-27", "2026-02-27"], [20, 0, 180, "2026-01-05", "2026-08-03"], [20, 1, 143, "2026-01-05", "2026-08-03"], [20, 3, 49, "2026-03-12", "2026-08-03"], [20, 2, 48, "2026-04-29", "2026-08-03"], [20, 8, 24, "2026-02-26", "2026-07-07"], [20, 7, 10, "2026-01-13", "2026-02-24"], [20, 23, 5, "2026-03-12", "2026-06-12"], [20, 5, 5, "2026-01-05", "2026-02-24"], [20, 6, 5, "2026-01-12", "2026-01-12"], [20, 11, 3, "2026-01-19", "2026-02-07"], [20, 21, 3, "2026-02-26", "2026-07-23"], [20, 14, 3, "2026-01-19", "2026-02-01"], [20, 20, 2, "2026-02-24", "2026-05-05"], [20, 12, 1, "2026-07-28", "2026-07-28"], [20, 4, 1, "2026-07-29", "2026-07-29"], [20, 28, 1, "2026-01-05", "2026-01-05"], [20, 47, 1, "2026-03-12", "2026-03-12"], [20, 30, 1, "2026-01-16", "2026-01-16"], [20, 25, 1, "2026-01-05", "2026-01-05"], [20, 17, 1, "2026-01-05", "2026-01-05"], [20, 10, 1, "2026-07-17", "2026-07-17"], [20, 22, 1, "2026-01-05", "2026-01-05"], [20, 16, 1, "2026-05-13", "2026-05-13"], [21, 3, 109, "2026-03-13", "2026-08-06"], [21, 0, 66, "2026-03-09", "2026-08-03"], [21, 2, 56, "2026-03-31", "2026-08-06"], [21, 1, 51, "2026-03-09", "2026-08-06"], [21, 5, 37, "2026-03-09", "2026-07-22"], [21, 4, 30, "2026-03-15", "2026-07-27"], [21, 41, 16, "2026-06-22", "2026-08-05"], [21, 10, 15, "2026-03-13", "2026-07-09"], [21, 19, 12, "2026-03-09", "2026-07-08"], [21, 11, 11, "2026-03-15", "2026-07-11"], [21, 49, 11, "2026-07-08", "2026-08-06"], [21, 6, 10, "2026-03-16", "2026-07-23"], [21, 8, 9, "2026-03-13", "2026-04-14"], [21, 21, 8, "2026-03-15", "2026-05-11"], [21, 14, 6, "2026-04-29", "2026-07-07"], [21, 18, 4, "2026-03-31", "2026-06-22"], [21, 15, 4, "2026-03-31", "2026-08-05"], [21, 13, 2, "2026-03-13", "2026-03-31"], [21, 9, 2, "2026-07-09", "2026-07-09"], [21, 34, 2, "2026-03-16", "2026-03-16"], [21, 23, 2, "2026-04-24", "2026-07-27"], [21, 43, 1, "2026-03-16", "2026-03-16"], [21, 31, 1, "2026-05-27", "2026-05-27"], [21, 25, 1, "2026-03-15", "2026-03-15"], [21, 16, 1, "2026-05-07", "2026-05-07"], [21, 60, 1, "2026-05-27", "2026-05-27"], [21, 61, 1, "2026-07-03", "2026-07-03"], [21, 68, 1, "2026-08-05", "2026-08-05"], [21, 57, 1, "2026-05-27", "2026-05-27"], [21, 30, 1, "2026-03-26", "2026-03-26"], [21, 28, 1, "2026-03-15", "2026-03-15"], [21, 47, 1, "2026-07-27", "2026-07-27"], [21, 12, 1, "2026-07-27", "2026-07-27"], [21, 26, 1, "2026-03-15", "2026-03-15"], [22, 2, 239, "2026-03-10", "2026-08-10"], [22, 3, 45, "2026-03-04", "2026-08-10"], [22, 0, 40, "2026-02-06", "2026-08-10"], [22, 1, 30, "2026-02-06", "2026-08-10"], [22, 18, 22, "2026-01-15", "2026-08-02"], [22, 15, 19, "2026-03-10", "2026-06-26"], [22, 4, 18, "2026-02-06", "2026-08-10"], [22, 7, 15, "2026-02-06", "2026-02-12"], [22, 5, 9, "2026-02-06", "2026-07-31"], [22, 6, 5, "2026-02-06", "2026-05-04"], [22, 9, 4, "2026-05-04", "2026-07-31"], [22, 12, 4, "2026-01-19", "2026-07-28"], [22, 10, 4, "2026-02-06", "2026-07-14"], [22, 59, 3, "2026-04-23", "2026-04-24"], [22, 20, 3, "2026-02-12", "2026-07-27"], [22, 31, 3, "2026-03-23", "2026-04-24"], [22, 8, 3, "2026-05-04", "2026-07-08"], [22, 52, 2, "2026-03-23", "2026-03-23"], [22, 65, 2, "2026-04-23", "2026-04-23"], [22, 23, 2, "2026-06-11", "2026-07-01"], [22, 47, 1, "2026-07-04", "2026-07-04"], [22, 17, 1, "2026-02-06", "2026-02-06"], [22, 62, 1, "2026-03-26", "2026-03-26"], [22, 57, 1, "2026-03-03", "2026-03-03"], [23, 2, 138, "2026-05-28", "2026-08-10"], [23, 1, 79, "2026-03-04", "2026-07-13"], [23, 3, 60, "2026-05-28", "2026-07-24"], [23, 6, 37, "2026-05-29", "2026-08-05"], [23, 5, 30, "2026-05-29", "2026-07-20"], [23, 12, 21, "2026-03-18", "2026-06-29"], [23, 4, 19, "2026-05-28", "2026-07-24"], [23, 11, 13, "2026-03-02", "2026-07-28"], [23, 0, 13, "2026-05-28", "2026-08-03"], [23, 10, 8, "2026-05-28", "2026-08-03"], [23, 13, 6, "2026-03-02", "2026-05-28"], [23, 8, 5, "2026-03-02", "2026-06-03"], [23, 14, 5, "2026-06-28", "2026-08-07"], [23, 18, 3, "2026-05-28", "2026-07-01"], [23, 20, 3, "2026-03-09", "2026-06-04"], [23, 34, 2, "2026-03-02", "2026-03-16"], [23, 42, 2, "2026-05-28", "2026-05-28"], [23, 9, 2, "2026-06-01", "2026-06-01"], [23, 28, 2, "2026-03-02", "2026-05-28"], [23, 25, 2, "2026-03-02", "2026-05-28"], [23, 16, 2, "2026-06-10", "2026-07-13"], [23, 44, 1, "2026-03-02", "2026-03-02"], [23, 15, 1, "2026-05-28", "2026-05-28"], [23, 27, 1, "2026-04-16", "2026-04-16"], [23, 46, 1, "2026-06-30", "2026-06-30"], [23, 30, 1, "2026-03-13", "2026-03-13"], [23, 31, 1, "2026-05-28", "2026-05-28"], [23, 17, 1, "2026-03-02", "2026-03-02"], [23, 43, 1, "2026-03-16", "2026-03-16"], [23, 21, 1, "2026-07-01", "2026-07-01"], [23, 22, 1, "2026-03-02", "2026-03-02"], [23, 26, 1, "2026-06-01", "2026-06-01"], [24, 0, 145, "2026-01-02", "2026-08-11"], [24, 1, 113, "2026-02-26", "2026-08-11"], [24, 5, 111, "2026-01-02", "2026-08-11"], [24, 2, 38, "2026-04-22", "2026-07-27"], [24, 11, 12, "2026-01-01", "2026-08-01"], [24, 20, 7, "2026-01-29", "2026-07-23"], [24, 29, 3, "2026-08-01", "2026-08-01"], [24, 10, 2, "2026-02-16", "2026-03-11"], [24, 8, 2, "2026-06-21", "2026-07-13"], [25, 0, 154, "2026-01-05", "2026-07-30"], [25, 1, 54, "2026-01-06", "2026-07-29"], [25, 2, 51, "2026-03-31", "2026-07-30"], [25, 4, 42, "2026-01-05", "2026-07-29"], [25, 3, 34, "2026-03-31", "2026-07-29"], [25, 14, 8, "2026-02-04", "2026-03-31"], [25, 8, 7, "2026-03-31", "2026-07-06"], [25, 11, 6, "2026-01-04", "2026-04-01"], [25, 18, 6, "2026-01-05", "2026-06-18"], [25, 7, 5, "2026-01-22", "2026-02-16"], [25, 16, 3, "2026-04-06", "2026-05-20"], [25, 31, 2, "2026-06-18", "2026-06-18"], [25, 15, 2, "2026-03-31", "2026-06-18"], [25, 27, 1, "2026-02-25", "2026-02-25"], [25, 20, 1, "2026-04-06", "2026-04-06"], [25, 13, 1, "2026-03-31", "2026-03-31"], [26, 2, 109, "2026-04-22", "2026-08-05"], [26, 0, 54, "2026-01-05", "2026-07-05"], [26, 4, 40, "2026-01-04", "2026-08-05"], [26, 1, 37, "2026-03-04", "2026-07-28"], [26, 5, 35, "2026-01-05", "2026-07-28"], [26, 3, 28, "2026-02-27", "2026-08-05"], [26, 10, 20, "2026-01-05", "2026-07-28"], [26, 9, 11, "2026-03-04", "2026-07-28"], [26, 6, 9, "2026-02-08", "2026-06-08"], [26, 11, 9, "2026-01-11", "2026-08-11"], [26, 26, 1, "2026-01-07", "2026-01-07"], [27, 0, 85, "2026-01-06", "2026-08-04"], [27, 1, 81, "2026-01-06", "2026-08-04"], [27, 3, 53, "2026-03-02", "2026-08-04"], [27, 2, 47, "2026-04-29", "2026-08-06"], [27, 4, 17, "2026-01-06", "2026-05-22"], [27, 6, 11, "2026-01-06", "2026-03-10"], [27, 7, 11, "2026-01-06", "2026-02-18"], [27, 5, 11, "2026-01-06", "2026-03-10"], [27, 16, 8, "2026-03-10", "2026-08-06"], [27, 10, 4, "2026-01-08", "2026-06-09"], [27, 20, 3, "2026-01-08", "2026-03-13"], [27, 33, 3, "2026-03-10", "2026-04-22"], [27, 8, 3, "2026-02-26", "2026-04-29"], [27, 11, 2, "2026-03-07", "2026-03-07"], [27, 9, 2, "2026-03-10", "2026-03-11"], [27, 44, 1, "2026-04-29", "2026-04-29"], [27, 42, 1, "2026-04-29", "2026-04-29"], [27, 18, 1, "2026-01-08", "2026-01-08"], [27, 21, 1, "2026-04-29", "2026-04-29"], [27, 13, 1, "2026-04-29", "2026-04-29"], [28, 3, 67, "2026-03-10", "2026-07-10"], [28, 0, 60, "2026-01-15", "2026-07-30"], [28, 1, 56, "2026-01-15", "2026-07-30"], [28, 2, 50, "2026-04-22", "2026-08-05"], [28, 4, 25, "2026-02-03", "2026-07-10"], [28, 7, 21, "2026-01-15", "2026-02-10"], [28, 16, 10, "2026-06-05", "2026-08-04"], [28, 5, 8, "2026-02-25", "2026-07-27"], [28, 6, 8, "2026-03-13", "2026-07-11"], [28, 12, 7, "2026-02-03", "2026-02-13"], [28, 10, 5, "2026-01-15", "2026-05-14"], [28, 20, 5, "2026-02-03", "2026-07-10"], [28, 8, 4, "2026-04-30", "2026-07-03"], [28, 49, 3, "2026-02-04", "2026-07-10"], [28, 18, 2, "2026-01-15", "2026-02-04"], [28, 56, 2, "2026-01-13", "2026-02-04"], [28, 11, 2, "2026-02-03", "2026-02-17"], [28, 31, 1, "2026-06-22", "2026-06-22"], [28, 22, 1, "2026-01-15", "2026-01-15"], [28, 17, 1, "2026-01-15", "2026-01-15"], [28, 28, 1, "2026-02-03", "2026-02-03"], [28, 23, 1, "2026-04-03", "2026-04-03"], [28, 25, 1, "2026-02-03", "2026-02-03"], [28, 26, 1, "2026-02-03", "2026-02-03"], [28, 30, 1, "2026-02-14", "2026-02-14"], [28, 9, 1, "2026-07-10", "2026-07-10"], [29, 0, 123, "2026-01-05", "2026-08-03"], [29, 1, 62, "2026-01-05", "2026-08-03"], [29, 3, 46, "2026-03-02", "2026-07-06"], [29, 2, 38, "2026-04-21", "2026-08-03"], [29, 7, 26, "2026-01-05", "2026-02-23"], [29, 10, 23, "2026-01-05", "2026-08-03"], [29, 11, 11, "2026-01-16", "2026-07-16"], [29, 16, 2, "2026-01-09", "2026-01-09"], [29, 14, 1, "2026-03-16", "2026-03-16"], [29, 18, 1, "2026-01-09", "2026-01-09"], [30, 2, 47, "2026-05-11", "2026-08-11"], [30, 1, 42, "2026-02-26", "2026-08-10"], [30, 6, 33, "2026-01-09", "2026-08-11"], [30, 3, 32, "2026-02-26", "2026-08-10"], [30, 5, 32, "2026-01-09", "2026-08-10"], [30, 4, 32, "2026-01-09", "2026-08-10"], [30, 0, 28, "2026-01-09", "2026-08-10"], [30, 9, 20, "2026-02-26", "2026-08-11"], [30, 10, 15, "2026-01-09", "2026-08-10"], [30, 20, 10, "2026-01-05", "2026-08-10"], [30, 11, 8, "2026-01-07", "2026-06-23"], [30, 14, 5, "2026-02-07", "2026-02-28"], [30, 8, 2, "2026-05-11", "2026-05-21"], [30, 13, 2, "2026-06-23", "2026-06-23"], [30, 12, 1, "2026-03-10", "2026-03-10"], [30, 28, 1, "2026-03-10", "2026-03-10"], [30, 18, 1, "2026-03-10", "2026-03-10"], [30, 25, 1, "2026-03-10", "2026-03-10"], [30, 27, 1, "2026-02-28", "2026-02-28"], [30, 7, 1, "2026-02-10", "2026-02-10"], [31, 0, 77, "2026-01-12", "2026-08-05"], [31, 3, 66, "2026-03-01", "2026-08-05"], [31, 1, 65, "2026-01-12", "2026-08-05"], [31, 4, 38, "2026-01-12", "2026-08-05"], [31, 7, 19, "2026-01-12", "2026-02-11"], [31, 2, 10, "2026-05-10", "2026-08-05"], [31, 11, 6, "2026-01-26", "2026-07-26"], [31, 9, 6, "2026-05-10", "2026-05-10"], [31, 16, 3, "2026-01-12", "2026-05-10"], [31, 18, 3, "2026-01-12", "2026-01-23"], [31, 13, 3, "2026-03-01", "2026-05-10"], [31, 26, 2, "2026-01-12", "2026-03-01"], [31, 10, 2, "2026-01-12", "2026-03-01"], [31, 20, 2, "2026-01-12", "2026-03-01"], [31, 21, 2, "2026-03-01", "2026-03-01"], [31, 17, 1, "2026-01-12", "2026-01-12"], [31, 25, 1, "2026-01-12", "2026-01-12"], [31, 30, 1, "2026-01-23", "2026-01-23"], [31, 15, 1, "2026-05-10", "2026-05-10"], [31, 5, 1, "2026-01-12", "2026-01-12"], [31, 28, 1, "2026-01-12", "2026-01-12"], [31, 22, 1, "2026-01-12", "2026-01-12"], [31, 34, 1, "2026-05-10", "2026-05-10"], [31, 42, 1, "2026-05-10", "2026-05-10"], [32, 2, 101, "2026-04-30", "2026-08-11"], [32, 3, 57, "2026-03-05", "2026-08-06"], [32, 4, 42, "2026-06-15", "2026-08-06"], [32, 1, 32, "2026-01-10", "2026-08-07"], [32, 0, 29, "2026-01-08", "2026-08-07"], [32, 12, 13, "2026-06-15", "2026-08-03"], [32, 15, 8, "2026-06-15", "2026-06-15"], [32, 26, 6, "2026-06-15", "2026-06-28"], [32, 18, 4, "2026-06-15", "2026-06-15"], [32, 8, 3, "2026-06-28", "2026-08-04"], [32, 29, 3, "2026-08-03", "2026-08-03"], [32, 11, 3, "2026-06-22", "2026-08-03"], [32, 25, 2, "2026-06-15", "2026-08-03"], [32, 21, 2, "2026-06-28", "2026-08-03"], [32, 7, 2, "2026-01-08", "2026-01-08"], [32, 28, 1, "2026-06-15", "2026-06-15"], [32, 27, 1, "2026-06-29", "2026-06-29"], [32, 30, 1, "2026-06-26", "2026-06-26"], [33, 0, 114, "2026-01-05", "2026-08-04"], [33, 1, 45, "2026-01-15", "2026-07-12"], [33, 3, 43, "2026-02-25", "2026-08-04"], [33, 4, 35, "2026-01-08", "2026-08-04"], [33, 2, 33, "2026-05-08", "2026-08-04"], [33, 10, 10, "2026-01-22", "2026-07-22"], [33, 11, 7, "2026-01-26", "2026-06-20"], [33, 14, 7, "2026-04-27", "2026-06-19"], [33, 7, 4, "2026-01-26", "2026-02-11"], [33, 47, 1, "2026-03-28", "2026-03-28"], [33, 5, 1, "2026-06-03", "2026-06-03"], [33, 8, 1, "2026-07-02", "2026-07-02"], [33, 23, 1, "2026-03-28", "2026-03-28"], [33, 27, 1, "2026-05-18", "2026-05-18"], [33, 46, 1, "2026-06-12", "2026-06-12"], [34, 3, 85, "2026-03-02", "2026-08-07"], [34, 1, 68, "2026-02-06", "2026-08-07"], [34, 0, 59, "2026-01-30", "2026-08-07"], [34, 4, 38, "2026-02-17", "2026-08-07"], [34, 2, 17, "2026-05-01", "2026-08-07"], [34, 7, 13, "2026-01-30", "2026-02-18"], [34, 20, 5, "2026-02-18", "2026-07-13"], [34, 8, 4, "2026-04-02", "2026-07-13"], [34, 19, 2, "2026-04-02", "2026-04-02"], [34, 26, 2, "2026-02-17", "2026-08-07"], [34, 21, 2, "2026-07-20", "2026-07-20"], [34, 48, 1, "2026-03-23", "2026-03-23"], [34, 13, 1, "2026-08-07", "2026-08-07"], [34, 10, 1, "2026-02-18", "2026-02-18"], [34, 34, 1, "2026-05-13", "2026-05-13"], [34, 5, 1, "2026-02-18", "2026-02-18"], [35, 0, 174, "2026-01-09", "2026-08-03"], [35, 1, 36, "2026-01-09", "2026-08-03"], [35, 2, 34, "2026-04-21", "2026-08-10"], [35, 10, 20, "2026-02-03", "2026-06-19"], [35, 3, 17, "2026-03-11", "2026-07-01"], [35, 11, 8, "2026-01-17", "2026-07-17"], [35, 63, 2, "2026-01-31", "2026-01-31"], [35, 8, 1, "2026-03-30", "2026-03-30"], [35, 7, 1, "2026-01-16", "2026-01-16"], [35, 13, 1, "2026-06-30", "2026-06-30"], [36, 0, 77, "2026-01-05", "2026-07-13"], [36, 2, 55, "2026-05-02", "2026-08-11"], [36, 1, 53, "2026-01-05", "2026-06-19"], [36, 3, 39, "2026-03-05", "2026-06-19"], [36, 7, 22, "2026-01-05", "2026-02-21"], [36, 9, 11, "2026-04-05", "2026-06-04"], [36, 11, 7, "2026-01-26", "2026-07-26"], [36, 19, 5, "2026-03-06", "2026-05-31"], [36, 20, 4, "2026-04-05", "2026-06-19"], [36, 21, 3, "2026-04-02", "2026-04-03"], [36, 4, 3, "2026-01-05", "2026-02-04"], [36, 8, 2, "2026-03-04", "2026-04-03"], [36, 13, 1, "2026-06-18", "2026-06-18"], [36, 16, 1, "2026-06-01", "2026-06-01"], [36, 67, 1, "2026-08-11", "2026-08-11"], [36, 69, 1, "2026-08-11", "2026-08-11"], [37, 0, 87, "2026-01-13", "2026-08-11"], [37, 1, 80, "2026-01-13", "2026-08-11"], [37, 3, 29, "2026-03-05", "2026-08-11"], [37, 2, 24, "2026-04-25", "2026-07-28"], [37, 5, 23, "2026-01-13", "2026-08-10"], [37, 6, 15, "2026-01-25", "2026-08-11"], [37, 8, 7, "2026-03-03", "2026-08-11"], [37, 9, 7, "2026-03-05", "2026-08-11"], [37, 4, 5, "2026-04-26", "2026-04-26"], [37, 20, 3, "2026-03-05", "2026-05-05"], [37, 31, 2, "2026-06-02", "2026-06-25"], [37, 48, 1, "2026-04-01", "2026-04-01"], [37, 26, 1, "2026-04-26", "2026-04-26"], [38, 0, 83, "2026-01-24", "2026-08-10"], [38, 2, 78, "2026-05-04", "2026-08-11"], [38, 3, 28, "2026-03-03", "2026-07-29"], [38, 1, 24, "2026-01-24", "2026-08-10"], [38, 5, 19, "2026-01-24", "2026-08-10"], [38, 4, 11, "2026-03-03", "2026-07-29"], [38, 6, 6, "2026-01-28", "2026-06-16"], [38, 18, 5, "2026-01-24", "2026-07-29"], [38, 10, 5, "2026-01-25", "2026-07-21"], [38, 9, 5, "2026-05-13", "2026-07-21"], [38, 8, 3, "2026-03-23", "2026-06-08"], [38, 26, 2, "2026-05-21", "2026-06-29"], [38, 15, 2, "2026-05-29", "2026-07-29"], [38, 7, 2, "2026-01-24", "2026-01-24"], [38, 31, 1, "2026-05-12", "2026-05-12"], [38, 49, 1, "2026-07-17", "2026-07-17"], [38, 20, 1, "2026-05-10", "2026-05-10"], [38, 25, 1, "2026-01-24", "2026-01-24"], [38, 11, 1, "2026-01-24", "2026-01-24"], [38, 21, 1, "2026-05-22", "2026-05-22"], [38, 17, 1, "2026-01-24", "2026-01-24"], [38, 28, 1, "2026-01-24", "2026-01-24"], [38, 30, 1, "2026-02-04", "2026-02-04"], [38, 13, 1, "2026-06-16", "2026-06-16"], [39, 2, 158, "2026-05-05", "2026-07-30"], [39, 15, 31, "2026-05-07", "2026-07-17"], [39, 1, 9, "2026-05-07", "2026-05-07"], [39, 36, 8, "2026-05-07", "2026-05-07"], [39, 3, 8, "2026-05-07", "2026-06-08"], [39, 18, 7, "2026-05-07", "2026-07-17"], [39, 5, 7, "2026-05-07", "2026-05-07"], [39, 61, 6, "2026-05-13", "2026-06-03"], [39, 33, 5, "2026-05-05", "2026-05-05"], [39, 4, 4, "2026-05-07", "2026-05-07"], [39, 41, 4, "2026-05-13", "2026-05-13"], [39, 19, 4, "2026-05-19", "2026-06-12"], [39, 50, 3, "2026-05-13", "2026-06-12"], [39, 45, 3, "2026-05-07", "2026-05-07"], [39, 23, 3, "2026-05-07", "2026-06-08"], [39, 8, 3, "2026-05-05", "2026-05-05"], [39, 53, 3, "2026-05-05", "2026-05-05"], [39, 9, 2, "2026-06-05", "2026-06-05"], [39, 12, 2, "2026-06-12", "2026-06-12"], [39, 13, 2, "2026-05-05", "2026-05-05"], [39, 59, 1, "2026-06-30", "2026-06-30"], [39, 57, 1, "2026-05-13", "2026-05-13"], [39, 17, 1, "2026-05-05", "2026-05-05"], [39, 34, 1, "2026-05-05", "2026-05-05"], [39, 58, 1, "2026-07-28", "2026-07-28"], [39, 22, 1, "2026-05-05", "2026-05-05"], [39, 38, 1, "2026-06-05", "2026-06-05"], [39, 60, 1, "2026-05-13", "2026-05-13"], [40, 2, 110, "2026-03-09", "2026-07-31"], [40, 1, 24, "2026-01-14", "2026-07-30"], [40, 35, 11, "2026-04-21", "2026-07-30"], [40, 3, 10, "2026-03-09", "2026-06-03"], [40, 31, 9, "2026-04-16", "2026-05-08"], [40, 36, 9, "2026-04-27", "2026-05-12"], [40, 10, 8, "2026-03-18", "2026-07-30"], [40, 5, 8, "2026-03-09", "2026-06-03"], [40, 55, 7, "2026-04-15", "2026-05-08"], [40, 15, 7, "2026-03-09", "2026-06-03"], [40, 33, 6, "2026-03-09", "2026-06-03"], [40, 0, 6, "2026-03-09", "2026-06-03"], [40, 21, 6, "2026-03-09", "2026-04-30"], [40, 16, 5, "2026-04-27", "2026-04-27"], [40, 39, 5, "2026-03-09", "2026-03-10"], [40, 66, 4, "2026-04-16", "2026-04-23"], [40, 4, 4, "2026-03-09", "2026-06-03"], [40, 45, 4, "2026-04-27", "2026-05-12"], [40, 13, 3, "2026-04-27", "2026-04-30"], [40, 8, 3, "2026-03-09", "2026-06-03"], [40, 41, 3, "2026-04-16", "2026-04-23"], [40, 18, 2, "2026-04-30", "2026-04-30"], [40, 58, 2, "2026-04-16", "2026-04-23"], [40, 71, 2, "2026-04-16", "2026-04-16"], [40, 65, 2, "2026-04-16", "2026-04-23"], [40, 19, 2, "2026-04-30", "2026-04-30"], [40, 64, 1, "2026-04-20", "2026-04-20"], [40, 59, 1, "2026-04-23", "2026-04-23"], [40, 62, 1, "2026-06-03", "2026-06-03"], [40, 38, 1, "2026-03-09", "2026-03-09"], [40, 12, 1, "2026-04-30", "2026-04-30"], [40, 54, 1, "2026-03-09", "2026-03-09"], [40, 73, 1, "2026-04-16", "2026-04-16"], [40, 68, 1, "2026-04-16", "2026-04-16"], [40, 53, 1, "2026-04-21", "2026-04-21"], [40, 60, 1, "2026-03-24", "2026-03-24"], [40, 23, 1, "2026-06-03", "2026-06-03"], [40, 57, 1, "2026-03-24", "2026-03-24"], [41, 0, 77, "2026-01-06", "2026-08-10"], [41, 4, 55, "2026-03-05", "2026-06-22"], [41, 1, 52, "2026-01-14", "2026-08-10"], [41, 3, 33, "2026-03-03", "2026-08-10"], [41, 32, 11, "2026-03-05", "2026-06-22"], [41, 11, 11, "2026-01-26", "2026-07-26"], [41, 7, 8, "2026-01-06", "2026-02-18"], [41, 15, 5, "2026-03-05", "2026-05-25"], [41, 2, 5, "2026-03-05", "2026-05-25"], [41, 5, 5, "2026-05-11", "2026-06-22"], [41, 19, 2, "2026-05-13", "2026-05-13"], [41, 14, 2, "2026-02-26", "2026-03-26"], [41, 6, 2, "2026-01-05", "2026-06-18"], [41, 20, 1, "2026-05-20", "2026-05-20"], [42, 1, 80, "2026-01-10", "2026-07-29"], [42, 0, 75, "2026-01-10", "2026-08-05"], [42, 2, 39, "2026-04-21", "2026-08-05"], [42, 10, 32, "2026-01-10", "2026-07-03"], [42, 12, 18, "2026-04-02", "2026-04-02"], [42, 8, 9, "2026-02-28", "2026-07-03"], [42, 11, 8, "2026-01-17", "2026-07-17"], [42, 3, 4, "2026-03-09", "2026-05-06"], [42, 7, 1, "2026-02-17", "2026-02-17"], [43, 1, 118, "2026-01-19", "2026-08-11"], [43, 0, 78, "2026-01-19", "2026-08-11"], [43, 2, 39, "2026-04-22", "2026-08-11"], [43, 11, 8, "2026-01-14", "2026-07-14"], [43, 5, 6, "2026-02-16", "2026-07-14"], [43, 3, 3, "2026-03-09", "2026-06-15"], [43, 10, 2, "2026-02-24", "2026-02-24"], [43, 6, 2, "2026-05-25", "2026-05-25"], [43, 23, 1, "2026-06-15", "2026-06-15"], [43, 7, 1, "2026-02-11", "2026-02-11"], [43, 8, 1, "2026-05-25", "2026-05-25"], [44, 2, 48, "2026-04-21", "2026-08-04"], [44, 1, 41, "2026-04-20", "2026-07-29"], [44, 3, 34, "2026-04-21", "2026-07-15"], [44, 35, 23, "2026-04-20", "2026-07-29"], [44, 5, 21, "2026-04-21", "2026-07-29"], [44, 4, 19, "2026-05-16", "2026-07-15"], [44, 8, 11, "2026-04-20", "2026-07-08"], [44, 6, 11, "2026-04-21", "2026-07-01"], [44, 16, 9, "2026-05-11", "2026-08-03"], [44, 9, 7, "2026-05-07", "2026-07-01"], [44, 0, 5, "2026-04-21", "2026-08-04"], [44, 13, 4, "2026-04-20", "2026-04-20"], [44, 12, 3, "2026-04-20", "2026-04-20"], [44, 18, 2, "2026-04-20", "2026-07-07"], [44, 11, 2, "2026-04-20", "2026-05-04"], [44, 21, 2, "2026-04-21", "2026-07-08"], [44, 20, 2, "2026-07-08", "2026-07-08"], [44, 10, 2, "2026-04-21", "2026-05-07"], [44, 42, 1, "2026-04-20", "2026-04-20"], [44, 44, 1, "2026-04-20", "2026-04-20"], [44, 28, 1, "2026-04-20", "2026-04-20"], [44, 17, 1, "2026-04-20", "2026-04-20"], [44, 25, 1, "2026-04-20", "2026-04-20"], [44, 26, 1, "2026-06-16", "2026-06-16"], [44, 34, 1, "2026-04-20", "2026-04-20"], [44, 30, 1, "2026-05-01", "2026-05-01"], [44, 57, 1, "2026-04-20", "2026-04-20"], [44, 53, 1, "2026-04-20", "2026-04-20"], [44, 15, 1, "2026-07-08", "2026-07-08"], [44, 19, 1, "2026-07-01", "2026-07-01"], [45, 0, 104, "2026-01-05", "2026-08-11"], [45, 3, 81, "2026-03-04", "2026-08-11"], [45, 7, 27, "2026-01-05", "2026-02-16"], [45, 1, 14, "2026-01-05", "2026-07-15"], [45, 2, 12, "2026-04-27", "2026-07-23"], [45, 10, 6, "2026-01-07", "2026-08-03"], [45, 5, 3, "2026-01-05", "2026-08-11"], [45, 8, 3, "2026-04-29", "2026-07-15"], [45, 6, 2, "2026-01-05", "2026-06-22"], [45, 17, 1, "2026-02-18", "2026-02-18"], [46, 2, 76, "2026-04-21", "2026-08-04"], [46, 0, 53, "2026-01-31", "2026-08-09"], [46, 1, 29, "2026-01-31", "2026-07-28"], [46, 3, 27, "2026-02-26", "2026-07-21"], [46, 4, 26, "2026-01-31", "2026-07-21"], [46, 11, 11, "2026-01-12", "2026-07-12"], [46, 8, 10, "2026-03-11", "2026-07-28"], [46, 15, 3, "2026-05-03", "2026-05-12"], [46, 12, 2, "2026-03-15", "2026-03-15"], [46, 18, 2, "2026-01-02", "2026-01-02"], [46, 14, 2, "2026-01-12", "2026-01-17"], [46, 7, 2, "2026-01-31", "2026-02-09"], [46, 26, 1, "2026-04-10", "2026-04-10"], [46, 9, 1, "2026-07-17", "2026-07-17"], [46, 72, 1, "2026-05-12", "2026-05-12"], [46, 10, 1, "2026-02-09", "2026-02-09"], [47, 0, 69, "2026-01-04", "2026-08-10"], [47, 3, 48, "2026-03-03", "2026-08-10"], [47, 1, 41, "2026-02-24", "2026-08-10"], [47, 4, 36, "2026-01-05", "2026-08-10"], [47, 2, 20, "2026-04-28", "2026-07-27"], [47, 7, 11, "2026-01-04", "2026-02-24"], [47, 11, 9, "2026-01-02", "2026-08-02"], [47, 20, 3, "2026-03-03", "2026-04-28"], [47, 12, 3, "2026-01-14", "2026-01-14"], [47, 9, 2, "2026-05-29", "2026-05-29"], [47, 8, 2, "2026-03-31", "2026-05-21"], [47, 6, 2, "2026-05-29", "2026-05-29"], [47, 29, 1, "2026-08-02", "2026-08-02"], [48, 2, 98, "2026-03-06", "2026-08-11"], [48, 16, 32, "2026-02-10", "2026-08-05"], [48, 0, 11, "2026-01-05", "2026-04-03"], [48, 7, 9, "2026-01-05", "2026-02-10"], [48, 3, 8, "2026-04-07", "2026-07-15"], [48, 36, 8, "2026-04-27", "2026-07-08"], [48, 31, 8, "2026-07-08", "2026-07-08"], [48, 34, 7, "2026-04-03", "2026-05-19"], [48, 1, 7, "2026-01-16", "2026-05-12"], [48, 18, 6, "2026-01-13", "2026-08-10"], [48, 10, 6, "2026-02-16", "2026-04-07"], [48, 43, 5, "2026-04-03", "2026-05-19"], [48, 13, 4, "2026-03-31", "2026-07-31"], [48, 55, 3, "2026-07-08", "2026-07-08"], [48, 15, 3, "2026-03-06", "2026-04-17"], [48, 54, 2, "2026-01-07", "2026-01-12"], [48, 41, 2, "2026-08-05", "2026-08-05"], [48, 44, 2, "2026-03-31", "2026-04-27"], [48, 4, 1, "2026-01-26", "2026-01-26"], [48, 53, 1, "2026-03-31", "2026-03-31"], [48, 68, 1, "2026-08-05", "2026-08-05"], [48, 12, 1, "2026-02-12", "2026-02-12"], [48, 45, 1, "2026-04-27", "2026-04-27"], [48, 20, 1, "2026-03-31", "2026-03-31"], [48, 9, 1, "2026-04-07", "2026-04-07"], [48, 5, 1, "2026-04-08", "2026-04-08"], [48, 35, 1, "2026-05-12", "2026-05-12"], [48, 42, 1, "2026-03-31", "2026-03-31"], [49, 1, 85, "2026-01-17", "2026-08-10"], [49, 0, 81, "2026-01-17", "2026-08-10"], [49, 2, 25, "2026-04-24", "2026-08-10"], [49, 3, 22, "2026-03-18", "2026-08-04"], [49, 11, 11, "2026-01-02", "2026-08-02"], [49, 7, 3, "2026-02-04", "2026-02-16"], [49, 14, 1, "2026-03-02", "2026-03-02"], [49, 8, 1, "2026-04-23", "2026-04-23"], [49, 29, 1, "2026-08-02", "2026-08-02"], [50, 0, 66, "2026-01-17", "2026-08-05"], [50, 2, 51, "2026-04-01", "2026-08-05"], [50, 1, 35, "2026-01-17", "2026-07-22"], [50, 3, 27, "2026-03-23", "2026-08-05"], [50, 12, 15, "2026-04-27", "2026-04-27"], [50, 10, 14, "2026-01-17", "2026-07-22"], [50, 11, 6, "2026-01-25", "2026-07-22"], [50, 7, 6, "2026-01-17", "2026-02-09"], [50, 8, 3, "2026-03-10", "2026-06-19"], [50, 20, 2, "2026-02-09", "2026-06-09"], [50, 27, 1, "2026-04-25", "2026-04-25"], [50, 15, 1, "2026-04-01", "2026-04-01"], [50, 13, 1, "2026-04-13", "2026-04-13"], [50, 25, 1, "2026-07-22", "2026-07-22"], [50, 28, 1, "2026-07-22", "2026-07-22"], [51, 0, 96, "2026-01-14", "2026-08-11"], [51, 1, 69, "2026-01-04", "2026-08-11"], [51, 2, 19, "2026-04-23", "2026-08-11"], [51, 8, 8, "2026-03-15", "2026-08-11"], [51, 11, 7, "2026-02-04", "2026-04-05"], [51, 3, 7, "2026-03-08", "2026-04-23"], [51, 14, 6, "2026-02-04", "2026-04-05"], [51, 7, 3, "2026-01-14", "2026-02-22"], [51, 42, 2, "2026-04-05", "2026-04-05"], [51, 13, 2, "2026-04-05", "2026-04-05"], [51, 20, 1, "2026-03-15", "2026-03-15"], [51, 10, 1, "2026-04-01", "2026-04-01"], [51, 25, 1, "2026-04-05", "2026-04-05"], [51, 28, 1, "2026-04-05", "2026-04-05"], [51, 27, 1, "2026-02-25", "2026-02-25"], [51, 9, 1, "2026-04-01", "2026-04-01"], [51, 17, 1, "2026-04-05", "2026-04-05"], [51, 44, 1, "2026-04-05", "2026-04-05"], [52, 0, 88, "2026-01-14", "2026-08-10"], [52, 1, 28, "2026-01-14", "2026-07-13"], [52, 3, 24, "2026-03-31", "2026-08-07"], [52, 2, 14, "2026-04-28", "2026-07-13"], [52, 24, 12, "2026-04-24", "2026-05-20"], [52, 7, 12, "2026-01-14", "2026-02-04"], [52, 4, 11, "2026-01-27", "2026-08-07"], [52, 14, 8, "2026-01-03", "2026-02-11"], [52, 8, 5, "2026-04-24", "2026-07-13"], [52, 18, 4, "2026-01-11", "2026-05-18"], [52, 11, 3, "2026-01-11", "2026-01-21"], [52, 23, 2, "2026-06-25", "2026-07-13"], [52, 10, 2, "2026-04-24", "2026-08-10"], [52, 17, 1, "2026-01-14", "2026-01-14"], [52, 27, 1, "2026-02-11", "2026-02-11"], [53, 10, 48, "2026-02-24", "2026-08-12"], [53, 9, 28, "2026-02-26", "2026-08-08"], [53, 1, 25, "2026-02-05", "2026-08-08"], [53, 3, 24, "2026-03-17", "2026-08-08"], [53, 5, 21, "2026-01-29", "2026-08-08"], [53, 6, 18, "2026-01-29", "2026-03-30"], [53, 4, 13, "2026-02-23", "2026-08-08"], [53, 2, 13, "2026-06-05", "2026-08-08"], [53, 0, 9, "2026-01-29", "2026-04-16"], [53, 7, 7, "2026-02-24", "2026-02-24"], [53, 11, 2, "2026-07-20", "2026-08-03"], [53, 30, 1, "2026-07-31", "2026-07-31"], [53, 29, 1, "2026-08-03", "2026-08-03"], [53, 25, 1, "2026-07-20", "2026-07-20"], [53, 28, 1, "2026-07-20", "2026-07-20"], [53, 12, 1, "2026-07-20", "2026-07-20"], [53, 51, 1, "2026-08-03", "2026-08-03"], [54, 0, 52, "2026-01-03", "2026-07-03"], [54, 1, 34, "2026-01-03", "2026-07-03"], [54, 5, 22, "2026-01-13", "2026-06-17"], [54, 4, 22, "2026-03-26", "2026-06-17"], [54, 6, 21, "2026-01-13", "2026-02-23"], [54, 3, 12, "2026-03-03", "2026-06-17"], [54, 2, 11, "2026-04-27", "2026-07-03"], [54, 11, 6, "2026-02-05", "2026-05-05"], [54, 32, 5, "2026-03-26", "2026-03-26"], [54, 10, 5, "2026-01-22", "2026-04-27"], [54, 8, 4, "2026-03-26", "2026-04-28"], [54, 23, 3, "2026-01-30", "2026-04-29"], [54, 27, 1, "2026-06-05", "2026-06-05"], [54, 18, 1, "2026-04-14", "2026-04-14"], [54, 20, 1, "2026-03-24", "2026-03-24"], [54, 30, 1, "2026-02-02", "2026-02-02"], [54, 25, 1, "2026-01-22", "2026-01-22"], [54, 7, 1, "2026-02-03", "2026-02-03"], [54, 28, 1, "2026-01-22", "2026-01-22"], [55, 0, 42, "2026-02-06", "2026-08-10"], [55, 2, 39, "2026-04-10", "2026-08-11"], [55, 1, 29, "2026-02-06", "2026-08-10"], [55, 3, 21, "2026-02-27", "2026-08-11"], [55, 4, 13, "2026-02-09", "2026-08-11"], [55, 8, 10, "2026-02-27", "2026-07-07"], [55, 10, 9, "2026-05-27", "2026-07-31"], [55, 15, 8, "2026-04-10", "2026-07-10"], [55, 33, 5, "2026-05-18", "2026-05-18"], [55, 18, 4, "2026-01-19", "2026-07-10"], [55, 7, 3, "2026-02-06", "2026-02-23"], [55, 20, 3, "2026-05-10", "2026-08-06"], [55, 19, 2, "2026-03-10", "2026-03-12"], [55, 5, 2, "2026-02-24", "2026-02-27"], [55, 21, 2, "2026-04-26", "2026-04-26"], [55, 6, 2, "2026-02-24", "2026-02-24"], [55, 13, 1, "2026-05-18", "2026-05-18"], [55, 22, 1, "2026-01-19", "2026-01-19"], [55, 11, 1, "2026-02-02", "2026-02-02"], [55, 16, 1, "2026-03-10", "2026-03-10"], [55, 30, 1, "2026-01-30", "2026-01-30"], [55, 24, 1, "2026-05-18", "2026-05-18"], [55, 17, 1, "2026-01-19", "2026-01-19"], [55, 28, 1, "2026-01-19", "2026-01-19"], [55, 25, 1, "2026-01-19", "2026-01-19"], [55, 31, 1, "2026-07-10", "2026-07-10"], [56, 2, 75, "2026-04-21", "2026-08-10"], [56, 0, 40, "2026-01-03", "2026-08-10"], [56, 1, 20, "2026-01-03", "2026-06-30"], [56, 10, 17, "2026-01-03", "2026-04-07"], [56, 3, 9, "2026-04-20", "2026-06-30"], [56, 4, 9, "2026-02-06", "2026-05-18"], [56, 14, 6, "2026-06-03", "2026-08-03"], [56, 9, 6, "2026-03-27", "2026-04-20"], [56, 31, 5, "2026-05-20", "2026-05-20"], [56, 11, 2, "2026-06-03", "2026-06-03"], [56, 55, 1, "2026-05-20", "2026-05-20"], [56, 30, 1, "2026-05-31", "2026-05-31"], [56, 60, 1, "2026-05-21", "2026-05-21"], [56, 15, 1, "2026-08-05", "2026-08-05"], [56, 57, 1, "2026-05-21", "2026-05-21"], [56, 46, 1, "2026-08-03", "2026-08-03"], [56, 28, 1, "2026-05-20", "2026-05-20"], [56, 25, 1, "2026-05-20", "2026-05-20"], [56, 27, 1, "2026-06-24", "2026-06-24"], [57, 0, 72, "2026-01-04", "2026-08-03"], [57, 1, 47, "2026-01-20", "2026-07-27"], [57, 8, 16, "2026-03-04", "2026-07-09"], [57, 2, 15, "2026-05-05", "2026-08-03"], [57, 11, 13, "2026-01-11", "2026-08-11"], [57, 3, 12, "2026-03-30", "2026-07-27"], [57, 9, 9, "2026-04-16", "2026-07-24"], [57, 7, 5, "2026-01-26", "2026-02-24"], [57, 14, 2, "2026-04-11", "2026-06-11"], [57, 23, 2, "2026-01-29", "2026-03-30"], [57, 10, 2, "2026-01-26", "2026-02-06"], [57, 20, 1, "2026-05-04", "2026-05-04"], [57, 48, 1, "2026-05-04", "2026-05-04"], [57, 32, 1, "2026-03-05", "2026-03-05"], [58, 0, 52, "2026-02-02", "2026-08-11"], [58, 1, 38, "2026-02-02", "2026-08-11"], [58, 4, 31, "2026-02-02", "2026-07-01"], [58, 2, 27, "2026-04-24", "2026-08-11"], [58, 3, 12, "2026-03-30", "2026-07-01"], [58, 14, 10, "2026-03-22", "2026-08-11"], [58, 8, 7, "2026-03-24", "2026-08-11"], [58, 11, 4, "2026-02-22", "2026-08-11"], [58, 10, 4, "2026-02-19", "2026-06-11"], [58, 46, 3, "2026-08-11", "2026-08-11"], [58, 25, 2, "2026-02-08", "2026-08-11"], [58, 12, 1, "2026-02-08", "2026-02-08"], [58, 29, 1, "2026-08-11", "2026-08-11"], [58, 27, 1, "2026-04-12", "2026-04-12"], [58, 30, 1, "2026-02-19", "2026-02-19"], [58, 28, 1, "2026-02-08", "2026-02-08"], [58, 20, 1, "2026-04-07", "2026-04-07"], [59, 0, 68, "2026-01-08", "2026-08-09"], [59, 1, 48, "2026-01-08", "2026-08-07"], [59, 2, 30, "2026-05-04", "2026-08-09"], [59, 8, 16, "2026-02-26", "2026-07-30"], [59, 11, 8, "2026-01-23", "2026-07-23"], [59, 3, 7, "2026-02-26", "2026-07-30"], [59, 10, 7, "2026-02-10", "2026-07-10"], [59, 5, 2, "2026-05-04", "2026-07-09"], [59, 6, 2, "2026-05-05", "2026-07-10"], [59, 9, 1, "2026-05-05", "2026-05-05"], [59, 21, 1, "2026-03-31", "2026-03-31"], [60, 0, 70, "2026-01-14", "2026-08-11"], [60, 1, 43, "2026-03-06", "2026-08-11"], [60, 5, 33, "2026-01-14", "2026-08-11"], [60, 2, 15, "2026-04-30", "2026-07-22"], [60, 6, 14, "2026-01-14", "2026-08-04"], [60, 11, 8, "2026-01-22", "2026-07-22"], [60, 9, 5, "2026-04-27", "2026-07-24"], [60, 10, 2, "2026-04-30", "2026-04-30"], [61, 6, 41, "2026-02-13", "2026-07-24"], [61, 3, 29, "2026-03-03", "2026-06-26"], [61, 0, 25, "2026-03-03", "2026-08-06"], [61, 1, 21, "2026-02-10", "2026-07-22"], [61, 5, 17, "2026-02-10", "2026-07-22"], [61, 2, 16, "2026-05-02", "2026-08-06"], [61, 9, 9, "2026-02-28", "2026-07-24"], [61, 7, 6, "2026-02-12", "2026-02-24"], [61, 10, 5, "2026-02-15", "2026-05-14"], [61, 4, 3, "2026-02-22", "2026-05-02"], [61, 23, 2, "2026-03-06", "2026-03-27"], [61, 11, 2, "2026-07-29", "2026-07-29"], [61, 17, 1, "2026-02-10", "2026-02-10"], [61, 30, 1, "2026-08-02", "2026-08-02"], [61, 27, 1, "2026-08-05", "2026-08-05"], [61, 26, 1, "2026-03-03", "2026-03-03"], [61, 47, 1, "2026-03-28", "2026-03-28"], [61, 28, 1, "2026-07-22", "2026-07-22"], [61, 22, 1, "2026-02-10", "2026-02-10"], [61, 25, 1, "2026-07-22", "2026-07-22"], [61, 8, 1, "2026-03-03", "2026-03-03"], [62, 0, 83, "2026-01-05", "2026-08-11"], [62, 1, 40, "2026-01-09", "2026-08-11"], [62, 2, 19, "2026-04-29", "2026-07-16"], [62, 3, 11, "2026-03-02", "2026-07-31"], [62, 7, 7, "2026-01-09", "2026-02-19"], [62, 8, 7, "2026-03-02", "2026-08-11"], [62, 10, 6, "2026-03-02", "2026-03-03"], [62, 29, 4, "2026-07-31", "2026-07-31"], [62, 23, 2, "2026-01-28", "2026-04-04"], [62, 11, 1, "2026-07-31", "2026-07-31"], [62, 30, 1, "2026-08-11", "2026-08-11"], [62, 5, 1, "2026-07-04", "2026-07-04"], [62, 47, 1, "2026-04-06", "2026-04-06"], [62, 25, 1, "2026-07-31", "2026-07-31"], [63, 0, 49, "2026-01-10", "2026-08-04"], [63, 1, 37, "2026-01-10", "2026-08-04"], [63, 2, 31, "2026-04-23", "2026-08-04"], [63, 14, 17, "2026-05-28", "2026-06-18"], [63, 3, 11, "2026-02-26", "2026-08-04"], [63, 11, 8, "2026-01-28", "2026-07-27"], [63, 10, 8, "2026-03-27", "2026-05-07"], [63, 46, 6, "2026-05-28", "2026-05-29"], [63, 7, 4, "2026-01-12", "2026-02-25"], [63, 16, 2, "2026-01-12", "2026-03-13"], [63, 8, 2, "2026-04-14", "2026-04-29"], [63, 15, 1, "2026-06-29", "2026-06-29"], [63, 28, 1, "2026-07-27", "2026-07-27"], [63, 27, 1, "2026-06-18", "2026-06-18"], [63, 13, 1, "2026-04-29", "2026-04-29"], [63, 25, 1, "2026-07-27", "2026-07-27"], [64, 12, 86, "2026-03-29", "2026-04-02"], [64, 2, 24, "2026-04-06", "2026-07-23"], [64, 5, 18, "2026-03-29", "2026-07-06"], [64, 1, 10, "2026-03-29", "2026-05-12"], [64, 0, 9, "2026-03-29", "2026-06-15"], [64, 6, 6, "2026-03-29", "2026-07-30"], [64, 8, 6, "2026-03-31", "2026-05-02"], [64, 10, 6, "2026-03-29", "2026-07-31"], [64, 9, 5, "2026-03-29", "2026-07-07"], [64, 3, 2, "2026-05-02", "2026-06-15"], [64, 15, 1, "2026-04-06", "2026-04-06"], [65, 1, 48, "2026-07-01", "2026-08-06"], [65, 0, 30, "2026-07-01", "2026-08-06"], [65, 5, 25, "2026-07-01", "2026-08-06"], [65, 8, 15, "2026-07-01", "2026-07-24"], [65, 2, 14, "2026-07-03", "2026-08-11"], [65, 10, 11, "2026-07-01", "2026-08-06"], [65, 6, 8, "2026-07-08", "2026-07-25"], [65, 9, 6, "2026-07-01", "2026-07-17"], [65, 3, 3, "2026-07-06", "2026-07-22"], [65, 13, 2, "2026-07-01", "2026-07-01"], [65, 11, 2, "2026-07-08", "2026-07-22"], [65, 28, 1, "2026-07-08", "2026-07-08"], [65, 23, 1, "2026-07-22", "2026-07-22"], [65, 22, 1, "2026-07-01", "2026-07-01"], [65, 30, 1, "2026-07-19", "2026-07-19"], [65, 25, 1, "2026-07-08", "2026-07-08"], [65, 17, 1, "2026-07-01", "2026-07-01"], [66, 0, 50, "2026-01-06", "2026-07-21"], [66, 1, 48, "2026-01-06", "2026-07-21"], [66, 2, 19, "2026-05-12", "2026-07-30"], [66, 3, 13, "2026-03-01", "2026-06-22"], [66, 11, 11, "2026-01-13", "2026-07-13"], [66, 10, 10, "2026-01-06", "2026-07-15"], [66, 8, 4, "2026-03-27", "2026-06-14"], [66, 7, 3, "2026-01-06", "2026-01-26"], [66, 21, 1, "2026-03-30", "2026-03-30"], [66, 15, 1, "2026-06-22", "2026-06-22"], [66, 14, 1, "2026-04-13", "2026-04-13"], [66, 13, 1, "2026-03-30", "2026-03-30"], [66, 16, 1, "2026-06-22", "2026-06-22"], [67, 0, 36, "2026-03-25", "2026-08-04"], [67, 1, 33, "2026-04-14", "2026-08-04"], [67, 2, 29, "2026-05-21", "2026-08-07"], [67, 5, 21, "2026-01-06", "2026-08-04"], [67, 4, 10, "2026-07-29", "2026-08-07"], [67, 3, 8, "2026-07-31", "2026-08-07"], [67, 6, 5, "2026-01-07", "2026-08-03"], [67, 11, 4, "2026-07-24", "2026-08-07"], [67, 20, 3, "2026-06-22", "2026-06-22"], [67, 8, 3, "2026-07-24", "2026-08-04"], [67, 51, 1, "2026-08-07", "2026-08-07"], [67, 30, 1, "2026-08-04", "2026-08-04"], [67, 32, 1, "2026-07-29", "2026-07-29"], [67, 14, 1, "2026-08-07", "2026-08-07"], [67, 28, 1, "2026-07-24", "2026-07-24"], [67, 21, 1, "2026-07-01", "2026-07-01"], [67, 18, 1, "2026-07-29", "2026-07-29"], [67, 15, 1, "2026-07-29", "2026-07-29"], [67, 25, 1, "2026-07-24", "2026-07-24"], [67, 9, 1, "2026-08-03", "2026-08-03"], [68, 0, 35, "2026-03-02", "2026-05-23"], [68, 10, 20, "2026-01-31", "2026-08-03"], [68, 1, 16, "2026-02-28", "2026-05-28"], [68, 6, 16, "2026-02-01", "2026-07-20"], [68, 3, 16, "2026-02-28", "2026-08-03"], [68, 4, 12, "2026-02-28", "2026-08-03"], [68, 5, 12, "2026-01-31", "2026-05-28"], [68, 9, 12, "2026-04-03", "2026-08-03"], [68, 2, 7, "2026-04-21", "2026-08-03"], [68, 20, 6, "2026-03-17", "2026-04-06"], [68, 8, 4, "2026-02-28", "2026-05-28"], [68, 23, 2, "2026-02-28", "2026-04-10"], [68, 21, 1, "2026-03-02", "2026-03-02"], [69, 0, 60, "2026-03-21", "2026-07-30"], [69, 2, 35, "2026-05-08", "2026-07-27"], [69, 1, 33, "2026-02-23", "2026-07-30"], [69, 3, 18, "2026-03-21", "2026-07-30"], [69, 11, 2, "2026-07-02", "2026-08-02"], [69, 8, 2, "2026-03-21", "2026-07-04"], [69, 26, 2, "2026-03-21", "2026-03-21"], [69, 4, 2, "2026-03-21", "2026-03-21"], [69, 25, 1, "2026-06-18", "2026-06-18"], [69, 21, 1, "2026-07-04", "2026-07-04"], [69, 30, 1, "2026-06-29", "2026-06-29"], [69, 29, 1, "2026-08-02", "2026-08-02"], [69, 28, 1, "2026-06-18", "2026-06-18"], [70, 0, 63, "2026-01-08", "2026-08-07"], [70, 2, 23, "2026-04-20", "2026-08-07"], [70, 1, 18, "2026-01-08", "2026-07-20"], [70, 11, 14, "2026-01-13", "2026-07-30"], [70, 9, 12, "2026-03-11", "2026-04-05"], [70, 3, 8, "2026-02-27", "2026-08-05"], [70, 5, 7, "2026-01-14", "2026-02-26"], [70, 14, 5, "2026-03-13", "2026-07-27"], [70, 12, 3, "2026-07-03", "2026-07-03"], [70, 30, 1, "2026-01-10", "2026-01-10"], [70, 8, 1, "2026-02-26", "2026-02-26"], [70, 7, 1, "2026-02-25", "2026-02-25"], [71, 0, 39, "2026-01-06", "2026-07-29"], [71, 2, 24, "2026-05-04", "2026-07-29"], [71, 3, 21, "2026-03-10", "2026-07-29"], [71, 1, 15, "2026-01-06", "2026-07-27"], [71, 4, 15, "2026-01-06", "2026-07-29"], [71, 7, 11, "2026-01-06", "2026-02-24"], [71, 11, 11, "2026-01-03", "2026-08-03"], [71, 10, 3, "2026-01-08", "2026-02-06"], [71, 6, 2, "2026-04-02", "2026-04-03"], [71, 18, 2, "2026-05-04", "2026-06-01"], [71, 9, 2, "2026-04-02", "2026-05-05"], [71, 12, 2, "2026-05-04", "2026-05-04"], [71, 26, 2, "2026-05-04", "2026-05-04"], [71, 5, 1, "2026-04-01", "2026-04-01"], [71, 29, 1, "2026-08-03", "2026-08-03"], [71, 23, 1, "2026-01-13", "2026-01-13"], [72, 0, 50, "2026-01-05", "2026-08-05"], [72, 1, 41, "2026-01-05", "2026-08-05"], [72, 2, 19, "2026-04-20", "2026-08-05"], [72, 10, 15, "2026-02-03", "2026-05-04"], [72, 11, 9, "2026-01-06", "2026-08-06"], [72, 3, 6, "2026-02-27", "2026-04-29"], [72, 13, 2, "2026-03-17", "2026-03-17"], [72, 20, 1, "2026-04-29", "2026-04-29"], [72, 29, 1, "2026-08-06", "2026-08-06"], [73, 0, 38, "2026-01-19", "2026-08-05"], [73, 5, 25, "2026-01-19", "2026-08-05"], [73, 1, 25, "2026-05-01", "2026-08-05"], [73, 2, 19, "2026-05-01", "2026-08-05"], [73, 6, 8, "2026-06-22", "2026-08-05"], [73, 9, 8, "2026-06-22", "2026-08-05"], [73, 11, 5, "2026-01-24", "2026-07-24"], [73, 14, 5, "2026-01-24", "2026-02-14"], [73, 8, 4, "2026-05-01", "2026-06-24"], [73, 13, 2, "2026-07-16", "2026-08-04"], [73, 3, 1, "2026-07-16", "2026-07-16"], [73, 27, 1, "2026-02-14", "2026-02-14"], [73, 28, 1, "2026-06-24", "2026-06-24"], [73, 25, 1, "2026-06-24", "2026-06-24"], [74, 0, 31, "2026-01-08", "2026-08-07"], [74, 2, 28, "2026-03-17", "2026-08-07"], [74, 3, 23, "2026-02-28", "2026-07-17"], [74, 1, 18, "2026-02-28", "2026-07-20"], [74, 4, 13, "2026-01-13", "2026-07-17"], [74, 11, 11, "2026-01-15", "2026-07-15"], [74, 7, 4, "2026-01-20", "2026-02-17"], [74, 8, 3, "2026-02-28", "2026-07-16"], [74, 14, 3, "2026-05-15", "2026-05-23"], [74, 15, 3, "2026-03-17", "2026-03-17"], [74, 46, 1, "2026-05-23", "2026-05-23"], [74, 9, 1, "2026-07-17", "2026-07-17"], [74, 18, 1, "2026-03-17", "2026-03-17"], [75, 1, 37, "2026-01-08", "2026-08-10"], [75, 2, 30, "2026-05-11", "2026-08-10"], [75, 9, 26, "2026-03-06", "2026-08-10"], [75, 8, 8, "2026-06-26", "2026-08-10"], [75, 3, 6, "2026-05-11", "2026-08-10"], [75, 12, 4, "2026-06-26", "2026-06-26"], [75, 10, 4, "2026-06-26", "2026-08-04"], [75, 5, 3, "2026-04-15", "2026-06-23"], [75, 4, 3, "2026-05-11", "2026-08-04"], [75, 0, 3, "2026-01-08", "2026-02-06"], [75, 13, 2, "2026-07-03", "2026-07-03"], [75, 33, 2, "2026-06-09", "2026-08-10"], [75, 11, 2, "2026-07-03", "2026-07-17"], [75, 15, 1, "2026-07-21", "2026-07-21"], [75, 30, 1, "2026-07-14", "2026-07-14"], [75, 42, 1, "2026-07-03", "2026-07-03"], [75, 31, 1, "2026-07-03", "2026-07-03"], [75, 60, 1, "2026-07-08", "2026-07-08"], [75, 57, 1, "2026-07-08", "2026-07-08"], [75, 28, 1, "2026-07-03", "2026-07-03"], [75, 25, 1, "2026-07-03", "2026-07-03"], [75, 34, 1, "2026-07-03", "2026-07-03"], [76, 0, 53, "2026-01-06", "2026-08-09"], [76, 1, 32, "2026-01-06", "2026-08-08"], [76, 4, 15, "2026-01-25", "2026-02-03"], [76, 2, 11, "2026-04-28", "2026-08-08"], [76, 11, 8, "2026-01-21", "2026-07-21"], [76, 8, 2, "2026-03-25", "2026-05-01"], [76, 20, 2, "2026-01-25", "2026-08-07"], [76, 3, 2, "2026-03-16", "2026-03-26"], [76, 7, 2, "2026-01-06", "2026-02-08"], [76, 23, 1, "2026-01-25", "2026-01-25"], [76, 10, 1, "2026-01-06", "2026-01-06"], [77, 3, 29, "2026-03-13", "2026-08-05"], [77, 1, 21, "2026-02-01", "2026-07-27"], [77, 4, 20, "2026-02-18", "2026-08-05"], [77, 2, 18, "2026-05-05", "2026-07-27"], [77, 0, 15, "2026-02-01", "2026-08-03"], [77, 8, 3, "2026-05-05", "2026-07-06"], [77, 7, 3, "2026-02-18", "2026-02-24"], [77, 11, 3, "2026-07-27", "2026-08-10"], [77, 15, 2, "2026-05-17", "2026-07-27"], [77, 26, 2, "2026-05-21", "2026-07-17"], [77, 25, 2, "2026-07-27", "2026-07-30"], [77, 14, 1, "2026-08-10", "2026-08-10"], [77, 30, 1, "2026-08-07", "2026-08-07"], [77, 28, 1, "2026-07-27", "2026-07-27"], [77, 20, 1, "2026-05-21", "2026-05-21"], [77, 13, 1, "2026-07-27", "2026-07-27"], [77, 51, 1, "2026-08-10", "2026-08-10"], [77, 18, 1, "2026-07-27", "2026-07-27"], [77, 5, 1, "2026-02-24", "2026-02-24"], [77, 34, 1, "2026-07-27", "2026-07-27"], [77, 23, 1, "2026-02-18", "2026-02-18"], [78, 0, 27, "2026-04-19", "2026-07-20"], [78, 3, 24, "2026-04-19", "2026-07-07"], [78, 1, 23, "2026-04-19", "2026-07-07"], [78, 2, 23, "2026-04-24", "2026-07-23"], [78, 4, 9, "2026-05-05", "2026-07-03"], [78, 13, 7, "2026-04-19", "2026-05-13"], [78, 12, 6, "2026-05-20", "2026-05-20"], [78, 8, 5, "2026-04-19", "2026-07-07"], [78, 20, 2, "2026-07-03", "2026-07-03"], [78, 48, 1, "2026-07-03", "2026-07-03"], [78, 17, 1, "2026-04-19", "2026-04-19"], [79, 6, 35, "2026-01-12", "2026-08-05"], [79, 5, 22, "2026-01-12", "2026-08-04"], [79, 1, 13, "2026-03-17", "2026-08-03"], [79, 2, 13, "2026-04-22", "2026-08-04"], [79, 11, 8, "2026-01-04", "2026-07-28"], [79, 9, 7, "2026-03-18", "2026-08-05"], [79, 3, 7, "2026-05-01", "2026-05-15"], [79, 8, 6, "2026-03-17", "2026-08-03"], [79, 0, 5, "2026-03-17", "2026-05-21"], [79, 4, 4, "2026-05-15", "2026-05-15"], [79, 23, 2, "2026-02-23", "2026-05-15"], [79, 21, 2, "2026-03-17", "2026-08-04"], [79, 7, 1, "2026-02-25", "2026-02-25"], [79, 17, 1, "2026-01-04", "2026-01-04"], [80, 1, 27, "2026-02-10", "2026-08-11"], [80, 0, 23, "2026-04-07", "2026-08-11"], [80, 2, 17, "2026-05-08", "2026-08-11"], [80, 4, 17, "2026-02-12", "2026-08-11"], [80, 32, 13, "2026-04-07", "2026-08-11"], [80, 3, 12, "2026-04-07", "2026-07-15"], [80, 29, 4, "2026-08-04", "2026-08-04"], [80, 7, 4, "2026-02-11", "2026-02-16"], [80, 5, 2, "2026-02-10", "2026-04-07"], [80, 8, 2, "2026-05-08", "2026-06-18"], [80, 17, 1, "2026-02-10", "2026-02-10"], [80, 26, 1, "2026-04-07", "2026-04-07"], [80, 25, 1, "2026-08-04", "2026-08-04"], [80, 13, 1, "2026-05-08", "2026-05-08"], [81, 3, 23, "2026-03-02", "2026-08-03"], [81, 0, 19, "2026-02-02", "2026-08-03"], [81, 1, 18, "2026-03-02", "2026-08-03"], [81, 4, 15, "2026-02-02", "2026-08-03"], [81, 5, 14, "2026-02-02", "2026-08-03"], [81, 2, 13, "2026-05-04", "2026-07-08"], [81, 11, 9, "2026-01-04", "2026-08-04"], [81, 6, 6, "2026-02-02", "2026-07-08"], [81, 9, 4, "2026-03-02", "2026-07-08"], [81, 7, 2, "2026-02-02", "2026-02-02"], [81, 29, 1, "2026-08-04", "2026-08-04"], [81, 10, 1, "2026-04-07", "2026-04-07"], [82, 0, 29, "2026-01-15", "2026-07-28"], [82, 1, 27, "2026-01-15", "2026-07-27"], [82, 3, 21, "2026-02-26", "2026-07-28"], [82, 4, 16, "2026-05-11", "2026-07-27"], [82, 2, 15, "2026-04-23", "2026-07-27"], [82, 11, 9, "2026-01-31", "2026-07-31"], [82, 14, 3, "2026-03-01", "2026-03-09"], [82, 8, 2, "2026-05-29", "2026-06-04"], [82, 20, 1, "2026-06-19", "2026-06-19"], [83, 9, 40, "2026-03-05", "2026-08-05"], [83, 1, 29, "2026-01-06", "2026-08-05"], [83, 0, 27, "2026-01-06", "2026-08-05"], [83, 2, 13, "2026-05-04", "2026-08-05"], [83, 10, 4, "2026-03-12", "2026-03-12"], [83, 29, 3, "2026-08-03", "2026-08-03"], [83, 3, 3, "2026-03-12", "2026-05-14"], [83, 11, 1, "2026-08-03", "2026-08-03"], [83, 21, 1, "2026-08-05", "2026-08-05"], [83, 25, 1, "2026-08-03", "2026-08-03"], [83, 17, 1, "2026-01-08", "2026-01-08"], [84, 0, 29, "2026-02-05", "2026-08-05"], [84, 2, 29, "2026-04-26", "2026-08-05"], [84, 1, 18, "2026-01-09", "2026-08-05"], [84, 5, 11, "2026-01-09", "2026-08-05"], [84, 14, 6, "2026-01-09", "2026-05-29"], [84, 11, 6, "2026-01-09", "2026-07-25"], [84, 8, 5, "2026-03-16", "2026-05-30"], [84, 10, 4, "2026-04-02", "2026-04-25"], [84, 3, 3, "2026-04-07", "2026-04-26"], [84, 6, 2, "2026-01-09", "2026-01-09"], [84, 28, 1, "2026-06-25", "2026-06-25"], [84, 20, 1, "2026-07-27", "2026-07-27"], [84, 46, 1, "2026-05-29", "2026-05-29"], [84, 4, 1, "2026-04-26", "2026-04-26"], [84, 25, 1, "2026-06-25", "2026-06-25"], [84, 31, 1, "2026-06-25", "2026-06-25"], [84, 27, 1, "2026-01-30", "2026-01-30"], [85, 0, 61, "2026-01-06", "2026-07-10"], [85, 1, 27, "2026-01-06", "2026-07-10"], [85, 2, 12, "2026-04-24", "2026-07-10"], [85, 3, 7, "2026-03-11", "2026-07-06"], [85, 7, 3, "2026-01-06", "2026-01-07"], [85, 14, 3, "2026-01-03", "2026-01-14"], [85, 8, 3, "2026-04-17", "2026-05-07"], [85, 9, 2, "2026-07-06", "2026-07-06"], [85, 27, 1, "2026-01-14", "2026-01-14"], [86, 9, 29, "2026-04-15", "2026-07-28"], [86, 1, 22, "2026-01-20", "2026-07-28"], [86, 0, 18, "2026-01-06", "2026-04-02"], [86, 4, 15, "2026-01-06", "2026-07-22"], [86, 3, 12, "2026-02-26", "2026-07-22"], [86, 10, 4, "2026-02-12", "2026-05-05"], [86, 2, 3, "2026-05-05", "2026-07-28"], [86, 24, 2, "2026-07-28", "2026-07-28"], [86, 32, 2, "2026-02-23", "2026-05-20"], [86, 11, 2, "2026-07-22", "2026-08-05"], [86, 30, 1, "2026-08-02", "2026-08-02"], [86, 28, 1, "2026-07-22", "2026-07-22"], [86, 15, 1, "2026-07-22", "2026-07-22"], [86, 41, 1, "2026-07-22", "2026-07-22"], [86, 31, 1, "2026-07-22", "2026-07-22"], [86, 29, 1, "2026-08-05", "2026-08-05"], [86, 51, 1, "2026-08-05", "2026-08-05"], [86, 38, 1, "2026-07-28", "2026-07-28"], [86, 25, 1, "2026-07-22", "2026-07-22"], [87, 2, 22, "2026-06-23", "2026-08-07"], [87, 0, 21, "2026-06-24", "2026-07-23"], [87, 3, 14, "2026-06-24", "2026-07-23"], [87, 1, 14, "2026-06-23", "2026-08-07"], [87, 10, 8, "2026-06-24", "2026-07-23"], [87, 4, 6, "2026-07-17", "2026-07-22"], [87, 5, 6, "2026-06-26", "2026-08-07"], [87, 20, 4, "2026-06-24", "2026-07-23"], [87, 18, 2, "2026-07-17", "2026-08-07"], [87, 11, 2, "2026-07-22", "2026-08-05"], [87, 12, 2, "2026-07-17", "2026-07-17"], [87, 8, 2, "2026-06-23", "2026-06-23"], [87, 26, 2, "2026-07-17", "2026-07-17"], [87, 13, 2, "2026-06-23", "2026-06-23"], [87, 21, 2, "2026-06-26", "2026-07-23"], [87, 29, 1, "2026-08-05", "2026-08-05"], [87, 25, 1, "2026-07-22", "2026-07-22"], [87, 15, 1, "2026-08-07", "2026-08-07"], [87, 30, 1, "2026-08-02", "2026-08-02"], [87, 6, 1, "2026-06-26", "2026-06-26"], [87, 17, 1, "2026-06-23", "2026-06-23"], [87, 51, 1, "2026-08-05", "2026-08-05"], [87, 28, 1, "2026-07-22", "2026-07-22"], [88, 10, 30, "2026-01-14", "2026-08-05"], [88, 1, 30, "2026-01-14", "2026-08-05"], [88, 0, 24, "2026-01-14", "2026-08-05"], [88, 2, 12, "2026-05-05", "2026-07-20"], [88, 14, 6, "2026-01-16", "2026-05-15"], [88, 11, 5, "2026-01-16", "2026-07-20"], [88, 3, 3, "2026-05-11", "2026-07-13"], [88, 8, 1, "2026-07-14", "2026-07-14"], [88, 27, 1, "2026-02-06", "2026-02-06"], [88, 17, 1, "2026-07-13", "2026-07-13"], [88, 25, 1, "2026-07-20", "2026-07-20"], [88, 46, 1, "2026-05-15", "2026-05-15"], [88, 13, 1, "2026-07-13", "2026-07-13"], [88, 28, 1, "2026-07-20", "2026-07-20"], [89, 0, 87, "2026-01-06", "2026-05-29"], [89, 3, 14, "2026-03-19", "2026-05-29"], [89, 1, 6, "2026-03-19", "2026-05-29"], [89, 2, 3, "2026-04-29", "2026-05-29"], [89, 7, 2, "2026-01-06", "2026-02-19"], [89, 8, 1, "2026-04-02", "2026-04-02"], [89, 20, 1, "2026-04-02", "2026-04-02"], [90, 10, 33, "2026-01-21", "2026-07-16"], [90, 0, 25, "2026-01-21", "2026-07-02"], [90, 2, 18, "2026-04-25", "2026-07-20"], [90, 3, 14, "2026-03-16", "2026-06-25"], [90, 1, 13, "2026-01-21", "2026-07-02"], [90, 7, 10, "2026-02-11", "2026-02-16"], [91, 2, 28, "2026-07-24", "2026-08-06"], [91, 9, 12, "2026-08-05", "2026-08-05"], [91, 13, 8, "2026-07-24", "2026-08-03"], [91, 0, 6, "2026-08-04", "2026-08-05"], [91, 1, 6, "2026-08-03", "2026-08-05"], [91, 15, 6, "2026-07-24", "2026-08-03"], [91, 19, 4, "2026-08-03", "2026-08-03"], [91, 35, 4, "2026-08-03", "2026-08-05"], [91, 5, 4, "2026-08-03", "2026-08-05"], [91, 10, 4, "2026-08-04", "2026-08-05"], [91, 18, 3, "2026-07-24", "2026-08-03"], [91, 11, 3, "2026-07-24", "2026-08-07"], [91, 6, 2, "2026-08-04", "2026-08-04"], [91, 8, 2, "2026-08-03", "2026-08-05"], [91, 34, 1, "2026-07-24", "2026-07-24"], [91, 60, 1, "2026-07-24", "2026-07-24"], [91, 4, 1, "2026-08-06", "2026-08-06"], [91, 50, 1, "2026-07-24", "2026-07-24"], [91, 41, 1, "2026-07-29", "2026-07-29"], [91, 30, 1, "2026-08-04", "2026-08-04"], [91, 64, 1, "2026-07-24", "2026-07-24"], [91, 33, 1, "2026-07-24", "2026-07-24"], [91, 17, 1, "2026-07-24", "2026-07-24"], [91, 57, 1, "2026-07-24", "2026-07-24"], [91, 3, 1, "2026-08-06", "2026-08-06"], [91, 61, 1, "2026-07-29", "2026-07-29"], [91, 31, 1, "2026-07-24", "2026-07-24"], [91, 44, 1, "2026-07-24", "2026-07-24"], [91, 42, 1, "2026-07-24", "2026-07-24"], [91, 51, 1, "2026-08-07", "2026-08-07"], [91, 28, 1, "2026-07-24", "2026-07-24"], [91, 53, 1, "2026-07-29", "2026-07-29"], [91, 25, 1, "2026-07-24", "2026-07-24"], [92, 9, 36, "2026-04-14", "2026-07-09"], [92, 0, 21, "2026-01-06", "2026-08-05"], [92, 1, 21, "2026-01-06", "2026-08-05"], [92, 3, 10, "2026-03-31", "2026-06-02"], [92, 2, 9, "2026-04-30", "2026-08-05"], [92, 29, 4, "2026-08-05", "2026-08-05"], [92, 7, 3, "2026-02-02", "2026-02-02"], [92, 21, 2, "2026-04-14", "2026-04-14"], [92, 8, 1, "2026-04-14", "2026-04-14"], [92, 20, 1, "2026-04-14", "2026-04-14"], [92, 62, 1, "2026-04-14", "2026-04-14"], [92, 25, 1, "2026-08-05", "2026-08-05"], [93, 0, 51, "2026-01-03", "2026-07-21"], [93, 1, 35, "2026-01-03", "2026-07-21"], [93, 2, 10, "2026-05-03", "2026-07-21"], [93, 7, 3, "2026-01-22", "2026-02-08"], [93, 11, 3, "2026-07-21", "2026-08-04"], [93, 29, 2, "2026-08-04", "2026-08-04"], [93, 28, 1, "2026-07-21", "2026-07-21"], [93, 25, 1, "2026-07-21", "2026-07-21"], [93, 51, 1, "2026-08-04", "2026-08-04"], [93, 14, 1, "2026-08-04", "2026-08-04"], [93, 30, 1, "2026-08-01", "2026-08-01"], [94, 0, 39, "2026-01-04", "2026-08-05"], [94, 1, 23, "2026-01-14", "2026-06-25"], [94, 2, 21, "2026-04-27", "2026-08-11"], [94, 3, 13, "2026-04-20", "2026-06-25"], [94, 14, 4, "2026-01-02", "2026-01-15"], [94, 7, 3, "2026-01-04", "2026-02-23"], [94, 10, 2, "2026-04-27", "2026-04-27"], [94, 8, 2, "2026-03-18", "2026-06-07"], [94, 27, 1, "2026-01-15", "2026-01-15"], [95, 0, 32, "2026-01-10", "2026-08-07"], [95, 3, 24, "2026-03-02", "2026-08-07"], [95, 4, 18, "2026-01-10", "2026-08-07"], [95, 1, 17, "2026-01-10", "2026-07-10"], [95, 7, 7, "2026-01-10", "2026-02-12"], [95, 9, 5, "2026-04-25", "2026-05-07"], [95, 2, 3, "2026-05-17", "2026-08-02"], [95, 20, 1, "2026-01-10", "2026-01-10"], [95, 18, 1, "2026-01-10", "2026-01-10"], [96, 7, 36, "2026-01-05", "2026-02-10"], [96, 1, 24, "2026-01-05", "2026-07-06"], [96, 9, 17, "2026-03-05", "2026-07-06"], [96, 0, 14, "2026-01-05", "2026-03-12"], [96, 3, 7, "2026-03-05", "2026-05-07"], [96, 10, 6, "2026-02-09", "2026-02-09"], [96, 48, 1, "2026-02-24", "2026-02-24"], [96, 21, 1, "2026-03-05", "2026-03-05"], [96, 20, 1, "2026-08-10", "2026-08-10"], [97, 0, 31, "2026-03-05", "2026-03-27"], [97, 12, 22, "2026-02-06", "2026-02-06"], [97, 10, 9, "2026-02-06", "2026-03-19"], [97, 1, 9, "2026-02-06", "2026-03-27"], [97, 14, 5, "2026-04-02", "2026-04-24"], [97, 2, 5, "2026-04-24", "2026-07-14"], [97, 5, 4, "2026-02-06", "2026-03-19"], [97, 8, 3, "2026-03-05", "2026-03-12"], [97, 7, 3, "2026-02-06", "2026-02-10"], [97, 3, 3, "2026-03-12", "2026-03-19"], [97, 11, 3, "2026-03-19", "2026-04-02"], [97, 20, 2, "2026-02-06", "2026-03-12"], [97, 28, 1, "2026-03-19", "2026-03-19"], [97, 17, 1, "2026-02-06", "2026-02-06"], [97, 22, 1, "2026-02-06", "2026-02-06"], [97, 6, 1, "2026-02-06", "2026-02-06"], [97, 27, 1, "2026-04-24", "2026-04-24"], [97, 30, 1, "2026-03-30", "2026-03-30"], [97, 25, 1, "2026-03-19", "2026-03-19"], [98, 0, 39, "2026-01-13", "2026-05-14"], [98, 1, 23, "2026-01-13", "2026-05-14"], [98, 7, 18, "2026-01-13", "2026-02-09"], [98, 11, 6, "2026-01-27", "2026-05-27"], [98, 14, 5, "2026-05-27", "2026-06-17"], [98, 3, 5, "2026-03-10", "2026-04-07"], [98, 2, 3, "2026-05-14", "2026-06-10"], [98, 30, 1, "2026-01-24", "2026-01-24"], [98, 27, 1, "2026-06-17", "2026-06-17"], [98, 16, 1, "2026-05-19", "2026-05-19"], [98, 25, 1, "2026-01-13", "2026-01-13"], [98, 28, 1, "2026-01-13", "2026-01-13"], [98, 17, 1, "2026-01-13", "2026-01-13"], [98, 22, 1, "2026-01-13", "2026-01-13"], [99, 2, 16, "2026-05-08", "2026-08-04"], [99, 1, 16, "2026-02-10", "2026-08-07"], [99, 4, 13, "2026-01-11", "2026-06-24"], [99, 3, 13, "2026-03-11", "2026-06-24"], [99, 5, 12, "2026-01-11", "2026-08-07"], [99, 6, 8, "2026-01-13", "2026-08-07"], [99, 11, 8, "2026-01-11", "2026-07-25"], [99, 16, 6, "2026-03-16", "2026-07-14"], [99, 0, 4, "2026-01-14", "2026-06-12"], [99, 30, 1, "2026-01-22", "2026-01-22"], [99, 23, 1, "2026-06-24", "2026-06-24"], [99, 49, 1, "2026-02-10", "2026-02-10"], [99, 7, 1, "2026-02-10", "2026-02-10"], [99, 9, 1, "2026-06-24", "2026-06-24"], [99, 15, 1, "2026-06-12", "2026-06-12"], [99, 25, 1, "2026-01-11", "2026-01-11"], [99, 20, 1, "2026-02-10", "2026-02-10"], [99, 28, 1, "2026-01-11", "2026-01-11"], [100, 0, 48, "2026-01-11", "2026-07-04"], [100, 2, 18, "2026-05-04", "2026-07-26"], [100, 5, 18, "2026-01-11", "2026-06-29"], [100, 1, 17, "2026-01-11", "2026-06-29"], [100, 17, 1, "2026-01-11", "2026-01-11"], [100, 20, 1, "2026-05-28", "2026-05-28"], [100, 22, 1, "2026-01-11", "2026-01-11"], [100, 48, 1, "2026-05-28", "2026-05-28"], [101, 0, 39, "2026-01-05", "2026-07-12"], [101, 1, 30, "2026-01-05", "2026-06-30"], [101, 9, 23, "2026-03-02", "2026-06-30"], [101, 2, 5, "2026-05-13", "2026-08-11"], [101, 8, 5, "2026-03-02", "2026-05-05"], [101, 16, 1, "2026-07-12", "2026-07-12"], [101, 10, 1, "2026-03-16", "2026-03-16"], [102, 3, 28, "2026-03-04", "2026-08-05"], [102, 0, 22, "2026-03-04", "2026-08-05"], [102, 2, 21, "2026-05-08", "2026-08-05"], [102, 1, 11, "2026-02-23", "2026-07-22"], [102, 4, 7, "2026-03-23", "2026-08-05"], [102, 11, 3, "2026-07-22", "2026-07-22"], [102, 8, 2, "2026-03-04", "2026-06-25"], [102, 30, 1, "2026-08-02", "2026-08-02"], [102, 20, 1, "2026-03-04", "2026-03-04"], [102, 13, 1, "2026-03-04", "2026-03-04"], [102, 22, 1, "2026-02-23", "2026-02-23"], [102, 17, 1, "2026-02-23", "2026-02-23"], [102, 10, 1, "2026-03-04", "2026-03-04"], [102, 25, 1, "2026-07-22", "2026-07-22"], [102, 28, 1, "2026-07-22", "2026-07-22"], [102, 27, 1, "2026-08-05", "2026-08-05"], [103, 0, 32, "2026-03-04", "2026-08-06"], [103, 1, 15, "2026-03-04", "2026-07-23"], [103, 2, 9, "2026-05-13", "2026-08-06"], [103, 3, 9, "2026-03-10", "2026-04-02"], [103, 8, 7, "2026-03-04", "2026-07-23"], [103, 11, 7, "2026-03-11", "2026-08-06"], [103, 9, 6, "2026-03-16", "2026-03-16"], [103, 14, 5, "2026-05-21", "2026-06-11"], [103, 19, 2, "2026-07-23", "2026-07-23"], [103, 13, 2, "2026-03-04", "2026-03-10"], [103, 29, 1, "2026-08-06", "2026-08-06"], [103, 28, 1, "2026-07-23", "2026-07-23"], [103, 51, 1, "2026-08-06", "2026-08-06"], [103, 27, 1, "2026-06-11", "2026-06-11"], [103, 30, 1, "2026-08-03", "2026-08-03"], [103, 25, 1, "2026-07-23", "2026-07-23"], [103, 17, 1, "2026-03-04", "2026-03-04"], [104, 0, 31, "2026-01-07", "2026-08-09"], [104, 6, 19, "2026-01-12", "2026-03-17"], [104, 1, 14, "2026-03-17", "2026-08-10"], [104, 2, 13, "2026-04-28", "2026-08-09"], [104, 5, 11, "2026-01-09", "2026-08-10"], [104, 3, 4, "2026-05-05", "2026-07-29"], [104, 9, 2, "2026-04-14", "2026-04-14"], [104, 23, 2, "2026-05-05", "2026-05-05"], [104, 47, 1, "2026-05-05", "2026-05-05"], [104, 20, 1, "2026-05-05", "2026-05-05"], [105, 1, 19, "2026-01-13", "2026-08-05"], [105, 2, 19, "2026-05-08", "2026-08-05"], [105, 3, 15, "2026-03-05", "2026-08-05"], [105, 0, 10, "2026-01-04", "2026-08-05"], [105, 14, 5, "2026-01-03", "2026-08-09"], [105, 6, 5, "2026-01-14", "2026-02-05"], [105, 7, 5, "2026-01-04", "2026-02-03"], [105, 5, 5, "2026-01-13", "2026-07-30"], [105, 4, 4, "2026-02-17", "2026-06-01"], [105, 18, 2, "2026-02-01", "2026-08-05"], [105, 11, 2, "2026-08-09", "2026-08-09"], [105, 20, 2, "2026-06-02", "2026-06-02"], [105, 19, 2, "2026-05-08", "2026-05-08"], [105, 51, 1, "2026-08-09", "2026-08-09"], [105, 30, 1, "2026-08-06", "2026-08-06"], [105, 27, 1, "2026-01-16", "2026-01-16"], [106, 0, 66, "2026-01-06", "2026-01-22"], [106, 1, 20, "2026-01-09", "2026-01-21"], [106, 14, 5, "2026-01-23", "2026-02-13"], [106, 11, 3, "2026-01-23", "2026-01-23"], [106, 27, 1, "2026-02-13", "2026-02-13"], [106, 10, 1, "2026-01-06", "2026-01-06"], [106, 18, 1, "2026-01-16", "2026-01-16"], [107, 0, 33, "2026-01-22", "2026-07-09"], [107, 1, 17, "2026-01-22", "2026-07-09"], [107, 11, 13, "2026-01-18", "2026-07-18"], [107, 10, 8, "2026-02-05", "2026-02-10"], [107, 14, 7, "2026-05-18", "2026-06-18"], [107, 7, 5, "2026-01-22", "2026-02-25"], [107, 2, 4, "2026-03-17", "2026-07-11"], [107, 9, 4, "2026-04-08", "2026-05-25"], [107, 3, 3, "2026-05-26", "2026-06-05"], [107, 46, 2, "2026-05-22", "2026-05-22"], [107, 15, 1, "2026-03-17", "2026-03-17"], [108, 9, 26, "2026-04-06", "2026-08-07"], [108, 1, 18, "2026-02-28", "2026-07-22"], [108, 2, 15, "2026-05-01", "2026-08-07"], [108, 5, 11, "2026-02-05", "2026-07-22"], [108, 3, 5, "2026-05-01", "2026-06-22"], [108, 0, 5, "2026-02-05", "2026-03-12"], [108, 8, 4, "2026-02-28", "2026-06-08"], [108, 6, 1, "2026-06-27", "2026-06-27"], [108, 7, 1, "2026-02-05", "2026-02-05"], [108, 17, 1, "2026-02-05", "2026-02-05"], [108, 51, 1, "2026-08-05", "2026-08-05"], [108, 29, 1, "2026-08-05", "2026-08-05"], [108, 11, 1, "2026-08-05", "2026-08-05"], [108, 28, 1, "2026-07-22", "2026-07-22"], [108, 20, 1, "2026-06-27", "2026-06-27"], [108, 30, 1, "2026-08-02", "2026-08-02"], [108, 25, 1, "2026-07-22", "2026-07-22"], [108, 22, 1, "2026-02-05", "2026-02-05"], [109, 2, 18, "2026-03-27", "2026-08-10"], [109, 1, 12, "2026-03-24", "2026-08-08"], [109, 5, 10, "2026-03-26", "2026-08-08"], [109, 10, 8, "2026-03-26", "2026-05-12"], [109, 0, 8, "2026-03-24", "2026-08-10"], [109, 3, 8, "2026-03-26", "2026-07-20"], [109, 4, 5, "2026-04-01", "2026-07-20"], [109, 12, 4, "2026-03-27", "2026-03-27"], [109, 9, 4, "2026-03-27", "2026-05-12"], [109, 13, 3, "2026-03-24", "2026-03-26"], [109, 18, 2, "2026-03-27", "2026-08-08"], [109, 15, 2, "2026-03-27", "2026-03-27"], [109, 20, 2, "2026-03-27", "2026-08-08"], [109, 24, 1, "2026-03-31", "2026-03-31"], [109, 48, 1, "2026-03-27", "2026-03-27"], [109, 21, 1, "2026-03-27", "2026-03-27"], [109, 6, 1, "2026-05-01", "2026-05-01"], [109, 25, 1, "2026-08-08", "2026-08-08"], [109, 29, 1, "2026-08-08", "2026-08-08"], [109, 32, 1, "2026-04-01", "2026-04-01"], [109, 8, 1, "2026-03-24", "2026-03-24"], [109, 17, 1, "2026-03-24", "2026-03-24"], [110, 1, 20, "2026-01-21", "2026-06-26"], [110, 0, 18, "2026-01-21", "2026-06-26"], [110, 24, 13, "2026-04-01", "2026-06-17"], [110, 2, 12, "2026-04-30", "2026-06-26"], [110, 38, 9, "2026-06-17", "2026-06-17"], [110, 3, 6, "2026-03-13", "2026-06-26"], [110, 4, 6, "2026-02-12", "2026-05-07"], [110, 8, 5, "2026-03-13", "2026-05-28"], [110, 21, 2, "2026-03-13", "2026-06-17"], [110, 33, 2, "2026-05-20", "2026-06-26"], [110, 23, 1, "2026-02-12", "2026-02-12"], [111, 0, 32, "2026-03-08", "2026-08-10"], [111, 1, 21, "2026-02-17", "2026-07-28"], [111, 2, 13, "2026-04-28", "2026-08-10"], [111, 11, 6, "2026-03-23", "2026-08-06"], [111, 3, 5, "2026-03-23", "2026-07-28"], [111, 8, 4, "2026-03-08", "2026-06-02"], [111, 10, 2, "2026-03-23", "2026-05-07"], [111, 34, 2, "2026-03-23", "2026-03-23"], [111, 25, 1, "2026-03-23", "2026-03-23"], [111, 23, 1, "2026-03-23", "2026-03-23"], [111, 30, 1, "2026-04-03", "2026-04-03"], [111, 29, 1, "2026-08-06", "2026-08-06"], [111, 7, 1, "2026-02-19", "2026-02-19"], [111, 20, 1, "2026-03-10", "2026-03-10"], [111, 28, 1, "2026-03-23", "2026-03-23"], [111, 43, 1, "2026-03-23", "2026-03-23"], [112, 33, 13, "2026-05-15", "2026-05-15"], [112, 2, 12, "2026-05-12", "2026-08-04"], [112, 24, 11, "2026-05-15", "2026-05-15"], [112, 34, 8, "2026-05-12", "2026-05-20"], [112, 43, 7, "2026-05-12", "2026-05-20"], [112, 13, 6, "2026-05-12", "2026-05-20"], [112, 0, 6, "2026-06-19", "2026-08-04"], [112, 1, 6, "2026-06-19", "2026-08-04"], [112, 35, 3, "2026-06-19", "2026-08-04"], [112, 5, 3, "2026-06-19", "2026-08-04"], [112, 6, 3, "2026-06-19", "2026-08-04"], [112, 8, 2, "2026-05-12", "2026-08-04"], [112, 22, 1, "2026-01-21", "2026-01-21"], [112, 44, 1, "2026-05-20", "2026-05-20"], [112, 3, 1, "2026-08-04", "2026-08-04"], [112, 27, 1, "2026-05-12", "2026-05-12"], [112, 42, 1, "2026-05-20", "2026-05-20"], [112, 17, 1, "2026-05-12", "2026-05-12"], [112, 4, 1, "2026-08-04", "2026-08-04"], [112, 53, 1, "2026-05-12", "2026-05-12"], [112, 10, 1, "2026-06-19", "2026-06-19"], [112, 11, 1, "2026-05-12", "2026-05-12"], [113, 2, 61, "2026-04-02", "2026-07-28"], [113, 1, 17, "2026-03-27", "2026-07-28"], [113, 63, 2, "2026-01-12", "2026-01-12"], [113, 4, 1, "2026-05-20", "2026-05-20"], [113, 10, 1, "2026-06-05", "2026-06-05"], [113, 5, 1, "2026-05-20", "2026-05-20"], [113, 15, 1, "2026-04-02", "2026-04-02"], [113, 7, 1, "2026-01-21", "2026-01-21"], [113, 18, 1, "2026-07-20", "2026-07-20"], [113, 3, 1, "2026-05-20", "2026-05-20"], [114, 2, 25, "2026-04-02", "2026-08-06"], [114, 4, 20, "2026-04-29", "2026-06-23"], [114, 1, 14, "2026-04-01", "2026-08-04"], [114, 0, 12, "2026-04-01", "2026-08-06"], [114, 32, 8, "2026-04-29", "2026-08-04"], [114, 15, 3, "2026-04-02", "2026-05-01"], [114, 3, 2, "2026-04-29", "2026-08-05"], [114, 8, 1, "2026-04-01", "2026-04-01"], [114, 16, 1, "2026-05-25", "2026-05-25"], [114, 31, 1, "2026-05-01", "2026-05-01"], [115, 0, 31, "2026-01-07", "2026-07-07"], [115, 3, 15, "2026-04-22", "2026-06-18"], [115, 2, 15, "2026-04-22", "2026-06-18"], [115, 1, 10, "2026-01-07", "2026-06-16"], [115, 9, 8, "2026-04-22", "2026-04-22"], [115, 7, 3, "2026-01-15", "2026-01-28"], [115, 8, 2, "2026-06-12", "2026-06-17"], [115, 20, 1, "2026-05-05", "2026-05-05"], [115, 5, 1, "2026-06-12", "2026-06-12"], [115, 10, 1, "2026-07-07", "2026-07-07"], [116, 1, 22, "2026-03-05", "2026-08-11"], [116, 0, 21, "2026-03-05", "2026-08-07"], [116, 2, 8, "2026-05-05", "2026-08-11"], [116, 3, 7, "2026-04-08", "2026-04-13"], [116, 13, 4, "2026-08-11", "2026-08-11"], [116, 8, 3, "2026-03-05", "2026-08-11"], [116, 5, 2, "2026-03-05", "2026-03-05"], [116, 34, 2, "2026-08-11", "2026-08-11"], [116, 11, 2, "2026-08-07", "2026-08-11"], [116, 43, 1, "2026-08-11", "2026-08-11"], [116, 48, 1, "2026-04-13", "2026-04-13"], [116, 17, 1, "2026-08-11", "2026-08-11"], [116, 25, 1, "2026-08-07", "2026-08-07"], [116, 42, 1, "2026-08-11", "2026-08-11"], [116, 29, 1, "2026-08-07", "2026-08-07"], [116, 69, 1, "2026-08-11", "2026-08-11"], [116, 67, 1, "2026-08-11", "2026-08-11"], [116, 44, 1, "2026-08-11", "2026-08-11"], [116, 20, 1, "2026-04-13", "2026-04-13"], [116, 70, 1, "2026-08-11", "2026-08-11"], [117, 0, 29, "2026-01-14", "2026-07-02"], [117, 1, 20, "2026-01-14", "2026-07-02"], [117, 3, 14, "2026-03-04", "2026-07-02"], [117, 7, 8, "2026-01-14", "2026-02-17"], [117, 2, 8, "2026-04-30", "2026-07-28"], [117, 10, 1, "2026-06-02", "2026-06-02"], [118, 2, 27, "2026-02-27", "2026-08-07"], [118, 1, 20, "2026-01-02", "2026-05-19"], [118, 15, 10, "2026-02-27", "2026-08-07"], [118, 18, 9, "2026-01-21", "2026-08-03"], [118, 13, 4, "2026-05-19", "2026-05-19"], [118, 0, 2, "2026-05-19", "2026-08-03"], [118, 34, 2, "2026-05-19", "2026-05-19"], [118, 10, 2, "2026-02-02", "2026-08-03"], [118, 43, 2, "2026-05-19", "2026-05-19"], [118, 42, 1, "2026-05-19", "2026-05-19"], [118, 33, 1, "2026-05-19", "2026-05-19"], [119, 0, 17, "2026-01-05", "2026-08-03"], [119, 3, 14, "2026-03-02", "2026-08-03"], [119, 2, 13, "2026-05-05", "2026-08-03"], [119, 1, 11, "2026-01-05", "2026-08-03"], [119, 4, 7, "2026-02-04", "2026-08-03"], [119, 34, 3, "2026-07-17", "2026-07-17"], [119, 13, 3, "2026-07-17", "2026-07-17"], [119, 24, 2, "2026-04-06", "2026-04-06"], [119, 11, 2, "2026-07-16", "2026-07-30"], [119, 21, 1, "2026-05-05", "2026-05-05"], [119, 43, 1, "2026-07-17", "2026-07-17"], [119, 25, 1, "2026-07-16", "2026-07-16"], [119, 62, 1, "2026-07-16", "2026-07-16"], [119, 28, 1, "2026-07-16", "2026-07-16"], [119, 30, 1, "2026-07-27", "2026-07-27"], [119, 18, 1, "2026-07-17", "2026-07-17"], [120, 0, 23, "2026-01-18", "2026-03-28"], [120, 3, 17, "2026-03-17", "2026-03-28"], [120, 1, 16, "2026-01-18", "2026-07-16"], [120, 9, 9, "2026-04-17", "2026-07-16"], [120, 24, 9, "2026-03-17", "2026-07-16"], [120, 2, 3, "2026-08-10", "2026-08-11"], [120, 38, 1, "2026-06-08", "2026-06-08"], [120, 13, 1, "2026-03-17", "2026-03-17"], [121, 0, 45, "2026-01-27", "2026-08-09"], [121, 2, 15, "2026-04-22", "2026-08-09"], [121, 1, 12, "2026-02-18", "2026-06-24"], [121, 8, 3, "2026-02-26", "2026-06-24"], [121, 3, 2, "2026-04-16", "2026-07-05"], [121, 20, 1, "2026-04-26", "2026-04-26"], [122, 0, 17, "2026-01-28", "2026-07-17"], [122, 7, 14, "2026-01-28", "2026-01-28"], [122, 3, 11, "2026-03-31", "2026-07-17"], [122, 10, 9, "2026-01-28", "2026-03-31"], [122, 1, 7, "2026-01-28", "2026-07-17"], [122, 4, 4, "2026-02-03", "2026-07-17"], [122, 5, 3, "2026-02-25", "2026-07-17"], [122, 2, 2, "2026-05-29", "2026-07-17"], [122, 11, 2, "2026-07-17", "2026-07-31"], [122, 51, 1, "2026-07-31", "2026-07-31"], [122, 30, 1, "2026-07-28", "2026-07-28"], [122, 28, 1, "2026-07-17", "2026-07-17"], [122, 13, 1, "2026-03-31", "2026-03-31"], [122, 29, 1, "2026-07-31", "2026-07-31"], [122, 12, 1, "2026-01-27", "2026-01-27"], [122, 25, 1, "2026-07-17", "2026-07-17"], [122, 17, 1, "2026-01-15", "2026-01-15"], [123, 0, 20, "2026-01-27", "2026-07-06"], [123, 1, 20, "2026-01-27", "2026-07-06"], [123, 2, 10, "2026-05-14", "2026-07-06"], [123, 14, 5, "2026-02-12", "2026-03-05"], [123, 7, 4, "2026-01-27", "2026-02-07"], [123, 3, 3, "2026-05-14", "2026-06-07"], [123, 11, 3, "2026-01-12", "2026-02-12"], [123, 20, 2, "2026-03-06", "2026-06-08"], [123, 8, 2, "2026-04-03", "2026-05-14"], [123, 10, 2, "2026-02-24", "2026-04-03"], [123, 5, 1, "2026-03-06", "2026-03-06"], [123, 21, 1, "2026-03-06", "2026-03-06"], [123, 27, 1, "2026-03-05", "2026-03-05"], [123, 30, 1, "2026-01-09", "2026-01-09"], [123, 23, 1, "2026-06-05", "2026-06-05"], [124, 0, 19, "2026-01-21", "2026-07-21"], [124, 3, 14, "2026-03-21", "2026-07-21"], [124, 1, 12, "2026-01-26", "2026-07-21"], [124, 2, 10, "2026-04-21", "2026-08-04"], [124, 7, 7, "2026-01-21", "2026-02-18"], [124, 29, 2, "2026-08-04", "2026-08-04"], [124, 11, 2, "2026-08-04", "2026-08-04"], [124, 18, 2, "2026-07-21", "2026-07-21"], [124, 51, 1, "2026-08-04", "2026-08-04"], [124, 15, 1, "2026-07-21", "2026-07-21"], [124, 25, 1, "2026-07-21", "2026-07-21"], [124, 30, 1, "2026-08-01", "2026-08-01"], [124, 28, 1, "2026-07-21", "2026-07-21"], [124, 20, 1, "2026-06-10", "2026-06-10"], [124, 31, 1, "2026-07-21", "2026-07-21"], [125, 1, 16, "2026-01-30", "2026-08-03"], [125, 4, 12, "2026-01-15", "2026-08-10"], [125, 0, 11, "2026-01-30", "2026-08-03"], [125, 2, 10, "2026-04-30", "2026-08-10"], [125, 3, 10, "2026-03-31", "2026-08-10"], [125, 11, 2, "2026-07-16", "2026-07-30"], [125, 8, 2, "2026-06-30", "2026-07-31"], [125, 13, 2, "2026-07-16", "2026-07-16"], [125, 30, 1, "2026-07-27", "2026-07-27"], [125, 44, 1, "2026-07-16", "2026-07-16"], [125, 24, 1, "2026-07-31", "2026-07-31"], [125, 28, 1, "2026-07-16", "2026-07-16"], [125, 25, 1, "2026-07-16", "2026-07-16"], [125, 42, 1, "2026-07-16", "2026-07-16"], [125, 33, 1, "2026-07-31", "2026-07-31"], [125, 34, 1, "2026-07-16", "2026-07-16"], [125, 26, 1, "2026-04-20", "2026-04-20"], [126, 0, 27, "2026-04-03", "2026-08-10"], [126, 1, 26, "2026-04-03", "2026-07-14"], [126, 2, 16, "2026-04-27", "2026-07-28"], [126, 3, 3, "2026-04-27", "2026-07-14"], [126, 8, 2, "2026-04-03", "2026-04-17"], [127, 0, 22, "2026-01-05", "2026-05-13"], [127, 1, 17, "2026-01-05", "2026-08-04"], [127, 9, 9, "2026-03-04", "2026-08-04"], [127, 11, 9, "2026-01-07", "2026-08-04"], [127, 14, 5, "2026-05-07", "2026-05-28"], [127, 29, 4, "2026-08-04", "2026-08-04"], [127, 2, 2, "2026-05-13", "2026-05-13"], [127, 8, 2, "2026-04-07", "2026-05-13"], [127, 25, 1, "2026-08-04", "2026-08-04"], [127, 3, 1, "2026-05-13", "2026-05-13"], [127, 27, 1, "2026-05-28", "2026-05-28"], [128, 10, 16, "2026-01-05", "2026-05-28"], [128, 3, 13, "2026-03-05", "2026-07-02"], [128, 1, 11, "2026-01-05", "2026-07-02"], [128, 2, 10, "2026-03-31", "2026-07-02"], [128, 9, 6, "2026-04-03", "2026-07-02"], [128, 0, 5, "2026-01-05", "2026-04-02"], [128, 4, 4, "2026-03-17", "2026-03-17"], [128, 15, 3, "2026-03-31", "2026-06-15"], [128, 7, 1, "2026-02-01", "2026-02-01"], [128, 8, 1, "2026-06-17", "2026-06-17"], [128, 20, 1, "2026-03-05", "2026-03-05"], [128, 21, 1, "2026-03-10", "2026-03-10"], [129, 0, 17, "2026-01-12", "2026-07-09"], [129, 2, 13, "2026-04-30", "2026-07-09"], [129, 3, 13, "2026-02-26", "2026-07-09"], [129, 1, 9, "2026-01-12", "2026-07-04"], [129, 4, 8, "2026-01-12", "2026-07-04"], [129, 11, 7, "2026-01-29", "2026-07-29"], [129, 7, 3, "2026-01-18", "2026-01-28"], [129, 10, 1, "2026-01-28", "2026-01-28"], [130, 0, 36, "2026-01-08", "2026-07-13"], [130, 2, 12, "2026-04-22", "2026-08-11"], [130, 1, 9, "2026-01-13", "2026-06-18"], [130, 12, 4, "2026-01-13", "2026-01-13"], [130, 14, 4, "2026-01-02", "2026-01-15"], [130, 3, 2, "2026-06-09", "2026-06-09"], [130, 7, 2, "2026-01-13", "2026-02-02"], [130, 27, 1, "2026-01-15", "2026-01-15"], [130, 8, 1, "2026-03-13", "2026-03-13"], [131, 1, 18, "2026-06-09", "2026-08-07"], [131, 0, 8, "2026-06-09", "2026-07-30"], [131, 5, 7, "2026-06-09", "2026-08-07"], [131, 2, 6, "2026-06-09", "2026-07-30"], [131, 6, 6, "2026-06-09", "2026-07-29"], [131, 10, 5, "2026-06-09", "2026-07-29"], [131, 9, 5, "2026-06-09", "2026-07-29"], [131, 13, 3, "2026-06-09", "2026-06-09"], [131, 8, 2, "2026-06-09", "2026-06-09"], [131, 23, 2, "2026-07-30", "2026-07-30"], [131, 3, 2, "2026-07-30", "2026-07-30"], [131, 30, 1, "2026-08-09", "2026-08-09"], [131, 20, 1, "2026-07-30", "2026-07-30"], [131, 11, 1, "2026-07-29", "2026-07-29"], [131, 17, 1, "2026-06-09", "2026-06-09"], [131, 25, 1, "2026-07-29", "2026-07-29"], [131, 28, 1, "2026-07-29", "2026-07-29"], [132, 0, 16, "2026-01-10", "2026-08-06"], [132, 3, 15, "2026-03-14", "2026-08-06"], [132, 1, 14, "2026-01-26", "2026-07-07"], [132, 4, 14, "2026-06-06", "2026-07-07"], [132, 2, 7, "2026-05-01", "2026-08-06"], [132, 5, 1, "2026-01-26", "2026-01-26"], [132, 32, 1, "2026-06-06", "2026-06-06"], [132, 7, 1, "2026-01-26", "2026-01-26"], [132, 8, 1, "2026-03-14", "2026-03-14"], [133, 6, 22, "2026-01-09", "2026-02-23"], [133, 0, 15, "2026-01-12", "2026-06-12"], [133, 1, 11, "2026-01-12", "2026-06-12"], [133, 2, 7, "2026-05-11", "2026-06-15"], [133, 8, 6, "2026-03-17", "2026-06-12"], [133, 5, 5, "2026-01-12", "2026-05-11"], [133, 9, 1, "2026-03-18", "2026-03-18"], [133, 3, 1, "2026-04-02", "2026-04-02"], [133, 11, 1, "2026-04-28", "2026-04-28"], [133, 21, 1, "2026-04-22", "2026-04-22"], [134, 1, 25, "2026-01-06", "2026-07-06"], [134, 0, 17, "2026-01-06", "2026-07-06"], [134, 2, 16, "2026-04-26", "2026-07-20"], [134, 8, 8, "2026-02-28", "2026-07-20"], [134, 3, 3, "2026-02-28", "2026-05-26"], [135, 4, 14, "2026-01-23", "2026-07-10"], [135, 0, 11, "2026-02-27", "2026-07-10"], [135, 1, 10, "2026-02-27", "2026-07-10"], [135, 3, 10, "2026-02-27", "2026-07-10"], [135, 5, 9, "2026-01-23", "2026-07-10"], [135, 2, 6, "2026-04-27", "2026-07-10"], [135, 19, 2, "2026-05-31", "2026-05-31"], [135, 26, 1, "2026-03-30", "2026-03-30"], [135, 7, 1, "2026-01-23", "2026-01-23"], [135, 12, 1, "2026-04-27", "2026-04-27"], [136, 1, 13, "2026-02-04", "2026-08-03"], [136, 2, 13, "2026-05-04", "2026-06-25"], [136, 0, 12, "2026-02-04", "2026-08-03"], [136, 12, 10, "2026-01-02", "2026-01-02"], [136, 4, 8, "2026-02-04", "2026-06-15"], [136, 3, 7, "2026-02-26", "2026-06-15"], [136, 10, 1, "2026-03-11", "2026-03-11"], [137, 0, 14, "2026-03-10", "2026-07-02"], [137, 14, 10, "2026-03-25", "2026-05-26"], [137, 1, 9, "2026-03-10", "2026-07-02"], [137, 11, 5, "2026-03-25", "2026-04-25"], [137, 5, 5, "2026-03-10", "2026-07-02"], [137, 10, 4, "2026-03-10", "2026-03-18"], [137, 2, 3, "2026-03-11", "2026-07-02"], [137, 20, 2, "2026-03-10", "2026-07-02"], [137, 34, 2, "2026-03-11", "2026-03-11"], [137, 30, 1, "2026-03-22", "2026-03-22"], [137, 27, 1, "2026-05-16", "2026-05-16"], [137, 15, 1, "2026-03-11", "2026-03-11"], [137, 28, 1, "2026-03-11", "2026-03-11"], [137, 25, 1, "2026-03-11", "2026-03-11"], [137, 8, 1, "2026-05-26", "2026-05-26"], [137, 46, 1, "2026-05-26", "2026-05-26"], [137, 3, 1, "2026-07-02", "2026-07-02"], [137, 48, 1, "2026-07-02", "2026-07-02"], [137, 43, 1, "2026-03-11", "2026-03-11"], [138, 2, 15, "2026-05-24", "2026-06-07"], [138, 13, 10, "2026-05-24", "2026-05-24"], [138, 0, 7, "2026-05-24", "2026-06-07"], [138, 10, 5, "2026-05-24", "2026-06-07"], [138, 14, 5, "2026-06-07", "2026-06-28"], [138, 11, 3, "2026-05-24", "2026-06-07"], [138, 3, 2, "2026-05-24", "2026-05-24"], [138, 42, 2, "2026-05-24", "2026-05-24"], [138, 1, 2, "2026-05-24", "2026-05-24"], [138, 44, 2, "2026-05-24", "2026-05-24"], [138, 34, 1, "2026-05-24", "2026-05-24"], [138, 18, 1, "2026-05-24", "2026-05-24"], [138, 17, 1, "2026-05-24", "2026-05-24"], [138, 28, 1, "2026-05-24", "2026-05-24"], [138, 30, 1, "2026-06-04", "2026-06-04"], [138, 15, 1, "2026-05-24", "2026-05-24"], [138, 25, 1, "2026-05-24", "2026-05-24"], [138, 8, 1, "2026-05-24", "2026-05-24"], [138, 27, 1, "2026-06-28", "2026-06-28"], [138, 4, 1, "2026-05-24", "2026-05-24"], [139, 1, 11, "2026-01-04", "2026-08-03"], [139, 2, 11, "2026-05-03", "2026-08-03"], [139, 11, 10, "2026-01-07", "2026-08-07"], [139, 3, 8, "2026-03-03", "2026-08-03"], [139, 0, 8, "2026-02-01", "2026-08-03"], [139, 4, 8, "2026-01-17", "2026-08-03"], [139, 10, 5, "2026-01-04", "2026-05-04"], [139, 18, 1, "2026-04-09", "2026-04-09"], [140, 0, 25, "2026-01-05", "2026-07-28"], [140, 1, 16, "2026-01-05", "2026-07-28"], [140, 2, 8, "2026-05-05", "2026-07-28"], [140, 8, 5, "2026-04-23", "2026-07-28"], [140, 11, 2, "2026-07-28", "2026-08-11"], [140, 7, 1, "2026-02-12", "2026-02-12"], [140, 28, 1, "2026-07-28", "2026-07-28"], [140, 51, 1, "2026-08-11", "2026-08-11"], [140, 3, 1, "2026-05-05", "2026-05-05"], [140, 30, 1, "2026-08-08", "2026-08-08"], [140, 25, 1, "2026-07-28", "2026-07-28"], [141, 1, 23, "2026-01-07", "2026-07-24"], [141, 0, 13, "2026-01-07", "2026-07-24"], [141, 2, 7, "2026-05-13", "2026-07-24"], [141, 12, 5, "2026-07-24", "2026-07-24"], [141, 11, 3, "2026-07-24", "2026-08-07"], [141, 19, 2, "2026-07-24", "2026-07-24"], [141, 15, 1, "2026-07-24", "2026-07-24"], [141, 14, 1, "2026-08-07", "2026-08-07"], [141, 28, 1, "2026-07-24", "2026-07-24"], [141, 18, 1, "2026-07-24", "2026-07-24"], [141, 30, 1, "2026-08-04", "2026-08-04"], [141, 8, 1, "2026-07-07", "2026-07-07"], [141, 51, 1, "2026-08-07", "2026-08-07"], [141, 3, 1, "2026-07-24", "2026-07-24"], [141, 25, 1, "2026-07-24", "2026-07-24"], [142, 1, 21, "2026-01-16", "2026-08-04"], [142, 0, 17, "2026-01-16", "2026-08-04"], [142, 2, 9, "2026-05-08", "2026-08-04"], [142, 10, 7, "2026-01-15", "2026-03-14"], [142, 3, 2, "2026-04-08", "2026-05-08"], [142, 11, 1, "2026-07-30", "2026-07-30"], [142, 25, 1, "2026-07-30", "2026-07-30"], [142, 28, 1, "2026-07-30", "2026-07-30"], [142, 30, 1, "2026-08-10", "2026-08-10"], [143, 2, 39, "2026-04-03", "2026-08-04"], [143, 15, 6, "2026-04-03", "2026-04-24"], [143, 1, 6, "2026-07-09", "2026-07-09"], [143, 18, 6, "2026-01-05", "2026-01-19"], [143, 5, 1, "2026-02-25", "2026-02-25"], [143, 20, 1, "2026-02-25", "2026-02-25"], [143, 7, 1, "2026-01-06", "2026-01-06"], [144, 1, 11, "2026-02-15", "2026-04-01"], [144, 2, 8, "2026-04-01", "2026-05-03"], [144, 3, 7, "2026-03-18", "2026-04-25"], [144, 5, 6, "2026-02-15", "2026-04-25"], [144, 20, 6, "2026-04-25", "2026-04-25"], [144, 11, 3, "2026-04-25", "2026-05-03"], [144, 6, 3, "2026-02-15", "2026-02-15"], [144, 54, 3, "2026-04-25", "2026-04-25"], [144, 48, 2, "2026-02-15", "2026-04-25"], [144, 27, 2, "2026-05-11", "2026-05-11"], [144, 15, 2, "2026-04-01", "2026-04-25"], [144, 30, 1, "2026-05-06", "2026-05-06"], [144, 28, 1, "2026-04-25", "2026-04-25"], [144, 62, 1, "2026-04-25", "2026-04-25"], [144, 25, 1, "2026-04-25", "2026-04-25"], [144, 24, 1, "2026-04-01", "2026-04-01"], [144, 17, 1, "2026-02-15", "2026-02-15"], [144, 16, 1, "2026-04-25", "2026-04-25"], [145, 1, 11, "2026-03-26", "2026-06-17"], [145, 3, 10, "2026-03-26", "2026-06-17"], [145, 0, 9, "2026-03-26", "2026-06-17"], [145, 4, 9, "2026-03-26", "2026-06-17"], [145, 8, 8, "2026-03-26", "2026-06-17"], [145, 21, 6, "2026-03-26", "2026-03-26"], [145, 2, 3, "2026-05-11", "2026-06-17"], [145, 20, 1, "2026-03-31", "2026-03-31"], [145, 9, 1, "2026-04-18", "2026-04-18"], [146, 0, 21, "2026-01-07", "2026-04-16"], [146, 1, 10, "2026-01-07", "2026-04-16"], [146, 7, 10, "2026-01-07", "2026-02-03"], [146, 3, 6, "2026-03-20", "2026-04-16"], [146, 8, 2, "2026-03-20", "2026-04-16"], [146, 21, 2, "2026-04-16", "2026-04-16"], [146, 24, 2, "2026-04-03", "2026-04-03"], [146, 33, 2, "2026-03-20", "2026-04-03"], [146, 5, 1, "2026-02-03", "2026-02-03"], [146, 20, 1, "2026-02-03", "2026-02-03"], [147, 0, 31, "2026-03-05", "2026-04-25"], [147, 5, 9, "2026-04-07", "2026-04-07"], [147, 3, 6, "2026-03-17", "2026-05-04"], [147, 1, 3, "2026-03-05", "2026-04-25"], [147, 21, 2, "2026-04-07", "2026-04-07"], [147, 23, 2, "2026-05-04", "2026-05-04"], [147, 2, 2, "2026-05-04", "2026-05-18"], [147, 47, 1, "2026-05-04", "2026-05-04"], [147, 10, 1, "2026-04-07", "2026-04-07"], [148, 3, 13, "2026-02-26", "2026-04-27"], [148, 0, 12, "2026-01-14", "2026-07-27"], [148, 4, 10, "2026-02-26", "2026-04-27"], [148, 2, 9, "2026-04-30", "2026-07-27"], [148, 1, 7, "2026-02-03", "2026-06-19"], [148, 26, 2, "2026-03-21", "2026-04-03"], [148, 17, 1, "2026-03-02", "2026-03-02"], [148, 5, 1, "2026-02-03", "2026-02-03"], [148, 6, 1, "2026-02-03", "2026-02-03"], [148, 13, 1, "2026-03-02", "2026-03-02"], [149, 0, 33, "2026-01-19", "2026-07-15"], [149, 1, 13, "2026-01-19", "2026-07-15"], [149, 2, 7, "2026-04-30", "2026-07-16"], [149, 8, 1, "2026-03-05", "2026-03-05"], [150, 1, 17, "2026-01-15", "2026-07-07"], [150, 0, 16, "2026-01-15", "2026-07-16"], [150, 2, 13, "2026-04-21", "2026-07-16"], [150, 8, 4, "2026-04-28", "2026-07-07"], [150, 3, 1, "2026-03-10", "2026-03-10"], [150, 7, 1, "2026-01-26", "2026-01-26"], [150, 9, 1, "2026-04-20", "2026-04-20"], [151, 0, 29, "2026-01-06", "2026-07-02"], [151, 1, 15, "2026-01-06", "2026-07-02"], [151, 2, 6, "2026-05-06", "2026-08-04"], [151, 7, 2, "2026-01-06", "2026-02-06"], [151, 3, 1, "2026-02-26", "2026-02-26"], [152, 0, 22, "2026-03-12", "2026-06-22"], [152, 3, 14, "2026-03-12", "2026-06-22"], [152, 1, 12, "2026-03-12", "2026-06-22"], [152, 2, 5, "2026-04-21", "2026-06-22"], [153, 0, 13, "2026-01-14", "2026-08-10"], [153, 1, 11, "2026-03-14", "2026-08-09"], [153, 5, 11, "2026-01-31", "2026-08-09"], [153, 4, 6, "2026-01-14", "2026-08-09"], [153, 3, 5, "2026-06-19", "2026-08-09"], [153, 2, 4, "2026-06-19", "2026-08-10"], [153, 29, 1, "2026-08-09", "2026-08-09"], [153, 25, 1, "2026-08-09", "2026-08-09"], [153, 20, 1, "2026-03-14", "2026-03-14"], [154, 0, 12, "2026-03-17", "2026-06-24"], [154, 2, 11, "2026-03-18", "2026-06-24"], [154, 1, 10, "2026-03-17", "2026-06-24"], [154, 10, 4, "2026-03-18", "2026-06-24"], [154, 5, 4, "2026-03-17", "2026-06-24"], [154, 3, 3, "2026-03-18", "2026-06-24"], [154, 8, 2, "2026-03-18", "2026-06-24"], [154, 13, 2, "2026-03-17", "2026-03-17"], [154, 22, 1, "2026-03-17", "2026-03-17"], [154, 15, 1, "2026-03-18", "2026-03-18"], [154, 20, 1, "2026-03-17", "2026-03-17"], [154, 17, 1, "2026-03-17", "2026-03-17"], [155, 0, 28, "2026-01-02", "2026-04-03"], [155, 7, 9, "2026-01-02", "2026-02-16"], [155, 3, 7, "2026-03-01", "2026-03-15"], [155, 1, 7, "2026-01-16", "2026-03-15"], [155, 10, 1, "2026-01-02", "2026-01-02"], [156, 0, 15, "2026-07-14", "2026-08-05"], [156, 3, 13, "2026-07-14", "2026-08-05"], [156, 1, 10, "2026-07-14", "2026-07-14"], [156, 2, 7, "2026-07-30", "2026-08-05"], [156, 13, 2, "2026-07-14", "2026-07-14"], [156, 17, 1, "2026-07-14", "2026-07-14"], [156, 48, 1, "2026-07-30", "2026-07-30"], [156, 8, 1, "2026-07-14", "2026-07-14"], [156, 20, 1, "2026-07-30", "2026-07-30"], [156, 21, 1, "2026-07-14", "2026-07-14"], [157, 0, 12, "2026-01-05", "2026-07-02"], [157, 5, 9, "2026-02-24", "2026-06-15"], [157, 1, 9, "2026-03-12", "2026-06-15"], [157, 11, 7, "2026-01-27", "2026-07-27"], [157, 3, 7, "2026-03-12", "2026-06-08"], [157, 2, 5, "2026-04-30", "2026-07-02"], [157, 7, 1, "2026-02-24", "2026-02-24"], [157, 6, 1, "2026-02-24", "2026-02-24"], [158, 2, 27, "2026-07-31", "2026-07-31"], [158, 12, 7, "2026-07-31", "2026-07-31"], [158, 15, 7, "2026-07-31", "2026-07-31"], [158, 33, 2, "2026-07-31", "2026-07-31"], [158, 36, 1, "2026-07-31", "2026-07-31"], [158, 22, 1, "2026-07-31", "2026-07-31"], [158, 45, 1, "2026-07-31", "2026-07-31"], [158, 13, 1, "2026-07-31", "2026-07-31"], [158, 18, 1, "2026-07-31", "2026-07-31"], [158, 8, 1, "2026-07-31", "2026-07-31"], [158, 17, 1, "2026-07-31", "2026-07-31"], [158, 24, 1, "2026-07-31", "2026-07-31"], [159, 0, 20, "2026-01-12", "2026-07-14"], [159, 11, 8, "2026-01-14", "2026-06-14"], [159, 1, 6, "2026-02-27", "2026-05-11"], [159, 2, 5, "2026-04-24", "2026-07-14"], [159, 14, 5, "2026-06-14", "2026-07-05"], [159, 20, 3, "2026-02-27", "2026-05-11"], [159, 33, 1, "2026-02-27", "2026-02-27"], [159, 3, 1, "2026-03-13", "2026-03-13"], [159, 27, 1, "2026-07-05", "2026-07-05"], [160, 2, 20, "2026-05-10", "2026-08-10"], [160, 0, 8, "2026-01-12", "2026-07-07"], [160, 1, 5, "2026-05-19", "2026-06-30"], [160, 14, 4, "2026-01-03", "2026-01-16"], [160, 3, 3, "2026-06-30", "2026-06-30"], [160, 10, 2, "2026-05-19", "2026-06-09"], [160, 5, 2, "2026-05-19", "2026-06-30"], [160, 8, 2, "2026-05-19", "2026-06-30"], [160, 9, 1, "2026-06-09", "2026-06-09"], [160, 15, 1, "2026-08-10", "2026-08-10"], [160, 27, 1, "2026-01-16", "2026-01-16"], [161, 12, 15, "2026-02-02", "2026-02-02"], [161, 0, 11, "2026-02-02", "2026-02-27"], [161, 3, 5, "2026-02-27", "2026-02-27"], [161, 10, 5, "2026-02-02", "2026-02-04"], [161, 7, 5, "2026-02-02", "2026-02-02"], [161, 1, 2, "2026-02-02", "2026-02-27"], [161, 2, 2, "2026-07-16", "2026-07-16"], [161, 17, 1, "2026-02-02", "2026-02-02"], [161, 4, 1, "2026-02-27", "2026-02-27"], [161, 5, 1, "2026-02-02", "2026-02-02"], [161, 6, 1, "2026-02-02", "2026-02-02"], [162, 0, 18, "2026-01-09", "2026-03-09"], [162, 1, 6, "2026-01-19", "2026-02-14"], [162, 4, 4, "2026-01-19", "2026-01-26"], [162, 11, 3, "2026-01-19", "2026-01-30"], [162, 7, 3, "2026-01-19", "2026-02-14"], [162, 10, 2, "2026-01-19", "2026-03-02"], [162, 5, 2, "2026-01-09", "2026-01-19"], [162, 23, 2, "2026-01-31", "2026-01-31"], [162, 22, 1, "2026-01-09", "2026-01-09"], [162, 17, 1, "2026-01-09", "2026-01-09"], [162, 28, 1, "2026-01-19", "2026-01-19"], [162, 47, 1, "2026-01-31", "2026-01-31"], [162, 30, 1, "2026-01-30", "2026-01-30"], [162, 27, 1, "2026-02-02", "2026-02-02"], [162, 25, 1, "2026-01-19", "2026-01-19"], [162, 20, 1, "2026-01-19", "2026-01-19"], [163, 3, 13, "2026-04-01", "2026-06-29"], [163, 0, 9, "2026-03-28", "2026-04-03"], [163, 1, 6, "2026-03-28", "2026-06-29"], [163, 9, 5, "2026-04-07", "2026-06-29"], [163, 4, 5, "2026-04-01", "2026-06-29"], [163, 5, 3, "2026-04-08", "2026-06-29"], [163, 8, 2, "2026-04-02", "2026-04-02"], [163, 6, 1, "2026-06-29", "2026-06-29"], [163, 10, 1, "2026-04-08", "2026-04-08"], [163, 23, 1, "2026-04-20", "2026-04-20"], [163, 32, 1, "2026-04-01", "2026-04-01"], [163, 13, 1, "2026-03-28", "2026-03-28"], [164, 2, 19, "2026-06-23", "2026-07-14"], [164, 15, 6, "2026-06-23", "2026-07-09"], [164, 14, 5, "2026-07-07", "2026-07-28"], [164, 11, 4, "2026-07-07", "2026-07-09"], [164, 13, 2, "2026-06-23", "2026-06-23"], [164, 31, 1, "2026-06-23", "2026-06-23"], [164, 0, 1, "2026-06-23", "2026-06-23"], [164, 30, 1, "2026-07-04", "2026-07-04"], [164, 28, 1, "2026-06-23", "2026-06-23"], [164, 17, 1, "2026-06-23", "2026-06-23"], [164, 25, 1, "2026-06-23", "2026-06-23"], [164, 54, 1, "2026-06-23", "2026-06-23"], [164, 27, 1, "2026-07-28", "2026-07-28"], [164, 34, 1, "2026-06-23", "2026-06-23"], [164, 42, 1, "2026-06-23", "2026-06-23"], [164, 44, 1, "2026-06-23", "2026-06-23"], [165, 7, 16, "2026-01-12", "2026-02-18"], [165, 11, 7, "2026-01-04", "2026-02-22"], [165, 4, 6, "2026-01-06", "2026-02-19"], [165, 20, 3, "2026-02-05", "2026-02-05"], [165, 5, 3, "2026-01-12", "2026-02-18"], [165, 14, 3, "2026-02-04", "2026-02-18"], [165, 26, 2, "2026-02-19", "2026-02-19"], [165, 6, 2, "2026-01-13", "2026-02-18"], [165, 10, 1, "2026-01-15", "2026-01-15"], [165, 18, 1, "2026-01-13", "2026-01-13"], [165, 0, 1, "2026-01-16", "2026-01-16"], [165, 27, 1, "2026-03-04", "2026-03-04"], [165, 1, 1, "2026-01-12", "2026-01-12"], [166, 2, 38, "2026-04-22", "2026-07-16"], [166, 18, 6, "2026-01-14", "2026-06-15"], [166, 15, 1, "2026-06-15", "2026-06-15"], [166, 17, 1, "2026-01-14", "2026-01-14"], [167, 0, 23, "2026-01-05", "2026-06-25"], [167, 1, 10, "2026-01-29", "2026-06-25"], [167, 2, 5, "2026-04-21", "2026-08-05"], [167, 12, 4, "2026-01-29", "2026-01-29"], [167, 5, 2, "2026-01-05", "2026-01-05"], [167, 17, 1, "2026-08-05", "2026-08-05"], [167, 13, 1, "2026-08-05", "2026-08-05"], [168, 2, 14, "2026-03-16", "2026-07-21"], [168, 0, 6, "2026-01-20", "2026-05-20"], [168, 1, 5, "2026-01-20", "2026-05-20"], [168, 4, 5, "2026-01-20", "2026-05-26"], [168, 10, 4, "2026-02-13", "2026-07-21"], [168, 3, 4, "2026-03-11", "2026-05-26"], [168, 15, 3, "2026-03-16", "2026-03-24"], [168, 9, 2, "2026-03-16", "2026-04-17"], [168, 18, 1, "2026-03-23", "2026-03-23"], [168, 12, 1, "2026-03-16", "2026-03-16"], [169, 1, 10, "2026-02-09", "2026-08-04"], [169, 5, 7, "2026-02-09", "2026-08-04"], [169, 10, 6, "2026-02-09", "2026-05-08"], [169, 2, 4, "2026-05-07", "2026-08-04"], [169, 12, 4, "2026-02-09", "2026-02-09"], [169, 0, 3, "2026-03-10", "2026-07-03"], [169, 29, 3, "2026-08-04", "2026-08-04"], [169, 6, 2, "2026-02-10", "2026-02-11"], [169, 9, 1, "2026-05-08", "2026-05-08"], [169, 17, 1, "2026-02-09", "2026-02-09"], [169, 18, 1, "2026-08-04", "2026-08-04"], [169, 25, 1, "2026-08-04", "2026-08-04"], [169, 22, 1, "2026-02-09", "2026-02-09"], [170, 2, 14, "2026-04-04", "2026-08-06"], [170, 18, 6, "2026-02-15", "2026-04-08"], [170, 10, 5, "2026-02-18", "2026-04-11"], [170, 1, 4, "2026-02-18", "2026-07-27"], [170, 15, 3, "2026-04-04", "2026-07-07"], [170, 3, 3, "2026-02-26", "2026-04-11"], [170, 26, 2, "2026-02-18", "2026-04-11"], [170, 4, 2, "2026-02-18", "2026-04-11"], [170, 20, 1, "2026-02-18", "2026-02-18"], [170, 5, 1, "2026-07-27", "2026-07-27"], [170, 17, 1, "2026-02-15", "2026-02-15"], [170, 9, 1, "2026-07-27", "2026-07-27"], [170, 7, 1, "2026-02-18", "2026-02-18"], [171, 1, 13, "2026-01-14", "2026-06-30"], [171, 0, 8, "2026-01-14", "2026-06-30"], [171, 11, 8, "2026-01-17", "2026-07-17"], [171, 4, 6, "2026-01-14", "2026-04-30"], [171, 3, 4, "2026-03-28", "2026-04-30"], [171, 2, 3, "2026-04-30", "2026-06-30"], [171, 9, 1, "2026-04-30", "2026-04-30"], [171, 8, 1, "2026-03-28", "2026-03-28"], [172, 0, 14, "2026-01-05", "2026-04-08"], [172, 6, 8, "2026-03-05", "2026-03-31"], [172, 1, 8, "2026-01-05", "2026-04-08"], [172, 2, 6, "2026-05-16", "2026-05-16"], [172, 5, 4, "2026-03-05", "2026-03-31"], [172, 8, 3, "2026-02-26", "2026-03-31"], [172, 9, 1, "2026-03-05", "2026-03-05"], [173, 0, 17, "2026-01-05", "2026-06-30"], [173, 1, 8, "2026-01-05", "2026-06-30"], [173, 4, 6, "2026-01-02", "2026-05-31"], [173, 10, 4, "2026-01-31", "2026-02-01"], [173, 3, 4, "2026-03-01", "2026-05-31"], [173, 2, 3, "2026-05-31", "2026-07-22"], [173, 7, 1, "2026-01-05", "2026-01-05"], [174, 12, 31, "2026-01-03", "2026-01-03"], [174, 14, 8, "2026-01-03", "2026-02-12"], [174, 11, 3, "2026-01-12", "2026-01-22"], [174, 27, 1, "2026-02-12", "2026-02-12"], [175, 1, 10, "2026-02-04", "2026-07-14"], [175, 0, 8, "2026-02-04", "2026-06-12"], [175, 2, 7, "2026-04-22", "2026-08-07"], [175, 5, 7, "2026-02-04", "2026-07-14"], [175, 6, 6, "2026-02-08", "2026-07-31"], [175, 9, 3, "2026-03-12", "2026-07-31"], [175, 8, 1, "2026-04-22", "2026-04-22"], [176, 2, 13, "2026-05-18", "2026-08-11"], [176, 0, 8, "2026-06-22", "2026-07-07"], [176, 1, 7, "2026-05-18", "2026-06-22"], [176, 5, 4, "2026-05-18", "2026-06-04"], [176, 3, 3, "2026-06-04", "2026-06-22"], [176, 13, 2, "2026-05-18", "2026-05-18"], [176, 8, 1, "2026-05-18", "2026-05-18"], [176, 6, 1, "2026-06-04", "2026-06-04"], [176, 17, 1, "2026-05-18", "2026-05-18"], [176, 22, 1, "2026-05-18", "2026-05-18"], [177, 0, 10, "2026-01-06", "2026-05-07"], [177, 4, 9, "2026-01-06", "2026-04-14"], [177, 3, 8, "2026-03-01", "2026-05-07"], [177, 7, 5, "2026-01-06", "2026-02-08"], [177, 1, 4, "2026-02-08", "2026-04-14"], [177, 2, 4, "2026-03-01", "2026-05-07"], [177, 15, 1, "2026-03-01", "2026-03-01"], [178, 10, 18, "2026-03-27", "2026-03-31"], [178, 0, 12, "2026-03-27", "2026-03-30"], [178, 5, 4, "2026-03-27", "2026-03-31"], [178, 1, 3, "2026-03-27", "2026-03-30"], [178, 3, 2, "2026-03-30", "2026-03-30"], [178, 9, 2, "2026-03-31", "2026-03-31"], [179, 9, 11, "2026-04-06", "2026-08-04"], [179, 2, 10, "2026-05-08", "2026-08-06"], [179, 5, 9, "2026-04-06", "2026-08-04"], [179, 1, 5, "2026-04-06", "2026-06-10"], [179, 15, 2, "2026-05-08", "2026-05-08"], [179, 20, 1, "2026-04-07", "2026-04-07"], [179, 8, 1, "2026-04-06", "2026-04-06"], [179, 6, 1, "2026-04-17", "2026-04-17"], [180, 0, 19, "2026-01-05", "2026-03-16"], [180, 1, 10, "2026-01-05", "2026-03-10"], [180, 11, 3, "2026-01-11", "2026-02-21"], [180, 14, 3, "2026-01-04", "2026-01-11"], [180, 3, 2, "2026-03-10", "2026-03-10"], [180, 8, 1, "2026-03-10", "2026-03-10"], [180, 7, 1, "2026-01-20", "2026-01-20"], [180, 20, 1, "2026-03-10", "2026-03-10"], [181, 0, 11, "2026-01-07", "2026-07-15"], [181, 1, 9, "2026-01-07", "2026-07-15"], [181, 14, 6, "2026-01-01", "2026-02-01"], [181, 11, 3, "2026-01-01", "2026-01-11"], [181, 7, 3, "2026-01-13", "2026-02-01"], [181, 5, 2, "2026-07-10", "2026-07-15"], [181, 2, 2, "2026-07-10", "2026-07-15"], [181, 8, 1, "2026-07-10", "2026-07-10"], [181, 10, 1, "2026-02-01", "2026-02-01"], [181, 27, 1, "2026-02-01", "2026-02-01"], [182, 0, 13, "2026-03-10", "2026-08-06"], [182, 1, 8, "2026-02-25", "2026-08-05"], [182, 3, 4, "2026-03-10", "2026-08-06"], [182, 2, 3, "2026-05-20", "2026-08-06"], [182, 5, 2, "2026-08-06", "2026-08-06"], [182, 20, 1, "2026-02-25", "2026-02-25"], [182, 16, 1, "2026-08-06", "2026-08-06"], [182, 25, 1, "2026-07-30", "2026-07-30"], [182, 21, 1, "2026-08-06", "2026-08-06"], [182, 30, 1, "2026-08-10", "2026-08-10"], [182, 28, 1, "2026-07-30", "2026-07-30"], [182, 11, 1, "2026-07-30", "2026-07-30"], [182, 10, 1, "2026-08-06", "2026-08-06"], [183, 0, 12, "2026-01-05", "2026-08-06"], [183, 1, 11, "2026-01-05", "2026-08-06"], [183, 5, 5, "2026-02-04", "2026-07-04"], [183, 2, 5, "2026-05-07", "2026-08-06"], [183, 29, 4, "2026-08-06", "2026-08-06"], [183, 25, 1, "2026-08-06", "2026-08-06"], [184, 0, 14, "2026-01-06", "2026-05-26"], [184, 1, 10, "2026-01-06", "2026-02-11"], [184, 7, 6, "2026-01-08", "2026-02-11"], [184, 10, 4, "2026-02-02", "2026-03-07"], [184, 2, 3, "2026-05-26", "2026-07-03"], [185, 0, 9, "2026-04-01", "2026-07-22"], [185, 2, 7, "2026-04-29", "2026-07-22"], [185, 1, 6, "2026-04-01", "2026-07-22"], [185, 3, 3, "2026-04-01", "2026-04-29"], [185, 8, 3, "2026-04-29", "2026-07-22"], [185, 11, 2, "2026-07-22", "2026-08-05"], [185, 29, 1, "2026-08-05", "2026-08-05"], [185, 30, 1, "2026-08-02", "2026-08-02"], [185, 25, 1, "2026-07-22", "2026-07-22"], [185, 20, 1, "2026-04-01", "2026-04-01"], [185, 51, 1, "2026-08-05", "2026-08-05"], [185, 28, 1, "2026-07-22", "2026-07-22"], [185, 48, 1, "2026-04-01", "2026-04-01"], [186, 12, 24, "2026-03-02", "2026-03-02"], [186, 6, 7, "2026-01-26", "2026-04-27"], [186, 0, 1, "2026-01-26", "2026-01-26"], [186, 5, 1, "2026-01-26", "2026-01-26"], [186, 9, 1, "2026-04-27", "2026-04-27"], [186, 10, 1, "2026-01-26", "2026-01-26"], [187, 0, 8, "2026-01-05", "2026-04-19"], [187, 7, 8, "2026-01-05", "2026-02-02"], [187, 14, 5, "2026-01-24", "2026-02-14"], [187, 1, 5, "2026-01-05", "2026-02-12"], [187, 4, 4, "2026-01-03", "2026-02-02"], [187, 11, 2, "2026-01-24", "2026-01-24"], [187, 6, 1, "2026-05-18", "2026-05-18"], [187, 9, 1, "2026-05-18", "2026-05-18"], [187, 27, 1, "2026-02-14", "2026-02-14"], [188, 0, 13, "2026-03-04", "2026-07-05"], [188, 1, 11, "2026-03-04", "2026-07-05"], [188, 8, 5, "2026-03-04", "2026-03-20"], [188, 2, 4, "2026-04-28", "2026-07-05"], [188, 3, 2, "2026-03-10", "2026-04-29"], [189, 0, 17, "2026-01-08", "2026-08-10"], [189, 1, 10, "2026-01-08", "2026-06-19"], [189, 2, 7, "2026-05-02", "2026-08-10"], [189, 3, 1, "2026-03-08", "2026-03-08"], [190, 10, 11, "2026-01-07", "2026-03-19"], [190, 0, 8, "2026-01-07", "2026-01-12"], [190, 7, 6, "2026-01-12", "2026-01-12"], [190, 4, 2, "2026-01-07", "2026-01-07"], [190, 6, 2, "2026-03-19", "2026-03-19"], [190, 3, 2, "2026-03-19", "2026-03-19"], [190, 26, 2, "2026-01-07", "2026-01-07"], [190, 18, 1, "2026-01-30", "2026-01-30"], [190, 5, 1, "2026-01-07", "2026-01-07"], [191, 1, 11, "2026-01-22", "2026-07-06"], [191, 2, 7, "2026-04-28", "2026-07-14"], [191, 0, 6, "2026-01-22", "2026-07-06"], [191, 5, 3, "2026-05-27", "2026-06-12"], [191, 7, 3, "2026-02-04", "2026-02-23"], [191, 12, 2, "2026-08-07", "2026-08-07"], [191, 8, 1, "2026-04-28", "2026-04-28"], [191, 17, 1, "2026-02-04", "2026-02-04"], [192, 0, 15, "2026-03-16", "2026-07-12"], [192, 1, 7, "2026-03-16", "2026-07-12"], [192, 9, 4, "2026-04-13", "2026-04-14"], [192, 2, 3, "2026-07-12", "2026-08-03"], [192, 13, 2, "2026-03-16", "2026-03-16"], [192, 8, 1, "2026-03-24", "2026-03-24"], [192, 3, 1, "2026-04-02", "2026-04-02"], [192, 17, 1, "2026-03-16", "2026-03-16"], [193, 0, 8, "2026-01-09", "2026-03-04"], [193, 20, 7, "2026-03-04", "2026-03-05"], [193, 1, 6, "2026-01-09", "2026-03-05"], [193, 10, 5, "2026-03-04", "2026-03-04"], [193, 2, 3, "2026-08-07", "2026-08-07"], [193, 3, 2, "2026-03-04", "2026-03-05"], [193, 9, 1, "2026-03-04", "2026-03-04"], [193, 5, 1, "2026-01-09", "2026-01-09"], [193, 7, 1, "2026-01-09", "2026-01-09"], [194, 1, 12, "2026-01-19", "2026-06-18"], [194, 0, 11, "2026-01-19", "2026-06-18"], [194, 8, 5, "2026-03-01", "2026-06-18"], [194, 2, 3, "2026-05-20", "2026-06-18"], [194, 10, 1, "2026-05-20", "2026-05-20"], [194, 7, 1, "2026-01-19", "2026-01-19"], [194, 20, 1, "2026-01-20", "2026-01-20"], [195, 0, 13, "2026-01-13", "2026-07-12"], [195, 1, 9, "2026-01-13", "2026-07-12"], [195, 2, 5, "2026-04-23", "2026-07-12"], [195, 3, 3, "2026-04-23", "2026-06-07"], [195, 5, 3, "2026-01-13", "2026-04-23"], [196, 0, 11, "2026-01-06", "2026-03-13"], [196, 11, 9, "2026-01-26", "2026-07-26"], [196, 4, 6, "2026-01-16", "2026-02-10"], [196, 5, 4, "2026-01-06", "2026-02-06"], [196, 14, 1, "2026-06-26", "2026-06-26"], [196, 3, 1, "2026-03-13", "2026-03-13"], [196, 1, 1, "2026-02-06", "2026-02-06"], [197, 5, 6, "2026-03-06", "2026-03-06"], [197, 1, 4, "2026-03-06", "2026-03-06"], [197, 6, 4, "2026-03-06", "2026-03-06"], [197, 3, 4, "2026-03-06", "2026-03-06"], [197, 0, 4, "2026-03-06", "2026-03-06"], [197, 33, 3, "2026-03-06", "2026-03-06"], [197, 8, 2, "2026-03-06", "2026-03-06"], [197, 21, 2, "2026-03-06", "2026-03-06"], [197, 13, 2, "2026-03-06", "2026-03-06"], [197, 22, 1, "2026-03-06", "2026-03-06"], [197, 17, 1, "2026-03-06", "2026-03-06"], [198, 12, 22, "2026-03-03", "2026-03-03"], [198, 10, 2, "2026-03-06", "2026-03-06"], [198, 33, 2, "2026-03-06", "2026-03-06"], [198, 3, 2, "2026-03-06", "2026-03-06"], [198, 1, 2, "2026-03-03", "2026-03-06"], [198, 4, 2, "2026-03-06", "2026-03-06"], [198, 17, 1, "2026-01-09", "2026-01-09"], [199, 1, 9, "2026-01-06", "2026-07-09"], [199, 0, 9, "2026-01-06", "2026-07-09"], [199, 4, 5, "2026-02-03", "2026-02-27"], [199, 2, 4, "2026-04-30", "2026-07-09"], [199, 3, 4, "2026-02-27", "2026-06-09"], [199, 26, 1, "2026-02-27", "2026-02-27"], [199, 7, 1, "2026-01-06", "2026-01-06"], [200, 3, 9, "2026-03-11", "2026-05-13"], [200, 1, 9, "2026-03-11", "2026-06-01"], [200, 0, 7, "2026-03-11", "2026-06-01"], [200, 2, 4, "2026-05-12", "2026-06-01"], [200, 8, 2, "2026-03-11", "2026-05-12"], [200, 16, 1, "2026-03-13", "2026-03-13"], [201, 12, 10, "2026-02-09", "2026-02-18"], [201, 11, 9, "2026-02-05", "2026-08-10"], [201, 6, 3, "2026-02-09", "2026-03-04"], [201, 5, 3, "2026-02-09", "2026-02-10"], [201, 18, 1, "2026-02-09", "2026-02-09"], [201, 17, 1, "2026-02-09", "2026-02-09"], [201, 28, 1, "2026-02-05", "2026-02-05"], [201, 30, 1, "2026-02-10", "2026-02-10"], [201, 25, 1, "2026-02-05", "2026-02-05"], [201, 9, 1, "2026-03-04", "2026-03-04"], [201, 10, 1, "2026-02-10", "2026-02-10"], [202, 7, 10, "2026-01-24", "2026-02-11"], [202, 1, 7, "2026-02-11", "2026-07-06"], [202, 3, 7, "2026-03-03", "2026-07-06"], [202, 0, 6, "2026-01-24", "2026-07-06"], [202, 2, 2, "2026-04-29", "2026-07-06"], [203, 1, 9, "2026-01-16", "2026-08-09"], [203, 2, 8, "2026-06-25", "2026-08-09"], [203, 0, 7, "2026-01-16", "2026-08-09"], [203, 29, 4, "2026-08-01", "2026-08-01"], [203, 25, 2, "2026-08-01", "2026-08-01"], [203, 15, 1, "2026-08-01", "2026-08-01"], [203, 12, 1, "2026-08-01", "2026-08-01"], [204, 2, 10, "2026-03-14", "2026-05-31"], [204, 10, 7, "2026-03-14", "2026-05-21"], [204, 19, 6, "2026-05-17", "2026-05-21"], [204, 15, 4, "2026-03-14", "2026-05-21"], [204, 6, 2, "2026-03-14", "2026-03-14"], [204, 18, 1, "2026-03-24", "2026-03-24"], [204, 0, 1, "2026-03-14", "2026-03-14"], [204, 3, 1, "2026-03-14", "2026-03-14"], [205, 11, 8, "2026-01-08", "2026-04-22"], [205, 1, 6, "2026-01-08", "2026-01-08"], [205, 0, 6, "2026-01-08", "2026-01-08"], [205, 14, 6, "2026-01-22", "2026-05-13"], [205, 7, 2, "2026-01-08", "2026-01-08"], [205, 28, 1, "2026-01-08", "2026-01-08"], [205, 30, 1, "2026-01-19", "2026-01-19"], [205, 27, 1, "2026-05-13", "2026-05-13"], [205, 25, 1, "2026-01-08", "2026-01-08"], [206, 12, 27, "2026-02-06", "2026-04-11"], [206, 10, 2, "2026-02-06", "2026-02-06"], [206, 5, 1, "2026-02-06", "2026-02-06"], [206, 6, 1, "2026-02-06", "2026-02-06"], [207, 2, 22, "2026-03-11", "2026-06-03"], [207, 15, 6, "2026-03-11", "2026-06-03"], [207, 12, 2, "2026-03-19", "2026-03-19"], [207, 18, 1, "2026-03-19", "2026-03-19"], [208, 0, 6, "2026-06-12", "2026-06-26"], [208, 2, 5, "2026-06-12", "2026-07-28"], [208, 1, 5, "2026-03-09", "2026-06-24"], [208, 5, 4, "2026-03-09", "2026-06-24"], [208, 9, 3, "2026-03-09", "2026-03-30"], [208, 8, 2, "2026-03-09", "2026-06-12"], [208, 3, 2, "2026-06-24", "2026-06-26"], [208, 19, 2, "2026-06-26", "2026-06-26"], [208, 6, 1, "2026-03-30", "2026-03-30"], [209, 12, 12, "2026-04-02", "2026-04-02"], [209, 2, 6, "2026-07-30", "2026-07-30"], [209, 0, 4, "2026-04-02", "2026-04-02"], [209, 13, 2, "2026-04-02", "2026-04-02"], [209, 5, 1, "2026-04-02", "2026-04-02"], [209, 15, 1, "2026-07-30", "2026-07-30"], [209, 17, 1, "2026-04-02", "2026-04-02"], [209, 1, 1, "2026-04-02", "2026-04-02"], [209, 18, 1, "2026-04-02", "2026-04-02"], [210, 0, 7, "2026-03-17", "2026-06-15"], [210, 4, 5, "2026-03-17", "2026-06-15"], [210, 1, 5, "2026-03-17", "2026-06-15"], [210, 2, 5, "2026-06-02", "2026-06-15"], [210, 3, 3, "2026-06-04", "2026-06-15"], [210, 8, 3, "2026-03-17", "2026-06-15"], [210, 32, 1, "2026-03-17", "2026-03-17"], [211, 2, 12, "2026-05-13", "2026-06-19"], [211, 13, 4, "2026-05-13", "2026-05-20"], [211, 34, 4, "2026-05-14", "2026-05-20"], [211, 64, 3, "2026-05-15", "2026-05-15"], [211, 43, 2, "2026-05-14", "2026-05-14"], [211, 44, 1, "2026-05-20", "2026-05-20"], [211, 17, 1, "2026-05-13", "2026-05-13"], [211, 22, 1, "2026-05-13", "2026-05-13"], [211, 42, 1, "2026-05-20", "2026-05-20"], [212, 0, 18, "2026-01-23", "2026-01-23"], [212, 7, 9, "2026-01-23", "2026-01-23"], [212, 2, 1, "2026-05-28", "2026-05-28"], [212, 20, 1, "2026-01-23", "2026-01-23"], [213, 0, 11, "2026-01-29", "2026-07-22"], [213, 10, 5, "2026-02-10", "2026-04-28"], [213, 5, 4, "2026-01-29", "2026-03-04"], [213, 4, 2, "2026-01-29", "2026-03-04"], [213, 2, 2, "2026-04-28", "2026-07-22"], [213, 20, 1, "2026-01-29", "2026-01-29"], [213, 1, 1, "2026-03-04", "2026-03-04"], [213, 9, 1, "2026-04-28", "2026-04-28"], [213, 3, 1, "2026-03-04", "2026-03-04"], [214, 3, 9, "2026-05-11", "2026-07-09"], [214, 0, 9, "2026-01-29", "2026-07-09"], [214, 2, 5, "2026-05-11", "2026-07-09"], [214, 1, 4, "2026-01-29", "2026-07-01"], [214, 4, 1, "2026-05-11", "2026-05-11"], [215, 11, 12, "2026-01-26", "2026-06-16"], [215, 2, 6, "2026-04-29", "2026-07-14"], [215, 14, 4, "2026-02-26", "2026-05-03"], [215, 18, 2, "2026-02-24", "2026-04-29"], [215, 10, 1, "2026-06-16", "2026-06-16"], [215, 15, 1, "2026-04-29", "2026-04-29"], [215, 32, 1, "2026-06-16", "2026-06-16"], [215, 27, 1, "2026-06-26", "2026-06-26"], [216, 2, 10, "2026-05-11", "2026-07-06"], [216, 12, 4, "2026-07-06", "2026-07-06"], [216, 1, 3, "2026-05-13", "2026-06-04"], [216, 0, 3, "2026-05-13", "2026-06-04"], [216, 13, 2, "2026-05-11", "2026-05-11"], [216, 8, 1, "2026-05-13", "2026-05-13"], [216, 21, 1, "2026-05-13", "2026-05-13"], [216, 22, 1, "2026-05-11", "2026-05-11"], [216, 17, 1, "2026-05-11", "2026-05-11"], [216, 3, 1, "2026-05-13", "2026-05-13"], [217, 0, 9, "2026-06-03", "2026-07-09"], [217, 1, 6, "2026-06-03", "2026-06-08"], [217, 5, 4, "2026-06-03", "2026-06-03"], [217, 2, 3, "2026-06-03", "2026-07-09"], [217, 10, 3, "2026-06-03", "2026-06-08"], [217, 20, 1, "2026-06-03", "2026-06-03"], [217, 3, 1, "2026-06-08", "2026-06-08"], [218, 6, 6, "2026-02-21", "2026-02-24"], [218, 0, 5, "2026-03-16", "2026-04-03"], [218, 5, 4, "2026-02-20", "2026-04-03"], [218, 10, 3, "2026-02-21", "2026-02-21"], [218, 1, 3, "2026-02-17", "2026-04-03"], [218, 7, 2, "2026-02-20", "2026-02-21"], [218, 8, 2, "2026-03-16", "2026-04-03"], [218, 4, 1, "2026-02-20", "2026-02-20"], [218, 2, 1, "2026-04-29", "2026-04-29"], [219, 2, 7, "2026-05-01", "2026-05-15"], [219, 14, 5, "2026-05-15", "2026-06-05"], [219, 13, 3, "2026-05-01", "2026-05-01"], [219, 11, 3, "2026-05-01", "2026-05-15"], [219, 34, 2, "2026-05-01", "2026-05-01"], [219, 12, 2, "2026-05-01", "2026-05-01"], [219, 28, 1, "2026-05-01", "2026-05-01"], [219, 17, 1, "2026-05-01", "2026-05-01"], [219, 25, 1, "2026-05-01", "2026-05-01"], [219, 30, 1, "2026-05-12", "2026-05-12"], [219, 27, 1, "2026-06-05", "2026-06-05"], [220, 3, 8, "2026-03-31", "2026-06-08"], [220, 0, 6, "2026-03-31", "2026-05-14"], [220, 1, 3, "2026-03-31", "2026-05-14"], [220, 2, 3, "2026-05-14", "2026-06-08"], [220, 13, 2, "2026-03-31", "2026-03-31"], [220, 23, 1, "2026-06-08", "2026-06-08"], [220, 17, 1, "2026-03-31", "2026-03-31"], [220, 22, 1, "2026-03-31", "2026-03-31"], [220, 5, 1, "2026-05-14", "2026-05-14"], [221, 12, 20, "2026-03-03", "2026-03-03"], [221, 1, 2, "2026-03-03", "2026-03-07"], [221, 3, 2, "2026-03-03", "2026-03-07"], [221, 0, 1, "2026-01-17", "2026-01-17"], [221, 23, 1, "2026-03-03", "2026-03-03"], [222, 0, 9, "2026-04-22", "2026-07-16"], [222, 3, 6, "2026-04-22", "2026-07-16"], [222, 1, 6, "2026-04-22", "2026-07-07"], [222, 2, 5, "2026-04-22", "2026-07-16"], [223, 2, 9, "2026-05-05", "2026-05-05"], [223, 15, 3, "2026-05-05", "2026-05-05"], [223, 11, 3, "2026-05-05", "2026-05-05"], [223, 12, 2, "2026-05-05", "2026-05-05"], [223, 27, 1, "2026-05-19", "2026-05-19"], [223, 30, 1, "2026-05-16", "2026-05-16"], [223, 31, 1, "2026-05-05", "2026-05-05"], [223, 18, 1, "2026-05-05", "2026-05-05"], [223, 28, 1, "2026-05-05", "2026-05-05"], [223, 60, 1, "2026-05-05", "2026-05-05"], [223, 25, 1, "2026-05-05", "2026-05-05"], [223, 13, 1, "2026-05-05", "2026-05-05"], [224, 9, 9, "2026-03-14", "2026-08-06"], [224, 2, 7, "2026-05-08", "2026-08-06"], [224, 5, 5, "2026-04-06", "2026-08-06"], [224, 19, 2, "2026-07-07", "2026-07-07"], [224, 13, 1, "2026-04-06", "2026-04-06"], [224, 1, 1, "2026-04-06", "2026-04-06"], [225, 3, 7, "2026-05-15", "2026-07-11"], [225, 1, 4, "2026-05-15", "2026-07-11"], [225, 4, 3, "2026-02-09", "2026-07-11"], [225, 0, 3, "2026-05-15", "2026-07-11"], [225, 2, 2, "2026-05-15", "2026-07-11"], [225, 10, 2, "2026-02-09", "2026-02-09"], [225, 5, 2, "2026-02-09", "2026-07-11"], [225, 20, 1, "2026-05-15", "2026-05-15"], [225, 6, 1, "2026-02-09", "2026-02-09"], [226, 1, 8, "2026-02-10", "2026-07-03"], [226, 9, 5, "2026-04-14", "2026-07-03"], [226, 3, 4, "2026-03-05", "2026-04-02"], [226, 0, 4, "2026-01-07", "2026-04-02"], [226, 5, 2, "2026-01-07", "2026-02-10"], [226, 10, 2, "2026-04-02", "2026-05-05"], [227, 0, 15, "2026-05-22", "2026-05-22"], [227, 2, 2, "2026-05-22", "2026-05-22"], [227, 1, 2, "2026-05-22", "2026-05-22"], [227, 10, 2, "2026-05-22", "2026-05-22"], [227, 3, 1, "2026-05-22", "2026-05-22"], [227, 12, 1, "2026-05-22", "2026-05-22"], [227, 8, 1, "2026-05-22", "2026-05-22"], [228, 0, 11, "2026-01-06", "2026-07-02"], [228, 1, 4, "2026-05-14", "2026-07-02"], [228, 2, 3, "2026-05-14", "2026-05-20"], [228, 8, 2, "2026-05-20", "2026-07-02"], [228, 7, 2, "2026-01-06", "2026-01-12"], [228, 3, 1, "2026-05-20", "2026-05-20"], [228, 10, 1, "2026-03-12", "2026-03-12"], [229, 10, 10, "2026-01-28", "2026-04-25"], [229, 2, 4, "2026-04-24", "2026-05-11"], [229, 0, 4, "2026-01-28", "2026-05-11"], [229, 5, 2, "2026-01-28", "2026-04-24"], [229, 6, 1, "2026-01-28", "2026-01-28"], [229, 1, 1, "2026-04-24", "2026-04-24"], [229, 17, 1, "2026-01-27", "2026-01-27"], [229, 22, 1, "2026-01-27", "2026-01-27"], [230, 1, 8, "2026-06-24", "2026-06-24"], [230, 3, 5, "2026-06-24", "2026-06-24"], [230, 0, 3, "2026-06-24", "2026-06-25"], [230, 4, 3, "2026-06-24", "2026-06-24"], [230, 2, 2, "2026-06-24", "2026-06-25"], [230, 10, 1, "2026-06-24", "2026-06-24"], [230, 5, 1, "2026-06-24", "2026-06-24"], [230, 9, 1, "2026-06-24", "2026-06-24"], [231, 1, 9, "2026-02-23", "2026-07-14"], [231, 0, 6, "2026-03-03", "2026-07-14"], [231, 2, 5, "2026-06-24", "2026-07-14"], [231, 3, 2, "2026-03-19", "2026-04-07"], [231, 23, 1, "2026-03-19", "2026-03-19"], [231, 8, 1, "2026-07-14", "2026-07-14"], [232, 0, 7, "2026-04-06", "2026-07-13"], [232, 2, 7, "2026-05-11", "2026-08-11"], [232, 1, 5, "2026-02-12", "2026-06-22"], [232, 3, 2, "2026-04-17", "2026-06-22"], [232, 8, 1, "2026-06-22", "2026-06-22"], [232, 5, 1, "2026-06-22", "2026-06-22"], [233, 2, 4, "2026-06-23", "2026-07-15"], [233, 1, 4, "2026-06-23", "2026-07-13"], [233, 5, 3, "2026-06-23", "2026-07-13"], [233, 13, 3, "2026-06-23", "2026-06-23"], [233, 6, 2, "2026-07-13", "2026-07-13"], [233, 0, 2, "2026-08-10", "2026-08-10"], [233, 8, 2, "2026-06-23", "2026-07-13"], [233, 4, 1, "2026-07-15", "2026-07-15"], [233, 17, 1, "2026-06-23", "2026-06-23"], [233, 3, 1, "2026-07-15", "2026-07-15"], [234, 18, 7, "2026-07-01", "2026-07-07"], [234, 2, 6, "2026-07-01", "2026-07-08"], [234, 12, 3, "2026-07-02", "2026-07-02"], [234, 13, 2, "2026-07-01", "2026-07-02"], [234, 17, 1, "2026-07-01", "2026-07-01"], [234, 8, 1, "2026-07-02", "2026-07-02"], [234, 15, 1, "2026-07-01", "2026-07-01"], [234, 22, 1, "2026-07-01", "2026-07-01"], [235, 2, 18, "2026-05-18", "2026-07-23"], [235, 18, 2, "2026-06-09", "2026-07-22"], [235, 13, 1, "2026-05-18", "2026-05-18"], [235, 17, 1, "2026-05-18", "2026-05-18"], [236, 14, 5, "2026-01-23", "2026-02-13"], [236, 11, 2, "2026-01-23", "2026-01-23"], [236, 4, 2, "2026-01-09", "2026-01-09"], [236, 1, 2, "2026-01-09", "2026-01-09"], [236, 28, 1, "2026-01-09", "2026-01-09"], [236, 25, 1, "2026-01-09", "2026-01-09"], [236, 0, 1, "2026-01-09", "2026-01-09"], [236, 18, 1, "2026-01-09", "2026-01-09"], [236, 26, 1, "2026-01-09", "2026-01-09"], [236, 17, 1, "2026-01-09", "2026-01-09"], [236, 22, 1, "2026-01-09", "2026-01-09"], [236, 10, 1, "2026-01-09", "2026-01-09"], [236, 30, 1, "2026-01-20", "2026-01-20"], [236, 27, 1, "2026-02-13", "2026-02-13"], [236, 7, 1, "2026-01-09", "2026-01-09"], [237, 16, 7, "2026-02-11", "2026-02-11"], [237, 6, 3, "2026-01-31", "2026-01-31"], [237, 18, 3, "2026-02-06", "2026-04-07"], [237, 11, 2, "2026-02-11", "2026-02-11"], [237, 25, 1, "2026-02-11", "2026-02-11"], [237, 7, 1, "2026-02-11", "2026-02-11"], [237, 30, 1, "2026-02-22", "2026-02-22"], [237, 1, 1, "2026-02-11", "2026-02-11"], [237, 28, 1, "2026-02-11", "2026-02-11"], [237, 27, 1, "2026-02-25", "2026-02-25"], [238, 1, 7, "2026-02-02", "2026-06-09"], [238, 0, 6, "2026-02-02", "2026-06-09"], [238, 2, 5, "2026-05-29", "2026-07-17"], [238, 8, 2, "2026-05-29", "2026-06-09"], [238, 3, 1, "2026-04-06", "2026-04-06"], [239, 2, 6, "2026-08-04", "2026-08-04"], [239, 29, 5, "2026-08-04", "2026-08-04"], [239, 22, 1, "2026-08-04", "2026-08-04"], [239, 31, 1, "2026-08-04", "2026-08-04"], [239, 70, 1, "2026-08-04", "2026-08-04"], [239, 69, 1, "2026-08-04", "2026-08-04"], [239, 25, 1, "2026-08-04", "2026-08-04"], [239, 67, 1, "2026-08-04", "2026-08-04"], [239, 11, 1, "2026-08-04", "2026-08-04"], [239, 13, 1, "2026-08-04", "2026-08-04"], [239, 17, 1, "2026-08-04", "2026-08-04"], [240, 0, 9, "2026-01-15", "2026-05-20"], [240, 7, 6, "2026-01-15", "2026-01-25"], [240, 2, 2, "2026-05-17", "2026-05-20"], [240, 1, 2, "2026-01-15", "2026-05-17"], [240, 3, 1, "2026-05-20", "2026-05-20"], [241, 12, 3, "2026-01-06", "2026-01-06"], [241, 11, 2, "2026-03-12", "2026-03-12"], [241, 4, 2, "2026-01-05", "2026-01-06"], [241, 7, 2, "2026-01-05", "2026-01-05"], [241, 6, 2, "2026-01-05", "2026-01-05"], [241, 10, 2, "2026-01-05", "2026-01-05"], [241, 1, 2, "2026-01-05", "2026-01-05"], [241, 0, 2, "2026-01-05", "2026-01-05"], [241, 27, 1, "2026-03-13", "2026-03-13"], [241, 5, 1, "2026-01-05", "2026-01-05"], [241, 18, 1, "2026-01-06", "2026-01-06"], [242, 0, 8, "2026-01-12", "2026-06-02"], [242, 1, 5, "2026-01-12", "2026-05-03"], [242, 2, 4, "2026-05-03", "2026-07-27"], [242, 13, 1, "2026-07-03", "2026-07-03"], [242, 10, 1, "2026-05-03", "2026-05-03"], [242, 3, 1, "2026-05-03", "2026-05-03"], [243, 0, 11, "2026-01-06", "2026-06-22"], [243, 1, 6, "2026-01-06", "2026-06-22"], [243, 7, 1, "2026-01-06", "2026-01-06"], [243, 2, 1, "2026-06-22", "2026-06-22"], [243, 10, 1, "2026-03-23", "2026-03-23"], [244, 2, 15, "2026-04-24", "2026-07-31"], [244, 12, 1, "2026-04-24", "2026-04-24"], [244, 18, 1, "2026-04-24", "2026-04-24"], [244, 17, 1, "2026-01-14", "2026-01-14"], [244, 15, 1, "2026-04-24", "2026-04-24"], [244, 22, 1, "2026-01-14", "2026-01-14"], [245, 15, 8, "2026-04-13", "2026-04-13"], [245, 2, 8, "2026-04-13", "2026-04-13"], [245, 18, 1, "2026-04-13", "2026-04-13"], [245, 13, 1, "2026-04-13", "2026-04-13"], [245, 17, 1, "2026-04-13", "2026-04-13"], [246, 2, 8, "2026-04-07", "2026-05-05"], [246, 19, 2, "2026-04-07", "2026-04-07"], [246, 18, 2, "2026-04-07", "2026-04-07"], [246, 13, 1, "2026-04-07", "2026-04-07"], [246, 1, 1, "2026-04-07", "2026-04-07"], [246, 8, 1, "2026-04-07", "2026-04-07"], [246, 48, 1, "2026-05-04", "2026-05-04"], [246, 17, 1, "2026-04-07", "2026-04-07"], [246, 20, 1, "2026-05-04", "2026-05-04"], [246, 15, 1, "2026-04-07", "2026-04-07"], [247, 6, 5, "2026-01-01", "2026-02-09"], [247, 0, 5, "2026-01-28", "2026-05-16"], [247, 1, 3, "2026-02-12", "2026-05-16"], [247, 8, 2, "2026-03-31", "2026-05-16"], [247, 5, 2, "2026-01-28", "2026-03-31"], [247, 10, 1, "2026-01-28", "2026-01-28"], [247, 2, 1, "2026-05-16", "2026-05-16"], [248, 2, 8, "2026-06-02", "2026-06-22"], [248, 18, 6, "2026-05-31", "2026-07-06"], [248, 15, 2, "2026-06-02", "2026-06-16"], [248, 17, 1, "2026-05-31", "2026-05-31"], [248, 13, 1, "2026-05-31", "2026-05-31"], [248, 22, 1, "2026-05-31", "2026-05-31"], [249, 0, 7, "2026-01-05", "2026-07-07"], [249, 1, 5, "2026-01-05", "2026-06-01"], [249, 3, 2, "2026-03-13", "2026-06-01"], [249, 2, 2, "2026-06-01", "2026-07-07"], [249, 4, 2, "2026-02-07", "2026-02-07"], [249, 7, 1, "2026-02-07", "2026-02-07"], [250, 2, 9, "2026-08-10", "2026-08-10"], [250, 13, 4, "2026-08-10", "2026-08-10"], [250, 1, 2, "2026-08-10", "2026-08-10"], [250, 0, 1, "2026-08-10", "2026-08-10"], [250, 8, 1, "2026-08-10", "2026-08-10"], [250, 17, 1, "2026-08-10", "2026-08-10"], [251, 12, 16, "2026-05-28", "2026-05-28"], [251, 8, 1, "2026-05-28", "2026-05-28"], [251, 2, 1, "2026-05-28", "2026-05-28"], [252, 0, 4, "2026-07-20", "2026-07-20"], [252, 2, 3, "2026-07-20", "2026-07-20"], [252, 13, 2, "2026-07-20", "2026-07-20"], [252, 3, 2, "2026-07-20", "2026-07-20"], [252, 1, 2, "2026-07-20", "2026-07-20"], [252, 15, 1, "2026-07-20", "2026-07-20"], [252, 19, 1, "2026-07-20", "2026-07-20"], [252, 4, 1, "2026-07-20", "2026-07-20"], [252, 17, 1, "2026-07-20", "2026-07-20"], [252, 8, 1, "2026-07-20", "2026-07-20"], [253, 2, 8, "2026-04-26", "2026-05-09"], [253, 19, 5, "2026-04-26", "2026-04-26"], [253, 1, 1, "2026-04-26", "2026-04-26"], [253, 17, 1, "2026-04-26", "2026-04-26"], [253, 53, 1, "2026-05-09", "2026-05-09"], [253, 13, 1, "2026-04-26", "2026-04-26"], [253, 22, 1, "2026-04-26", "2026-04-26"], [254, 0, 4, "2026-05-07", "2026-05-08"], [254, 10, 3, "2026-02-16", "2026-05-07"], [254, 3, 3, "2026-05-07", "2026-05-08"], [254, 1, 2, "2026-02-16", "2026-05-07"], [254, 2, 2, "2026-05-07", "2026-05-08"], [254, 4, 1, "2026-05-07", "2026-05-07"], [254, 17, 1, "2026-02-12", "2026-02-12"], [254, 5, 1, "2026-05-08", "2026-05-08"], [254, 22, 1, "2026-02-12", "2026-02-12"], [255, 6, 6, "2026-01-09", "2026-01-20"], [255, 1, 3, "2026-03-20", "2026-06-12"], [255, 5, 3, "2026-01-09", "2026-03-20"], [255, 10, 2, "2026-01-09", "2026-01-09"], [255, 0, 2, "2026-01-09", "2026-06-12"], [255, 8, 1, "2026-03-20", "2026-03-20"], [255, 2, 1, "2026-06-12", "2026-06-12"], [256, 11, 14, "2026-01-24", "2026-07-24"], [256, 14, 4, "2026-03-24", "2026-06-24"], [257, 0, 5, "2026-03-10", "2026-03-11"], [257, 13, 3, "2026-03-10", "2026-03-10"], [257, 3, 2, "2026-03-11", "2026-03-11"], [257, 21, 2, "2026-03-10", "2026-03-10"], [257, 1, 1, "2026-03-10", "2026-03-10"], [257, 17, 1, "2026-03-10", "2026-03-10"], [257, 5, 1, "2026-03-11", "2026-03-11"], [257, 8, 1, "2026-03-10", "2026-03-10"], [257, 33, 1, "2026-03-10", "2026-03-10"], [258, 2, 15, "2026-03-02", "2026-08-01"], [258, 15, 1, "2026-03-02", "2026-03-02"], [258, 18, 1, "2026-01-25", "2026-01-25"], [259, 14, 5, "2026-02-21", "2026-03-14"], [259, 12, 4, "2026-01-07", "2026-01-07"], [259, 11, 3, "2026-01-21", "2026-02-21"], [259, 28, 1, "2026-01-07", "2026-01-07"], [259, 30, 1, "2026-01-18", "2026-01-18"], [259, 17, 1, "2026-01-07", "2026-01-07"], [259, 27, 1, "2026-03-14", "2026-03-14"], [259, 25, 1, "2026-01-07", "2026-01-07"], [260, 5, 5, "2026-01-24", "2026-06-19"], [260, 2, 4, "2026-04-20", "2026-07-16"], [260, 1, 4, "2026-04-20", "2026-06-19"], [260, 6, 3, "2026-01-24", "2026-07-13"], [260, 0, 1, "2026-01-24", "2026-01-24"], [261, 12, 5, "2026-04-06", "2026-04-06"], [261, 3, 5, "2026-04-04", "2026-04-06"], [261, 0, 3, "2026-04-04", "2026-04-04"], [261, 2, 2, "2026-05-02", "2026-05-03"], [261, 1, 1, "2026-04-04", "2026-04-04"], [262, 2, 6, "2026-06-02", "2026-08-06"], [262, 11, 2, "2026-06-16", "2026-07-16"], [262, 13, 2, "2026-06-02", "2026-06-02"], [262, 28, 1, "2026-06-02", "2026-06-02"], [262, 30, 1, "2026-06-13", "2026-06-13"], [262, 25, 1, "2026-06-02", "2026-06-02"], [262, 17, 1, "2026-06-02", "2026-06-02"], [262, 31, 1, "2026-06-02", "2026-06-02"], [262, 15, 1, "2026-06-02", "2026-06-02"], [263, 0, 5, "2026-03-06", "2026-05-25"], [263, 1, 4, "2026-02-09", "2026-05-11"], [263, 5, 3, "2026-05-11", "2026-05-11"], [263, 3, 2, "2026-05-11", "2026-05-25"], [263, 2, 2, "2026-05-11", "2026-05-25"], [264, 2, 4, "2026-07-17", "2026-08-11"], [264, 5, 4, "2026-07-20", "2026-07-20"], [264, 0, 3, "2026-07-17", "2026-08-11"], [264, 1, 2, "2026-07-17", "2026-07-17"], [264, 10, 1, "2026-07-20", "2026-07-20"], [264, 8, 1, "2026-07-17", "2026-07-17"], [264, 21, 1, "2026-07-20", "2026-07-20"], [265, 14, 5, "2026-03-20", "2026-04-10"], [265, 11, 2, "2026-03-20", "2026-03-20"], [265, 28, 1, "2026-03-06", "2026-03-06"], [265, 18, 1, "2026-03-06", "2026-03-06"], [265, 13, 1, "2026-03-06", "2026-03-06"], [265, 30, 1, "2026-03-17", "2026-03-17"], [265, 27, 1, "2026-04-10", "2026-04-10"], [265, 22, 1, "2026-03-06", "2026-03-06"], [265, 17, 1, "2026-03-06", "2026-03-06"], [265, 25, 1, "2026-03-06", "2026-03-06"], [266, 11, 8, "2026-01-28", "2026-05-28"], [266, 14, 6, "2026-02-28", "2026-06-18"], [266, 27, 1, "2026-06-18", "2026-06-18"], [267, 2, 4, "2026-05-08", "2026-06-02"], [267, 0, 4, "2026-05-08", "2026-05-08"], [267, 1, 3, "2026-05-08", "2026-05-08"], [267, 5, 2, "2026-05-08", "2026-05-08"], [267, 20, 1, "2026-05-08", "2026-05-08"], [267, 13, 1, "2026-05-08", "2026-05-08"], [268, 12, 5, "2026-02-09", "2026-02-09"], [268, 2, 4, "2026-05-06", "2026-06-03"], [268, 6, 2, "2026-01-08", "2026-01-08"], [268, 5, 1, "2026-01-08", "2026-01-08"], [268, 1, 1, "2026-01-08", "2026-01-08"], [268, 10, 1, "2026-01-08", "2026-01-08"], [268, 0, 1, "2026-01-08", "2026-01-08"], [269, 2, 13, "2026-06-12", "2026-08-09"], [269, 18, 1, "2026-06-15", "2026-06-15"], [269, 13, 1, "2026-06-12", "2026-06-12"], [270, 12, 11, "2026-03-06", "2026-03-06"], [270, 13, 2, "2026-03-06", "2026-03-06"], [270, 17, 1, "2026-02-09", "2026-02-09"], [270, 8, 1, "2026-03-06", "2026-03-06"], [271, 11, 12, "2026-01-22", "2026-07-30"], [271, 14, 3, "2026-05-22", "2026-07-22"], [272, 2, 6, "2026-08-05", "2026-08-09"], [272, 13, 2, "2026-08-05", "2026-08-09"], [272, 17, 1, "2026-08-05", "2026-08-05"], [272, 36, 1, "2026-08-09", "2026-08-09"], [272, 33, 1, "2026-08-05", "2026-08-05"], [272, 22, 1, "2026-08-05", "2026-08-05"], [272, 8, 1, "2026-08-05", "2026-08-05"], [272, 15, 1, "2026-08-05", "2026-08-05"], [272, 45, 1, "2026-08-09", "2026-08-09"], [273, 2, 4, "2026-05-12", "2026-08-11"], [273, 1, 3, "2026-05-12", "2026-06-10"], [273, 0, 3, "2026-01-02", "2026-06-10"], [273, 3, 2, "2026-05-12", "2026-06-10"], [273, 8, 1, "2026-05-12", "2026-05-12"], [273, 7, 1, "2026-01-02", "2026-01-02"], [274, 15, 6, "2026-04-08", "2026-04-08"], [274, 2, 6, "2026-04-08", "2026-04-08"], [274, 18, 2, "2026-04-08", "2026-04-08"], [275, 12, 6, "2026-02-24", "2026-02-25"], [275, 5, 2, "2026-02-24", "2026-02-24"], [275, 20, 1, "2026-02-24", "2026-02-24"], [275, 6, 1, "2026-02-24", "2026-02-24"], [275, 0, 1, "2026-02-25", "2026-02-25"], [275, 18, 1, "2026-02-25", "2026-02-25"], [275, 2, 1, "2026-05-22", "2026-05-22"], [275, 17, 1, "2026-02-24", "2026-02-24"], [276, 11, 3, "2026-07-16", "2026-07-30"], [276, 0, 2, "2026-07-16", "2026-07-17"], [276, 2, 2, "2026-07-16", "2026-07-17"], [276, 14, 2, "2026-07-30", "2026-08-05"], [276, 1, 2, "2026-07-16", "2026-07-16"], [276, 25, 1, "2026-07-16", "2026-07-16"], [276, 28, 1, "2026-07-16", "2026-07-16"], [276, 30, 1, "2026-07-27", "2026-07-27"], [277, 52, 10, "2026-03-13", "2026-03-17"], [277, 22, 1, "2026-03-13", "2026-03-13"], [277, 13, 1, "2026-03-13", "2026-03-13"], [277, 31, 1, "2026-03-13", "2026-03-13"], [277, 17, 1, "2026-03-13", "2026-03-13"], [278, 5, 5, "2026-01-05", "2026-01-05"], [278, 6, 4, "2026-01-05", "2026-01-06"], [278, 10, 1, "2026-02-26", "2026-02-26"], [278, 1, 1, "2026-02-26", "2026-02-26"], [278, 8, 1, "2026-02-26", "2026-02-26"], [278, 0, 1, "2026-02-26", "2026-02-26"], [278, 17, 1, "2026-01-05", "2026-01-05"], [279, 0, 4, "2026-07-03", "2026-07-03"], [279, 13, 3, "2026-07-03", "2026-07-03"], [279, 1, 2, "2026-07-03", "2026-07-03"], [279, 5, 1, "2026-07-03", "2026-07-03"], [279, 22, 1, "2026-07-03", "2026-07-03"], [279, 8, 1, "2026-07-03", "2026-07-03"], [279, 3, 1, "2026-07-03", "2026-07-03"], [279, 17, 1, "2026-07-03", "2026-07-03"], [280, 1, 5, "2026-05-20", "2026-05-20"], [280, 2, 5, "2026-05-15", "2026-05-20"], [280, 13, 2, "2026-05-15", "2026-05-20"], [280, 5, 1, "2026-05-20", "2026-05-20"], [280, 17, 1, "2026-05-15", "2026-05-15"], [281, 0, 5, "2026-08-09", "2026-08-09"], [281, 1, 2, "2026-08-09", "2026-08-09"], [281, 2, 2, "2026-08-09", "2026-08-09"], [281, 13, 2, "2026-08-09", "2026-08-09"], [281, 5, 1, "2026-08-09", "2026-08-09"], [281, 8, 1, "2026-08-09", "2026-08-09"], [281, 17, 1, "2026-08-09", "2026-08-09"], [282, 2, 3, "2026-08-10", "2026-08-11"], [282, 1, 2, "2026-08-10", "2026-08-10"], [282, 9, 2, "2026-08-10", "2026-08-10"], [282, 13, 2, "2026-08-10", "2026-08-10"], [282, 5, 2, "2026-08-10", "2026-08-10"], [282, 22, 1, "2026-08-10", "2026-08-10"], [282, 10, 1, "2026-08-12", "2026-08-12"], [282, 17, 1, "2026-08-10", "2026-08-10"], [283, 13, 4, "2026-07-31", "2026-07-31"], [283, 0, 2, "2026-07-31", "2026-07-31"], [283, 1, 2, "2026-07-31", "2026-07-31"], [283, 2, 2, "2026-07-31", "2026-08-07"], [283, 8, 1, "2026-07-31", "2026-07-31"], [283, 17, 1, "2026-07-31", "2026-07-31"], [283, 3, 1, "2026-07-31", "2026-07-31"], [284, 0, 2, "2026-03-08", "2026-03-08"], [284, 18, 2, "2026-03-02", "2026-03-06"], [284, 3, 2, "2026-03-02", "2026-03-02"], [284, 23, 1, "2026-03-02", "2026-03-02"], [284, 13, 1, "2026-03-02", "2026-03-02"], [284, 47, 1, "2026-03-02", "2026-03-02"], [284, 2, 1, "2026-03-06", "2026-03-06"], [284, 1, 1, "2026-03-02", "2026-03-02"], [284, 15, 1, "2026-03-06", "2026-03-06"], [284, 5, 1, "2026-03-02", "2026-03-02"], [285, 1, 2, "2026-06-05", "2026-06-05"], [285, 2, 2, "2026-06-05", "2026-06-05"], [285, 13, 2, "2026-06-05", "2026-06-05"], [285, 33, 2, "2026-06-05", "2026-06-05"], [285, 18, 1, "2026-06-05", "2026-06-05"], [285, 15, 1, "2026-06-05", "2026-06-05"], [285, 8, 1, "2026-06-05", "2026-06-05"], [285, 17, 1, "2026-06-05", "2026-06-05"], [285, 12, 1, "2026-06-05", "2026-06-05"], [286, 11, 10, "2026-01-08", "2026-07-02"], [286, 2, 2, "2026-06-01", "2026-07-02"], [286, 27, 1, "2026-07-08", "2026-07-08"], [287, 1, 4, "2026-08-08", "2026-08-10"], [287, 5, 2, "2026-08-08", "2026-08-10"], [287, 13, 2, "2026-08-03", "2026-08-03"], [287, 8, 1, "2026-08-08", "2026-08-08"], [287, 2, 1, "2026-08-08", "2026-08-08"], [287, 25, 1, "2026-08-10", "2026-08-10"], [287, 29, 1, "2026-08-10", "2026-08-10"], [287, 0, 1, "2026-08-10", "2026-08-10"], [288, 10, 7, "2026-02-17", "2026-03-18"], [288, 6, 3, "2026-02-17", "2026-02-17"], [288, 1, 1, "2026-02-17", "2026-02-17"], [288, 0, 1, "2026-03-16", "2026-03-16"], [288, 5, 1, "2026-02-17", "2026-02-17"], [289, 1, 4, "2026-06-21", "2026-07-15"], [289, 0, 3, "2026-06-21", "2026-07-30"], [289, 3, 2, "2026-07-15", "2026-07-30"], [289, 13, 2, "2026-06-18", "2026-06-21"], [289, 17, 1, "2026-06-18", "2026-06-18"], [289, 2, 1, "2026-07-28", "2026-07-28"], [290, 2, 4, "2026-05-01", "2026-05-03"], [290, 21, 2, "2026-05-03", "2026-05-03"], [290, 3, 2, "2026-05-03", "2026-05-03"], [290, 17, 1, "2026-05-01", "2026-05-01"], [290, 15, 1, "2026-05-03", "2026-05-03"], [290, 13, 1, "2026-05-01", "2026-05-01"], [290, 1, 1, "2026-05-03", "2026-05-03"], [290, 8, 1, "2026-05-03", "2026-05-03"], [291, 14, 7, "2026-01-30", "2026-03-21"], [291, 11, 5, "2026-01-30", "2026-02-28"], [291, 27, 1, "2026-03-21", "2026-03-21"], [292, 18, 4, "2026-01-22", "2026-06-27"], [292, 2, 4, "2026-06-27", "2026-06-27"], [292, 1, 2, "2026-06-27", "2026-06-27"], [292, 53, 2, "2026-06-27", "2026-06-27"], [293, 14, 5, "2026-03-26", "2026-04-16"], [293, 11, 4, "2026-01-26", "2026-03-26"], [293, 0, 2, "2026-01-14", "2026-01-14"], [293, 27, 1, "2026-04-16", "2026-04-16"], [294, 0, 3, "2026-06-27", "2026-06-27"], [294, 13, 2, "2026-06-27", "2026-06-27"], [294, 1, 2, "2026-06-27", "2026-06-27"], [294, 17, 1, "2026-06-27", "2026-06-27"], [294, 8, 1, "2026-06-27", "2026-06-27"], [294, 5, 1, "2026-06-27", "2026-06-27"], [294, 22, 1, "2026-06-27", "2026-06-27"], [295, 10, 5, "2026-01-06", "2026-01-07"], [295, 63, 4, "2026-01-06", "2026-01-06"], [295, 0, 1, "2026-01-06", "2026-01-06"], [295, 2, 1, "2026-07-16", "2026-07-16"], [296, 2, 4, "2026-05-05", "2026-05-05"], [296, 13, 2, "2026-05-05", "2026-05-05"], [296, 22, 1, "2026-05-05", "2026-05-05"], [296, 17, 1, "2026-05-05", "2026-05-05"], [296, 64, 1, "2026-05-05", "2026-05-05"], [296, 1, 1, "2026-05-05", "2026-05-05"], [296, 5, 1, "2026-05-05", "2026-05-05"], [297, 2, 3, "2026-04-20", "2026-04-20"], [297, 5, 1, "2026-04-20", "2026-04-20"], [297, 13, 1, "2026-04-20", "2026-04-20"], [297, 22, 1, "2026-04-20", "2026-04-20"], [297, 4, 1, "2026-04-20", "2026-04-20"], [297, 17, 1, "2026-04-20", "2026-04-20"], [297, 8, 1, "2026-04-20", "2026-04-20"], [297, 1, 1, "2026-04-20", "2026-04-20"], [297, 3, 1, "2026-04-20", "2026-04-20"], [298, 14, 5, "2026-01-07", "2026-01-28"], [298, 11, 3, "2026-01-07", "2026-01-07"], [298, 0, 1, "2026-02-07", "2026-02-07"], [298, 5, 1, "2026-02-07", "2026-02-07"], [298, 27, 1, "2026-01-28", "2026-01-28"], [299, 14, 6, "2026-01-02", "2026-01-23"], [299, 11, 3, "2026-01-02", "2026-01-02"], [299, 27, 1, "2026-01-23", "2026-01-23"], [300, 10, 10, "2026-01-02", "2026-01-02"], [301, 0, 4, "2026-03-02", "2026-03-02"], [301, 6, 1, "2026-03-02", "2026-03-02"], [301, 1, 1, "2026-03-02", "2026-03-02"], [301, 3, 1, "2026-03-02", "2026-03-02"], [301, 5, 1, "2026-03-02", "2026-03-02"], [301, 8, 1, "2026-03-02", "2026-03-02"], [301, 21, 1, "2026-03-02", "2026-03-02"], [302, 1, 5, "2026-05-20", "2026-05-20"], [302, 13, 2, "2026-05-20", "2026-05-20"], [302, 17, 1, "2026-05-20", "2026-05-20"], [302, 5, 1, "2026-05-20", "2026-05-20"], [302, 22, 1, "2026-05-20", "2026-05-20"], [303, 14, 5, "2026-01-07", "2026-01-28"], [303, 11, 3, "2026-01-07", "2026-01-07"], [303, 27, 1, "2026-01-28", "2026-01-28"], [304, 11, 7, "2026-01-03", "2026-02-11"], [304, 14, 1, "2026-02-03", "2026-02-03"], [304, 27, 1, "2026-03-03", "2026-03-03"], [305, 14, 5, "2026-04-10", "2026-05-01"], [305, 11, 3, "2026-04-10", "2026-04-10"], [305, 27, 1, "2026-05-01", "2026-05-01"], [306, 12, 3, "2026-07-04", "2026-07-04"], [306, 2, 2, "2026-07-04", "2026-07-04"], [306, 13, 1, "2026-07-04", "2026-07-04"], [306, 15, 1, "2026-07-04", "2026-07-04"], [306, 18, 1, "2026-07-04", "2026-07-04"], [306, 17, 1, "2026-07-04", "2026-07-04"], [307, 15, 2, "2026-06-30", "2026-06-30"], [307, 12, 2, "2026-06-30", "2026-06-30"], [307, 2, 2, "2026-06-30", "2026-06-30"], [307, 13, 1, "2026-06-30", "2026-06-30"], [307, 18, 1, "2026-06-30", "2026-06-30"], [307, 17, 1, "2026-06-30", "2026-06-30"], [308, 2, 5, "2026-04-27", "2026-04-27"], [308, 15, 3, "2026-04-27", "2026-04-27"], [308, 62, 1, "2026-04-27", "2026-04-27"], [309, 0, 3, "2026-08-04", "2026-08-04"], [309, 1, 2, "2026-08-04", "2026-08-04"], [309, 2, 2, "2026-07-12", "2026-08-03"], [309, 5, 1, "2026-08-04", "2026-08-04"], [309, 8, 1, "2026-08-04", "2026-08-04"], [310, 14, 5, "2026-01-14", "2026-02-04"], [310, 11, 3, "2026-01-14", "2026-01-14"], [310, 27, 1, "2026-02-04", "2026-02-04"], [311, 11, 3, "2026-01-05", "2026-01-19"], [311, 0, 2, "2026-04-02", "2026-04-07"], [311, 1, 1, "2026-04-02", "2026-04-02"], [311, 3, 1, "2026-04-07", "2026-04-07"], [311, 27, 1, "2026-02-05", "2026-02-05"], [312, 0, 5, "2026-03-26", "2026-03-26"], [312, 3, 3, "2026-03-26", "2026-03-26"], [313, 0, 2, "2026-05-05", "2026-05-05"], [313, 1, 2, "2026-02-23", "2026-05-05"], [313, 5, 1, "2026-05-05", "2026-05-05"], [313, 4, 1, "2026-02-23", "2026-02-23"], [313, 2, 1, "2026-05-05", "2026-05-05"], [313, 8, 1, "2026-05-05", "2026-05-05"], [314, 0, 3, "2026-03-02", "2026-03-04"], [314, 1, 2, "2026-03-02", "2026-03-04"], [314, 3, 2, "2026-03-02", "2026-03-02"], [314, 10, 1, "2026-03-02", "2026-03-02"], [315, 2, 3, "2026-05-14", "2026-05-15"], [315, 13, 2, "2026-05-13", "2026-05-13"], [315, 5, 1, "2026-05-13", "2026-05-13"], [315, 1, 1, "2026-05-13", "2026-05-13"], [315, 17, 1, "2026-05-13", "2026-05-13"], [316, 2, 7, "2026-07-01", "2026-07-09"], [316, 13, 1, "2026-06-20", "2026-06-20"], [317, 2, 5, "2026-05-05", "2026-05-05"], [317, 17, 1, "2026-05-05", "2026-05-05"], [317, 15, 1, "2026-05-05", "2026-05-05"], [317, 13, 1, "2026-05-05", "2026-05-05"], [318, 2, 5, "2026-07-20", "2026-07-30"], [318, 18, 1, "2026-07-20", "2026-07-20"], [318, 13, 1, "2026-07-20", "2026-07-20"], [318, 17, 1, "2026-07-20", "2026-07-20"], [319, 2, 4, "2026-06-08", "2026-06-08"], [319, 13, 2, "2026-06-08", "2026-06-08"], [319, 22, 1, "2026-06-08", "2026-06-08"], [319, 17, 1, "2026-06-08", "2026-06-08"], [320, 4, 2, "2026-03-30", "2026-03-30"], [320, 32, 2, "2026-03-30", "2026-03-30"], [320, 20, 1, "2026-03-30", "2026-03-30"], [320, 8, 1, "2026-03-30", "2026-03-30"], [320, 0, 1, "2026-03-30", "2026-03-30"], [320, 1, 1, "2026-03-30", "2026-03-30"], [321, 12, 7, "2026-03-02", "2026-03-02"], [321, 17, 1, "2026-01-29", "2026-01-29"], [322, 5, 2, "2026-06-29", "2026-06-29"], [322, 1, 2, "2026-06-29", "2026-06-29"], [322, 13, 2, "2026-06-26", "2026-06-26"], [322, 17, 1, "2026-06-26", "2026-06-26"], [322, 8, 1, "2026-06-29", "2026-06-29"], [323, 2, 3, "2026-07-28", "2026-07-28"], [323, 18, 1, "2026-07-28", "2026-07-28"], [323, 15, 1, "2026-07-28", "2026-07-28"], [323, 13, 1, "2026-07-28", "2026-07-28"], [323, 22, 1, "2026-07-28", "2026-07-28"], [323, 17, 1, "2026-07-28", "2026-07-28"], [324, 1, 3, "2026-04-06", "2026-04-06"], [324, 20, 2, "2026-04-06", "2026-04-06"], [324, 2, 2, "2026-05-25", "2026-05-30"], [324, 3, 1, "2026-04-06", "2026-04-06"], [325, 20, 3, "2026-03-02", "2026-03-02"], [325, 15, 2, "2026-03-02", "2026-03-02"], [325, 2, 2, "2026-03-02", "2026-03-02"], [326, 2, 3, "2026-06-04", "2026-06-04"], [326, 13, 2, "2026-06-04", "2026-06-04"], [326, 17, 1, "2026-06-04", "2026-06-04"], [326, 22, 1, "2026-06-04", "2026-06-04"], [327, 2, 6, "2026-07-23", "2026-07-30"], [327, 13, 1, "2026-07-23", "2026-07-23"], [328, 3, 2, "2026-05-11", "2026-05-11"], [328, 9, 2, "2026-05-11", "2026-05-11"], [328, 1, 1, "2026-05-11", "2026-05-11"], [328, 5, 1, "2026-05-11", "2026-05-11"], [328, 2, 1, "2026-05-11", "2026-05-11"], [329, 2, 4, "2026-07-23", "2026-07-28"], [329, 15, 2, "2026-07-23", "2026-07-23"], [329, 13, 1, "2026-07-23", "2026-07-23"], [330, 2, 5, "2026-07-03", "2026-08-07"], [330, 15, 1, "2026-08-07", "2026-08-07"], [330, 13, 1, "2026-07-03", "2026-07-03"], [331, 0, 3, "2026-05-08", "2026-05-08"], [331, 1, 2, "2026-05-08", "2026-05-08"], [331, 2, 1, "2026-05-08", "2026-05-08"], [331, 20, 1, "2026-05-08", "2026-05-08"], [332, 12, 2, "2026-05-20", "2026-05-20"], [332, 13, 1, "2026-05-20", "2026-05-20"], [332, 17, 1, "2026-05-20", "2026-05-20"], [332, 2, 1, "2026-05-20", "2026-05-20"], [332, 8, 1, "2026-05-20", "2026-05-20"], [332, 22, 1, "2026-05-20", "2026-05-20"], [333, 2, 5, "2026-03-06", "2026-03-06"], [333, 15, 2, "2026-03-06", "2026-03-06"], [334, 0, 3, "2026-03-18", "2026-03-18"], [334, 18, 2, "2026-01-19", "2026-02-20"], [334, 2, 1, "2026-07-16", "2026-07-16"], [334, 1, 1, "2026-03-18", "2026-03-18"], [335, 13, 2, "2026-03-09", "2026-03-09"], [335, 19, 2, "2026-03-09", "2026-03-09"], [335, 17, 1, "2026-03-09", "2026-03-09"], [335, 1, 1, "2026-03-09", "2026-03-09"], [335, 22, 1, "2026-03-09", "2026-03-09"], [336, 11, 6, "2026-01-13", "2026-04-06"], [336, 27, 1, "2026-04-13", "2026-04-13"], [337, 12, 7, "2026-02-22", "2026-02-22"], [338, 2, 2, "2026-03-23", "2026-03-23"], [338, 15, 2, "2026-03-23", "2026-03-23"], [338, 22, 1, "2026-03-23", "2026-03-23"], [338, 13, 1, "2026-03-23", "2026-03-23"], [338, 17, 1, "2026-03-23", "2026-03-23"], [339, 0, 2, "2026-01-27", "2026-01-27"], [339, 5, 1, "2026-01-27", "2026-01-27"], [339, 1, 1, "2026-01-27", "2026-01-27"], [339, 17, 1, "2026-01-27", "2026-01-27"], [339, 22, 1, "2026-01-27", "2026-01-27"], [339, 7, 1, "2026-01-27", "2026-01-27"], [340, 2, 3, "2026-03-29", "2026-07-23"], [340, 15, 2, "2026-03-29", "2026-07-23"], [340, 18, 2, "2026-01-11", "2026-03-29"], [341, 5, 3, "2026-01-29", "2026-01-29"], [341, 6, 2, "2026-01-29", "2026-01-29"], [341, 17, 1, "2026-01-29", "2026-01-29"], [341, 0, 1, "2026-01-29", "2026-01-29"], [342, 14, 5, "2026-01-03", "2026-01-21"], [342, 27, 1, "2026-01-21", "2026-01-21"], [343, 2, 2, "2026-04-28", "2026-04-28"], [343, 13, 2, "2026-04-28", "2026-04-28"], [343, 17, 1, "2026-04-28", "2026-04-28"], [343, 22, 1, "2026-04-28", "2026-04-28"], [344, 2, 3, "2026-07-18", "2026-07-18"], [344, 13, 1, "2026-07-18", "2026-07-18"], [344, 17, 1, "2026-07-18", "2026-07-18"], [344, 15, 1, "2026-07-18", "2026-07-18"], [345, 0, 2, "2026-01-26", "2026-01-26"], [345, 5, 1, "2026-01-26", "2026-01-26"], [345, 17, 1, "2026-01-26", "2026-01-26"], [345, 1, 1, "2026-01-26", "2026-01-26"], [345, 10, 1, "2026-01-26", "2026-01-26"], [346, 2, 2, "2026-07-02", "2026-07-02"], [346, 12, 1, "2026-07-02", "2026-07-02"], [346, 13, 1, "2026-07-02", "2026-07-02"], [346, 22, 1, "2026-07-02", "2026-07-02"], [346, 17, 1, "2026-07-02", "2026-07-02"], [347, 13, 2, "2026-05-20", "2026-05-20"], [347, 1, 1, "2026-05-20", "2026-05-20"], [347, 5, 1, "2026-05-20", "2026-05-20"], [347, 22, 1, "2026-05-20", "2026-05-20"], [347, 17, 1, "2026-05-20", "2026-05-20"], [348, 2, 2, "2026-08-10", "2026-08-10"], [348, 13, 2, "2026-08-10", "2026-08-10"], [348, 22, 1, "2026-08-10", "2026-08-10"], [348, 17, 1, "2026-08-10", "2026-08-10"], [349, 13, 2, "2026-05-20", "2026-05-20"], [349, 1, 1, "2026-05-20", "2026-05-20"], [349, 22, 1, "2026-05-20", "2026-05-20"], [349, 5, 1, "2026-05-20", "2026-05-20"], [349, 17, 1, "2026-05-20", "2026-05-20"], [350, 13, 2, "2026-08-07", "2026-08-07"], [350, 22, 1, "2026-08-07", "2026-08-07"], [350, 2, 1, "2026-08-07", "2026-08-07"], [350, 19, 1, "2026-08-07", "2026-08-07"], [350, 17, 1, "2026-08-07", "2026-08-07"], [351, 2, 3, "2026-05-14", "2026-05-15"], [351, 22, 1, "2026-05-14", "2026-05-14"], [351, 13, 1, "2026-05-14", "2026-05-14"], [351, 17, 1, "2026-05-14", "2026-05-14"], [352, 2, 3, "2026-08-10", "2026-08-10"], [352, 13, 1, "2026-08-10", "2026-08-10"], [352, 22, 1, "2026-08-10", "2026-08-10"], [352, 17, 1, "2026-08-10", "2026-08-10"], [353, 2, 4, "2026-05-14", "2026-05-15"], [353, 13, 1, "2026-05-14", "2026-05-14"], [353, 15, 1, "2026-05-14", "2026-05-14"], [354, 2, 4, "2026-04-08", "2026-07-28"], [354, 15, 2, "2026-04-08", "2026-07-28"], [355, 0, 2, "2026-01-15", "2026-01-15"], [355, 7, 1, "2026-01-15", "2026-01-15"], [355, 1, 1, "2026-01-15", "2026-01-15"], [355, 17, 1, "2026-01-15", "2026-01-15"], [355, 22, 1, "2026-01-15", "2026-01-15"], [356, 13, 2, "2026-05-11", "2026-05-11"], [356, 2, 2, "2026-05-11", "2026-05-11"], [356, 17, 1, "2026-05-11", "2026-05-11"], [356, 22, 1, "2026-05-11", "2026-05-11"], [357, 13, 4, "2026-03-03", "2026-03-13"], [357, 17, 1, "2026-03-03", "2026-03-03"], [357, 8, 1, "2026-03-13", "2026-03-13"], [358, 13, 3, "2026-04-30", "2026-04-30"], [358, 17, 1, "2026-04-30", "2026-04-30"], [358, 2, 1, "2026-04-30", "2026-04-30"], [358, 22, 1, "2026-04-30", "2026-04-30"], [359, 1, 3, "2026-01-10", "2026-01-28"], [359, 0, 2, "2026-01-10", "2026-01-16"], [359, 5, 1, "2026-01-10", "2026-01-10"], [360, 2, 2, "2026-04-30", "2026-04-30"], [360, 18, 1, "2026-04-30", "2026-04-30"], [360, 13, 1, "2026-04-30", "2026-04-30"], [360, 17, 1, "2026-04-30", "2026-04-30"], [360, 22, 1, "2026-04-30", "2026-04-30"], [361, 11, 5, "2026-01-14", "2026-03-15"], [361, 27, 1, "2026-04-14", "2026-04-14"], [362, 10, 2, "2026-03-20", "2026-03-20"], [362, 13, 1, "2026-03-20", "2026-03-20"], [362, 22, 1, "2026-03-20", "2026-03-20"], [362, 17, 1, "2026-03-20", "2026-03-20"], [362, 1, 1, "2026-03-20", "2026-03-20"], [363, 2, 2, "2026-04-07", "2026-05-15"], [363, 15, 1, "2026-04-07", "2026-04-07"], [363, 13, 1, "2026-04-07", "2026-04-07"], [363, 17, 1, "2026-04-07", "2026-04-07"], [364, 13, 3, "2026-06-11", "2026-06-11"], [364, 22, 1, "2026-06-11", "2026-06-11"], [364, 17, 1, "2026-06-11", "2026-06-11"], [365, 13, 2, "2026-04-22", "2026-04-22"], [365, 17, 1, "2026-04-22", "2026-04-22"], [365, 2, 1, "2026-04-22", "2026-04-22"], [365, 22, 1, "2026-04-22", "2026-04-22"], [366, 13, 3, "2026-04-08", "2026-04-08"], [366, 22, 1, "2026-04-08", "2026-04-08"], [366, 17, 1, "2026-04-08", "2026-04-08"], [367, 2, 2, "2026-04-28", "2026-04-28"], [367, 13, 1, "2026-04-28", "2026-04-28"], [367, 22, 1, "2026-04-28", "2026-04-28"], [367, 17, 1, "2026-04-28", "2026-04-28"], [368, 2, 2, "2026-04-30", "2026-04-30"], [368, 17, 1, "2026-04-30", "2026-04-30"], [368, 22, 1, "2026-04-30", "2026-04-30"], [368, 13, 1, "2026-04-30", "2026-04-30"], [369, 9, 2, "2026-04-27", "2026-04-27"], [369, 6, 2, "2026-04-27", "2026-04-27"], [369, 27, 1, "2026-01-08", "2026-01-08"], [370, 13, 2, "2026-03-08", "2026-03-09"], [370, 17, 1, "2026-03-08", "2026-03-08"], [370, 22, 1, "2026-03-08", "2026-03-08"], [370, 2, 1, "2026-08-07", "2026-08-07"], [371, 11, 4, "2026-01-09", "2026-03-09"], [371, 27, 1, "2026-03-11", "2026-03-11"], [372, 2, 5, "2026-06-01", "2026-06-02"], [373, 13, 2, "2026-08-10", "2026-08-10"], [373, 17, 1, "2026-08-10", "2026-08-10"], [373, 22, 1, "2026-08-10", "2026-08-10"], [373, 2, 1, "2026-08-10", "2026-08-10"], [374, 15, 2, "2026-03-02", "2026-03-02"], [374, 2, 2, "2026-03-02", "2026-03-02"], [374, 18, 1, "2026-03-02", "2026-03-02"], [375, 18, 2, "2026-03-13", "2026-04-03"], [375, 2, 2, "2026-04-23", "2026-04-23"], [375, 3, 1, "2026-03-18", "2026-03-18"], [376, 13, 1, "2026-04-29", "2026-04-29"], [376, 17, 1, "2026-04-29", "2026-04-29"], [376, 2, 1, "2026-04-29", "2026-04-29"], [376, 22, 1, "2026-04-29", "2026-04-29"], [376, 31, 1, "2026-04-29", "2026-04-29"], [377, 2, 2, "2026-07-10", "2026-07-10"], [377, 22, 1, "2026-07-10", "2026-07-10"], [377, 17, 1, "2026-07-10", "2026-07-10"], [377, 13, 1, "2026-07-10", "2026-07-10"], [378, 2, 2, "2026-06-16", "2026-06-16"], [378, 13, 1, "2026-05-19", "2026-05-19"], [378, 22, 1, "2026-05-19", "2026-05-19"], [378, 17, 1, "2026-05-19", "2026-05-19"], [379, 56, 2, "2026-03-24", "2026-03-24"], [379, 22, 1, "2026-03-24", "2026-03-24"], [379, 17, 1, "2026-03-24", "2026-03-24"], [379, 13, 1, "2026-03-24", "2026-03-24"], [380, 13, 3, "2026-04-29", "2026-04-29"], [380, 17, 1, "2026-04-29", "2026-04-29"], [380, 2, 1, "2026-04-29", "2026-04-29"], [381, 0, 5, "2026-01-19", "2026-01-19"], [382, 13, 2, "2026-05-27", "2026-05-27"], [382, 17, 1, "2026-05-27", "2026-05-27"], [382, 56, 1, "2026-05-27", "2026-05-27"], [382, 22, 1, "2026-05-27", "2026-05-27"], [383, 13, 1, "2026-04-30", "2026-04-30"], [383, 22, 1, "2026-04-30", "2026-04-30"], [383, 2, 1, "2026-04-30", "2026-04-30"], [383, 17, 1, "2026-04-30", "2026-04-30"], [384, 14, 3, "2026-01-06", "2026-01-14"], [384, 27, 1, "2026-01-14", "2026-01-14"], [385, 17, 1, "2026-07-08", "2026-07-08"], [385, 13, 1, "2026-07-08", "2026-07-08"], [385, 56, 1, "2026-07-08", "2026-07-08"], [385, 22, 1, "2026-07-08", "2026-07-08"], [386, 13, 2, "2026-07-08", "2026-07-08"], [386, 18, 1, "2026-07-08", "2026-07-08"], [386, 17, 1, "2026-07-08", "2026-07-08"], [387, 0, 2, "2026-03-20", "2026-03-20"], [387, 5, 1, "2026-03-20", "2026-03-20"], [387, 1, 1, "2026-03-20", "2026-03-20"], [388, 56, 1, "2026-07-24", "2026-07-24"], [388, 17, 1, "2026-07-24", "2026-07-24"], [388, 22, 1, "2026-07-24", "2026-07-24"], [388, 13, 1, "2026-07-24", "2026-07-24"], [389, 22, 1, "2026-07-28", "2026-07-28"], [389, 2, 1, "2026-07-28", "2026-07-28"], [389, 13, 1, "2026-07-28", "2026-07-28"], [389, 17, 1, "2026-07-28", "2026-07-28"], [390, 0, 2, "2026-02-05", "2026-02-05"], [390, 10, 1, "2026-02-09", "2026-02-09"], [390, 2, 1, "2026-06-25", "2026-06-25"], [391, 56, 1, "2026-02-25", "2026-02-25"], [391, 13, 1, "2026-02-25", "2026-02-25"], [391, 22, 1, "2026-02-25", "2026-02-25"], [391, 17, 1, "2026-02-25", "2026-02-25"], [392, 2, 1, "2026-03-02", "2026-03-02"], [392, 13, 1, "2026-03-02", "2026-03-02"], [392, 17, 1, "2026-03-02", "2026-03-02"], [392, 15, 1, "2026-03-02", "2026-03-02"], [393, 13, 2, "2026-03-09", "2026-03-09"], [393, 17, 1, "2026-03-09", "2026-03-09"], [393, 8, 1, "2026-03-09", "2026-03-09"], [394, 15, 1, "2026-03-10", "2026-03-10"], [394, 13, 1, "2026-03-10", "2026-03-10"], [394, 17, 1, "2026-03-10", "2026-03-10"], [394, 2, 1, "2026-03-10", "2026-03-10"], [395, 2, 3, "2026-06-30", "2026-08-05"], [395, 13, 1, "2026-07-31", "2026-07-31"], [396, 10, 2, "2026-01-23", "2026-01-23"], [396, 0, 1, "2026-01-23", "2026-01-23"], [396, 1, 1, "2026-01-23", "2026-01-23"], [397, 2, 4, "2026-05-28", "2026-05-28"], [398, 13, 1, "2026-04-02", "2026-04-02"], [398, 2, 1, "2026-04-02", "2026-04-02"], [398, 15, 1, "2026-04-02", "2026-04-02"], [398, 17, 1, "2026-04-02", "2026-04-02"], [399, 0, 4, "2026-01-02", "2026-01-02"], [400, 13, 3, "2026-04-06", "2026-04-06"], [400, 17, 1, "2026-04-06", "2026-04-06"], [401, 13, 2, "2026-04-15", "2026-04-15"], [401, 22, 1, "2026-04-15", "2026-04-15"], [401, 17, 1, "2026-04-15", "2026-04-15"], [402, 2, 2, "2026-04-28", "2026-04-28"], [402, 13, 1, "2026-04-28", "2026-04-28"], [402, 17, 1, "2026-04-28", "2026-04-28"], [403, 22, 1, "2026-04-29", "2026-04-29"], [403, 2, 1, "2026-04-29", "2026-04-29"], [403, 13, 1, "2026-04-29", "2026-04-29"], [403, 17, 1, "2026-04-29", "2026-04-29"], [404, 13, 1, "2026-05-04", "2026-05-04"], [404, 2, 1, "2026-05-04", "2026-05-04"], [404, 22, 1, "2026-05-04", "2026-05-04"], [404, 17, 1, "2026-05-04", "2026-05-04"], [405, 2, 3, "2026-07-15", "2026-07-15"], [405, 3, 1, "2026-07-15", "2026-07-15"], [406, 13, 2, "2026-05-05", "2026-05-05"], [406, 22, 1, "2026-05-05", "2026-05-05"], [406, 17, 1, "2026-05-05", "2026-05-05"], [407, 13, 2, "2026-05-05", "2026-05-05"], [407, 22, 1, "2026-05-05", "2026-05-05"], [407, 17, 1, "2026-05-05", "2026-05-05"], [408, 56, 1, "2026-05-13", "2026-05-13"], [408, 13, 1, "2026-05-13", "2026-05-13"], [408, 17, 1, "2026-05-13", "2026-05-13"], [408, 22, 1, "2026-05-13", "2026-05-13"], [409, 13, 1, "2026-05-15", "2026-05-15"], [409, 2, 1, "2026-05-15", "2026-05-15"], [409, 17, 1, "2026-05-15", "2026-05-15"], [409, 22, 1, "2026-05-15", "2026-05-15"], [410, 13, 2, "2026-05-21", "2026-05-21"], [410, 2, 2, "2026-06-17", "2026-06-17"], [411, 13, 2, "2026-05-28", "2026-05-28"], [411, 17, 1, "2026-05-28", "2026-05-28"], [411, 22, 1, "2026-05-28", "2026-05-28"], [412, 13, 2, "2026-07-16", "2026-07-16"], [412, 17, 1, "2026-07-16", "2026-07-16"], [412, 2, 1, "2026-07-16", "2026-07-16"], [413, 14, 3, "2026-01-06", "2026-01-14"], [413, 27, 1, "2026-01-14", "2026-01-14"], [414, 13, 2, "2026-06-16", "2026-06-16"], [414, 17, 1, "2026-06-16", "2026-06-16"], [414, 22, 1, "2026-06-16", "2026-06-16"], [415, 15, 1, "2026-06-26", "2026-06-26"], [415, 2, 1, "2026-06-26", "2026-06-26"], [415, 13, 1, "2026-06-26", "2026-06-26"], [415, 17, 1, "2026-06-26", "2026-06-26"], [416, 2, 3, "2026-07-07", "2026-07-07"], [416, 13, 1, "2026-07-07", "2026-07-07"], [417, 13, 2, "2026-06-18", "2026-06-18"], [417, 17, 1, "2026-06-18", "2026-06-18"], [417, 2, 1, "2026-06-18", "2026-06-18"], [418, 18, 2, "2026-01-21", "2026-01-21"], [418, 2, 1, "2026-04-28", "2026-04-28"], [419, 22, 1, "2026-03-25", "2026-03-25"], [419, 17, 1, "2026-03-25", "2026-03-25"], [419, 13, 1, "2026-03-25", "2026-03-25"], [420, 13, 2, "2026-03-24", "2026-03-24"], [420, 17, 1, "2026-03-24", "2026-03-24"], [421, 13, 1, "2026-04-29", "2026-04-29"], [421, 17, 1, "2026-04-29", "2026-04-29"], [421, 22, 1, "2026-04-29", "2026-04-29"], [422, 13, 2, "2026-06-15", "2026-06-15"], [422, 17, 1, "2026-06-15", "2026-06-15"], [423, 17, 1, "2026-05-05", "2026-05-05"], [423, 56, 1, "2026-05-05", "2026-05-05"], [423, 13, 1, "2026-05-05", "2026-05-05"], [424, 2, 2, "2026-05-07", "2026-05-07"], [424, 13, 1, "2026-05-05", "2026-05-05"], [425, 13, 1, "2026-06-30", "2026-06-30"], [425, 22, 1, "2026-06-30", "2026-06-30"], [425, 17, 1, "2026-06-30", "2026-06-30"], [426, 0, 2, "2026-01-16", "2026-01-16"], [426, 5, 1, "2026-01-16", "2026-01-16"], [427, 17, 1, "2026-01-19", "2026-01-19"], [427, 18, 1, "2026-01-19", "2026-01-19"], [427, 22, 1, "2026-01-19", "2026-01-19"], [428, 19, 1, "2026-06-18", "2026-06-18"], [428, 17, 1, "2026-06-18", "2026-06-18"], [428, 13, 1, "2026-06-18", "2026-06-18"], [429, 13, 2, "2026-08-09", "2026-08-09"], [429, 17, 1, "2026-08-09", "2026-08-09"], [430, 17, 1, "2026-06-26", "2026-06-26"], [430, 22, 1, "2026-06-26", "2026-06-26"], [430, 13, 1, "2026-06-26", "2026-06-26"], [431, 2, 3, "2026-05-21", "2026-05-21"], [432, 13, 1, "2026-08-03", "2026-08-03"], [432, 2, 1, "2026-08-03", "2026-08-03"], [432, 17, 1, "2026-08-03", "2026-08-03"], [433, 2, 3, "2026-08-03", "2026-08-03"], [434, 13, 2, "2026-05-16", "2026-05-16"], [434, 17, 1, "2026-05-16", "2026-05-16"], [435, 22, 1, "2026-05-19", "2026-05-19"], [435, 17, 1, "2026-05-19", "2026-05-19"], [435, 13, 1, "2026-05-19", "2026-05-19"], [436, 17, 1, "2026-02-09", "2026-02-09"], [436, 2, 1, "2026-07-04", "2026-07-04"], [436, 22, 1, "2026-02-09", "2026-02-09"], [437, 13, 2, "2026-08-04", "2026-08-04"], [437, 17, 1, "2026-08-04", "2026-08-04"], [438, 11, 2, "2026-01-14", "2026-01-14"], [438, 27, 1, "2026-01-14", "2026-01-14"], [439, 13, 1, "2026-05-21", "2026-05-21"], [439, 56, 1, "2026-05-21", "2026-05-21"], [439, 17, 1, "2026-05-21", "2026-05-21"], [440, 13, 2, "2026-05-23", "2026-05-23"], [440, 17, 1, "2026-05-23", "2026-05-23"], [441, 18, 2, "2026-01-13", "2026-01-14"], [441, 17, 1, "2026-01-13", "2026-01-13"], [442, 17, 1, "2026-07-06", "2026-07-06"], [442, 19, 1, "2026-07-06", "2026-07-06"], [442, 13, 1, "2026-07-06", "2026-07-06"], [443, 17, 1, "2026-06-02", "2026-06-02"], [443, 13, 1, "2026-06-02", "2026-06-02"], [443, 22, 1, "2026-06-02", "2026-06-02"], [444, 13, 1, "2026-07-23", "2026-07-23"], [444, 17, 1, "2026-07-23", "2026-07-23"], [444, 22, 1, "2026-07-23", "2026-07-23"], [445, 17, 1, "2026-06-02", "2026-06-02"], [445, 22, 1, "2026-06-02", "2026-06-02"], [445, 13, 1, "2026-06-02", "2026-06-02"], [446, 22, 1, "2026-06-03", "2026-06-03"], [446, 13, 1, "2026-06-03", "2026-06-03"], [446, 17, 1, "2026-06-03", "2026-06-03"], [447, 13, 2, "2026-06-03", "2026-06-03"], [447, 17, 1, "2026-06-03", "2026-06-03"], [448, 17, 1, "2026-06-04", "2026-06-04"], [448, 22, 1, "2026-06-04", "2026-06-04"], [448, 13, 1, "2026-06-04", "2026-06-04"], [449, 17, 1, "2026-06-04", "2026-06-04"], [449, 13, 1, "2026-06-04", "2026-06-04"], [449, 22, 1, "2026-06-04", "2026-06-04"], [450, 17, 1, "2026-07-16", "2026-07-16"], [450, 22, 1, "2026-07-16", "2026-07-16"], [450, 13, 1, "2026-07-16", "2026-07-16"], [451, 2, 2, "2026-08-04", "2026-08-04"], [451, 13, 1, "2026-04-06", "2026-04-06"], [452, 22, 1, "2026-04-13", "2026-04-13"], [452, 17, 1, "2026-04-13", "2026-04-13"], [452, 13, 1, "2026-04-13", "2026-04-13"], [453, 22, 1, "2026-04-14", "2026-04-14"], [453, 13, 1, "2026-04-14", "2026-04-14"], [453, 17, 1, "2026-04-14", "2026-04-14"], [454, 13, 2, "2026-04-18", "2026-04-18"], [454, 17, 1, "2026-04-18", "2026-04-18"], [455, 13, 2, "2026-03-27", "2026-03-27"], [455, 17, 1, "2026-03-27", "2026-03-27"], [456, 17, 1, "2026-04-21", "2026-04-21"], [456, 2, 1, "2026-04-21", "2026-04-21"], [456, 13, 1, "2026-04-21", "2026-04-21"], [457, 13, 2, "2026-03-26", "2026-03-26"], [457, 17, 1, "2026-03-26", "2026-03-26"], [458, 17, 1, "2026-07-14", "2026-07-14"], [458, 13, 1, "2026-07-14", "2026-07-14"], [458, 22, 1, "2026-07-14", "2026-07-14"], [459, 17, 1, "2026-08-06", "2026-08-06"], [459, 13, 1, "2026-08-06", "2026-08-06"], [460, 17, 1, "2026-04-14", "2026-04-14"], [460, 13, 1, "2026-04-14", "2026-04-14"], [461, 13, 1, "2026-07-22", "2026-07-22"], [461, 17, 1, "2026-07-22", "2026-07-22"], [462, 17, 1, "2026-08-05", "2026-08-05"], [462, 13, 1, "2026-08-05", "2026-08-05"], [463, 1, 1, "2026-02-19", "2026-02-19"], [463, 17, 1, "2026-02-19", "2026-02-19"], [464, 13, 2, "2026-03-25", "2026-03-25"], [465, 18, 1, "2026-02-17", "2026-02-17"], [465, 17, 1, "2026-02-17", "2026-02-17"], [466, 13, 1, "2026-06-15", "2026-06-15"], [466, 17, 1, "2026-06-15", "2026-06-15"], [467, 13, 1, "2026-07-20", "2026-07-20"], [467, 17, 1, "2026-07-20", "2026-07-20"], [468, 2, 2, "2026-07-13", "2026-07-13"], [469, 13, 1, "2026-03-23", "2026-03-23"], [469, 17, 1, "2026-03-23", "2026-03-23"], [470, 2, 1, "2026-04-30", "2026-04-30"], [470, 13, 1, "2026-04-30", "2026-04-30"], [471, 17, 1, "2026-03-17", "2026-03-17"], [471, 13, 1, "2026-03-17", "2026-03-17"], [472, 13, 1, "2026-03-12", "2026-03-12"], [472, 17, 1, "2026-03-12", "2026-03-12"], [473, 2, 2, "2026-08-11", "2026-08-11"], [474, 22, 1, "2026-01-05", "2026-01-05"], [474, 17, 1, "2026-01-05", "2026-01-05"], [475, 13, 1, "2026-04-30", "2026-04-30"], [475, 2, 1, "2026-04-30", "2026-04-30"], [476, 2, 1, "2026-05-04", "2026-05-04"], [476, 13, 1, "2026-05-04", "2026-05-04"], [477, 22, 1, "2026-01-15", "2026-01-15"], [477, 17, 1, "2026-01-15", "2026-01-15"], [478, 17, 1, "2026-02-16", "2026-02-16"], [478, 18, 1, "2026-02-16", "2026-02-16"], [479, 13, 1, "2026-07-28", "2026-07-28"], [479, 17, 1, "2026-07-28", "2026-07-28"], [480, 17, 1, "2026-06-25", "2026-06-25"], [480, 13, 1, "2026-06-25", "2026-06-25"], [481, 13, 1, "2026-07-16", "2026-07-16"], [481, 17, 1, "2026-07-16", "2026-07-16"], [482, 13, 1, "2026-03-11", "2026-03-11"], [482, 17, 1, "2026-03-11", "2026-03-11"], [483, 13, 1, "2026-03-02", "2026-03-02"], [483, 1, 1, "2026-03-02", "2026-03-02"], [484, 2, 1, "2026-05-13", "2026-05-13"], [484, 13, 1, "2026-05-05", "2026-05-05"], [485, 2, 2, "2026-06-14", "2026-06-14"], [486, 0, 2, "2026-03-25", "2026-03-25"], [487, 2, 1, "2026-04-24", "2026-04-24"], [487, 0, 1, "2026-04-24", "2026-04-24"], [488, 22, 1, "2026-01-19", "2026-01-19"], [488, 17, 1, "2026-01-19", "2026-01-19"], [489, 17, 1, "2026-01-04", "2026-01-04"], [489, 22, 1, "2026-01-04", "2026-01-04"], [490, 17, 1, "2026-02-25", "2026-02-25"], [490, 13, 1, "2026-02-25", "2026-02-25"], [491, 17, 1, "2026-07-08", "2026-07-08"], [491, 13, 1, "2026-07-08", "2026-07-08"], [492, 17, 1, "2026-03-26", "2026-03-26"], [492, 13, 1, "2026-03-26", "2026-03-26"], [493, 17, 1, "2026-08-10", "2026-08-10"], [493, 13, 1, "2026-08-10", "2026-08-10"], [494, 2, 2, "2026-07-20", "2026-07-20"], [495, 13, 1, "2026-08-10", "2026-08-10"], [495, 18, 1, "2026-08-10", "2026-08-10"], [496, 13, 1, "2026-04-02", "2026-04-02"], [496, 17, 1, "2026-04-02", "2026-04-02"], [497, 7, 1, "2026-01-09", "2026-01-09"], [497, 0, 1, "2026-01-09", "2026-01-09"], [498, 0, 2, "2026-04-15", "2026-04-15"], [499, 17, 1, "2026-02-04", "2026-02-04"], [499, 22, 1, "2026-02-04", "2026-02-04"], [500, 0, 1, "2026-01-04", "2026-01-04"], [500, 5, 1, "2026-01-04", "2026-01-04"], [501, 0, 1, "2026-01-13", "2026-01-13"], [501, 1, 1, "2026-01-13", "2026-01-13"], [502, 17, 1, "2026-04-02", "2026-04-02"], [502, 13, 1, "2026-04-02", "2026-04-02"], [503, 17, 1, "2026-08-06", "2026-08-06"], [503, 13, 1, "2026-08-06", "2026-08-06"], [504, 17, 1, "2026-01-06", "2026-01-06"], [505, 18, 1, "2026-02-23", "2026-02-23"], [506, 17, 1, "2026-01-12", "2026-01-12"], [507, 17, 1, "2026-01-13", "2026-01-13"], [508, 17, 1, "2026-01-13", "2026-01-13"], [509, 2, 1, "2026-07-15", "2026-07-15"], [510, 18, 1, "2026-02-02", "2026-02-02"], [511, 18, 1, "2026-01-14", "2026-01-14"], [512, 17, 1, "2026-01-14", "2026-01-14"], [513, 17, 1, "2026-01-14", "2026-01-14"], [514, 10, 1, "2026-01-02", "2026-01-02"], [515, 27, 1, "2026-01-30", "2026-01-30"], [516, 18, 1, "2026-03-20", "2026-03-20"], [517, 17, 1, "2026-01-26", "2026-01-26"], [518, 17, 1, "2026-01-29", "2026-01-29"], [519, 17, 1, "2026-02-03", "2026-02-03"], [520, 10, 1, "2026-02-04", "2026-02-04"], [521, 17, 1, "2026-02-06", "2026-02-06"], [522, 17, 1, "2026-02-09", "2026-02-09"], [523, 54, 1, "2026-01-05", "2026-01-05"], [524, 18, 1, "2026-01-19", "2026-01-19"], [525, 13, 1, "2026-03-12", "2026-03-12"], [526, 13, 1, "2026-02-25", "2026-02-25"], [527, 17, 1, "2026-02-16", "2026-02-16"], [528, 17, 1, "2026-02-17", "2026-02-17"], [529, 17, 1, "2026-02-19", "2026-02-19"], [530, 17, 1, "2026-02-24", "2026-02-24"], [531, 27, 1, "2026-01-03", "2026-01-03"], [532, 0, 1, "2026-01-08", "2026-01-08"], [533, 2, 1, "2026-05-02", "2026-05-02"], [534, 13, 1, "2026-07-31", "2026-07-31"], [535, 13, 1, "2026-03-27", "2026-03-27"], [536, 22, 1, "2026-04-02", "2026-04-02"], [537, 22, 1, "2026-04-02", "2026-04-02"], [538, 22, 1, "2026-04-02", "2026-04-02"], [539, 13, 1, "2026-04-19", "2026-04-19"], [540, 2, 1, "2026-04-25", "2026-04-25"], [541, 14, 1, "2026-01-04", "2026-01-04"], [542, 22, 1, "2026-05-08", "2026-05-08"], [543, 18, 1, "2026-02-26", "2026-02-26"], [544, 18, 1, "2026-01-27", "2026-01-27"], [545, 22, 1, "2026-05-20", "2026-05-20"], [546, 22, 1, "2026-05-21", "2026-05-21"], [547, 13, 1, "2026-06-12", "2026-06-12"], [548, 13, 1, "2026-06-22", "2026-06-22"], [549, 2, 1, "2026-05-11", "2026-05-11"], [550, 0, 1, "2026-03-09", "2026-03-09"], [551, 13, 1, "2026-07-01", "2026-07-01"], [552, 27, 1, "2026-01-01", "2026-01-01"], [553, 13, 1, "2026-07-20", "2026-07-20"], [554, 13, 1, "2026-07-23", "2026-07-23"], [555, 22, 1, "2026-07-28", "2026-07-28"], [556, 22, 1, "2026-08-05", "2026-08-05"], [557, 22, 1, "2026-08-10", "2026-08-10"], [558, 17, 1, "2026-01-05", "2026-01-05"]]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "data/events.js", error: String((e && e.message) || e) }); }

// deck-stage.js
try { (() => {
/**
 * <deck-stage> — reusable web component for HTML decks.
 *
 * Handles:
 *  (a) speaker notes — reads <script type="application/json" id="speaker-notes">
 *      and posts {slideIndexChanged: N} to the parent window on nav.
 *  (b) keyboard navigation — ←/→, PgUp/PgDn, Space, Home/End, number keys.
 *  (c) press R to reset to slide 0 (with a tasteful keyboard hint).
 *  (d) bottom-center overlay showing slide count + hints, fades out on idle.
 *  (e) auto-scaling — inner canvas is a fixed design size (default 1920×1080)
 *      scaled with `transform: scale()` to fit the viewport, letterboxed.
 *      Set the `noscale` attribute to render at authored size (1:1) — the
 *      PPTX exporter sets this so its DOM capture sees unscaled geometry.
 *  (f) print — `@media print` lays every slide out as its own page at the
 *      design size, so the browser's Print → Save as PDF produces a clean
 *      one-page-per-slide PDF with no extra setup.
 *  (g) thumbnail rail — resizable left-hand column of per-slide thumbnails
 *      (static clones). Click to navigate; ↑/↓ with a thumbnail focused to
 *      step between slides; drag to reorder; right-click for
 *      Skip / Move up / Move down / Delete (opens a Cancel/Delete confirm
 *      dialog). Drag the rail's right edge to resize; width persists to
 *      localStorage. Skipped slides carry `data-deck-skip`, are dimmed in
 *      the rail, omitted from prev/next navigation, and hidden at print.
 *      The rail is suppressed in presenting mode, on `noscale`, and via
 *      the `no-rail` attribute. Rail mutations dispatch a `deckchange`
 *      CustomEvent on the element: detail = {action, from, to, slide}.
 *
 * Slides are HIDDEN, not unmounted. Non-active slides stay in the DOM with
 * `visibility: hidden` + `opacity: 0`, so their state (videos, iframes,
 * form inputs, React trees) is preserved across navigation.
 *
 * Lifecycle event — the component dispatches a `slidechange` CustomEvent on
 * itself whenever the active slide changes (including the initial mount).
 * The event bubbles and composes out of shadow DOM, so you can listen on
 * the <deck-stage> element or on document:
 *
 *   document.querySelector('deck-stage').addEventListener('slidechange', (e) => {
 *     e.detail.index         // new 0-based index
 *     e.detail.previousIndex // previous index, or -1 on init
 *     e.detail.total         // total slide count
 *     e.detail.slide         // the new active slide element
 *     e.detail.previousSlide // the prior slide element, or null on init
 *     e.detail.reason        // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
 *   });
 *
 * Persistence: none at the deck level. The host app keeps the current slide
 * in its own URL (?slide=) and re-delivers it via location.hash on load, so a
 * bare load with no hash always starts at slide 1.
 *
 * Usage:
 *   <style>deck-stage:not(:defined){visibility:hidden}</style>
 *   <deck-stage width="1920" height="1080">
 *     <section data-label="Title">...</section>
 *     <section data-label="Agenda">...</section>
 *   </deck-stage>
 *   <script src="deck-stage.js"></script>
 *
 * The :not(:defined) rule prevents a flash of the first slide at its
 * authored styles before this script runs and attaches the shadow root.
 *
 * Slides are the direct element children of <deck-stage>. Each slide is
 * automatically tagged with:
 *   - data-screen-label="NN Label"   (1-indexed, for comment flow)
 *   - data-om-validate="no_overflowing_text,no_overlapping_text,slide_sized_text"
 */

(() => {
  const DESIGN_W_DEFAULT = 1920;
  const DESIGN_H_DEFAULT = 1080;
  const OVERLAY_HIDE_MS = 1800;
  const VALIDATE_ATTR = 'no_overflowing_text,no_overlapping_text,slide_sized_text';
  const pad2 = n => String(n).padStart(2, '0');
  const stylesheet = `
    :host {
      position: fixed;
      inset: 0;
      display: block;
      background: #000;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      overflow: hidden;
    }

    .stage {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .canvas {
      position: relative;
      transform-origin: center center;
      flex-shrink: 0;
      background: #fff;
      will-change: transform;
    }

    /* Slides live in light DOM (via <slot>) so authored CSS still applies.
       We absolutely position each slotted child to stack them. */
    ::slotted(*) {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }
    ::slotted([data-deck-active]) {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }

    /* Tap zones for mobile — back/forward thirds like Stories.
       Transparent, no visible UI, don't block the overlay. */
    .tapzones {
      position: fixed;
      inset: 0;
      display: flex;
      z-index: 2147482000;
      pointer-events: none;
    }
    .tapzone {
      flex: 1;
      pointer-events: auto;
      -webkit-tap-highlight-color: transparent;
    }
    /* Only activate tap zones on coarse pointers (touch devices). */
    @media (hover: hover) and (pointer: fine) {
      .tapzones { display: none; }
    }

    .overlay {
      position: fixed;
      left: 50%;
      bottom: 22px;
      transform: translate(-50%, 6px) scale(0.92);
      filter: blur(6px);
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      background: #000;
      color: #fff;
      border-radius: 999px;
      font-size: 12px;
      font-feature-settings: "tnum" 1;
      letter-spacing: 0.01em;
      opacity: 0;
      pointer-events: none;
      transition: opacity 260ms ease, transform 260ms cubic-bezier(.2,.8,.2,1), filter 260ms ease;
      transform-origin: center bottom;
      z-index: 2147483000;
      user-select: none;
    }
    .overlay[data-visible] {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, 0) scale(1);
      filter: blur(0);
    }

    .btn {
      appearance: none;
      -webkit-appearance: none;
      background: transparent;
      border: 0;
      margin: 0;
      padding: 0;
      color: inherit;
      font: inherit;
      cursor: default;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      min-width: 28px;
      border-radius: 999px;
      color: rgba(255,255,255,0.72);
      transition: background 140ms ease, color 140ms ease;
      -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
    .btn:active { background: rgba(255,255,255,0.18); }
    .btn:focus { outline: none; }
    .btn:focus-visible { outline: none; }
    .btn::-moz-focus-inner { border: 0; }
    .btn svg { width: 14px; height: 14px; display: block; }
    .btn.reset {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.02em;
      padding: 0 10px 0 12px;
      gap: 6px;
      color: rgba(255,255,255,0.72);
    }
    .btn.reset .kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 10px;
      line-height: 1;
      color: rgba(255,255,255,0.88);
      background: rgba(255,255,255,0.12);
      border-radius: 4px;
    }

    .count {
      font-variant-numeric: tabular-nums;
      color: #fff;
      font-weight: 500;
      padding: 0 8px;
      min-width: 42px;
      text-align: center;
      font-size: 12px;
    }
    .count .sep { color: rgba(255,255,255,0.45); margin: 0 3px; font-weight: 400; }
    .count .total { color: rgba(255,255,255,0.55); }

    .divider {
      width: 1px;
      height: 14px;
      background: rgba(255,255,255,0.18);
      margin: 0 2px;
    }

    /* ── Thumbnail rail ──────────────────────────────────────────────────
       Fixed column on the left; each thumbnail is a static deep-clone of
       the light-DOM slide scaled into a 16:9 (or design-aspect) frame. The
       stage re-fits around it (see _fit); hidden during present / noscale
       / print so capture geometry and fullscreen output are unchanged. */
    .rail {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: var(--deck-rail-w, 188px);
      background: #141414;
      border-right: 1px solid rgba(255,255,255,0.08);
      overflow-y: auto;
      overflow-x: hidden;
      padding: 12px 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 2147482500;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.18) transparent;
    }
    .rail::-webkit-scrollbar { width: 8px; }
    .rail::-webkit-scrollbar-track { background: transparent; margin: 2px; }
    .rail::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.18);
      border-radius: 4px;
      border: 2px solid transparent;
      background-clip: content-box;
    }
    .rail::-webkit-scrollbar-thumb:hover {
      background: rgba(255,255,255,0.28);
      border: 2px solid transparent;
      background-clip: content-box;
    }
    :host([no-rail]) .rail,
    :host([noscale]) .rail { display: none; }
    .rail[data-presenting] { display: none; }
    /* User-driven show/hide (the TweaksPanel toggle) slides instead of
       popping. Transitions are gated on :host([data-rail-anim]) — set only
       for the 200ms around the toggle — so window-resize and rail-width
       drag (which also call _fit) don't lag behind the cursor. */
    .rail[data-user-hidden] { transform: translateX(-100%); }
    :host([data-rail-anim]) .rail { transition: transform 200ms cubic-bezier(.3,.7,.4,1); }
    :host([data-rail-anim]) .stage { transition: left 200ms cubic-bezier(.3,.7,.4,1); }
    :host([data-rail-anim]) .canvas { transition: transform 200ms cubic-bezier(.3,.7,.4,1); }
    /* transition shorthand replaces rather than merges — repeat the base
       .overlay opacity/transform/filter transitions so visibility changes
       during the 200ms toggle window still fade instead of popping. */
    :host([data-rail-anim]) .overlay {
      transition: margin-left 200ms cubic-bezier(.3,.7,.4,1),
                  opacity 260ms ease,
                  transform 260ms cubic-bezier(.2,.8,.2,1),
                  filter 260ms ease;
    }
    :host([data-rail-anim]) .tapzones { transition: left 200ms cubic-bezier(.3,.7,.4,1); }

    .thumb {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }
    .thumb .num {
      width: 16px;
      flex-shrink: 0;
      font-size: 11px;
      font-weight: 500;
      text-align: right;
      color: rgba(255,255,255,0.55);
      padding-top: 2px;
      font-variant-numeric: tabular-nums;
    }
    .thumb .frame {
      position: relative;
      flex: 1;
      min-width: 0;
      aspect-ratio: var(--deck-aspect);
      background: #fff;
      border-radius: 4px;
      outline: 2px solid transparent;
      outline-offset: 0;
      overflow: hidden;
      transition: outline-color 120ms ease;
    }
    .thumb:hover .frame { outline-color: rgba(255,255,255,0.25); }
    .thumb { outline: none; }
    .thumb:focus-visible .frame { outline-color: rgba(255,255,255,0.5); }
    .thumb[data-current] .num { color: #fff; }
    .thumb[data-current] .frame { outline-color: #D97757; }
    .thumb[data-dragging] { opacity: 0.35; }
    .thumb::before {
      content: '';
      position: absolute;
      left: 24px;
      right: 0;
      height: 3px;
      border-radius: 2px;
      background: #D97757;
      opacity: 0;
      pointer-events: none;
    }
    .thumb[data-drop="before"]::before { top: -8px; opacity: 1; }
    .thumb[data-drop="after"]::before { bottom: -8px; opacity: 1; }
    .thumb[data-skip] .frame { opacity: 0.35; }
    .thumb[data-skip] .frame::after {
      content: 'Skipped';
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.45);
      color: #fff;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.04em;
    }

    .ctxmenu {
      position: fixed;
      min-width: 150px;
      padding: 4px;
      background: #242424;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 7px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.45);
      z-index: 2147483100;
      display: none;
      font-size: 12px;
    }
    .ctxmenu[data-open] { display: block; }
    .ctxmenu button {
      display: block;
      width: 100%;
      appearance: none;
      border: 0;
      background: transparent;
      color: #e8e8e8;
      font: inherit;
      text-align: left;
      padding: 6px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .ctxmenu button:hover:not(:disabled) { background: rgba(255,255,255,0.08); }
    .ctxmenu button:disabled { opacity: 0.35; cursor: default; }
    .ctxmenu hr {
      border: 0;
      border-top: 1px solid rgba(255,255,255,0.1);
      margin: 4px 2px;
    }

    .rail-resize {
      position: fixed;
      left: calc(var(--deck-rail-w, 188px) - 3px);
      top: 0;
      bottom: 0;
      width: 6px;
      cursor: col-resize;
      z-index: 2147482600;
      touch-action: none;
    }
    .rail-resize:hover,
    .rail-resize[data-dragging] { background: rgba(255,255,255,0.12); }
    :host([no-rail]) .rail-resize,
    :host([noscale]) .rail-resize,
    .rail[data-presenting] + .rail-resize,
    .rail[data-user-hidden] + .rail-resize { display: none; }

    /* Delete-confirm popup — matches the SPA's ConfirmDialog layout
       (title + message body, depressed footer with Cancel / Delete). */
    .confirm-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 2147483200;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .confirm-backdrop[data-open] { display: flex; }
    .confirm {
      width: 320px;
      max-width: calc(100vw - 32px);
      background: #2a2a2a;
      color: #e8e8e8;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.5);
      overflow: hidden;
      font-family: inherit;
      animation: deck-confirm-in 0.18s ease;
    }
    @keyframes deck-confirm-in {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
    .confirm .body { padding: 20px 20px 16px; }
    .confirm .title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
    .confirm .msg { font-size: 13px; line-height: 1.5; color: rgba(255,255,255,0.65); }
    .confirm .footer {
      padding: 14px 20px;
      background: #1f1f1f;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .confirm button {
      appearance: none;
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
    }
    .confirm .cancel {
      background: transparent;
      border: 0;
      color: rgba(255,255,255,0.8);
    }
    .confirm .cancel:hover { background: rgba(255,255,255,0.08); }
    .confirm .danger {
      background: #c96442;
      border: 1px solid rgba(0,0,0,0.15);
      color: #fff;
      box-shadow: 0 1px 3px rgba(166,50,68,0.3), 0 2px 6px rgba(166,50,68,0.18);
    }
    .confirm .danger:hover { background: #b5563a; }

    /* ── Print: one page per slide, no chrome ────────────────────────────
       The screen layout stacks every slide at inset:0 inside a scaled
       canvas; for print we want them in document flow at the authored
       design size so the browser paginates one slide per sheet. The
       @page size is set from the width/height attributes via the inline
       <style id="deck-stage-print-page"> that connectedCallback injects
       into <head> (the @page at-rule has no effect inside shadow DOM). */
    @media print {
      :host {
        position: static;
        inset: auto;
        background: none;
        overflow: visible;
        color: inherit;
      }
      .stage { position: static; display: block; }
      .canvas {
        transform: none !important;
        width: auto !important;
        height: auto !important;
        background: none;
        will-change: auto;
      }
      ::slotted(*) {
        position: relative !important;
        inset: auto !important;
        width: var(--deck-design-w) !important;
        height: var(--deck-design-h) !important;
        box-sizing: border-box !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto;
        break-after: page;
        page-break-after: always;
        break-inside: avoid;
        overflow: hidden;
      }
      /* :last-child alone isn't enough once data-deck-skip hides the
         trailing slide(s) — the last *visible* slide still carries
         break-after:page and prints a blank sheet. _markLastVisible()
         maintains data-deck-last-visible on the last non-skipped slide. */
      ::slotted(*:last-child),
      ::slotted([data-deck-last-visible]) {
        break-after: auto;
        page-break-after: auto;
      }
      ::slotted([data-deck-skip]) { display: none !important; }
      .overlay, .tapzones, .rail, .rail-resize, .ctxmenu, .confirm-backdrop { display: none !important; }
    }
  `;
  class DeckStage extends HTMLElement {
    static get observedAttributes() {
      return ['width', 'height', 'noscale', 'no-rail'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._index = 0;
      this._slides = [];
      this._notes = [];
      this._hideTimer = null;
      this._mouseIdleTimer = null;
      this._menuIndex = -1;
      this._onKey = this._onKey.bind(this);
      this._onResize = this._onResize.bind(this);
      this._onSlotChange = this._onSlotChange.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onTapBack = this._onTapBack.bind(this);
      this._onTapForward = this._onTapForward.bind(this);
      this._onMessage = this._onMessage.bind(this);
      // Capture-phase close so a click anywhere dismisses the menu, but
      // ignore clicks that land inside the menu itself — otherwise the
      // capture handler runs before the menu's own (bubble) handler and
      // clears _menuIndex out from under it.
      this._onDocClick = e => {
        if (this._menu && e.composedPath && e.composedPath().includes(this._menu)) return;
        this._closeMenu();
      };
    }
    get designWidth() {
      return parseInt(this.getAttribute('width'), 10) || DESIGN_W_DEFAULT;
    }
    get designHeight() {
      return parseInt(this.getAttribute('height'), 10) || DESIGN_H_DEFAULT;
    }
    connectedCallback() {
      // Presenter-view popup loads deckUrl?_snthumb=...#N for its prev/cur/
      // next thumbnails — the rail has no business rendering inside those
      // (wrong scale, and it offsets the stage so the thumb shows a gutter).
      if (/[?&]_snthumb=/.test(location.search)) this.setAttribute('no-rail', '');
      this._render();
      this._loadNotes();
      this._syncPrintPageRule();
      window.addEventListener('keydown', this._onKey);
      window.addEventListener('resize', this._onResize);
      window.addEventListener('mousemove', this._onMouseMove, {
        passive: true
      });
      window.addEventListener('message', this._onMessage);
      window.addEventListener('click', this._onDocClick, true);
      // Rail is off until the host posts __omelette_rail_enabled (feature-
      // flagged during soft-launch). Observers and thumbnail DOM are not
      // created until then, so flag-off decks pay only the parse cost of
      // the rail code, not its runtime.
      this._railEnabled = false;
      // Initial collection + layout happens via slotchange, which fires on mount.
    }
    _enableRail() {
      if (this._railEnabled) return;
      this._railEnabled = true;
      // Per-viewer preference — restored alongside rail width. Default on;
      // only a stored '0' (from the TweaksPanel toggle) hides it.
      this._railVisible = true;
      try {
        if (localStorage.getItem('deck-stage.railVisible') === '0') this._railVisible = false;
      } catch (e) {}
      // Live thumbnail updates: watch the light-DOM slides for content
      // edits and re-clone just the affected thumb(s), debounced. Ignore
      // the data-deck-* / data-screen-label / data-om-validate attributes
      // this component itself writes so nav and skip don't trigger
      // spurious refreshes.
      const OWN_ATTRS = /^data-(deck-|screen-label$|om-validate$)/;
      this._liveDirty = new Set();
      this._liveObserver = new MutationObserver(records => {
        for (const r of records) {
          if (r.type === 'attributes' && OWN_ATTRS.test(r.attributeName || '')) continue;
          let n = r.target;
          while (n && n.parentElement !== this) n = n.parentElement;
          if (n && this._slideSet && this._slideSet.has(n)) this._liveDirty.add(n);
        }
        if (this._liveDirty.size && !this._liveTimer) {
          this._liveTimer = setTimeout(() => {
            this._liveTimer = null;
            this._liveDirty.forEach(s => this._refreshThumb(s));
            this._liveDirty.clear();
          }, 200);
        }
      });
      this._liveObserver.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      // Lazy thumbnail materialization — clone the slide only when its
      // frame scrolls into (or near) the rail viewport. rootMargin gives
      // ~4 thumbs of pre-load so fast scrolling doesn't flash blanks.
      this._railObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting && e.target.__deckThumb) {
            this._materialize(e.target.__deckThumb);
          }
        });
      }, {
        root: this._rail,
        rootMargin: '400px 0px'
      });
      // Tweaks typically change CSS vars / attrs OUTSIDE <deck-stage>
      // (on <html>, <body>, a wrapper div, or a <style> tag), which
      // _liveObserver can't see. Re-snapshot author CSS (constructable
      // sheet is shared by reference, so one replaceSync updates every
      // thumb shadow root) and re-sync each thumb host's attrs + custom
      // properties. In-slide DOM mutations are _liveObserver's job.
      // Debounced so slider drags don't thrash.
      this._onTweakChange = () => {
        clearTimeout(this._tweakTimer);
        this._tweakTimer = setTimeout(() => {
          this._snapshotAuthorCss();
          // One getComputedStyle for the whole batch — each
          // getPropertyValue read below reuses the same computed style
          // as long as nothing invalidates layout between thumbs.
          const cs = getComputedStyle(this);
          (this._thumbs || []).forEach(t => {
            if (t.host) this._syncThumbHostAttrs(t.host, cs);
          });
        }, 120);
      };
      window.addEventListener('tweakchange', this._onTweakChange);
      this._snapshotAuthorCss();
      // Build the rail now that it's enabled — slotchange already fired,
      // so _renderRail's early-return skipped the initial build.
      this._syncRailHidden();
      this._renderRail();
      this._fit();
    }

    /** Snapshot document stylesheets into a constructable sheet that each
     *  thumbnail's nested shadow root adopts — so author CSS styles the
     *  cloned slide content without touching this component's chrome.
     *  Cross-origin sheets throw on .cssRules — skip them. Re-callable:
     *  the existing constructable sheet is reused via replaceSync so every
     *  already-adopted shadow root picks up the fresh CSS without re-adopt. */
    _snapshotAuthorCss() {
      // :root in an adopted sheet inside a shadow root matches nothing
      // (only the document root qualifies), so author rules like
      // `:root[data-voice="modern"] .serif` never reach the clones.
      // Rewrite :root → :host and mirror <html>'s data-*/class/lang onto
      // each thumb host (see _syncThumbHostAttrs) so the same selectors
      // match inside the thumbnail's shadow tree.
      const authorCss = Array.from(document.styleSheets).map(sh => {
        try {
          return Array.from(sh.cssRules).map(r => r.cssText).join('\n');
        } catch (e) {
          return '';
        }
      }).join('\n')
      // The shadow host is featureless outside the functional :host(...)
      // form, so any compound on :root — [attr], .class, #id, :pseudo —
      // must become :host(<compound>) not :host<compound>. Same for the
      // html type selector (Tailwind class-strategy dark mode emits
      // html.dark; Pico uses html[data-theme]), which has nothing to
      // match inside the thumb's shadow tree.
      .replace(/:root((?:\[[^\]]*\]|[.#][-\w]+|:[-\w]+(?:\([^)]*\))?)+)/g, ':host($1)').replace(/:root\b/g, ':host').replace(/(^|[\s,>~+(}])html((?:\[[^\]]*\]|[.#][-\w]+|:[-\w]+(?:\([^)]*\))?)+)(?![-\w])/g, '$1:host($2)').replace(/(^|[\s,>~+(}])html(?![-\w])/g, '$1:host');
      // Every custom property the author references. _syncThumbHostAttrs
      // mirrors each one's *computed* value at <deck-stage> onto the
      // thumb host so the live value wins over the :host default above
      // regardless of which ancestor the tweak wrote to (<html>, <body>,
      // a wrapper div, or the deck-stage element itself all inherit
      // down to getComputedStyle(this)).
      this._authorVars = new Set(authorCss.match(/--[\w-]+/g) || []);
      try {
        if (!this._adoptedSheet) this._adoptedSheet = new CSSStyleSheet();
        this._adoptedSheet.replaceSync(authorCss);
      } catch (e) {
        this._adoptedSheet = null;
        this._authorCss = authorCss;
      }
    }
    _syncThumbHostAttrs(host, cs) {
      const de = document.documentElement;
      // setAttribute overwrites but can't delete — an attr removed from
      // <html> (toggleAttribute off, classList emptied) would linger on
      // the host and :host([data-*]) / :host(.foo) rules would keep
      // matching. Remove stale mirrored attrs first; iterate backward
      // because removeAttribute mutates the live NamedNodeMap.
      for (let i = host.attributes.length - 1; i >= 0; i--) {
        const n = host.attributes[i].name;
        if ((n.startsWith('data-') || n === 'class' || n === 'lang') && !de.hasAttribute(n)) {
          host.removeAttribute(n);
        }
      }
      for (const a of de.attributes) {
        if (a.name.startsWith('data-') || a.name === 'class' || a.name === 'lang') {
          host.setAttribute(a.name, a.value);
        }
      }
      // The :root→:host rewrite in _snapshotAuthorCss pins each custom
      // property to its stylesheet default on the thumb host, shadowing
      // the live value that would otherwise inherit. Tweaks can write the
      // live value on any ancestor — <html>, <body>, a wrapper div, the
      // deck-stage element — so read it as the *computed* value at
      // <deck-stage> (which sees the whole inheritance chain) rather than
      // trying to guess which element the author wrote to. Inline on the
      // host beats the :host{} rule. remove-stale covers vars dropped
      // from the stylesheet between snapshots.
      const vars = this._authorVars || new Set();
      for (let i = host.style.length - 1; i >= 0; i--) {
        const p = host.style[i];
        if (p.startsWith('--') && !vars.has(p)) host.style.removeProperty(p);
      }
      const live = cs || getComputedStyle(this);
      vars.forEach(p => {
        const v = live.getPropertyValue(p);
        if (v) host.style.setProperty(p, v.trim());else host.style.removeProperty(p);
      });
    }
    disconnectedCallback() {
      window.removeEventListener('keydown', this._onKey);
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('mousemove', this._onMouseMove);
      window.removeEventListener('message', this._onMessage);
      window.removeEventListener('click', this._onDocClick, true);
      if (this._hideTimer) clearTimeout(this._hideTimer);
      if (this._mouseIdleTimer) clearTimeout(this._mouseIdleTimer);
      if (this._liveTimer) clearTimeout(this._liveTimer);
      if (this._tweakTimer) clearTimeout(this._tweakTimer);
      if (this._railAnimTimer) clearTimeout(this._railAnimTimer);
      if (this._scaleRaf) cancelAnimationFrame(this._scaleRaf);
      if (this._liveObserver) this._liveObserver.disconnect();
      if (this._railObserver) this._railObserver.disconnect();
      if (this._onTweakChange) window.removeEventListener('tweakchange', this._onTweakChange);
    }
    attributeChangedCallback() {
      if (this._canvas) {
        this._canvas.style.width = this.designWidth + 'px';
        this._canvas.style.height = this.designHeight + 'px';
        this._canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
        this._canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
        if (this._rail) {
          this._rail.style.setProperty('--deck-aspect', this.designWidth + '/' + this.designHeight);
        }
        this._fit();
        this._scaleThumbs();
        this._syncPrintPageRule();
      }
    }
    _render() {
      const style = document.createElement('style');
      style.textContent = stylesheet;
      const stage = document.createElement('div');
      stage.className = 'stage';
      const canvas = document.createElement('div');
      canvas.className = 'canvas';
      canvas.style.width = this.designWidth + 'px';
      canvas.style.height = this.designHeight + 'px';
      canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
      canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
      const slot = document.createElement('slot');
      slot.addEventListener('slotchange', this._onSlotChange);
      canvas.appendChild(slot);
      stage.appendChild(canvas);

      // Tap zones (mobile): left third = back, right third = forward.
      const tapzones = document.createElement('div');
      tapzones.className = 'tapzones export-hidden';
      tapzones.setAttribute('aria-hidden', 'true');
      tapzones.setAttribute('data-noncommentable', '');
      const tzBack = document.createElement('div');
      tzBack.className = 'tapzone tapzone--back';
      const tzMid = document.createElement('div');
      tzMid.className = 'tapzone tapzone--mid';
      tzMid.style.pointerEvents = 'none';
      const tzFwd = document.createElement('div');
      tzFwd.className = 'tapzone tapzone--fwd';
      tzBack.addEventListener('click', this._onTapBack);
      tzFwd.addEventListener('click', this._onTapForward);
      tapzones.append(tzBack, tzMid, tzFwd);

      // Overlay: compact, solid black, with clickable controls.
      const overlay = document.createElement('div');
      overlay.className = 'overlay export-hidden';
      overlay.setAttribute('role', 'toolbar');
      overlay.setAttribute('aria-label', 'Deck controls');
      overlay.setAttribute('data-noncommentable', '');
      overlay.innerHTML = `
        <button class="btn prev" type="button" aria-label="Previous slide" title="Previous (←)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>
        </button>
        <span class="count" aria-live="polite"><span class="current">1</span><span class="sep">/</span><span class="total">1</span></span>
        <button class="btn next" type="button" aria-label="Next slide" title="Next (→)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
        </button>
        <span class="divider"></span>
        <button class="btn reset" type="button" aria-label="Reset to first slide" title="Reset (R)">Reset<span class="kbd">R</span></button>
      `;
      overlay.querySelector('.prev').addEventListener('click', () => this._advance(-1, 'click'));
      overlay.querySelector('.next').addEventListener('click', () => this._advance(1, 'click'));
      overlay.querySelector('.reset').addEventListener('click', () => this._go(0, 'click'));

      // Thumbnail rail + context menu. Thumbnails are populated in
      // _renderRail() after _collectSlides().
      const rail = document.createElement('div');
      rail.className = 'rail export-hidden';
      rail.setAttribute('data-noncommentable', '');
      rail.style.setProperty('--deck-aspect', this.designWidth + '/' + this.designHeight);
      // Edge auto-scroll while dragging a thumb near the rail's top/bottom
      // so off-screen drop targets are reachable. Native dragover fires
      // continuously while the pointer is stationary, so a per-event nudge
      // (ramped by edge proximity) is enough — no rAF loop needed.
      rail.addEventListener('dragover', e => {
        if (this._dragFrom == null) return;
        const r = rail.getBoundingClientRect();
        const EDGE = 40;
        const dt = e.clientY - r.top;
        const db = r.bottom - e.clientY;
        if (dt < EDGE) rail.scrollTop -= Math.ceil((EDGE - dt) / 3);else if (db < EDGE) rail.scrollTop += Math.ceil((EDGE - db) / 3);
      });
      const menu = document.createElement('div');
      menu.className = 'ctxmenu export-hidden';
      menu.setAttribute('data-noncommentable', '');
      menu.innerHTML = `
        <button type="button" data-act="skip">Skip slide</button>
        <button type="button" data-act="up">Move up</button>
        <button type="button" data-act="down">Move down</button>
        <hr>
        <button type="button" data-act="delete">Delete slide</button>
      `;
      menu.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        const i = this._menuIndex;
        this._closeMenu();
        if (act === 'skip') this._toggleSkip(i);else if (act === 'up') this._moveSlide(i, i - 1);else if (act === 'down') this._moveSlide(i, i + 1);else if (act === 'delete') this._openConfirm(i);
      });
      menu.addEventListener('contextmenu', e => e.preventDefault());

      // Rail resize handle — drag to set --deck-rail-w, persisted to
      // localStorage so the width survives reloads.
      const resize = document.createElement('div');
      resize.className = 'rail-resize export-hidden';
      resize.setAttribute('data-noncommentable', '');
      resize.addEventListener('pointerdown', e => {
        e.preventDefault();
        resize.setPointerCapture(e.pointerId);
        resize.setAttribute('data-dragging', '');
        const move = ev => this._setRailWidth(ev.clientX);
        const up = () => {
          resize.removeEventListener('pointermove', move);
          resize.removeEventListener('pointerup', up);
          resize.removeEventListener('pointercancel', up);
          resize.removeAttribute('data-dragging');
          try {
            localStorage.setItem('deck-stage.railWidth', String(this._railPx));
          } catch (err) {}
        };
        resize.addEventListener('pointermove', move);
        resize.addEventListener('pointerup', up);
        resize.addEventListener('pointercancel', up);
      });

      // Delete-confirm dialog — mirrors the SPA's ConfirmDialog layout.
      const confirm = document.createElement('div');
      confirm.className = 'confirm-backdrop export-hidden';
      confirm.setAttribute('data-noncommentable', '');
      confirm.innerHTML = `
        <div class="confirm" role="dialog" aria-modal="true">
          <div class="body">
            <div class="title">Delete slide?</div>
            <div class="msg">This slide will be removed from the deck.</div>
          </div>
          <div class="footer">
            <button type="button" class="cancel">Cancel</button>
            <button type="button" class="danger">Delete</button>
          </div>
        </div>
      `;
      confirm.addEventListener('click', e => {
        if (e.target === confirm) this._closeConfirm();
      });
      confirm.querySelector('.cancel').addEventListener('click', () => this._closeConfirm());
      confirm.querySelector('.danger').addEventListener('click', () => {
        const i = this._confirmIndex;
        this._closeConfirm();
        this._deleteSlide(i);
      });
      this._root.append(style, rail, resize, stage, tapzones, overlay, menu, confirm);
      this._canvas = canvas;
      this._slot = slot;
      this._overlay = overlay;
      this._tapzones = tapzones;
      this._rail = rail;
      this._resize = resize;
      this._menu = menu;
      this._confirm = confirm;
      this._countEl = overlay.querySelector('.current');
      this._totalEl = overlay.querySelector('.total');

      // Restore persisted rail width.
      let rw = 188;
      try {
        const s = localStorage.getItem('deck-stage.railWidth');
        if (s) rw = parseInt(s, 10) || rw;
      } catch (err) {}
      this._setRailWidth(rw);
      this._syncRailHidden();
    }
    _setRailWidth(px) {
      const w = Math.max(120, Math.min(360, Math.round(px)));
      this._railPx = w;
      this.style.setProperty('--deck-rail-w', w + 'px');
      this._fit();
      // _scaleThumbs forces a sync layout (frame.offsetWidth) then writes
      // N transforms. During a resize drag this runs per-pointermove;
      // coalesce to one per frame.
      if (!this._scaleRaf) {
        this._scaleRaf = requestAnimationFrame(() => {
          this._scaleRaf = null;
          this._scaleThumbs();
        });
      }
    }

    /** @page must live in the document stylesheet — it's a no-op inside
     *  shadow DOM. Inject/update a single <head> style tag so the print
     *  sheet matches the design size and Save-as-PDF yields one slide per
     *  page with no margins. */
    _syncPrintPageRule() {
      const id = 'deck-stage-print-page';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
        document.head.appendChild(tag);
      }
      tag.textContent = '@page { size: ' + this.designWidth + 'px ' + this.designHeight + 'px; margin: 0; } ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; overflow: visible !important; height: auto !important; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }';
    }
    _onSlotChange() {
      // Rail mutations (delete/move) already reconcile synchronously and
      // emit slidechange with reason 'api'; skip the async slotchange that
      // would otherwise re-broadcast with reason 'init'.
      if (this._squelchSlotChange) {
        this._squelchSlotChange = false;
        return;
      }
      this._collectSlides();
      this._restoreIndex();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'init'
      });
      this._fit();
    }
    _collectSlides() {
      const assigned = this._slot.assignedElements({
        flatten: true
      });
      this._slides = assigned.filter(el => {
        // Skip template/style/script nodes even if someone slots them.
        const tag = el.tagName;
        return tag !== 'TEMPLATE' && tag !== 'SCRIPT' && tag !== 'STYLE';
      });
      this._slideSet = new Set(this._slides);
      this._slides.forEach((slide, i) => {
        const n = i + 1;
        // Determine a label for comment flow: prefer explicit data-label,
        // then an existing data-screen-label, then first heading, else "Slide".
        let label = slide.getAttribute('data-label');
        if (!label) {
          const existing = slide.getAttribute('data-screen-label');
          if (existing) {
            // Strip any leading number the author may have included.
            label = existing.replace(/^\s*\d+\s*/, '').trim() || existing;
          }
        }
        if (!label) {
          const h = slide.querySelector('h1, h2, h3, [data-title]');
          if (h) label = (h.textContent || '').trim().slice(0, 40);
        }
        if (!label) label = 'Slide';
        slide.setAttribute('data-screen-label', `${pad2(n)} ${label}`);

        // Validation attribute for comment flow / auto-checks.
        if (!slide.hasAttribute('data-om-validate')) {
          slide.setAttribute('data-om-validate', VALIDATE_ATTR);
        }
        slide.setAttribute('data-deck-slide', String(i));
      });
      if (this._totalEl) this._totalEl.textContent = String(this._slides.length || 1);
      if (this._index >= this._slides.length) this._index = Math.max(0, this._slides.length - 1);
      this._markLastVisible();
      this._renderRail();
    }

    /** Tag the last non-skipped slide so print CSS can drop its
     *  break-after (see the @media print comment above — :last-child
     *  alone matches a hidden skipped slide). */
    _markLastVisible() {
      let last = null;
      this._slides.forEach(s => {
        s.removeAttribute('data-deck-last-visible');
        if (!s.hasAttribute('data-deck-skip')) last = s;
      });
      if (last) last.setAttribute('data-deck-last-visible', '');
    }
    _loadNotes() {
      const tag = document.getElementById('speaker-notes');
      if (!tag) {
        this._notes = [];
        return;
      }
      try {
        const parsed = JSON.parse(tag.textContent || '[]');
        if (Array.isArray(parsed)) this._notes = parsed;
      } catch (e) {
        console.warn('[deck-stage] Failed to parse #speaker-notes JSON:', e);
        this._notes = [];
      }
    }
    _restoreIndex() {
      // The host's ?slide= param is delivered as a #<int> hash (1-indexed) on
      // the iframe src. No hash → slide 1; the deck itself keeps no position
      // state across loads.
      const h = (location.hash || '').match(/^#(\d+)$/);
      if (h) {
        const n = parseInt(h[1], 10) - 1;
        if (n >= 0 && n < this._slides.length) this._index = n;
      }
    }
    _applyIndex({
      showOverlay = true,
      broadcast = true,
      reason = 'init'
    } = {}) {
      if (!this._slides.length) return;
      const prev = this._prevIndex == null ? -1 : this._prevIndex;
      const curr = this._index;
      // Keep the iframe's own hash in sync so an in-iframe location.reload()
      // (reload banner path in viewer-handle.ts) lands on the current slide,
      // not the stale deep-link hash from initial load.
      try {
        history.replaceState(null, '', '#' + (curr + 1));
      } catch (e) {}
      this._slides.forEach((s, i) => {
        if (i === curr) s.setAttribute('data-deck-active', '');else s.removeAttribute('data-deck-active');
      });
      if (this._countEl) this._countEl.textContent = String(curr + 1);
      // Follow-scroll on every navigation (init deep-link, keyboard, click,
      // tap, external goTo) — the only time we *don't* want the rail to
      // track current is after a rail-internal mutation, where _renderRail
      // has already restored the user's scroll position and yanking back to
      // current would undo it.
      this._syncRail(reason !== 'mutation');
      if (broadcast) {
        // (1) Legacy: host-window postMessage for speaker-notes renderers.
        try {
          window.postMessage({
            slideIndexChanged: curr,
            deckTotal: this._slides.length,
            deckSkipped: this._skippedIndices()
          }, '*');
        } catch (e) {}

        // (2) In-page CustomEvent on the <deck-stage> element itself.
        //     Bubbles and composes out of shadow DOM so slide code can listen:
        //       document.querySelector('deck-stage').addEventListener('slidechange', e => {
        //         e.detail.index, e.detail.previousIndex, e.detail.total, e.detail.slide, e.detail.reason
        //       });
        const detail = {
          index: curr,
          previousIndex: prev,
          total: this._slides.length,
          slide: this._slides[curr] || null,
          previousSlide: prev >= 0 ? this._slides[prev] || null : null,
          reason: reason // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
        };
        this.dispatchEvent(new CustomEvent('slidechange', {
          detail,
          bubbles: true,
          composed: true
        }));
      }
      this._prevIndex = curr;
      if (showOverlay) this._flashOverlay();
    }
    _flashOverlay() {
      // Host posts __omelette_presenting while in fullscreen/tab presentation
      // mode — suppress the nav footer entirely (both hover and slide-change
      // flash) so the audience sees clean slides.
      if (!this._overlay || this._presenting) return;
      this._overlay.setAttribute('data-visible', '');
      if (this._hideTimer) clearTimeout(this._hideTimer);
      this._hideTimer = setTimeout(() => {
        this._overlay.removeAttribute('data-visible');
      }, OVERLAY_HIDE_MS);
    }
    _railWidth() {
      // State-based, no offsetWidth: the first _fit() can run before the
      // rail has had layout on some load paths, and a 0 there paints the
      // slide full-width for one frame before the post-slotchange _fit()
      // corrects it.
      if (!this._railEnabled || !this._railVisible || this.hasAttribute('no-rail') || this.hasAttribute('noscale') || this._presenting) return 0;
      return this._railPx || 0;
    }
    _fit() {
      if (!this._canvas) return;
      const stage = this._canvas.parentElement;
      // PPTX export sets noscale so the DOM capture sees authored-size
      // geometry — the scaled canvas is in shadow DOM, so the exporter's
      // resetTransformSelector can't reach .canvas.style.transform directly.
      if (this.hasAttribute('noscale')) {
        this._canvas.style.transform = 'none';
        if (stage) stage.style.left = '0';
        if (this._overlay) this._overlay.style.marginLeft = '0';
        if (this._tapzones) this._tapzones.style.left = '0';
        return;
      }
      const rw = this._railWidth();
      if (stage) stage.style.left = rw + 'px';
      // Overlay is centred on the viewport via left:50% + translate(-50%);
      // marginLeft shifts the centre by rw/2 so it lands in the middle of
      // the [rw, innerWidth] stage region. Tapzones just inset from rw.
      if (this._overlay) this._overlay.style.marginLeft = rw / 2 + 'px';
      if (this._tapzones) this._tapzones.style.left = rw + 'px';
      const vw = window.innerWidth - rw;
      const vh = window.innerHeight;
      const s = Math.min(vw / this.designWidth, vh / this.designHeight);
      this._canvas.style.transform = `scale(${s})`;
    }
    _onResize() {
      this._fit();
    }
    _onMouseMove() {
      // Keep overlay visible while mouse moves; hide after idle.
      this._flashOverlay();
    }
    _onMessage(e) {
      const d = e.data;
      if (d && typeof d.__omelette_presenting === 'boolean') {
        this._presenting = d.__omelette_presenting;
        if (this._presenting && this._overlay) {
          this._overlay.removeAttribute('data-visible');
          if (this._hideTimer) clearTimeout(this._hideTimer);
        }
        this._syncRailHidden();
        this._closeMenu();
        this._closeConfirm();
        this._fit();
        this._scaleThumbs();
      }
      // Per-viewer show/hide, driven by the TweaksPanel's auto-injected
      // "Thumbnail rail" toggle (or any author script). Independent of
      // whether the Tweaks panel itself is open — closing the panel
      // doesn't change rail visibility. Persists alongside rail width.
      if (d && d.type === '__deck_rail_visible' && typeof d.on === 'boolean') {
        if (d.on === this._railVisible) return;
        this._railVisible = d.on;
        try {
          localStorage.setItem('deck-stage.railVisible', d.on ? '1' : '0');
        } catch (e) {}
        // Arm the transition, commit it, then flip state — otherwise the
        // browser coalesces both writes and nothing animates on show.
        this.setAttribute('data-rail-anim', '');
        void (this._rail && this._rail.offsetHeight);
        this._syncRailHidden();
        this._fit();
        this._scaleThumbs();
        clearTimeout(this._railAnimTimer);
        this._railAnimTimer = setTimeout(() => this.removeAttribute('data-rail-anim'), 220);
      }
      if (d && d.type === '__omelette_rail_enabled') this._enableRail();
    }
    _syncRailHidden() {
      if (!this._rail) return;
      // data-presenting is the hard hide (display:none) for flag-off and
      // presentation mode — instant, no transition. data-user-hidden is
      // the soft hide (translateX(-100%)) for the viewer's rail toggle,
      // so show/hide slides under :host([data-rail-anim]).
      const hard = !this._railEnabled || this._presenting;
      if (hard) this._rail.setAttribute('data-presenting', '');else this._rail.removeAttribute('data-presenting');
      if (!this._railVisible) this._rail.setAttribute('data-user-hidden', '');else this._rail.removeAttribute('data-user-hidden');
      // translateX hide leaves thumbs (tabIndex=0) in the tab order —
      // inert keeps them unfocusable while the rail is off-screen.
      this._rail.inert = hard || !this._railVisible;
    }
    _onTapBack(e) {
      e.preventDefault();
      this._advance(-1, 'tap');
    }
    _onTapForward(e) {
      e.preventDefault();
      this._advance(1, 'tap');
    }
    _onKey(e) {
      // Ignore when the user is typing.
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      // Confirm dialog swallows nav keys while open; Escape cancels. Enter
      // is left to the focused button's native activation so Tab→Cancel
      // →Enter activates Cancel, not the window-level confirm path.
      if (this._confirm && this._confirm.hasAttribute('data-open')) {
        if (e.key === 'Escape') {
          this._closeConfirm();
          e.preventDefault();
        }
        return;
      }
      if (e.key === 'Escape' && this._menu && this._menu.hasAttribute('data-open')) {
        this._closeMenu();
        e.preventDefault();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key;
      let handled = true;
      if (key === 'ArrowRight' || key === 'PageDown' || key === ' ' || key === 'Spacebar') {
        this._advance(1, 'keyboard');
      } else if (key === 'ArrowLeft' || key === 'PageUp') {
        this._advance(-1, 'keyboard');
      } else if (key === 'Home') {
        this._go(0, 'keyboard');
      } else if (key === 'End') {
        this._go(this._slides.length - 1, 'keyboard');
      } else if (key === 'r' || key === 'R') {
        this._go(0, 'keyboard');
      } else if (/^[0-9]$/.test(key)) {
        // 1..9 jump to that slide; 0 jumps to 10.
        const n = key === '0' ? 9 : parseInt(key, 10) - 1;
        if (n < this._slides.length) this._go(n, 'keyboard');
      } else {
        handled = false;
      }
      if (handled) {
        e.preventDefault();
        this._flashOverlay();
      }
    }
    _go(i, reason = 'api') {
      if (!this._slides.length) return;
      const clamped = Math.max(0, Math.min(this._slides.length - 1, i));
      if (clamped === this._index) {
        this._flashOverlay();
        return;
      }
      this._index = clamped;
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason
      });
    }

    /** Step forward/back skipping any slide marked data-deck-skip. Falls
     *  back to _go's clamp-at-ends behaviour (flash overlay) when there's
     *  nothing further in that direction. */
    _advance(dir, reason) {
      if (!this._slides.length) return;
      let i = this._index + dir;
      while (i >= 0 && i < this._slides.length && this._slides[i].hasAttribute('data-deck-skip')) {
        i += dir;
      }
      if (i < 0 || i >= this._slides.length) {
        this._flashOverlay();
        return;
      }
      this._go(i, reason);
    }

    // ── Thumbnail rail ────────────────────────────────────────────────────
    //
    // Thumbs are keyed by slide element and reused across _renderRail()
    // calls, so a reorder/delete is an O(changed) DOM shuffle instead of an
    // O(N) teardown-and-re-clone. Each thumb starts as a lightweight shell
    // (num + empty frame); the clone is materialized lazily by an
    // IntersectionObserver when the frame scrolls into (or near) view, so
    // only visible-ish slides pay the clone + image-decode cost.

    _renderRail() {
      if (!this._rail || !this._railEnabled) {
        this._thumbs = [];
        return;
      }
      // FLIP: record each *materialized* thumb's top before the reconcile.
      // Off-screen (non-materialized) thumbs don't need the animation and
      // skipping their getBoundingClientRect saves a forced layout per
      // off-screen thumb on large decks.
      const prevTops = new Map();
      (this._thumbs || []).forEach(({
        thumb,
        slide,
        host
      }) => {
        if (host) prevTops.set(slide, thumb.getBoundingClientRect().top);
      });
      const st = this._rail.scrollTop;

      // Reconcile: reuse thumbs that already exist for a slide, create
      // shells for new slides, drop thumbs for removed slides.
      const bySlide = new Map();
      (this._thumbs || []).forEach(t => bySlide.set(t.slide, t));
      const next = [];
      this._slides.forEach(slide => {
        let t = bySlide.get(slide);
        if (t) bySlide.delete(slide);else t = this._makeThumb(slide);
        next.push(t);
      });
      // Orphans — slides removed since last render.
      bySlide.forEach(t => {
        if (this._railObserver) this._railObserver.unobserve(t.frame);
        t.thumb.remove();
      });
      // Put thumbs into document order to match _slides. insertBefore on
      // an already-correctly-placed node is a no-op, so this is cheap
      // when nothing moved.
      next.forEach((t, i) => {
        const want = t.thumb;
        const at = this._rail.children[i];
        if (at !== want) this._rail.insertBefore(want, at || null);
        t.i = i;
        t.num.textContent = String(i + 1);
        if (t.slide.hasAttribute('data-deck-skip')) t.thumb.setAttribute('data-skip', '');else t.thumb.removeAttribute('data-skip');
      });
      this._thumbs = next;
      this._rail.scrollTop = st;
      if (prevTops.size) {
        const moved = [];
        this._thumbs.forEach(({
          thumb,
          slide
        }) => {
          const old = prevTops.get(slide);
          if (old == null) return;
          const dy = old - thumb.getBoundingClientRect().top;
          if (Math.abs(dy) < 1) return;
          thumb.style.transition = 'none';
          thumb.style.transform = `translateY(${dy}px)`;
          moved.push(thumb);
        });
        if (moved.length) {
          // Commit the inverted positions before flipping the transition
          // on — otherwise the browser coalesces both style writes and
          // nothing animates.
          void this._rail.offsetHeight;
          moved.forEach(t => {
            t.style.transition = 'transform 180ms cubic-bezier(.2,.7,.3,1)';
            t.style.transform = '';
          });
          setTimeout(() => moved.forEach(t => {
            t.style.transition = '';
          }), 220);
        }
      }
      requestAnimationFrame(() => this._scaleThumbs());
      this._syncRail(false);
    }

    /** Create a lightweight thumb shell for one slide. The clone is
     *  materialized later by the IntersectionObserver. Event handlers
     *  look up the thumb's *current* index (via _thumbs.indexOf) so the
     *  same element can be reused across reorders. */
    _makeThumb(slide) {
      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      thumb.tabIndex = 0;
      const num = document.createElement('div');
      num.className = 'num';
      const frame = document.createElement('div');
      frame.className = 'frame';
      thumb.append(num, frame);
      const entry = {
        thumb,
        num,
        frame,
        slide,
        clone: null,
        host: null,
        i: -1
      };
      // entry.i is refreshed on every _renderRail reconcile pass, so
      // handlers read the thumb's current position without an O(N) scan.
      const idx = () => entry.i;
      thumb.addEventListener('click', () => this._go(idx(), 'click'));
      // ↑/↓ step through the rail when a thumb has focus. _go clamps at the
      // ends and _applyIndex→_syncRail scrolls the new current thumb into
      // view; we move focus to it (preventScroll — _syncRail already
      // scrolled) so a held key walks the whole list. stopPropagation keeps
      // this out of the window-level _onKey nav handler.
      thumb.addEventListener('keydown', e => {
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        e.preventDefault();
        e.stopPropagation();
        this._go(idx() + (e.key === 'ArrowDown' ? 1 : -1), 'keyboard');
        const cur = this._thumbs && this._thumbs[this._index];
        if (cur) cur.thumb.focus({
          preventScroll: true
        });
      });
      thumb.addEventListener('contextmenu', e => {
        e.preventDefault();
        this._openMenu(idx(), e.clientX, e.clientY);
      });
      thumb.draggable = true;
      thumb.addEventListener('dragstart', e => {
        this._dragFrom = idx();
        thumb.setAttribute('data-dragging', '');
        e.dataTransfer.effectAllowed = 'move';
        try {
          e.dataTransfer.setData('text/plain', String(this._dragFrom));
        } catch (err) {}
      });
      thumb.addEventListener('dragend', () => {
        thumb.removeAttribute('data-dragging');
        this._clearDrop();
        this._dragFrom = null;
      });
      thumb.addEventListener('dragover', e => {
        if (this._dragFrom == null) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const r = thumb.getBoundingClientRect();
        this._setDrop(idx(), e.clientY < r.top + r.height / 2 ? 'before' : 'after');
      });
      thumb.addEventListener('drop', e => {
        if (this._dragFrom == null) return;
        e.preventDefault();
        const i = idx();
        const r = thumb.getBoundingClientRect();
        let to = e.clientY >= r.top + r.height / 2 ? i + 1 : i;
        if (this._dragFrom < to) to--;
        const from = this._dragFrom;
        this._clearDrop();
        this._dragFrom = null;
        if (to !== from) this._moveSlide(from, to);
      });
      if (this._railObserver) this._railObserver.observe(frame);
      frame.__deckThumb = entry;
      return entry;
    }

    /** Lazily build the clone for a thumb that has scrolled into view. */
    _materialize(entry) {
      if (entry.host) return;
      const dw = this.designWidth,
        dh = this.designHeight;
      let clone = entry.slide.cloneNode(true);
      clone.removeAttribute('id');
      clone.removeAttribute('data-deck-active');
      clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      // Neuter heavy media; replace <video> with its poster so the box
      // keeps a visual. <iframe>/<audio> become empty placeholders.
      clone.querySelectorAll('iframe, audio, object, embed').forEach(el => {
        el.removeAttribute('src');
        el.removeAttribute('srcdoc');
        el.removeAttribute('data');
        el.innerHTML = '';
      });
      clone.querySelectorAll('video').forEach(el => {
        if (!el.poster) {
          el.removeAttribute('src');
          el.innerHTML = '';
          return;
        }
        const img = document.createElement('img');
        img.src = el.poster;
        img.alt = '';
        img.style.cssText = el.style.cssText + ';object-fit:cover;width:100%;height:100%;';
        img.className = el.className;
        el.replaceWith(img);
      });
      // Images: defer decode and let the browser pick the smallest
      // srcset candidate for the ~140px thumb. Same-URL clones reuse the
      // slide's decoded bitmap (URL-keyed cache), so the remaining cost
      // is paint/composite — lazy+async keeps that off the main thread.
      clone.querySelectorAll('img').forEach(el => {
        el.loading = 'lazy';
        el.decoding = 'async';
        if (el.srcset) el.sizes = (this._railPx || 188) + 'px';
      });
      // Custom elements inside the slide would have their
      // connectedCallback fire when the clone is appended. Replace them
      // with inert boxes so a component-heavy deck doesn't run N copies
      // of each component's mount logic in the rail. Children are
      // preserved so layout-wrapper elements (<my-column><h2>…</h2>)
      // still show their authored content; the querySelectorAll NodeList
      // is static, so nested custom elements in the moved subtree are
      // still visited on later iterations.
      const neuter = el => {
        const box = document.createElement('div');
        box.style.cssText = (el.getAttribute('style') || '') + ';background:rgba(0,0,0,0.06);border:1px dashed rgba(0,0,0,0.15);';
        box.className = el.className;
        // Preserve theming/i18n hooks so [data-*] / :lang() / [dir]
        // descendant selectors still match the neutered root.
        for (const a of el.attributes) {
          const n = a.name;
          if (n.startsWith('data-') || n.startsWith('aria-') || n === 'lang' || n === 'dir' || n === 'role' || n === 'title') {
            box.setAttribute(n, a.value);
          }
        }
        while (el.firstChild) box.appendChild(el.firstChild);
        return box;
      };
      // querySelectorAll('*') returns descendants only — a custom-element
      // slide root (<my-slide>…</my-slide>) would slip through and upgrade
      // on append. Swap the root first.
      if (clone.tagName.includes('-')) clone = neuter(clone);
      clone.querySelectorAll('*').forEach(el => {
        if (el.tagName.includes('-')) el.replaceWith(neuter(el));
      });
      clone.style.cssText += ';position:absolute;top:0;left:0;transform-origin:0 0;' + 'pointer-events:none;width:' + dw + 'px;height:' + dh + 'px;' + 'box-sizing:border-box;overflow:hidden;visibility:visible;opacity:1;';
      const host = document.createElement('div');
      host.style.cssText = 'position:absolute;inset:0;';
      this._syncThumbHostAttrs(host);
      const sr = host.attachShadow({
        mode: 'open'
      });
      if (this._adoptedSheet) sr.adoptedStyleSheets = [this._adoptedSheet];else {
        const st = document.createElement('style');
        st.textContent = this._authorCss || '';
        sr.appendChild(st);
      }
      sr.appendChild(clone);
      entry.frame.appendChild(host);
      entry.host = host;
      entry.clone = clone;
      if (this._thumbScale) clone.style.transform = 'scale(' + this._thumbScale + ')';
      // Once materialized the IO callback is a no-op early-return —
      // unobserve so scroll doesn't keep firing it.
      if (this._railObserver) this._railObserver.unobserve(entry.frame);
    }

    /** Re-clone a single thumb (live-update path). No-op if the thumb
     *  hasn't been materialized yet — it'll pick up current content when
     *  it scrolls into view. */
    _refreshThumb(slide) {
      const entry = (this._thumbs || []).find(t => t.slide === slide);
      if (!entry || !entry.host) return;
      entry.host.remove();
      entry.host = entry.clone = null;
      this._materialize(entry);
    }
    _scaleThumbs() {
      if (!this._thumbs || !this._thumbs.length) return;
      // Every frame is the same width; if it reads 0 the rail is
      // display:none (noscale / no-rail / presenting / print) — leave the
      // clones as-is and re-run when the rail is revealed.
      const fw = this._thumbs[0].frame.offsetWidth;
      if (!fw) return;
      this._thumbScale = fw / this.designWidth;
      this._thumbs.forEach(({
        clone
      }) => {
        if (clone) clone.style.transform = 'scale(' + this._thumbScale + ')';
      });
    }
    _setDrop(i, where) {
      // dragover fires at pointer-event rate; touch only the previous
      // and new target rather than sweeping all N thumbs.
      const t = this._thumbs && this._thumbs[i];
      if (this._dropOn && this._dropOn !== t) {
        this._dropOn.thumb.removeAttribute('data-drop');
      }
      if (t) t.thumb.setAttribute('data-drop', where);
      this._dropOn = t || null;
    }
    _clearDrop() {
      if (this._dropOn) this._dropOn.thumb.removeAttribute('data-drop');
      this._dropOn = null;
    }
    _syncRail(follow) {
      if (!this._thumbs) return;
      this._thumbs.forEach(({
        thumb
      }, i) => {
        if (i === this._index) {
          thumb.setAttribute('data-current', '');
          if (follow && typeof thumb.scrollIntoView === 'function') {
            thumb.scrollIntoView({
              block: 'nearest'
            });
          }
        } else {
          thumb.removeAttribute('data-current');
        }
      });
    }
    _openMenu(i, x, y) {
      if (!this._menu) return;
      this._menuIndex = i;
      const slide = this._slides[i];
      const skip = slide && slide.hasAttribute('data-deck-skip');
      this._menu.querySelector('[data-act="skip"]').textContent = skip ? 'Unskip slide' : 'Skip slide';
      this._menu.querySelector('[data-act="up"]').disabled = i <= 0;
      this._menu.querySelector('[data-act="down"]').disabled = i >= this._slides.length - 1;
      this._menu.querySelector('[data-act="delete"]').disabled = this._slides.length <= 1;
      // Place, then clamp to viewport after it's measurable.
      this._menu.style.left = x + 'px';
      this._menu.style.top = y + 'px';
      this._menu.setAttribute('data-open', '');
      const r = this._menu.getBoundingClientRect();
      const nx = Math.min(x, window.innerWidth - r.width - 4);
      const ny = Math.min(y, window.innerHeight - r.height - 4);
      this._menu.style.left = Math.max(4, nx) + 'px';
      this._menu.style.top = Math.max(4, ny) + 'px';
    }
    _closeMenu() {
      if (this._menu) this._menu.removeAttribute('data-open');
      this._menuIndex = -1;
    }
    _openConfirm(i) {
      if (!this._confirm) return;
      this._confirmIndex = i;
      this._confirm.querySelector('.title').textContent = 'Delete slide ' + (i + 1) + '?';
      this._confirm.setAttribute('data-open', '');
      const btn = this._confirm.querySelector('.danger');
      if (btn && btn.focus) btn.focus();
    }
    _closeConfirm() {
      if (this._confirm) this._confirm.removeAttribute('data-open');
      this._confirmIndex = -1;
    }
    _emitDeckChange(detail) {
      this.dispatchEvent(new CustomEvent('deckchange', {
        detail,
        bubbles: true,
        composed: true
      }));
    }
    _deleteSlide(i) {
      const slide = this._slides[i];
      if (!slide || this._slides.length <= 1) return;
      const wasCurrent = i === this._index;
      if (i < this._index || wasCurrent && i === this._slides.length - 1) this._index--;
      this._squelchSlotChange = true;
      slide.remove();
      this._emitDeckChange({
        action: 'delete',
        from: i,
        slide
      });
      this._collectSlides();
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason: 'mutation'
      });
    }
    _toggleSkip(i) {
      const slide = this._slides[i];
      if (!slide) return;
      const on = !slide.hasAttribute('data-deck-skip');
      if (on) slide.setAttribute('data-deck-skip', '');else slide.removeAttribute('data-deck-skip');
      if (this._thumbs && this._thumbs[i]) {
        if (on) this._thumbs[i].thumb.setAttribute('data-skip', '');else this._thumbs[i].thumb.removeAttribute('data-skip');
      }
      this._markLastVisible();
      this._emitDeckChange({
        action: on ? 'skip' : 'unskip',
        from: i,
        slide
      });
      // Re-broadcast so the presenter popup's prev/next thumbnails re-pick
      // the nearest non-skipped slide without waiting for a nav event.
      try {
        window.postMessage({
          slideIndexChanged: this._index,
          deckTotal: this._slides.length,
          deckSkipped: this._skippedIndices()
        }, '*');
      } catch (e) {}
    }
    _skippedIndices() {
      const out = [];
      for (let i = 0; i < this._slides.length; i++) {
        if (this._slides[i].hasAttribute('data-deck-skip')) out.push(i);
      }
      return out;
    }
    _moveSlide(i, j) {
      if (j < 0 || j >= this._slides.length || j === i) return;
      const slide = this._slides[i];
      const ref = j < i ? this._slides[j] : this._slides[j].nextSibling;
      // Track the active slide across the reorder so the same content
      // stays on screen.
      const cur = this._index;
      if (cur === i) this._index = j;else if (i < cur && j >= cur) this._index = cur - 1;else if (i > cur && j <= cur) this._index = cur + 1;
      this._squelchSlotChange = true;
      this.insertBefore(slide, ref);
      this._emitDeckChange({
        action: 'move',
        from: i,
        to: j,
        slide
      });
      this._collectSlides();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'mutation'
      });
    }

    // Public API ------------------------------------------------------------

    /** Current slide index (0-based). */
    get index() {
      return this._index;
    }
    /** Total slide count. */
    get length() {
      return this._slides.length;
    }
    /** Programmatically navigate. */
    goTo(i) {
      this._go(i, 'api');
    }
    next() {
      this._advance(1, 'api');
    }
    prev() {
      this._advance(-1, 'api');
    }
    reset() {
      this._go(0, 'api');
    }
  }
  if (!customElements.get('deck-stage')) {
    customElements.define('deck-stage', DeckStage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "deck-stage.js", error: String((e && e.message) || e) }); }

// design-canvas.jsx
try { (() => {
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-canvas.jsx", error: String((e && e.message) || e) }); }

// design_handoff_feature_adoption/app/feature-adoption.jsx
try { (() => {
const {
  useState,
  useMemo
} = React;

/* ── Plan mapping ───────────────────────────────────────────────
   The event export carries no plan column, so plans below are DERIVED
   from billing/team signals in the events themselves (see derivePlan).
   Paste the real values here to override — key is the account id:
   PLAN_OVERRIDES = { 34: 'team', 731: 'enterprise', ... }            */
const PLAN_OVERRIDES = {};
const D = window.EVENT_DATA;
const PLANS = [{
  k: 'free',
  label: 'Free'
}, {
  k: 'solo',
  label: 'Solo'
}, {
  k: 'team',
  label: 'Team'
}, {
  k: 'enterprise',
  label: 'Enterprise'
}];
const TEAM_SIGNALS = ['accountant_invited', 'accountant_joined', 'member_joined', 'partner_portal_accessed'];
const PAID_SIGNALS = ['checkout_completed', 'subscription_created', 'plan_changed'];

/* ── Capability taxonomy ────────────────────────────────────────
   Raw events grouped into the things a customer actually switches on.
   Add or re-cut a capability by editing one line here.               */
const CAPABILITIES = [{
  f: 'Invoicing',
  name: 'Create & edit invoices',
  kind: 'core',
  ev: ['invoice_created', 'invoice_updated']
}, {
  f: 'Invoicing',
  name: 'Download PDFs',
  kind: 'core',
  ev: ['invoice_downloaded', 'invoice_viewed_by_owner']
}, {
  f: 'Invoicing',
  name: 'Send invoices to clients',
  kind: 'core',
  ev: ['invoice_sent']
}, {
  f: 'Invoicing',
  name: 'Client portal (viewed / downloaded)',
  kind: 'core',
  ev: ['invoice_viewed_by_client', 'invoice_downloaded_by_client']
}, {
  f: 'Invoicing',
  name: 'Mark paid / unpaid',
  kind: 'core',
  ev: ['invoice_paid', 'invoice_unpaid']
}, {
  f: 'Invoicing',
  name: 'Automatic payment reminders',
  kind: 'opt-in',
  ev: ['invoice_reminder_toggled', 'invoice_reminder_sent']
}, {
  f: 'Invoicing',
  name: 'Custom invoice templates',
  kind: 'opt-in',
  ev: ['template_created', 'invoice_template_changed', 'invoice_template_settings_changed']
}, {
  f: 'Invoicing',
  name: 'Quotes & proformas',
  kind: 'opt-in',
  ev: ['quote_created', 'quote_updated']
}, {
  f: 'Invoicing',
  name: 'Recurring invoices',
  kind: 'opt-in',
  ev: ['recurring_invoice_created']
}, {
  f: 'Invoicing',
  name: 'Import invoices',
  kind: 'opt-in',
  ev: ['invoices_imported']
}, {
  f: 'Invoicing',
  name: 'Bulk invoice actions',
  kind: 'opt-in',
  ev: ['bulk_invoices_updated', 'bulk_invoices_deleted']
}, {
  f: 'Invoicing',
  name: 'Custom numbering sequences',
  kind: 'opt-in',
  ev: ['invoice_sequence_created', 'invoice_sequence_updated']
}, {
  f: 'Invoicing',
  name: 'Cancel / delete invoices',
  kind: 'core',
  ev: ['invoice_canceled', 'invoice_uncanceled', 'invoice_deleted']
}, {
  f: 'Invoicing',
  name: 'Bulk export',
  kind: 'opt-in',
  ev: ['invoices_exported']
}, {
  f: 'Reporting',
  name: 'View reports',
  kind: 'core',
  ev: ['report_viewed', 'dashboard_viewed']
}, {
  f: 'Reporting',
  name: 'Filter & segment reports',
  kind: 'opt-in',
  ev: ['report_filter_changed']
}, {
  f: 'Reporting',
  name: 'Drill into report charts',
  kind: 'opt-in',
  ev: ['report_drilldown_opened', 'report_graph_toggled']
}, {
  f: 'Reporting',
  name: 'Export reports & documents',
  kind: 'opt-in',
  ev: ['report_exported', 'documents_exported']
}, {
  f: 'Reporting',
  name: 'Chase overdue from report',
  kind: 'opt-in',
  ev: ['report_overdue_clicked']
}, {
  f: 'Documents',
  name: 'Transaction documents',
  kind: 'opt-in',
  ev: ['transaction_document_uploaded', 'transaction_document_deleted']
}, {
  f: 'Documents',
  name: 'Inbound document inbox',
  kind: 'opt-in',
  ev: ['inbound_document_matched', 'inbound_document_unmatched', 'inbound_document_discarded']
}, {
  f: 'Documents',
  name: 'Automatic document matching',
  kind: 'opt-in',
  ev: ['transaction_document_auto_matched']
}, {
  f: 'Customers',
  name: 'Customer records',
  kind: 'core',
  ev: ['customer_created']
}, {
  f: 'Customers',
  name: 'Maintain customer details',
  kind: 'core',
  ev: ['customer_updated', 'customer_deleted']
}, {
  f: 'Banking',
  name: 'Bank account connected',
  kind: 'opt-in',
  ev: ['bank_account_connected', 'bank_account_disconnected']
}, {
  f: 'Banking',
  name: 'Bank feed import',
  kind: 'opt-in',
  ev: ['bank_transactions_imported']
}, {
  f: 'Banking',
  name: 'Match payments to invoices',
  kind: 'opt-in',
  ev: ['invoice_transaction_matched', 'invoice_transaction_unmatched']
}, {
  f: 'Banking',
  name: 'Card checkout / subscription',
  kind: 'opt-in',
  ev: ['checkout_completed', 'subscription_created']
}, {
  f: 'Banking',
  name: 'Plan changes',
  kind: 'lifecycle',
  ev: ['plan_changed', 'subscription_status_changed']
}, {
  f: 'Banking',
  name: 'Cancellation flow',
  kind: 'lifecycle',
  ev: ['subscription_canceled', 'subscription_cancellation_portal_opened', 'subscription_cancellation_feedback_submitted', 'subscription_cancellation_confirmed']
}, {
  f: 'Banking',
  name: 'Payment friction (failed / 3DS)',
  kind: 'lifecycle',
  ev: ['payment_failed', 'payment_action_required']
}, {
  f: 'Banking',
  name: 'Trial lifecycle',
  kind: 'lifecycle',
  ev: ['trial_will_end', 'trial_expired']
}, {
  f: 'Team',
  name: 'Accountant access',
  kind: 'opt-in',
  ev: ['accountant_invited', 'accountant_joined']
}, {
  f: 'Team',
  name: 'Accounting software integration',
  kind: 'opt-in',
  ev: ['accountant_integration_connected']
}, {
  f: 'Team',
  name: 'Team members',
  kind: 'opt-in',
  ev: ['member_joined']
}, {
  f: 'Team',
  name: 'Partner portal',
  kind: 'opt-in',
  ev: ['partner_portal_accessed']
}, {
  f: 'AI',
  name: 'AI assistant',
  kind: 'opt-in',
  ev: ['ai_assistant_used']
}, {
  f: 'Setup',
  name: 'Onboarding completed',
  kind: 'lifecycle',
  ev: ['onboarding_completed', 'registration']
}, {
  f: 'Setup',
  name: 'Company profile & logo',
  kind: 'opt-in',
  ev: ['organization_updated', 'organization_logo_uploaded', 'organization_logo_removed']
}, {
  f: 'Setup',
  name: 'Service catalog',
  kind: 'opt-in',
  ev: ['service_created', 'service_updated', 'service_deleted']
}];
const fmt = n => n.toLocaleString('en-US');
const nice = e => e.replace(/_/g, ' ');
const pct = (a, b) => b ? a / b * 100 : 0;

/* ── index the export ─────────────────────────────────────────── */
const EV_FEATURE = {};
CAPABILITIES.forEach(c => c.ev.forEach(e => EV_FEATURE[e] = c.f));

/* The export carries first_seen / last_seen per account × event, not a full time
   series — so a date range selects activity that OVERLAPS the window. Counts stay
   export totals; re-run data/supabase-export.sql with a narrower window for exact
   per-period counts. */
function indexCells(from, to) {
  const byOrg = D.orgs.map(() => ({
    ev: {},
    feat: {},
    total: 0,
    last: '',
    first: ''
  }));
  D.cells.forEach(([o, e, n, first, last]) => {
    if (from && last < from) return;
    if (to && first > to) return;
    const ev = D.events[e],
      b = byOrg[o],
      f = EV_FEATURE[ev.e] || ev.f;
    b.ev[ev.e] = {
      n,
      first,
      last,
      f
    };
    b.feat[f] = (b.feat[f] || 0) + n;
    b.total += n;
    if (last > b.last) b.last = last;
    if (!b.first || first < b.first) b.first = first;
  });
  return byOrg;
}
const byOrg = indexCells();
const PLAN_KEYS = PLANS.map(p => p.k);
let PLANS_ARE_REAL = false;
function derivePlan(i) {
  const org = D.orgs[i],
    ev = byOrg[i].ev;
  if (PLAN_OVERRIDES[org.id]) return PLAN_OVERRIDES[org.id];
  // real plan straight off the export (data/supabase-export.sql emits orgs[].plan)
  const real = (org.plan || (D.plans || {})[org.id] || '').toLowerCase();
  if (PLAN_KEYS.includes(real)) {
    PLANS_ARE_REAL = true;
    return real;
  }
  const team = TEAM_SIGNALS.some(k => ev[k]);
  const paid = PAID_SIGNALS.some(k => ev[k]);
  if (team) return org.total > 800 ? 'enterprise' : 'team';
  return paid ? 'solo' : 'free';
}
const PLAN_OF = D.orgs.map((_, i) => derivePlan(i));
function buildAccounts(from, to) {
  const idx = from || to ? indexCells(from, to) : byOrg;
  return D.orgs.map((org, i) => ({
    ...org,
    i,
    plan: PLAN_OF[i],
    feat: idx[i].feat,
    ev: idx[i].ev,
    total: idx[i].total,
    last: idx[i].last,
    first: idx[i].first
  })).filter(a => a.total > 0);
}
const ACCOUNTS = buildAccounts();
const RANGES = [{
  k: 'all',
  label: 'All time'
}, {
  k: '30',
  label: 'Last 30 days'
}, {
  k: '90',
  label: 'Last 90 days'
}, {
  k: 'ytd',
  label: 'Year to date'
}, {
  k: 'custom',
  label: 'Custom'
}];
const shiftDays = (iso, d) => {
  const t = new Date(iso + 'T00:00:00Z');
  t.setUTCDate(t.getUTCDate() + d);
  return t.toISOString().slice(0, 10);
};
function rangeDates(k, from, to) {
  if (k === 'all') return [D.start, D.asof];
  if (k === 'custom') return [from, to];
  if (k === 'ytd') return [D.asof.slice(0, 4) + '-01-01', D.asof];
  return [shiftDays(D.asof, -(+k - 1)), D.asof];
}
const EV_TOTAL = {};
D.events.forEach(e => EV_TOTAL[e.e] = e.n);
const FEATURE_NAMES = [];
CAPABILITIES.forEach(c => {
  if (!FEATURE_NAMES.includes(c.f)) FEATURE_NAMES.push(c.f);
});
const FEATURES = FEATURE_NAMES.map(name => ({
  name,
  n: CAPABILITIES.filter(c => c.f === name).reduce((s, c) => s + c.ev.reduce((t, e) => t + (EV_TOTAL[e] || 0), 0), 0),
  caps: CAPABILITIES.filter(c => c.f === name).length
})).sort((a, b) => b.n - a.n);
const FEATURE_ORDER = FEATURES.map(f => f.name);
const FEATURE_ICON = {
  Invoicing: 'receipt',
  Reporting: 'chart-line',
  Customers: 'users-three',
  Banking: 'bank',
  Setup: 'sliders-horizontal',
  Team: 'user-plus',
  AI: 'sparkle',
  Documents: 'files'
};
const KIND_LABEL = {
  core: 'Core flow',
  'opt-in': 'Opt-in',
  lifecycle: 'Lifecycle'
};

/* ── shared bits ──────────────────────────────────────────────── */
function Seg({
  options,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "seg"
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.k,
    "aria-pressed": value === o.k,
    onClick: () => onChange(o.k)
  }, o.label)));
}
function Bar({
  v,
  max,
  color = '#AAE1C9'
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "track"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: Math.max(pct(v, max), 1.5) + '%',
      background: color
    }
  }));
}
function Tile({
  label,
  value,
  foot,
  tone
}) {
  const bg = {
    blue: '#E3F5FF',
    mint: 'rgba(170,225,201,.35)',
    grey: '#F7F9FB',
    slate: '#E5ECF6'
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    className: "tile",
    style: {
      background: bg
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lab"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "val"
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "foot"
  }, foot));
}
function heatStyle(share) {
  if (!share) return {};
  const a = 0.08 + Math.sqrt(Math.min(share, 1)) * 0.72;
  return {
    background: `rgba(170,225,201,${a.toFixed(3)})`,
    fontWeight: share > 0.45 ? 600 : 400
  };
}
function adoptionColor(p) {
  return p >= 60 ? '#AAE1C9' : p >= 25 ? '#B9E1F5' : '#FFCB9E';
}

/* ── app ──────────────────────────────────────────────────────── */
function App() {
  const [view, setView] = useState('features');
  const [plans, setPlans] = useState([]);
  const [feats, setFeats] = useState(FEATURE_ORDER);
  const [kinds, setKinds] = useState([]); // [] = all kinds
  const [measure, setMeasure] = useState('events');
  const [sort, setSort] = useState({
    key: 'total',
    dir: -1
  });
  const [capSort, setCapSort] = useState('adoption');
  const [grain, setGrain] = useState('caps'); // caps | events
  const [capQ, setCapQ] = useState('');
  const [q, setQ] = useState('');
  const [selUser, setSelUser] = useState(null);
  const [selCap, setSelCap] = useState(null);
  const [allRows, setAllRows] = useState(false);
  const [range, setRange] = useState('all');
  const [cFrom, setCFrom] = useState(D.start);
  const [cTo, setCTo] = useState(D.asof);
  const [from, to] = rangeDates(range, cFrom, cTo);
  const dated = range !== 'all';
  const accounts = useMemo(() => dated ? buildAccounts(from, to) : ACCOUNTS, [dated, from, to]);
  const togglePlan = k => setPlans(p => p.includes(k) ? p.filter(x => x !== k) : [...p, k]);
  const toggleFeat = k => setFeats(f => f.includes(k) ? f.length > 1 ? f.filter(x => x !== k) : f : FEATURE_ORDER.filter(n => f.includes(n) || n === k));
  const toggleKind = k => setKinds(s => s.includes(k) ? s.filter(x => x !== k) : [...s, k]);
  const inScope = useMemo(() => accounts.filter(a => !plans.length || plans.includes(a.plan)), [accounts, plans]);
  const caps = useMemo(() => {
    const N = inScope.length || 1;
    const base = CAPABILITIES.filter(c => feats.includes(c.f) && (!kinds.length || kinds.includes(c.kind)));
    const units = grain === 'events' ? base.flatMap(c => c.ev.filter(e => EV_TOTAL[e] != null).map(e => ({
      ...c,
      name: nice(e),
      cap: c.name,
      ev: [e]
    }))) : base;
    const needle = capQ.trim().toLowerCase().replace(/ /g, '_');
    return units.filter(c => !needle || c.ev.some(e => e.includes(needle)) || c.name.toLowerCase().replace(/ /g, '_').includes(needle) || c.f.toLowerCase().includes(needle)).map(c => {
      const users = inScope.filter(a => c.ev.some(e => a.ev[e]));
      const n = inScope.reduce((s, a) => s + c.ev.reduce((t, e) => t + ((a.ev[e] || {}).n || 0), 0), 0);
      const last = users.reduce((m, a) => {
        const l = c.ev.map(e => (a.ev[e] || {}).last).filter(Boolean).sort().pop() || '';
        return l > m ? l : m;
      }, '');
      const byPlan = {};
      PLANS.forEach(p => {
        const pool = inScope.filter(a => a.plan === p.k);
        byPlan[p.k] = {
          pool: pool.length,
          used: pool.filter(a => c.ev.some(e => a.ev[e])).length
        };
      });
      return {
        ...c,
        users,
        n,
        last,
        byPlan,
        adoption: pct(users.length, N),
        avg: users.length ? n / users.length : 0
      };
    });
  }, [inScope, feats, kinds, grain, capQ]);
  const capsSorted = useMemo(() => {
    const arr = [...caps];
    if (capSort === 'adoption') arr.sort((a, b) => b.adoption - a.adoption || b.n - a.n);else if (capSort === 'volume') arr.sort((a, b) => b.n - a.n);else if (capSort === 'gap') arr.sort((a, b) => a.adoption - b.adoption || b.n - a.n);else arr.sort((a, b) => FEATURE_ORDER.indexOf(a.f) - FEATURE_ORDER.indexOf(b.f) || b.adoption - a.adoption);
    return arr;
  }, [caps, capSort]);
  const rows = useMemo(() => {
    let r = inScope.filter(a => !q || a.email.toLowerCase().includes(q.toLowerCase()) || String(a.id).includes(q));
    r = r.map(a => ({
      ...a,
      inView: feats.reduce((s, f) => s + (a.feat[f] || 0), 0),
      used: feats.filter(f => a.feat[f]).length
    }));
    const val = (x, key) => key === 'email' ? x.email : key === 'plan' ? x.plan : key === 'used' ? x.used : key === 'last' ? x.last : key === 'total' ? x.inView : x.feat[key] || 0;
    return r.sort((a, b) => {
      const va = val(a, sort.key),
        vb = val(b, sort.key);
      return (va > vb ? 1 : va < vb ? -1 : 0) * sort.dir;
    });
  }, [inScope, feats, q, sort]);
  const scope = useMemo(() => {
    const eventsInView = caps.reduce((s, c) => s + c.n, 0);
    const colMax = {};
    feats.forEach(f => colMax[f] = Math.max(1, ...rows.map(r => r.feat[f] || 0)));
    const wide = caps.filter(c => c.adoption >= 50).length;
    const dormant = caps.filter(c => c.users.length <= 1).length;
    const optin = caps.filter(c => c.kind === 'opt-in');
    const avgOptin = optin.length ? optin.reduce((s, c) => s + c.adoption, 0) / optin.length : 0;
    return {
      eventsInView,
      colMax,
      wide,
      dormant,
      avgOptin
    };
  }, [caps, rows, feats]);
  const planLabel = plans.length ? plans.map(p => PLANS.find(x => x.k === p).label).join(' + ') : 'All plans';
  function cellValue(r, f) {
    const n = r.feat[f] || 0;
    if (!n) return {
      text: '—',
      share: 0,
      title: `${r.email} has never used ${f}`
    };
    if (measure === 'share') {
      const s = pct(n, r.inView);
      return {
        text: s.toFixed(0) + '%',
        share: s / 100,
        title: `${fmt(n)} events — ${s.toFixed(1)}% of this account's activity in view`
      };
    }
    if (measure === 'reach') {
      const list = CAPABILITIES.filter(c => c.f === f);
      const used = list.filter(c => c.ev.some(e => r.ev[e])).length;
      return {
        text: `${used}/${list.length}`,
        share: used / list.length,
        title: `Uses ${used} of ${list.length} ${f} capabilities`
      };
    }
    return {
      text: fmt(n),
      share: n / scope.colMax[f],
      title: `${fmt(n)} ${f} events`
    };
  }
  const sortIcon = k => sort.key === k ? sort.dir === -1 ? ' ↓' : ' ↑' : '';
  const clickSort = k => setSort(s => s.key === k ? {
    key: k,
    dir: -s.dir
  } : {
    key: k,
    dir: k === 'email' ? 1 : -1
  });
  const headline = capsSorted.filter(c => c.kind === 'opt-in').sort((a, b) => b.adoption - a.adoption)[0];
  return /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/inverso-logo.svg",
    alt: "Inverso"
  })), /*#__PURE__*/React.createElement("div", {
    className: "navlab"
  }, "Insights"), /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "on"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-squares-four"
  }), "Feature adoption")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    },
    className: "note"
  }, from, " \u2192 ", to)), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-sidebar",
    style: {
      fontSize: 18
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "crumb"
  }, "Insights"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(28,28,28,.2)'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", null, "Feature adoption"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, fmt(D.total), " events tracked \xB7 ", fmt(D.orgs.length), " accounts")), /*#__PURE__*/React.createElement("div", {
    className: "canvas"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, view === 'features' ? 'What actually gets switched on' : 'Who uses what'), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, view === 'features' ? /*#__PURE__*/React.createElement(React.Fragment, null, "Adoption of every capability inside the product, across ", fmt(inScope.length), " accounts. ", planLabel, dated ? ` · ${from} → ${to}` : '', ".") : /*#__PURE__*/React.createElement(React.Fragment, null, "Every tracked event rolled up per account. ", planLabel, " \xB7 ", feats.length, " of ", FEATURE_ORDER.length, " features shown."))), /*#__PURE__*/React.createElement(Seg, {
    value: view,
    onChange: v => {
      setView(v);
      setSelUser(null);
      setSelCap(null);
    },
    options: [{
      k: 'features',
      label: 'By capability'
    }, {
      k: 'accounts',
      label: 'By account'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Period"), /*#__PURE__*/React.createElement(Seg, {
    value: range,
    onChange: k => {
      setRange(k);
      setSelUser(null);
      setSelCap(null);
    },
    options: RANGES
  }), range === 'custom' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: cFrom,
    min: D.start,
    max: cTo,
    onChange: e => setCFrom(e.target.value),
    "aria-label": "From date"
  }), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, "\u2192"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: cTo,
    min: cFrom,
    max: D.asof,
    onChange: e => setCTo(e.target.value),
    "aria-label": "To date"
  })) : /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, from, " \u2192 ", to), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, fmt(accounts.length), " account", accounts.length === 1 ? '' : 's', " active in period")), /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Plans"), /*#__PURE__*/React.createElement("div", {
    className: "seg"
  }, /*#__PURE__*/React.createElement("button", {
    "aria-pressed": !plans.length,
    onClick: () => setPlans([])
  }, "All users"), PLANS.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.k,
    "aria-pressed": plans.includes(p.k),
    onClick: () => togglePlan(p.k)
  }, p.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 6,
      fontSize: 11
    }
  }, accounts.filter(a => a.plan === p.k).length)))), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, "Combine plans by clicking more than one.")), /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Features"), /*#__PURE__*/React.createElement("div", {
    className: "chips"
  }, FEATURES.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.name,
    className: "chip",
    "aria-pressed": feats.includes(f.name),
    onClick: () => toggleFeat(f.name)
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ph-${FEATURE_ICON[f.name] || 'circle'}`
  }), f.name, /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, f.caps, " caps")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "linkbtn",
    onClick: () => setFeats(FEATURE_ORDER)
  }, "All"), /*#__PURE__*/React.createElement("button", {
    className: "linkbtn",
    onClick: () => setFeats([FEATURE_ORDER[0]])
  }, "Reset"))), view === 'features' ? /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Capabilities"), /*#__PURE__*/React.createElement("div", {
    className: "chips"
  }, Object.keys(KIND_LABEL).map(k => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: "chip",
    "aria-pressed": kinds.includes(k),
    onClick: () => toggleKind(k)
  }, KIND_LABEL[k]))), /*#__PURE__*/React.createElement(Seg, {
    value: capSort,
    onChange: setCapSort,
    options: [{
      k: 'adoption',
      label: 'Most adopted'
    }, {
      k: 'volume',
      label: 'Most used'
    }, {
      k: 'gap',
      label: 'Least adopted'
    }, {
      k: 'feature',
      label: 'By feature'
    }]
  })) : null, view === 'features' ? /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Granularity"), /*#__PURE__*/React.createElement(Seg, {
    value: grain,
    onChange: g => {
      setGrain(g);
      setSelCap(null);
    },
    options: [{
      k: 'caps',
      label: 'Capabilities'
    }, {
      k: 'events',
      label: 'Single events'
    }]
  }), /*#__PURE__*/React.createElement("input", {
    type: "search",
    list: "evlist",
    value: capQ,
    onChange: e => {
      setCapQ(e.target.value);
      setSelCap(null);
    },
    style: {
      width: 250
    },
    placeholder: "Filter by event, e.g. reminder\u2026",
    "aria-label": "Filter by event"
  }), /*#__PURE__*/React.createElement("datalist", {
    id: "evlist"
  }, D.events.map(e => /*#__PURE__*/React.createElement("option", {
    key: e.e,
    value: nice(e.e)
  }))), capQ && /*#__PURE__*/React.createElement("button", {
    className: "linkbtn",
    onClick: () => setCapQ('')
  }, "clear"), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, caps.length, " ", grain === 'events' ? 'events' : 'capabilities', " shown")) : /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Show cells as"), /*#__PURE__*/React.createElement(Seg, {
    value: measure,
    onChange: setMeasure,
    options: [{
      k: 'events',
      label: 'Event count'
    }, {
      k: 'share',
      label: '% of account'
    }, {
      k: 'reach',
      label: 'Capabilities used'
    }]
  }), /*#__PURE__*/React.createElement("input", {
    type: "search",
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Find an account\u2026",
    "aria-label": "Find an account"
  }))), view === 'features' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "tiles"
  }, /*#__PURE__*/React.createElement(Tile, {
    tone: "mint",
    label: grain === 'events' ? 'Events tracked' : 'Capabilities tracked',
    value: caps.length,
    foot: `across ${feats.length} feature${feats.length > 1 ? 's' : ''}`
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "blue",
    label: "Broadly adopted",
    value: scope.wide,
    foot: "used by half the accounts or more"
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "grey",
    label: "Avg opt-in adoption",
    value: scope.avgOptin.toFixed(0) + '%',
    foot: "of accounts, per optional capability"
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "slate",
    label: "Effectively dormant",
    value: scope.dormant,
    foot: "one account or none"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: '4px 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '14px 18px 8px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, "Capability adoption"), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, "Click a row to see exactly which accounts are in")), /*#__PURE__*/React.createElement("div", {
    className: "tblwrap"
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, grain === 'events' ? 'Event' : 'Capability'), /*#__PURE__*/React.createElement("th", {
    style: {
      minWidth: 190
    }
  }, "Adoption"), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Accounts"), PLANS.map(p => /*#__PURE__*/React.createElement("th", {
    key: p.k,
    className: "mid"
  }, p.label)), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Events"), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Avg / account"), /*#__PURE__*/React.createElement("th", null, "Last used"))), /*#__PURE__*/React.createElement("tbody", null, capsSorted.map(c => /*#__PURE__*/React.createElement("tr", {
    key: c.f + c.name,
    className: selCap === c.f + c.name ? 'sel' : '',
    onClick: () => setSelCap(selCap === c.f + c.name ? null : c.f + c.name),
    title: c.ev.map(nice).join(', ')
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "acct",
    style: {
      maxWidth: 260
    }
  }, /*#__PURE__*/React.createElement("b", null, c.name), /*#__PURE__*/React.createElement("small", null, c.f, c.cap ? ' · ' + c.cap : '', " \xB7 ", KIND_LABEL[c.kind]))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 90
    }
  }, /*#__PURE__*/React.createElement(Bar, {
    v: c.adoption,
    max: 100,
    color: adoptionColor(c.adoption)
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 600,
      width: 38,
      textAlign: 'right'
    }
  }, c.adoption.toFixed(0), "%"))), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, c.users.length, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(28,28,28,.35)'
    }
  }, "/", inScope.length)), PLANS.map(p => {
    const b = c.byPlan[p.k];
    const share = b.pool ? b.used / b.pool : 0;
    return /*#__PURE__*/React.createElement("td", {
      key: p.k,
      className: "mid",
      title: b.pool ? `${b.used} of ${b.pool} ${p.label} accounts` : `No ${p.label} accounts in view`
    }, /*#__PURE__*/React.createElement("span", {
      className: 'heat' + (b.used ? '' : ' zero'),
      style: heatStyle(b.pool ? share : 0)
    }, b.pool ? `${b.used}/${b.pool}` : '·'));
  }), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, fmt(c.n)), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, c.users.length ? c.avg.toFixed(1) : '—'), /*#__PURE__*/React.createElement("td", {
    className: "note",
    style: {
      fontSize: 12
    }
  }, c.last || '—'))))), !capsSorted.length && /*#__PURE__*/React.createElement("div", {
    className: "empty"
  }, "No capabilities match these filters."))), /*#__PURE__*/React.createElement(CapDetail, {
    caps: capsSorted,
    selCap: selCap,
    inScope: inScope,
    headline: headline
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "tiles"
  }, /*#__PURE__*/React.createElement(Tile, {
    tone: "mint",
    label: "Accounts in view",
    value: rows.length,
    foot: `of ${D.orgs.length} tracked`
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "blue",
    label: "Events in view",
    value: fmt(scope.eventsInView),
    foot: `${pct(scope.eventsInView, D.total).toFixed(0)}% of all activity`
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "grey",
    label: "Features per account",
    value: rows.length ? (rows.reduce((s, r) => s + r.used, 0) / rows.length).toFixed(1) : '0',
    foot: `average, of ${feats.length} shown`
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "slate",
    label: "Widest optional capability",
    value: headline ? headline.adoption.toFixed(0) + '%' : '—',
    foot: headline ? `${headline.name} · ${headline.users.length} of ${rows.length} accounts` : '—'
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: '4px 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '14px 18px 8px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, "Accounts \xD7 features"), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, "Click a row for the capability-level breakdown")), /*#__PURE__*/React.createElement("div", {
    className: "tblwrap"
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    onClick: () => clickSort('email')
  }, "Account", sortIcon('email')), /*#__PURE__*/React.createElement("th", {
    onClick: () => clickSort('plan')
  }, "Plan", sortIcon('plan')), /*#__PURE__*/React.createElement("th", {
    className: "num",
    onClick: () => clickSort('total')
  }, "Events", sortIcon('total')), /*#__PURE__*/React.createElement("th", {
    className: "num",
    onClick: () => clickSort('used')
  }, "Features", sortIcon('used')), feats.map(f => /*#__PURE__*/React.createElement("th", {
    key: f,
    className: "mid",
    onClick: () => clickSort(f)
  }, f, sortIcon(f))), /*#__PURE__*/React.createElement("th", {
    onClick: () => clickSort('last')
  }, "Last seen", sortIcon('last')))), /*#__PURE__*/React.createElement("tbody", null, (allRows ? rows : rows.slice(0, 50)).map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.id,
    className: selUser === r.i ? 'sel' : '',
    onClick: () => setSelUser(selUser === r.i ? null : r.i)
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "acct"
  }, /*#__PURE__*/React.createElement("b", null, r.email), /*#__PURE__*/React.createElement("small", null, "#", r.id))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: 'badge pl-' + r.plan
  }, PLANS.find(p => p.k === r.plan).label)), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, fmt(r.inView)), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, r.used, "/", feats.length), feats.map(f => {
    const c = cellValue(r, f);
    return /*#__PURE__*/React.createElement("td", {
      key: f,
      className: "mid",
      title: c.title
    }, /*#__PURE__*/React.createElement("span", {
      className: 'heat' + (c.share ? '' : ' zero'),
      style: heatStyle(c.share)
    }, c.text));
  }), /*#__PURE__*/React.createElement("td", {
    className: "note",
    style: {
      fontSize: 12
    }
  }, r.last || '—'))))), !rows.length && /*#__PURE__*/React.createElement("div", {
    className: "empty"
  }, "No accounts match this filter."), rows.length > 50 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 18px',
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "linkbtn",
    onClick: () => setAllRows(v => !v)
  }, allRows ? 'show top 50 only' : `show all ${fmt(rows.length)} accounts`), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, allRows ? `all ${fmt(rows.length)}` : `showing 50 of ${fmt(rows.length)}`, " \xB7 narrow with the plan filter or search")))), /*#__PURE__*/React.createElement(UserDetail, {
    selUser: selUser,
    rows: rows,
    feats: feats,
    accounts: accounts
  }))), dated && /*#__PURE__*/React.createElement("div", {
    className: "note",
    style: {
      display: 'flex',
      gap: 7,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-info",
    style: {
      fontSize: 14,
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("span", null, "The export stores first/last seen per account \xD7 event, so a period selects accounts and capabilities ", /*#__PURE__*/React.createElement("b", null, "active between ", from, " and ", to), "; the event counts remain totals for the full export window. Re-run ", /*#__PURE__*/React.createElement("code", null, "data/supabase-export.sql"), " with a narrower ", /*#__PURE__*/React.createElement("code", null, "from_ts"), " for exact per-period counts.")), PLANS_ARE_REAL ? /*#__PURE__*/React.createElement("div", {
    className: "note"
  }, "Plans read from the export \xB7 capability groupings live in ", /*#__PURE__*/React.createElement("code", null, "CAPABILITIES"), " in ", /*#__PURE__*/React.createElement("code", null, "app/feature-adoption.jsx"), " \xB7 refresh the numbers per ", /*#__PURE__*/React.createElement("code", null, "data/README-supabase.md"), ".") : /*#__PURE__*/React.createElement("div", {
    className: "flag"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-warning-circle",
    style: {
      fontSize: 16,
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Plans are derived, not imported."), " This export has no plan column, so each account is classified from its own billing and team events (checkout / subscription / invite signals). Run the refresh in ", /*#__PURE__*/React.createElement("code", null, "data/README-supabase.md"), " \u2014 the query in ", /*#__PURE__*/React.createElement("code", null, "data/supabase-export.sql"), " joins the real plan per account and this warning disappears.")))));
}
function CapDetail({
  caps,
  selCap,
  inScope,
  headline
}) {
  const [showAll, setShowAll] = useState(false);
  const cap = caps.find(c => c.f + c.name === selCap);
  React.useEffect(() => setShowAll(false), [selCap]);
  if (cap) {
    const users = cap.users.map(a => ({
      email: a.email,
      plan: a.plan,
      n: cap.ev.reduce((s, e) => s + ((a.ev[e] || {}).n || 0), 0),
      since: cap.ev.map(e => (a.ev[e] || {}).first).filter(Boolean).sort()[0] || ''
    })).sort((a, b) => b.n - a.n);
    const nonUsers = inScope.filter(a => !cap.ev.some(e => a.ev[e]));
    const max = users.length ? users[0].n : 1;
    const shown = showAll ? users : users.slice(0, 15);
    return /*#__PURE__*/React.createElement("div", {
      className: "panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "note"
    }, cap.f, " \xB7 ", KIND_LABEL[cap.kind]), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        margin: '2px 0 6px'
      }
    }, cap.name), /*#__PURE__*/React.createElement("div", {
      className: "note"
    }, cap.adoption.toFixed(0), "% adoption \xB7 ", fmt(cap.n), " events \xB7 ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)'
      }
    }, cap.ev.join(', '))), /*#__PURE__*/React.createElement("div", {
      className: "note",
      style: {
        marginTop: 14,
        marginBottom: 2
      }
    }, "In (", fmt(users.length), ")", users.length > shown.length ? ` · top ${shown.length} by volume` : ''), /*#__PURE__*/React.createElement("div", {
      className: "rowlist"
    }, shown.map(u => /*#__PURE__*/React.createElement("div", {
      className: "ri",
      key: u.email
    }, /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, /*#__PURE__*/React.createElement("span", null, u.email), /*#__PURE__*/React.createElement("b", null, fmt(u.n))), /*#__PURE__*/React.createElement(Bar, {
      v: u.n,
      max: max
    }), /*#__PURE__*/React.createElement("div", {
      className: "note",
      style: {
        fontSize: 11,
        marginTop: 3
      }
    }, PLANS.find(p => p.k === u.plan).label, " \xB7 since ", u.since))), !users.length && /*#__PURE__*/React.createElement("div", {
      className: "note"
    }, "Nobody in this scope has used it.")), users.length > 15 && /*#__PURE__*/React.createElement("button", {
      className: "linkbtn",
      style: {
        marginTop: 10
      },
      onClick: () => setShowAll(s => !s)
    }, showAll ? 'show top 15 only' : `show all ${fmt(users.length)}`), !!nonUsers.length && /*#__PURE__*/React.createElement("p", {
      className: "note",
      style: {
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement("b", null, "Not in (", fmt(nonUsers.length), "):"), " ", nonUsers.slice(0, 10).map(a => a.email).join(', '), nonUsers.length > 10 ? ', …' : ''));
  }
  const top = [...caps].sort((a, b) => b.adoption - a.adoption).slice(0, 6);
  const bottom = [...caps].sort((a, b) => a.adoption - b.adoption || a.n - b.n).slice(0, 5);
  return /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "note"
  }, "Read of the base"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      margin: '2px 0 8px'
    }
  }, "Switched on vs. sitting idle"), headline && /*#__PURE__*/React.createElement("p", {
    className: "note",
    style: {
      marginBottom: 12
    }
  }, "The most adopted optional capability is ", /*#__PURE__*/React.createElement("b", null, headline.name), " at ", headline.adoption.toFixed(0), "% of accounts."), /*#__PURE__*/React.createElement("div", {
    className: "note",
    style: {
      marginBottom: 2
    }
  }, "Highest adoption"), /*#__PURE__*/React.createElement("div", {
    className: "rowlist"
  }, top.map(c => /*#__PURE__*/React.createElement("div", {
    className: "ri",
    key: c.f + c.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, /*#__PURE__*/React.createElement("span", null, c.name), /*#__PURE__*/React.createElement("b", null, c.adoption.toFixed(0), "%")), /*#__PURE__*/React.createElement(Bar, {
    v: c.adoption,
    max: 100
  })))), /*#__PURE__*/React.createElement("div", {
    className: "note",
    style: {
      marginTop: 16,
      marginBottom: 2
    }
  }, "Barely touched"), /*#__PURE__*/React.createElement("div", {
    className: "rowlist"
  }, bottom.map(c => /*#__PURE__*/React.createElement("div", {
    className: "ri",
    key: c.f + c.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, /*#__PURE__*/React.createElement("span", null, c.name), /*#__PURE__*/React.createElement("b", null, c.adoption.toFixed(0), "%")), /*#__PURE__*/React.createElement(Bar, {
    v: c.adoption,
    max: 100,
    color: "#FFCB9E"
  })))), /*#__PURE__*/React.createElement("p", {
    className: "note",
    style: {
      marginTop: 16
    }
  }, "Select a capability row to list the accounts in and out of it."));
}
function UserDetail({
  selUser,
  rows,
  feats,
  accounts
}) {
  if (selUser == null) {
    const ranked = [...rows].sort((a, b) => b.used - a.used || b.inView - a.inView);
    return /*#__PURE__*/React.createElement("div", {
      className: "panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "note"
    }, "Breadth"), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        margin: '2px 0 8px'
      }
    }, "Who spreads out, who doesn't"), /*#__PURE__*/React.createElement("div", {
      className: "rowlist"
    }, ranked.slice(0, 6).map(r => /*#__PURE__*/React.createElement("div", {
      className: "ri",
      key: r.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, /*#__PURE__*/React.createElement("span", null, r.email), /*#__PURE__*/React.createElement("b", null, r.used, "/", feats.length)), /*#__PURE__*/React.createElement(Bar, {
      v: r.used,
      max: feats.length
    })))), /*#__PURE__*/React.createElement("div", {
      className: "note",
      style: {
        marginTop: 16,
        marginBottom: 2
      }
    }, "Narrowest usage"), /*#__PURE__*/React.createElement("div", {
      className: "rowlist"
    }, ranked.slice(-4).reverse().map(r => /*#__PURE__*/React.createElement("div", {
      className: "ri",
      key: r.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, /*#__PURE__*/React.createElement("span", null, r.email), /*#__PURE__*/React.createElement("b", null, r.used, "/", feats.length)), /*#__PURE__*/React.createElement(Bar, {
      v: r.used,
      max: feats.length,
      color: "#FFCB9E"
    })))), /*#__PURE__*/React.createElement("p", {
      className: "note",
      style: {
        marginTop: 16
      }
    }, "Select an account row to drill in."));
  }
  const a = accounts.find(x => x.i === selUser);
  if (!a) return null;
  const list = CAPABILITIES.filter(c => feats.includes(c.f)).map(c => ({
    ...c,
    n: c.ev.reduce((s, e) => s + ((a.ev[e] || {}).n || 0), 0)
  }));
  const used = list.filter(c => c.n).sort((x, y) => y.n - x.n).slice(0, 15);
  const missing = list.filter(c => !c.n && c.kind === 'opt-in');
  const max = used.length ? used[0].n : 1;
  return /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "note"
  }, "Account #", a.id), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      margin: '2px 0 2px',
      overflowWrap: 'anywhere'
    }
  }, a.email), /*#__PURE__*/React.createElement("div", {
    className: "note"
  }, PLANS.find(p => p.k === a.plan).label, " plan \xB7 ", fmt(a.total), " events \xB7 active ", a.first, " \u2192 ", a.last), /*#__PURE__*/React.createElement("div", {
    className: "note",
    style: {
      marginTop: 14,
      marginBottom: 2
    }
  }, "Capabilities in use (", list.filter(c => c.n).length, ")"), /*#__PURE__*/React.createElement("div", {
    className: "rowlist"
  }, used.map(c => /*#__PURE__*/React.createElement("div", {
    className: "ri",
    key: c.f + c.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, /*#__PURE__*/React.createElement("span", null, c.name), /*#__PURE__*/React.createElement("b", null, fmt(c.n))), /*#__PURE__*/React.createElement(Bar, {
    v: c.n,
    max: max
  })))), !!missing.length && /*#__PURE__*/React.createElement("p", {
    className: "note",
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("b", null, "Never switched on:"), " ", missing.map(c => c.name).join(', '), "."));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_feature_adoption/app/feature-adoption.jsx", error: String((e && e.message) || e) }); }

// design_handoff_feature_adoption/data/events.js
try { (() => {
window.EVENT_DATA = {
  "asof": "2026-08-12",
  "start": "2026-01-01",
  "total": 57895,
  "plans": {
    "2": "enterprise",
    "15": "enterprise",
    "27": "enterprise",
    "32": "enterprise",
    "33": "solo",
    "34": "enterprise",
    "36": "enterprise",
    "37": "solo",
    "58": "solo",
    "67": "enterprise",
    "75": "solo",
    "85": "enterprise",
    "135": "enterprise",
    "150": "enterprise",
    "157": "enterprise",
    "163": "solo",
    "170": "solo",
    "181": "enterprise",
    "194": "solo",
    "215": "free",
    "224": "enterprise",
    "226": "enterprise",
    "242": "enterprise",
    "258": "solo",
    "262": "solo",
    "280": "team",
    "299": "free",
    "302": "solo",
    "307": "solo",
    "309": "solo",
    "328": "solo",
    "333": "solo",
    "335": "team",
    "337": "solo",
    "341": "enterprise",
    "357": "solo",
    "374": "solo",
    "376": "solo",
    "383": "solo",
    "404": "solo",
    "407": "solo",
    "408": "solo",
    "439": "enterprise",
    "441": "solo",
    "442": "team",
    "451": "solo",
    "517": "solo",
    "524": "free",
    "533": "solo",
    "543": "enterprise",
    "550": "solo",
    "553": "enterprise",
    "571": "team",
    "585": "enterprise",
    "592": "solo",
    "600": "solo",
    "605": "team",
    "608": "team",
    "609": "team",
    "614": "solo",
    "618": "free",
    "620": "team",
    "636": "solo",
    "642": "enterprise",
    "644": "solo",
    "652": "solo",
    "653": "solo",
    "670": "solo",
    "673": "solo",
    "676": "solo",
    "690": "solo",
    "692": "team",
    "695": "solo",
    "700": "free",
    "705": "solo",
    "709": "solo",
    "710": "solo",
    "711": "enterprise",
    "717": "solo",
    "731": "enterprise",
    "734": "solo",
    "740": "solo",
    "746": "solo",
    "765": "solo",
    "771": "solo",
    "773": "team",
    "777": "solo",
    "779": "solo",
    "780": "team",
    "782": "free",
    "784": "team",
    "795": "solo",
    "798": "solo",
    "799": "team",
    "802": "enterprise",
    "804": "team",
    "811": "solo",
    "819": "solo",
    "826": "enterprise",
    "827": "team",
    "834": "solo",
    "839": "solo",
    "841": "solo",
    "842": "solo",
    "846": "team",
    "848": "solo",
    "853": "solo",
    "854": "team",
    "863": "solo",
    "869": "enterprise",
    "897": "solo",
    "899": "solo",
    "913": "solo",
    "928": "team",
    "936": "free",
    "939": "solo",
    "949": "solo",
    "952": "team",
    "953": "enterprise",
    "955": "solo",
    "956": "solo",
    "965": "free",
    "970": "solo",
    "971": "solo",
    "972": "solo",
    "987": "team",
    "992": "enterprise",
    "993": "team",
    "998": "team",
    "1002": "solo",
    "1004": "enterprise",
    "1021": "solo",
    "1024": "solo",
    "1029": "solo",
    "1034": "team",
    "1057": "solo",
    "1059": "solo",
    "1063": "solo",
    "1069": "team",
    "1070": "solo",
    "1078": "team",
    "1083": "enterprise",
    "1085": "enterprise",
    "1086": "team",
    "1090": "solo",
    "1098": "solo",
    "1101": "solo",
    "1111": "solo",
    "1113": "solo",
    "1117": "team",
    "1119": "team",
    "1120": "solo",
    "1130": "solo",
    "1138": "team",
    "1150": "solo",
    "1155": "solo",
    "1156": "solo",
    "1161": "team",
    "1166": "solo",
    "1168": "free",
    "1171": "solo",
    "1185": "solo",
    "1191": "solo",
    "1195": "enterprise",
    "1201": "enterprise",
    "1216": "team",
    "1217": "solo",
    "1220": "solo",
    "1227": "free",
    "1232": "solo",
    "1234": "team",
    "1235": "solo",
    "1238": "free",
    "1254": "solo",
    "1263": "solo",
    "1270": "solo",
    "1272": "team",
    "1274": "team",
    "1281": "team",
    "1283": "team",
    "1284": "team",
    "1304": "solo",
    "1320": "solo",
    "1331": "solo",
    "1333": "solo",
    "1335": "solo",
    "1338": "enterprise",
    "1347": "solo",
    "1355": "solo",
    "1357": "team",
    "1361": "enterprise",
    "1365": "solo",
    "1371": "solo",
    "1376": "solo",
    "1382": "team",
    "1389": "enterprise",
    "1401": "team",
    "1408": "solo",
    "1430": "team",
    "1446": "team",
    "1449": "enterprise",
    "1455": "team",
    "1458": "solo",
    "1460": "solo",
    "1469": "solo",
    "1477": "solo",
    "1498": "solo",
    "1502": "solo",
    "1511": "solo",
    "1516": "solo",
    "1521": "solo",
    "1532": "enterprise",
    "1536": "team",
    "1538": "solo",
    "1539": "solo",
    "1541": "solo",
    "1549": "solo",
    "1550": "solo",
    "1555": "enterprise",
    "1560": "solo",
    "1563": "solo",
    "1586": "solo",
    "1599": "solo",
    "1607": "solo",
    "1608": "team",
    "1609": "solo",
    "1610": "team",
    "1614": "solo",
    "1626": "solo",
    "1636": "solo",
    "1644": "solo",
    "1653": "solo",
    "1658": "solo",
    "1665": "solo",
    "1670": "solo",
    "1683": "team",
    "1695": "team",
    "1697": "solo",
    "1710": "team",
    "1716": "team",
    "1725": "solo",
    "1729": "team",
    "1732": "enterprise",
    "1734": "solo",
    "1735": "solo",
    "1738": "solo",
    "1743": "solo",
    "1747": "team",
    "1749": "solo",
    "1750": "solo",
    "1756": "solo",
    "1764": "team",
    "1774": "solo",
    "1782": "solo",
    "1783": "solo",
    "1784": "solo",
    "1794": "solo",
    "1796": "solo",
    "1812": "solo",
    "1818": "solo",
    "1823": "solo",
    "1844": "solo",
    "1851": "enterprise",
    "1861": "team",
    "1866": "team",
    "1877": "free",
    "1888": "solo",
    "1889": "solo",
    "1892": "free",
    "1897": "solo",
    "1920": "free",
    "1925": "solo",
    "1926": "solo",
    "1929": "solo",
    "1930": "solo",
    "1932": "solo",
    "1934": "solo",
    "1935": "solo",
    "1936": "solo",
    "1938": "team",
    "1940": "solo",
    "1947": "solo",
    "1949": "solo",
    "1950": "solo",
    "1952": "solo",
    "1953": "solo",
    "1963": "team",
    "1968": "solo",
    "1980": "team",
    "1988": "solo",
    "1993": "solo",
    "2002": "solo",
    "2003": "solo",
    "2007": "solo",
    "2010": "solo",
    "2011": "solo",
    "2012": "solo",
    "2013": "solo",
    "2014": "enterprise",
    "2015": "solo",
    "2017": "solo",
    "2018": "solo",
    "2023": "solo",
    "2024": "solo",
    "2025": "free",
    "2026": "solo",
    "2027": "team",
    "2028": "solo",
    "2029": "solo",
    "2030": "solo",
    "2031": "solo",
    "2032": "solo",
    "2033": "enterprise",
    "2034": "team",
    "2035": "solo",
    "2036": "solo",
    "2037": "solo",
    "2039": "solo",
    "2040": "solo",
    "2042": "team",
    "2044": "solo",
    "2045": "team",
    "2046": "solo",
    "2048": "solo",
    "2049": "team",
    "2051": "solo",
    "2052": "team",
    "2057": "solo",
    "2058": "solo",
    "2060": "solo",
    "2061": "solo",
    "2062": "solo",
    "2063": "solo",
    "2064": "solo",
    "2067": "solo",
    "2068": "solo",
    "2069": "solo",
    "2071": "solo",
    "2072": "team",
    "2073": "solo",
    "2074": "solo",
    "2075": "solo",
    "2076": "free",
    "2077": "solo",
    "2078": "solo",
    "2079": "free",
    "2080": "free",
    "2081": "solo",
    "2082": "solo",
    "2083": "solo",
    "2084": "solo",
    "2085": "solo",
    "2086": "solo",
    "2087": "solo",
    "2090": "solo",
    "2091": "solo",
    "2092": "solo",
    "2093": "free",
    "2094": "solo",
    "2095": "solo",
    "2097": "solo",
    "2098": "solo",
    "2099": "solo",
    "2100": "team",
    "2101": "solo",
    "2102": "solo",
    "2103": "solo",
    "2104": "team",
    "2105": "enterprise",
    "2106": "solo",
    "2107": "solo",
    "2108": "solo",
    "2109": "solo",
    "2110": "solo",
    "2111": "solo",
    "2113": "solo",
    "2114": "enterprise",
    "2116": "solo",
    "2117": "solo",
    "2118": "solo",
    "2119": "solo",
    "2120": "solo",
    "2121": "solo",
    "2122": "solo",
    "2123": "free",
    "2124": "solo",
    "2125": "solo",
    "2126": "solo",
    "2127": "solo",
    "2128": "solo",
    "2130": "solo",
    "2131": "solo",
    "2132": "solo",
    "2133": "solo",
    "2134": "solo",
    "2135": "solo",
    "2136": "solo",
    "2137": "solo",
    "2138": "solo",
    "2139": "solo",
    "2140": "solo",
    "2141": "solo",
    "2142": "solo",
    "2143": "solo",
    "2144": "solo",
    "2145": "solo",
    "2146": "solo",
    "2147": "solo",
    "2148": "solo",
    "2150": "solo",
    "2151": "solo",
    "2152": "solo",
    "2153": "solo",
    "2154": "team",
    "2155": "solo",
    "2156": "solo",
    "2157": "solo",
    "2158": "solo",
    "2159": "solo",
    "2160": "solo",
    "2161": "solo",
    "2162": "solo",
    "2163": "enterprise",
    "2164": "solo",
    "2165": "solo",
    "2166": "solo",
    "2167": "solo",
    "2168": "solo",
    "2169": "solo",
    "2170": "solo",
    "2171": "solo",
    "2172": "solo",
    "2173": "solo",
    "2174": "solo",
    "2175": "solo",
    "2176": "enterprise",
    "2177": "solo",
    "2178": "solo",
    "2179": "free",
    "2180": "solo",
    "2181": "enterprise",
    "2182": "solo",
    "2183": "solo",
    "2184": "solo",
    "2185": "solo",
    "2186": "solo",
    "2187": "solo",
    "2188": "enterprise",
    "2189": "solo",
    "2190": "solo",
    "2191": "solo",
    "2192": "solo",
    "2193": "solo",
    "2194": "solo",
    "2196": "solo",
    "2197": "solo",
    "2198": "solo",
    "2199": "solo",
    "2201": "solo",
    "2202": "solo",
    "2203": "solo",
    "2208": "solo",
    "2209": "solo",
    "2210": "solo",
    "2211": "solo",
    "2212": "solo",
    "2213": "solo",
    "2214": "solo",
    "2216": "solo",
    "2217": "solo",
    "2218": "solo",
    "2219": "solo",
    "2220": "solo",
    "2221": "solo",
    "2222": "solo",
    "2223": "team",
    "2224": "solo",
    "2225": "solo",
    "2226": "solo",
    "2227": "solo",
    "2228": "solo",
    "2229": "solo",
    "2230": "solo",
    "2231": "solo",
    "2233": "team",
    "2234": "solo",
    "2236": "solo",
    "2237": "solo",
    "2239": "solo",
    "2240": "solo",
    "2241": "solo",
    "2243": "solo",
    "2244": "solo",
    "2246": "solo",
    "2247": "solo",
    "2248": "solo",
    "2250": "solo",
    "2252": "solo",
    "2254": "solo",
    "2256": "team",
    "2257": "solo",
    "2258": "solo",
    "2259": "solo",
    "2260": "solo",
    "2261": "solo",
    "2263": "solo",
    "2264": "solo",
    "2265": "enterprise",
    "2266": "solo",
    "2267": "solo",
    "2269": "solo",
    "2270": "solo",
    "2271": "solo",
    "2272": "solo",
    "2273": "solo",
    "2274": "solo",
    "2275": "solo",
    "2276": "solo",
    "2278": "solo",
    "2279": "solo",
    "2281": "solo",
    "2282": "solo",
    "2283": "solo",
    "2284": "solo",
    "2285": "solo",
    "2286": "solo",
    "2287": "solo",
    "2290": "solo",
    "2291": "solo",
    "2292": "solo",
    "2293": "solo",
    "2294": "solo",
    "2295": "enterprise",
    "2296": "solo",
    "2298": "solo",
    "2299": "solo",
    "2300": "solo",
    "2301": "solo",
    "2303": "solo",
    "2304": "solo",
    "2306": "free",
    "2307": "solo",
    "2308": "free",
    "2309": "solo",
    "2310": "solo",
    "2311": "solo",
    "2312": "solo",
    "2313": "solo",
    "2314": "solo",
    "2316": "solo",
    "2318": "solo",
    "2320": "solo",
    "2322": "solo",
    "2323": "solo",
    "2324": "solo",
    "2325": "solo",
    "2326": "solo",
    "2327": "solo",
    "2328": "solo"
  },
  "orgs": [{
    "id": 1980,
    "email": "office@unisped.bg",
    "plan": "team",
    "total": 8531,
    "types": 26
  }, {
    "id": 952,
    "email": "ekatrade1@gmail.com",
    "plan": "team",
    "total": 2886,
    "types": 21
  }, {
    "id": 34,
    "email": "office@kj-cars.com",
    "plan": "enterprise",
    "total": 2224,
    "types": 18
  }, {
    "id": 731,
    "email": "info@hersher.bg",
    "plan": "enterprise",
    "total": 2012,
    "types": 24
  }, {
    "id": 992,
    "email": "redpanda.supplements@gmail.com",
    "plan": "enterprise",
    "total": 1791,
    "types": 23
  }, {
    "id": 1195,
    "email": "emil@paypercut.co",
    "plan": "enterprise",
    "total": 1754,
    "types": 14
  }, {
    "id": 1710,
    "email": "dizz.trading@mail.bg",
    "plan": "team",
    "total": 1605,
    "types": 20
  }, {
    "id": 439,
    "email": "didi_2008_eood@abv.bg",
    "plan": "enterprise",
    "total": 1462,
    "types": 21
  }, {
    "id": 846,
    "email": "sales.skat@gmail.com",
    "plan": "team",
    "total": 1380,
    "types": 17
  }, {
    "id": 1389,
    "email": "nikolay@weelectricity.com",
    "plan": "enterprise",
    "total": 1210,
    "types": 19
  }, {
    "id": 1004,
    "email": "babucha77.logistics@gmail.com",
    "plan": "enterprise",
    "total": 954,
    "types": 14
  }, {
    "id": 1117,
    "email": "hr@jobjungle-bg.com",
    "plan": "team",
    "total": 941,
    "types": 25
  }, {
    "id": 1732,
    "email": "maria@conversion-century.com",
    "plan": "enterprise",
    "total": 889,
    "types": 10
  }, {
    "id": 1764,
    "email": "billing@smartico.ai",
    "plan": "team",
    "total": 671,
    "types": 31
  }, {
    "id": 1539,
    "email": "office@vizualnatehnika.bg",
    "plan": "solo",
    "total": 659,
    "types": 17
  }, {
    "id": 1695,
    "email": "maniusha0406@gmail.com",
    "plan": "team",
    "total": 642,
    "types": 21
  }, {
    "id": 1083,
    "email": "mariela@desm.pro",
    "plan": "enterprise",
    "total": 638,
    "types": 18
  }, {
    "id": 854,
    "email": "doroteya@57studio.bg",
    "plan": "team",
    "total": 602,
    "types": 26
  }, {
    "id": 1304,
    "email": "sg.powergarage@gmail.com",
    "plan": "solo",
    "total": 533,
    "types": 13
  }, {
    "id": 67,
    "email": "georgi.k@voidweb.eu",
    "plan": "enterprise",
    "total": 526,
    "types": 43
  }, {
    "id": 2014,
    "email": "veronicamilanova@gmail.com",
    "plan": "enterprise",
    "total": 490,
    "types": 23
  }, {
    "id": 1866,
    "email": "irena.ilieva@sales-spot.com",
    "plan": "team",
    "total": 476,
    "types": 34
  }, {
    "id": 2,
    "email": "erik@voidweb.eu",
    "plan": "enterprise",
    "total": 476,
    "types": 24
  }, {
    "id": 2100,
    "email": "yavomitev@gmail.com",
    "plan": "team",
    "total": 463,
    "types": 32
  }, {
    "id": 608,
    "email": "stadiona.bg@abv.bg",
    "plan": "team",
    "total": 433,
    "types": 9
  }, {
    "id": 928,
    "email": "venelin@studiovoila.bg",
    "plan": "team",
    "total": 377,
    "types": 16
  }, {
    "id": 224,
    "email": "translogistic95@abv.bg",
    "plan": "enterprise",
    "total": 353,
    "types": 11
  }, {
    "id": 953,
    "email": "office@logador.com",
    "plan": "enterprise",
    "total": 346,
    "types": 20
  }, {
    "id": 2042,
    "email": "neda@thesuperhumanpodcast.net",
    "plan": "team",
    "total": 344,
    "types": 26
  }, {
    "id": 1281,
    "email": "martin@educoconsult.com",
    "plan": "team",
    "total": 333,
    "types": 10
  }, {
    "id": 571,
    "email": "dtyanakiev@gmail.com",
    "plan": "team",
    "total": 314,
    "types": 20
  }, {
    "id": 2027,
    "email": "j.karabinov@contro.bg",
    "plan": "team",
    "total": 313,
    "types": 24
  }, {
    "id": 1274,
    "email": "blagaangelova_83@abv.bg",
    "plan": "team",
    "total": 310,
    "types": 18
  }, {
    "id": 1120,
    "email": "lodi75ltd@abv.bg",
    "plan": "solo",
    "total": 304,
    "types": 15
  }, {
    "id": 1401,
    "email": "gabriela@daotheagency.com",
    "plan": "team",
    "total": 300,
    "types": 16
  }, {
    "id": 711,
    "email": "vsg.elektro@gmail.com",
    "plan": "enterprise",
    "total": 294,
    "types": 10
  }, {
    "id": 1446,
    "email": "ves@passion4growth.biz",
    "plan": "team",
    "total": 285,
    "types": 16
  }, {
    "id": 869,
    "email": "office.bek@gmail.com",
    "plan": "enterprise",
    "total": 284,
    "types": 13
  }, {
    "id": 1238,
    "email": "info@paleam.com",
    "plan": "free",
    "total": 283,
    "types": 24
  }, {
    "id": 2181,
    "email": "demos@test.com",
    "plan": "enterprise",
    "total": 280,
    "types": 28
  }, {
    "id": 2034,
    "email": "georgi.k@voidweb.eu",
    "plan": "team",
    "total": 274,
    "types": 38
  }, {
    "id": 1161,
    "email": "bozhidar@alabasterfilms.co",
    "plan": "team",
    "total": 269,
    "types": 14
  }, {
    "id": 692,
    "email": "nbtrans123@gmail.com",
    "plan": "team",
    "total": 266,
    "types": 9
  }, {
    "id": 135,
    "email": "kostadinov91@yahoo.com",
    "plan": "enterprise",
    "total": 259,
    "types": 11
  }, {
    "id": 2154,
    "email": "dungyov@agencyhype.com",
    "plan": "team",
    "total": 258,
    "types": 30
  }, {
    "id": 592,
    "email": "office@fs-logistic.com",
    "plan": "solo",
    "total": 253,
    "types": 10
  }, {
    "id": 1449,
    "email": "matrikstransood@gmail.com",
    "plan": "enterprise",
    "total": 247,
    "types": 16
  }, {
    "id": 642,
    "email": "hello@elevatix.bg",
    "plan": "enterprise",
    "total": 247,
    "types": 13
  }, {
    "id": 1338,
    "email": "stefangogov@proton.me",
    "plan": "enterprise",
    "total": 231,
    "types": 28
  }, {
    "id": 1216,
    "email": "office@bliasachno-pochistvane.com",
    "plan": "team",
    "total": 230,
    "types": 9
  }, {
    "id": 1086,
    "email": "galinix@abv.bg",
    "plan": "team",
    "total": 230,
    "types": 15
  }, {
    "id": 826,
    "email": "instaling77@gmail.com",
    "plan": "enterprise",
    "total": 227,
    "types": 18
  }, {
    "id": 357,
    "email": "mstoichkova@gmail.com",
    "plan": "solo",
    "total": 215,
    "types": 15
  }, {
    "id": 998,
    "email": "sultanaoriental@gmail.com",
    "plan": "team",
    "total": 214,
    "types": 17
  }, {
    "id": 949,
    "email": "iva.nesheva1991@gmail.com",
    "plan": "solo",
    "total": 204,
    "types": 19
  }, {
    "id": 2049,
    "email": "martin@craftpolicy.com",
    "plan": "team",
    "total": 204,
    "types": 26
  }, {
    "id": 1749,
    "email": "theodlo@gmail.com",
    "plan": "solo",
    "total": 198,
    "types": 19
  }, {
    "id": 1747,
    "email": "shepadobrina@gmail.com",
    "plan": "team",
    "total": 198,
    "types": 14
  }, {
    "id": 1283,
    "email": "cityglass21@abv.bg",
    "plan": "team",
    "total": 196,
    "types": 17
  }, {
    "id": 1138,
    "email": "bs.still@abv.bg",
    "plan": "team",
    "total": 190,
    "types": 11
  }, {
    "id": 799,
    "email": "valentin_fdm@abv.bg",
    "plan": "team",
    "total": 190,
    "types": 8
  }, {
    "id": 2079,
    "email": "hello@dveochichki.com",
    "plan": "free",
    "total": 185,
    "types": 21
  }, {
    "id": 1877,
    "email": "krasi_e34@yahoo.com",
    "plan": "free",
    "total": 184,
    "types": 14
  }, {
    "id": 442,
    "email": "krustev_iliq9@abv.bg",
    "plan": "team",
    "total": 180,
    "types": 16
  }, {
    "id": 1029,
    "email": "ralica86@abv.bg",
    "plan": "solo",
    "total": 173,
    "types": 11
  }, {
    "id": 2265,
    "email": "slavovgergana@gmail.com",
    "plan": "enterprise",
    "total": 170,
    "types": 17
  }, {
    "id": 1361,
    "email": "kristin.karagyozova@gmail.com",
    "plan": "enterprise",
    "total": 163,
    "types": 13
  }, {
    "id": 1357,
    "email": "hristo.dobrev@360stepsforward.com",
    "plan": "team",
    "total": 162,
    "types": 20
  }, {
    "id": 673,
    "email": "stealth_airless2024@abv.bg",
    "plan": "solo",
    "total": 159,
    "types": 13
  }, {
    "id": 609,
    "email": "klimathermbg@gmail.com",
    "plan": "team",
    "total": 159,
    "types": 13
  }, {
    "id": 1455,
    "email": "osmanovaa.niran@gmail.com",
    "plan": "team",
    "total": 156,
    "types": 12
  }, {
    "id": 1555,
    "email": "titko.titev@affility.co",
    "plan": "enterprise",
    "total": 152,
    "types": 16
  }, {
    "id": 773,
    "email": "vasil.vatev@abv.bg",
    "plan": "team",
    "total": 144,
    "types": 9
  }, {
    "id": 1234,
    "email": "h.dimitrov90@abv.bg",
    "plan": "team",
    "total": 143,
    "types": 14
  }, {
    "id": 585,
    "email": "bestsun.bg@gmail.com",
    "plan": "enterprise",
    "total": 140,
    "types": 13
  }, {
    "id": 1382,
    "email": "nvasilevbg@gmail.com",
    "plan": "team",
    "total": 139,
    "types": 22
  }, {
    "id": 1034,
    "email": "youbetrade@abv.bg",
    "plan": "team",
    "total": 129,
    "types": 11
  }, {
    "id": 780,
    "email": "boris.luchezarov@gmail.com",
    "plan": "team",
    "total": 128,
    "types": 21
  }, {
    "id": 2152,
    "email": "vstefcheva@gmail.com",
    "plan": "solo",
    "total": 128,
    "types": 11
  }, {
    "id": 802,
    "email": "kirilbojkov@gmail.com",
    "plan": "enterprise",
    "total": 126,
    "types": 14
  }, {
    "id": 2080,
    "email": "ivomirs@gmail.com",
    "plan": "free",
    "total": 125,
    "types": 14
  }, {
    "id": 1430,
    "email": "s.hristov@sh-speditionbg.eu",
    "plan": "team",
    "total": 125,
    "types": 12
  }, {
    "id": 804,
    "email": "etiudite@gmail.com",
    "plan": "team",
    "total": 123,
    "types": 9
  }, {
    "id": 524,
    "email": "silvistar@abv.bg",
    "plan": "free",
    "total": 123,
    "types": 11
  }, {
    "id": 1078,
    "email": "poli_681@abv.bg",
    "plan": "team",
    "total": 120,
    "types": 17
  }, {
    "id": 839,
    "email": "ayarevolut@mail.bg",
    "plan": "solo",
    "total": 119,
    "types": 9
  }, {
    "id": 1963,
    "email": "ivan.angelovkz@gmail.com",
    "plan": "team",
    "total": 118,
    "types": 19
  }, {
    "id": 2256,
    "email": "intrinsica25@gmail.com",
    "plan": "team",
    "total": 117,
    "types": 23
  }, {
    "id": 987,
    "email": "ivailo_gatev@abv.bg",
    "plan": "team",
    "total": 117,
    "types": 14
  }, {
    "id": 1823,
    "email": "mimidt@abv.bg",
    "plan": "solo",
    "total": 114,
    "types": 7
  }, {
    "id": 1697,
    "email": "nn190225@yahoo.com",
    "plan": "solo",
    "total": 113,
    "types": 6
  }, {
    "id": 2295,
    "email": "creator.flow.bussines@gmail.com",
    "plan": "enterprise",
    "total": 111,
    "types": 33
  }, {
    "id": 936,
    "email": "elisaveta.g@gmail.com",
    "plan": "free",
    "total": 110,
    "types": 12
  }, {
    "id": 605,
    "email": "bibimondeshka@gmail.com",
    "plan": "team",
    "total": 109,
    "types": 11
  }, {
    "id": 690,
    "email": "wingoldkey@gmail.com",
    "plan": "solo",
    "total": 108,
    "types": 9
  }, {
    "id": 1371,
    "email": "dimitrov.dimitar83@gmail.com",
    "plan": "solo",
    "total": 108,
    "types": 9
  }, {
    "id": 1725,
    "email": "mgpishimarov@gmail.com",
    "plan": "solo",
    "total": 107,
    "types": 9
  }, {
    "id": 2074,
    "email": "zahargeto@abv.bg",
    "plan": "solo",
    "total": 106,
    "types": 19
  }, {
    "id": 2030,
    "email": "office@bibs.bg",
    "plan": "solo",
    "total": 106,
    "types": 14
  }, {
    "id": 1683,
    "email": "boyan@veda.works",
    "plan": "team",
    "total": 105,
    "types": 18
  }, {
    "id": 2026,
    "email": "sea2mountainltd@gmail.com",
    "plan": "solo",
    "total": 105,
    "types": 8
  }, {
    "id": 620,
    "email": "anihuajeva@gmail.com",
    "plan": "team",
    "total": 104,
    "types": 7
  }, {
    "id": 2093,
    "email": "mihaela.mihaylova@mindmosaicgroup.com",
    "plan": "free",
    "total": 103,
    "types": 16
  }, {
    "id": 2104,
    "email": "gipsprobg@gmail.com",
    "plan": "team",
    "total": 101,
    "types": 17
  }, {
    "id": 36,
    "email": "mari.digitalmedia@gmail.com",
    "plan": "enterprise",
    "total": 98,
    "types": 10
  }, {
    "id": 1272,
    "email": "hi@ninavation.com",
    "plan": "team",
    "total": 98,
    "types": 16
  }, {
    "id": 376,
    "email": "puldinshop@gmail.com",
    "plan": "solo",
    "total": 97,
    "types": 7
  }, {
    "id": 1284,
    "email": "bnbachev@gmail.com",
    "plan": "team",
    "total": 97,
    "types": 11
  }, {
    "id": 2072,
    "email": "docho9497@gmail.com",
    "plan": "team",
    "total": 95,
    "types": 18
  }, {
    "id": 2123,
    "email": "zevstatiev@gmail.com",
    "plan": "free",
    "total": 95,
    "types": 22
  }, {
    "id": 1844,
    "email": "support@forjobhunters.com",
    "plan": "solo",
    "total": 94,
    "types": 11
  }, {
    "id": 1608,
    "email": "doncheva@castle.bg",
    "plan": "team",
    "total": 93,
    "types": 16
  }, {
    "id": 2052,
    "email": "antonio.v.nikolov@gmail.com",
    "plan": "team",
    "total": 90,
    "types": 22
  }, {
    "id": 15,
    "email": "aleks.angelov14@gmail.com",
    "plan": "enterprise",
    "total": 87,
    "types": 10
  }, {
    "id": 543,
    "email": "teodor.t.georgiev@gmail.com",
    "plan": "enterprise",
    "total": 87,
    "types": 10
  }, {
    "id": 1930,
    "email": "stoqnmk6@gmail.com",
    "plan": "solo",
    "total": 87,
    "types": 10
  }, {
    "id": 782,
    "email": "iren.veselinova@gmail.com",
    "plan": "free",
    "total": 82,
    "types": 20
  }, {
    "id": 1940,
    "email": "rositsad@gmail.com",
    "plan": "solo",
    "total": 80,
    "types": 6
  }, {
    "id": 150,
    "email": "joretok79@gmail.com",
    "plan": "enterprise",
    "total": 80,
    "types": 11
  }, {
    "id": 1729,
    "email": "ivelin.peychev@cad-automation.eu",
    "plan": "team",
    "total": 79,
    "types": 16
  }, {
    "id": 226,
    "email": "pi_petrov@mail.bg",
    "plan": "enterprise",
    "total": 79,
    "types": 8
  }, {
    "id": 1090,
    "email": "prorentsltd@gmail.com",
    "plan": "solo",
    "total": 78,
    "types": 6
  }, {
    "id": 2045,
    "email": "coumenova@gmail.com",
    "plan": "team",
    "total": 77,
    "types": 17
  }, {
    "id": 1469,
    "email": "nspeykova@gmail.com",
    "plan": "solo",
    "total": 76,
    "types": 15
  }, {
    "id": 1069,
    "email": "danail.enchew@gmail.com",
    "plan": "team",
    "total": 75,
    "types": 15
  }, {
    "id": 1716,
    "email": "office@brandoria.bg",
    "plan": "team",
    "total": 74,
    "types": 17
  }, {
    "id": 1950,
    "email": "1719success@gmail.com",
    "plan": "solo",
    "total": 74,
    "types": 5
  }, {
    "id": 335,
    "email": "krisi.tsoneva@gmail.com",
    "plan": "team",
    "total": 73,
    "types": 11
  }, {
    "id": 670,
    "email": "meglenamisheva@gmail.com",
    "plan": "solo",
    "total": 72,
    "types": 12
  }, {
    "id": 1610,
    "email": "adrianakancheva@gmail.com",
    "plan": "team",
    "total": 71,
    "types": 8
  }, {
    "id": 897,
    "email": "office.notevigroup@gmail.com",
    "plan": "solo",
    "total": 71,
    "types": 9
  }, {
    "id": 2233,
    "email": "ivelin.sladunov01@gmail.com",
    "plan": "team",
    "total": 70,
    "types": 17
  }, {
    "id": 1220,
    "email": "denyslavangelov@gmail.com",
    "plan": "solo",
    "total": 70,
    "types": 9
  }, {
    "id": 2011,
    "email": "benzingazbg@gmail.com",
    "plan": "solo",
    "total": 70,
    "types": 10
  }, {
    "id": 307,
    "email": "nodramallamaproduction@gmail.com",
    "plan": "solo",
    "total": 69,
    "types": 5
  }, {
    "id": 1217,
    "email": "milan@nankov.com",
    "plan": "solo",
    "total": 65,
    "types": 10
  }, {
    "id": 157,
    "email": "pacoalexiev@gmail.com",
    "plan": "enterprise",
    "total": 64,
    "types": 7
  }, {
    "id": 652,
    "email": "info@illusiontravel.eu",
    "plan": "solo",
    "total": 64,
    "types": 19
  }, {
    "id": 2217,
    "email": "daskalov.mebeli@gmail.com",
    "plan": "solo",
    "total": 63,
    "types": 20
  }, {
    "id": 1532,
    "email": "djdarkstep@gmail.com",
    "plan": "enterprise",
    "total": 62,
    "types": 8
  }, {
    "id": 784,
    "email": "makridaltd1@gmail.com",
    "plan": "team",
    "total": 62,
    "types": 11
  }, {
    "id": 993,
    "email": "discovererspernik@gmail.com",
    "plan": "team",
    "total": 62,
    "types": 15
  }, {
    "id": 700,
    "email": "elena_still@abv.bg",
    "plan": "free",
    "total": 60,
    "types": 9
  }, {
    "id": 32,
    "email": "christiyanag13@gmail.com",
    "plan": "enterprise",
    "total": 60,
    "types": 7
  }, {
    "id": 1168,
    "email": "daniel@severalclouds.com",
    "plan": "free",
    "total": 60,
    "types": 18
  }, {
    "id": 1263,
    "email": "office@dad-studio.com",
    "plan": "solo",
    "total": 58,
    "types": 9
  }, {
    "id": 1609,
    "email": "breadnsoul@gmail.com",
    "plan": "solo",
    "total": 57,
    "types": 10
  }, {
    "id": 600,
    "email": "p.towey@dorin.bg",
    "plan": "solo",
    "total": 57,
    "types": 9
  }, {
    "id": 972,
    "email": "miroslav.todorov@terrafusion.solutions",
    "plan": "solo",
    "total": 57,
    "types": 10
  }, {
    "id": 404,
    "email": "n_koleva@abv.bg",
    "plan": "solo",
    "total": 54,
    "types": 4
  }, {
    "id": 1935,
    "email": "artfields.eu@gmail.com",
    "plan": "solo",
    "total": 53,
    "types": 7
  }, {
    "id": 1070,
    "email": "fibercom@abv.bg",
    "plan": "solo",
    "total": 53,
    "types": 5
  }, {
    "id": 441,
    "email": "petyabogdanova@ascend360.net",
    "plan": "solo",
    "total": 53,
    "types": 4
  }, {
    "id": 965,
    "email": "autorentroom@gmail.com",
    "plan": "free",
    "total": 53,
    "types": 9
  }, {
    "id": 2117,
    "email": "viki.lia@abv.bg",
    "plan": "solo",
    "total": 52,
    "types": 12
  }, {
    "id": 517,
    "email": "office@97crewing.com",
    "plan": "solo",
    "total": 52,
    "types": 5
  }, {
    "id": 2279,
    "email": "zgurovskideyan@gmail.com",
    "plan": "solo",
    "total": 52,
    "types": 10
  }, {
    "id": 85,
    "email": "kichukovadenitsa@gmail.com",
    "plan": "enterprise",
    "total": 51,
    "types": 8
  }, {
    "id": 2304,
    "email": "tsetso777@gmail.com",
    "plan": "solo",
    "total": 51,
    "types": 12
  }, {
    "id": 333,
    "email": "iin_solar_trade_ltd@abv.bg",
    "plan": "solo",
    "total": 50,
    "types": 9
  }, {
    "id": 1002,
    "email": "neichevnikola@gmail.com",
    "plan": "solo",
    "total": 49,
    "types": 11
  }, {
    "id": 1150,
    "email": "rumi.pavlova@hotmail.co.uk",
    "plan": "solo",
    "total": 49,
    "types": 11
  }, {
    "id": 2025,
    "email": "casadesigninvest@gmail.com",
    "plan": "free",
    "total": 48,
    "types": 16
  }, {
    "id": 1232,
    "email": "petrov.todor.p@gmail.com",
    "plan": "solo",
    "total": 48,
    "types": 12
  }, {
    "id": 1166,
    "email": "vladi@vividfilms.eu",
    "plan": "solo",
    "total": 47,
    "types": 16
  }, {
    "id": 1155,
    "email": "ognyan.sokolov@pipehack.co",
    "plan": "solo",
    "total": 47,
    "types": 13
  }, {
    "id": 2040,
    "email": "alexandyrzph@gmail.com",
    "plan": "solo",
    "total": 46,
    "types": 4
  }, {
    "id": 819,
    "email": "office@kamtex84.com",
    "plan": "solo",
    "total": 46,
    "types": 7
  }, {
    "id": 1897,
    "email": "m.georgieva17@icloud.com",
    "plan": "solo",
    "total": 45,
    "types": 10
  }, {
    "id": 2076,
    "email": "nestor.notov@gmail.com",
    "plan": "free",
    "total": 44,
    "types": 13
  }, {
    "id": 2084,
    "email": "sn1001rmc@gmail.com",
    "plan": "solo",
    "total": 44,
    "types": 13
  }, {
    "id": 242,
    "email": "studio.gemini.bg@gmail.com",
    "plan": "enterprise",
    "total": 44,
    "types": 8
  }, {
    "id": 863,
    "email": "gergana_jeleva_@abv.bg",
    "plan": "solo",
    "total": 44,
    "types": 7
  }, {
    "id": 1331,
    "email": "gevi.georgieva@gmail.com",
    "plan": "solo",
    "total": 43,
    "types": 7
  }, {
    "id": 1408,
    "email": "info@povarchitects.com",
    "plan": "solo",
    "total": 43,
    "types": 4
  }, {
    "id": 2071,
    "email": "renetakonarska@gmail.com",
    "plan": "solo",
    "total": 42,
    "types": 7
  }, {
    "id": 2201,
    "email": "soleybattery@mail.bg",
    "plan": "solo",
    "total": 41,
    "types": 10
  }, {
    "id": 1516,
    "email": "getsetdev@icloud.com",
    "plan": "solo",
    "total": 41,
    "types": 7
  }, {
    "id": 1653,
    "email": "dreamtrainingbulgaria@gmail.com",
    "plan": "solo",
    "total": 41,
    "types": 6
  }, {
    "id": 1936,
    "email": "eli135q@gmail.com",
    "plan": "solo",
    "total": 40,
    "types": 8
  }, {
    "id": 913,
    "email": "gipsprobg@gmail.com",
    "plan": "solo",
    "total": 40,
    "types": 8
  }, {
    "id": 1550,
    "email": "top.mobile@abv.bg",
    "plan": "solo",
    "total": 39,
    "types": 10
  }, {
    "id": 215,
    "email": "info@angelaboeva.com",
    "plan": "free",
    "total": 38,
    "types": 13
  }, {
    "id": 1892,
    "email": "lukas.kapusta@rebelhare.com",
    "plan": "free",
    "total": 38,
    "types": 6
  }, {
    "id": 1644,
    "email": "invoice@samitas.com",
    "plan": "solo",
    "total": 37,
    "types": 5
  }, {
    "id": 1536,
    "email": "taniel07@gmail.com",
    "plan": "team",
    "total": 37,
    "types": 13
  }, {
    "id": 853,
    "email": "nina.nikolovska1901@abv.bg",
    "plan": "solo",
    "total": 35,
    "types": 6
  }, {
    "id": 848,
    "email": "contact@imnextgen.bg",
    "plan": "solo",
    "total": 35,
    "types": 9
  }, {
    "id": 827,
    "email": "hrisi.gp@gmail.com",
    "plan": "team",
    "total": 35,
    "types": 5
  }, {
    "id": 644,
    "email": "maria.v.aleksieva@gmail.com",
    "plan": "solo",
    "total": 35,
    "types": 4
  }, {
    "id": 341,
    "email": "spas.kanovv@gmail.com",
    "plan": "enterprise",
    "total": 35,
    "types": 9
  }, {
    "id": 1171,
    "email": "renetakonarska@gmail.com",
    "plan": "solo",
    "total": 34,
    "types": 8
  }, {
    "id": 2116,
    "email": "artpartners7@gmail.com",
    "plan": "solo",
    "total": 34,
    "types": 8
  }, {
    "id": 1376,
    "email": "jiktakruk@abv.bg",
    "plan": "solo",
    "total": 34,
    "types": 9
  }, {
    "id": 614,
    "email": "simpartsautoeood@gmail.com",
    "plan": "solo",
    "total": 34,
    "types": 7
  }, {
    "id": 971,
    "email": "milkog@abv.bg",
    "plan": "solo",
    "total": 33,
    "types": 5
  }, {
    "id": 1861,
    "email": "avanthouse2025@gmail.com",
    "plan": "team",
    "total": 33,
    "types": 7
  }, {
    "id": 2105,
    "email": "tocapas767@daerdy.com",
    "plan": "enterprise",
    "total": 33,
    "types": 11
  }, {
    "id": 2023,
    "email": "djtedd.official@gmail.com",
    "plan": "solo",
    "total": 33,
    "types": 7
  }, {
    "id": 1607,
    "email": "nestorycreative@gmail.com",
    "plan": "solo",
    "total": 33,
    "types": 7
  }, {
    "id": 181,
    "email": "info@inverso.bg",
    "plan": "enterprise",
    "total": 32,
    "types": 6
  }, {
    "id": 1201,
    "email": "id@contiant.com",
    "plan": "enterprise",
    "total": 32,
    "types": 11
  }, {
    "id": 1227,
    "email": "annie.ang09@gmail.com",
    "plan": "free",
    "total": 32,
    "types": 5
  }, {
    "id": 299,
    "email": "pavkataa882@gmail.com",
    "plan": "free",
    "total": 32,
    "types": 7
  }, {
    "id": 1320,
    "email": "office@codnetix.com",
    "plan": "solo",
    "total": 32,
    "types": 8
  }, {
    "id": 1929,
    "email": "presinvestmant@abv.bg",
    "plan": "solo",
    "total": 32,
    "types": 9
  }, {
    "id": 1818,
    "email": "cholakovdimitar66@gmail.com",
    "plan": "solo",
    "total": 31,
    "types": 4
  }, {
    "id": 27,
    "email": "contact@voidweb.eu",
    "plan": "enterprise",
    "total": 31,
    "types": 4
  }, {
    "id": 1782,
    "email": "bg.travel.service@gmail.com",
    "plan": "solo",
    "total": 30,
    "types": 9
  }, {
    "id": 2134,
    "email": "ivan.jelev2@gmail.com",
    "plan": "solo",
    "total": 29,
    "types": 9
  }, {
    "id": 1498,
    "email": "contacts@toyitya.bg",
    "plan": "solo",
    "total": 29,
    "types": 7
  }, {
    "id": 2188,
    "email": "antonio.nikolov@italceramicgroup.com",
    "plan": "enterprise",
    "total": 29,
    "types": 9
  }, {
    "id": 811,
    "email": "sburgudzhieva@gmail.com",
    "plan": "solo",
    "total": 29,
    "types": 4
  }, {
    "id": 2002,
    "email": "ianis7811@abv.bg",
    "plan": "solo",
    "total": 28,
    "types": 9
  }, {
    "id": 1460,
    "email": "sladkatafeyalin@gmail.com",
    "plan": "solo",
    "total": 28,
    "types": 5
  }, {
    "id": 1347,
    "email": "i.marinov@sky-prime.com",
    "plan": "solo",
    "total": 28,
    "types": 8
  }, {
    "id": 2187,
    "email": "boginyastefanova8@gmail.com",
    "plan": "solo",
    "total": 27,
    "types": 10
  }, {
    "id": 1059,
    "email": "office@vitalitygym.bg",
    "plan": "solo",
    "total": 27,
    "types": 7
  }, {
    "id": 1796,
    "email": "nadia_brankova@yahoo.com",
    "plan": "solo",
    "total": 27,
    "types": 9
  }, {
    "id": 2173,
    "email": "kadeeadmin@gmail.com",
    "plan": "solo",
    "total": 27,
    "types": 11
  }, {
    "id": 2132,
    "email": "stanislav@topicpartition.com",
    "plan": "solo",
    "total": 26,
    "types": 9
  }, {
    "id": 1541,
    "email": "kallnoob11@gmail.com",
    "plan": "solo",
    "total": 26,
    "types": 5
  }, {
    "id": 328,
    "email": "r.dinev@mail.bg",
    "plan": "solo",
    "total": 26,
    "types": 4
  }, {
    "id": 2179,
    "email": "denismilanoff@gmail.com",
    "plan": "free",
    "total": 25,
    "types": 12
  }, {
    "id": 1750,
    "email": "eli135q@gmail.com",
    "plan": "solo",
    "total": 25,
    "types": 6
  }, {
    "id": 408,
    "email": "g.topev@papagaio.bg",
    "plan": "solo",
    "total": 25,
    "types": 9
  }, {
    "id": 1185,
    "email": "yulianuk@gmail.com",
    "plan": "solo",
    "total": 25,
    "types": 6
  }, {
    "id": 1586,
    "email": "bohoria.studio.apartments@gmail.com",
    "plan": "solo",
    "total": 24,
    "types": 7
  }, {
    "id": 1614,
    "email": "swiftgap@gmail.com",
    "plan": "solo",
    "total": 24,
    "types": 7
  }, {
    "id": 2061,
    "email": "padelpartnersbulgaria@gmail.com",
    "plan": "solo",
    "total": 24,
    "types": 8
  }, {
    "id": 1235,
    "email": "bobby9@abv.bg",
    "plan": "solo",
    "total": 24,
    "types": 8
  }, {
    "id": 765,
    "email": "oblachebabystore@gmail.com",
    "plan": "solo",
    "total": 24,
    "types": 6
  }, {
    "id": 1926,
    "email": "natur.aqua.group@gmail.com",
    "plan": "solo",
    "total": 23,
    "types": 6
  }, {
    "id": 2254,
    "email": "dtyanakiev@sky-interactive.com",
    "plan": "solo",
    "total": 23,
    "types": 10
  }, {
    "id": 2266,
    "email": "filip@octacore.solutions",
    "plan": "solo",
    "total": 22,
    "types": 8
  }, {
    "id": 2198,
    "email": "martin.ivanov@braindonors.agency",
    "plan": "solo",
    "total": 22,
    "types": 4
  }, {
    "id": 2024,
    "email": "edrina1996@gmail.com",
    "plan": "solo",
    "total": 22,
    "types": 15
  }, {
    "id": 618,
    "email": "pawchokapitana@gmail.com",
    "plan": "free",
    "total": 21,
    "types": 10
  }, {
    "id": 1333,
    "email": "mshentova@abv.bg",
    "plan": "solo",
    "total": 21,
    "types": 5
  }, {
    "id": 2308,
    "email": "diegorodriguezgalindez@gmail.com",
    "plan": "free",
    "total": 20,
    "types": 11
  }, {
    "id": 1599,
    "email": "office.udros@gmail.com",
    "plan": "solo",
    "total": 20,
    "types": 5
  }, {
    "id": 553,
    "email": "valentina@valkrea.house",
    "plan": "enterprise",
    "total": 20,
    "types": 11
  }, {
    "id": 1626,
    "email": "martina.pidakeva@samitas.com",
    "plan": "solo",
    "total": 20,
    "types": 6
  }, {
    "id": 533,
    "email": "imotibektasheva@gmail.com",
    "plan": "solo",
    "total": 20,
    "types": 5
  }, {
    "id": 2035,
    "email": "georgi.test@voidweb.eu",
    "plan": "solo",
    "total": 20,
    "types": 6
  }, {
    "id": 2145,
    "email": "stoycho.a.iliev@gmail.com",
    "plan": "solo",
    "total": 19,
    "types": 5
  }, {
    "id": 2143,
    "email": "monika.ivanova@braindonors.agency",
    "plan": "solo",
    "total": 19,
    "types": 10
  }, {
    "id": 779,
    "email": "vinkisoffice@gmail.com",
    "plan": "solo",
    "total": 19,
    "types": 7
  }, {
    "id": 2221,
    "email": "860313mp@gmail.com",
    "plan": "solo",
    "total": 19,
    "types": 6
  }, {
    "id": 1953,
    "email": "office@simplybae.com",
    "plan": "solo",
    "total": 19,
    "types": 6
  }, {
    "id": 2320,
    "email": "contact@goflowai.ai",
    "plan": "solo",
    "total": 18,
    "types": 6
  }, {
    "id": 407,
    "email": "dinko359@gmail.com",
    "plan": "solo",
    "total": 18,
    "types": 3
  }, {
    "id": 2285,
    "email": "contact@devids.eu",
    "plan": "solo",
    "total": 18,
    "types": 10
  }, {
    "id": 2158,
    "email": "sicavo9165@4heats.com",
    "plan": "solo",
    "total": 18,
    "types": 7
  }, {
    "id": 2081,
    "email": "stherapy95@gmail.com",
    "plan": "solo",
    "total": 18,
    "types": 9
  }, {
    "id": 636,
    "email": "eventoria.space@gmail.com",
    "plan": "solo",
    "total": 18,
    "types": 7
  }, {
    "id": 1938,
    "email": "floristik.t@abv.bg",
    "plan": "team",
    "total": 18,
    "types": 2
  }, {
    "id": 2111,
    "email": "riselab.eood@gmail.com",
    "plan": "solo",
    "total": 17,
    "types": 9
  }, {
    "id": 1952,
    "email": "lyubomir.olchev@gmail.com",
    "plan": "solo",
    "total": 17,
    "types": 3
  }, {
    "id": 2017,
    "email": "officeunisped@gmail.com",
    "plan": "solo",
    "total": 17,
    "types": 8
  }, {
    "id": 1988,
    "email": "tedych2003@gmail.com",
    "plan": "solo",
    "total": 17,
    "types": 5
  }, {
    "id": 939,
    "email": "zapatanasoff@gmail.com",
    "plan": "solo",
    "total": 16,
    "types": 5
  }, {
    "id": 2223,
    "email": "dyankova.mila@gmail.com",
    "plan": "team",
    "total": 16,
    "types": 9
  }, {
    "id": 740,
    "email": "georgkiryakov@gmail.com",
    "plan": "solo",
    "total": 16,
    "types": 5
  }, {
    "id": 899,
    "email": "notevibuildgroup@gmail.com",
    "plan": "solo",
    "total": 16,
    "types": 7
  }, {
    "id": 2106,
    "email": "kostov_s@ksc-bg.com",
    "plan": "solo",
    "total": 15,
    "types": 10
  }, {
    "id": 956,
    "email": "ofleur.contacts@gmail.com",
    "plan": "solo",
    "total": 15,
    "types": 3
  }, {
    "id": 1743,
    "email": "an.tanchev@abv.bg",
    "plan": "solo",
    "total": 15,
    "types": 6
  }, {
    "id": 258,
    "email": "moni.zarko@abv.bg",
    "plan": "solo",
    "total": 15,
    "types": 7
  }, {
    "id": 2237,
    "email": "demos@test.com",
    "plan": "solo",
    "total": 15,
    "types": 3
  }, {
    "id": 2077,
    "email": "moni.zarko@abv.bg",
    "plan": "solo",
    "total": 15,
    "types": 4
  }, {
    "id": 1119,
    "email": "polisunduni@abv.bg",
    "plan": "team",
    "total": 15,
    "types": 2
  }, {
    "id": 2310,
    "email": "hilyal.sami@outlook.com",
    "plan": "solo",
    "total": 15,
    "types": 9
  }, {
    "id": 842,
    "email": "veronikavvelkova5@gmail.com",
    "plan": "solo",
    "total": 14,
    "types": 6
  }, {
    "id": 2083,
    "email": "sn1001rmc@gmail.com",
    "plan": "solo",
    "total": 14,
    "types": 3
  }, {
    "id": 2095,
    "email": "ida.golemanova@gmail.com",
    "plan": "solo",
    "total": 14,
    "types": 8
  }, {
    "id": 280,
    "email": "kirqkaaa@abv.bg",
    "plan": "team",
    "total": 14,
    "types": 8
  }, {
    "id": 2114,
    "email": "samuel.diethelm+inverso@revolut.com",
    "plan": "enterprise",
    "total": 14,
    "types": 5
  }, {
    "id": 374,
    "email": "pavlin140@gmail.com",
    "plan": "solo",
    "total": 14,
    "types": 7
  }, {
    "id": 2269,
    "email": "desi850@abv.bg",
    "plan": "solo",
    "total": 14,
    "types": 8
  }, {
    "id": 2193,
    "email": "svetla.vasileva@braindonors.agency",
    "plan": "solo",
    "total": 14,
    "types": 5
  }, {
    "id": 2316,
    "email": "ivvestrans2010@gmail.com",
    "plan": "solo",
    "total": 14,
    "types": 7
  }, {
    "id": 2326,
    "email": "tgspedition2026@abv.bg",
    "plan": "solo",
    "total": 14,
    "types": 8
  }, {
    "id": 2303,
    "email": "rjetcheva@gmail.com",
    "plan": "solo",
    "total": 13,
    "types": 7
  }, {
    "id": 1538,
    "email": "cmstudiobg@gmail.com",
    "plan": "solo",
    "total": 13,
    "types": 10
  }, {
    "id": 2230,
    "email": "m.tsanchev@gmail.com",
    "plan": "solo",
    "total": 13,
    "types": 9
  }, {
    "id": 1502,
    "email": "demsyst@gmail.com",
    "plan": "solo",
    "total": 13,
    "types": 3
  }, {
    "id": 2306,
    "email": "creator.flow.bussines@gmail.com",
    "plan": "free",
    "total": 13,
    "types": 8
  }, {
    "id": 262,
    "email": "jordanova7878@abv.bg",
    "plan": "solo",
    "total": 13,
    "types": 5
  }, {
    "id": 2250,
    "email": "velislavi.biz@gmail.com",
    "plan": "solo",
    "total": 13,
    "types": 6
  }, {
    "id": 2174,
    "email": "tenev.bh2o@gmail.com",
    "plan": "solo",
    "total": 13,
    "types": 8
  }, {
    "id": 1511,
    "email": "inffo@trakciashop.com",
    "plan": "solo",
    "total": 13,
    "types": 3
  }, {
    "id": 550,
    "email": "swormylolz+inverso@gmail.com",
    "plan": "solo",
    "total": 12,
    "types": 4
  }, {
    "id": 734,
    "email": "solaris.spa@proton.me",
    "plan": "solo",
    "total": 12,
    "types": 4
  }, {
    "id": 2261,
    "email": "igechev2@gmail.com",
    "plan": "solo",
    "total": 11,
    "types": 7
  }, {
    "id": 1021,
    "email": "yanos.stm@gmail.com",
    "plan": "solo",
    "total": 11,
    "types": 4
  }, {
    "id": 2176,
    "email": "jorkata@test.com",
    "plan": "enterprise",
    "total": 11,
    "types": 7
  }, {
    "id": 2155,
    "email": "batonok931@bmoar.com",
    "plan": "solo",
    "total": 11,
    "types": 9
  }, {
    "id": 1636,
    "email": "pavlin@viprent.eu",
    "plan": "solo",
    "total": 11,
    "types": 5
  }, {
    "id": 1521,
    "email": "radotravel@abv.bg",
    "plan": "solo",
    "total": 10,
    "types": 3
  }, {
    "id": 841,
    "email": "emilycleaning7574@gmail.com",
    "plan": "solo",
    "total": 10,
    "types": 1
  }, {
    "id": 1335,
    "email": "siti_montana@abv.bg",
    "plan": "solo",
    "total": 10,
    "types": 7
  }, {
    "id": 2210,
    "email": "stelastoycheva2001@gmail.com",
    "plan": "solo",
    "total": 10,
    "types": 5
  }, {
    "id": 1756,
    "email": "dpoibrenski05@gmail.com",
    "plan": "solo",
    "total": 9,
    "types": 3
  }, {
    "id": 1734,
    "email": "vi-as@abv.bg",
    "plan": "solo",
    "total": 9,
    "types": 3
  }, {
    "id": 1085,
    "email": "sostaxi2023@gmail.com",
    "plan": "enterprise",
    "total": 9,
    "types": 3
  }, {
    "id": 2270,
    "email": "viktorkabakchiev@gmail.com",
    "plan": "solo",
    "total": 9,
    "types": 6
  }, {
    "id": 2264,
    "email": "snedev@gmail.com",
    "plan": "solo",
    "total": 9,
    "types": 6
  }, {
    "id": 695,
    "email": "office.blueshields.vts@gmail.com",
    "plan": "solo",
    "total": 9,
    "types": 3
  }, {
    "id": 777,
    "email": "petya_mitoncheva@abv.bg",
    "plan": "solo",
    "total": 9,
    "types": 5
  }, {
    "id": 1794,
    "email": "dimitar050279@gmail.com",
    "plan": "solo",
    "total": 9,
    "types": 3
  }, {
    "id": 1130,
    "email": "suzunov@rockit.bg",
    "plan": "solo",
    "total": 8,
    "types": 5
  }, {
    "id": 710,
    "email": "denitsamarinova_@abv.bg",
    "plan": "solo",
    "total": 8,
    "types": 2
  }, {
    "id": 1156,
    "email": "mk.wealthy2024@gmail.com",
    "plan": "solo",
    "total": 8,
    "types": 6
  }, {
    "id": 1365,
    "email": "elitsa_velcheva@abv.bg",
    "plan": "solo",
    "total": 8,
    "types": 4
  }, {
    "id": 2191,
    "email": "stela.stoycheva@braindonors.agency",
    "plan": "solo",
    "total": 8,
    "types": 5
  }, {
    "id": 2239,
    "email": "zfzznphzyk@privaterelay.appleid.com",
    "plan": "solo",
    "total": 8,
    "types": 2
  }, {
    "id": 2178,
    "email": "denismilanoff@gmail.com",
    "plan": "solo",
    "total": 8,
    "types": 4
  }, {
    "id": 2284,
    "email": "neri.m@voidweb.eu",
    "plan": "solo",
    "total": 8,
    "types": 4
  }, {
    "id": 2231,
    "email": "daylerov@gmail.com",
    "plan": "solo",
    "total": 8,
    "types": 4
  }, {
    "id": 771,
    "email": "timeless.tastes.group@gmail.com",
    "plan": "solo",
    "total": 8,
    "types": 6
  }, {
    "id": 2064,
    "email": "atanastanev362@gmail.com",
    "plan": "solo",
    "total": 8,
    "types": 2
  }, {
    "id": 2259,
    "email": "georgiev.gg99@gmail.com",
    "plan": "solo",
    "total": 8,
    "types": 5
  }, {
    "id": 2301,
    "email": "nasko_kolev@abv.bg",
    "plan": "solo",
    "total": 8,
    "types": 6
  }, {
    "id": 2082,
    "email": "erik@voidweb.eu",
    "plan": "solo",
    "total": 8,
    "types": 4
  }, {
    "id": 163,
    "email": "ndimitrov9@mail.bg",
    "plan": "solo",
    "total": 7,
    "types": 3
  }, {
    "id": 2229,
    "email": "summitinvest.eu@gmail.com",
    "plan": "solo",
    "total": 7,
    "types": 4
  }, {
    "id": 2291,
    "email": "georgi.k@voidweb.eu",
    "plan": "solo",
    "total": 7,
    "types": 2
  }, {
    "id": 1477,
    "email": "radina.baramova@gmail.com",
    "plan": "solo",
    "total": 7,
    "types": 5
  }, {
    "id": 2293,
    "email": "rvd18@abv.bg",
    "plan": "solo",
    "total": 7,
    "types": 3
  }, {
    "id": 2196,
    "email": "monika.ivanova@braindonors.agency",
    "plan": "solo",
    "total": 7,
    "types": 3
  }, {
    "id": 795,
    "email": "bahf.bg@gmail.com",
    "plan": "solo",
    "total": 7,
    "types": 4
  }, {
    "id": 2212,
    "email": "lg@b23.online",
    "plan": "solo",
    "total": 7,
    "types": 6
  }, {
    "id": 2092,
    "email": "kallnoob11@gmail.com",
    "plan": "solo",
    "total": 7,
    "types": 2
  }, {
    "id": 170,
    "email": "daniel.bratov@gmail.com",
    "plan": "solo",
    "total": 7,
    "types": 4
  }, {
    "id": 2109,
    "email": "konelid847@pckage.com",
    "plan": "solo",
    "total": 7,
    "types": 5
  }, {
    "id": 1783,
    "email": "stellargroupp@gmail.com",
    "plan": "solo",
    "total": 7,
    "types": 2
  }, {
    "id": 746,
    "email": "iron-factory@abv.bg",
    "plan": "solo",
    "total": 7,
    "types": 1
  }, {
    "id": 2121,
    "email": "bkb24@abv.bg",
    "plan": "solo",
    "total": 7,
    "types": 5
  }, {
    "id": 2060,
    "email": "office@dafiniti.bg",
    "plan": "solo",
    "total": 7,
    "types": 6
  }, {
    "id": 37,
    "email": "woney11875@devncie.com",
    "plan": "solo",
    "total": 7,
    "types": 3
  }, {
    "id": 2063,
    "email": "lamozcho@gmail.com",
    "plan": "solo",
    "total": 7,
    "types": 4
  }, {
    "id": 1889,
    "email": "office.info.kingsman@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 2
  }, {
    "id": 2160,
    "email": "selika441@4heats.com",
    "plan": "solo",
    "total": 6,
    "types": 4
  }, {
    "id": 2283,
    "email": "novebuild@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 4
  }, {
    "id": 2057,
    "email": "gergana.paraskevova@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 2267,
    "email": "r.velkov@msve.io",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 2211,
    "email": "svetla.test1905@proton.me",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 2328,
    "email": "systemomailbox@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 4
  }, {
    "id": 2209,
    "email": "georgia33666@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 2314,
    "email": "emilexinfo@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 2192,
    "email": "dimana.mihailova@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 4
  }, {
    "id": 2322,
    "email": "office@v-itsolutions.bg",
    "plan": "solo",
    "total": 6,
    "types": 4
  }, {
    "id": 2189,
    "email": "monika.ivanova@braindonors.agency",
    "plan": "solo",
    "total": 6,
    "types": 3
  }, {
    "id": 1738,
    "email": "vskirchev@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 2
  }, {
    "id": 2046,
    "email": "alexander@formulatechbg.com",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 2186,
    "email": "eli_siyana@abv.bg",
    "plan": "solo",
    "total": 6,
    "types": 4
  }, {
    "id": 2102,
    "email": "alexfromsofia@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 3
  }, {
    "id": 2170,
    "email": "test@onboarding.test",
    "plan": "solo",
    "total": 6,
    "types": 4
  }, {
    "id": 1665,
    "email": "ivan.nakov123@gmail.com",
    "plan": "solo",
    "total": 6,
    "types": 3
  }, {
    "id": 2168,
    "email": "babanago@abv.bg",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 1560,
    "email": "info@bullhomes.eu",
    "plan": "solo",
    "total": 6,
    "types": 2
  }, {
    "id": 2119,
    "email": "yoxoxo5360@onbap.com",
    "plan": "solo",
    "total": 6,
    "types": 5
  }, {
    "id": 2142,
    "email": "plamen.polimenov@braindonors.agency",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 2234,
    "email": "dobrinovamira@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 3
  }, {
    "id": 2157,
    "email": "erik@voideb.eu",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 2144,
    "email": "testerrik@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 3
  }, {
    "id": 2161,
    "email": "info@eltar.group",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 2167,
    "email": "eriktesttttt@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 1254,
    "email": "silgeorgieva98@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 3
  }, {
    "id": 2107,
    "email": "terragreen1@abv.bg",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 676,
    "email": "marina_kusheva@abv.bg",
    "plan": "solo",
    "total": 5,
    "types": 2
  }, {
    "id": 383,
    "email": "dimitar.t.ivanov@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 1
  }, {
    "id": 2324,
    "email": "tcvetanova51@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 834,
    "email": "elitza.koleva@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 3
  }, {
    "id": 33,
    "email": "boris.b@voidweb.eu",
    "plan": "solo",
    "total": 5,
    "types": 3
  }, {
    "id": 2163,
    "email": "gehevoj520@4heats.com",
    "plan": "enterprise",
    "total": 5,
    "types": 5
  }, {
    "id": 2275,
    "email": "sevgin_sirakov@abv.bg",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 2202,
    "email": "martinivanoviv955@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 2124,
    "email": "pahak67233@fun4k.com",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 2165,
    "email": "dtanev92@gmail.com",
    "plan": "solo",
    "total": 5,
    "types": 3
  }, {
    "id": 302,
    "email": "boyan@hireworks.digital",
    "plan": "solo",
    "total": 5,
    "types": 1
  }, {
    "id": 2218,
    "email": "svetla.georgieva@fourmate.com",
    "plan": "solo",
    "total": 5,
    "types": 4
  }, {
    "id": 2169,
    "email": "jorkatabate@test.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 1932,
    "email": "dtk@sigdir.com",
    "plan": "solo",
    "total": 4,
    "types": 2
  }, {
    "id": 2272,
    "email": "sddimitrova@abv.bg",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2273,
    "email": "office@futurex.bg",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 337,
    "email": "pimcombg@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2296,
    "email": "my.shop.anelia@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2299,
    "email": "gysamuby@fxzig.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 75,
    "email": "petya.eftimova@abv.bg",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2098,
    "email": "kerojay138@ostahie.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2101,
    "email": "arsovski225@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2108,
    "email": "ven.mihaylov@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2110,
    "email": "unishtojiteli@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 1563,
    "email": "drsracce@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 2
  }, {
    "id": 2003,
    "email": "gkb@mail.bg",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 1355,
    "email": "bul.pol.group@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 1
  }, {
    "id": 2135,
    "email": "kalin252@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 1920,
    "email": "info@intsy.eu",
    "plan": "free",
    "total": 4,
    "types": 1
  }, {
    "id": 2140,
    "email": "jonidev@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 2
  }, {
    "id": 2150,
    "email": "barko.invest@yahoo.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2159,
    "email": "philipkolev9991@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2162,
    "email": "gehevoj529@4heats.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2175,
    "email": "copotij505@iapapi.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 1098,
    "email": "hikbgcom@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 2
  }, {
    "id": 2183,
    "email": "a7nipp2c0e@wnbaldwy.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2184,
    "email": "aa@abv.bg",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2190,
    "email": "koliji3301@anawebs.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2194,
    "email": "d.mihaylova@italceramicgroup.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2197,
    "email": "stela.stoycheva@braindonors.agency",
    "plan": "solo",
    "total": 4,
    "types": 2
  }, {
    "id": 2219,
    "email": "rovera.space@outlook.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2220,
    "email": "advokatdimitrov4@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 1934,
    "email": "kraevabelyana477@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 2
  }, {
    "id": 2243,
    "email": "stroitel2000@abv.bg",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 2244,
    "email": "mitkovgeorgi065@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 4
  }, {
    "id": 2246,
    "email": "stela.stoycheva@braindonors.agency",
    "plan": "solo",
    "total": 4,
    "types": 2
  }, {
    "id": 2248,
    "email": "mladenov77@gmail.com",
    "plan": "solo",
    "total": 4,
    "types": 3
  }, {
    "id": 1113,
    "email": "andrey.petrov@braindonors.agency",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2125,
    "email": "glimpseoog@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2122,
    "email": "stefysps@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2164,
    "email": "cewote8545@donumart.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2241,
    "email": "bussinessplusadm@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2177,
    "email": "milanovdenis2002@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2182,
    "email": "stefangogov@proton.me",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2263,
    "email": "alasbulgaria@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 1925,
    "email": "thecupcake.socials@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2048,
    "email": "rositca_77@abv.bg",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2247,
    "email": "nerimutafova01@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2318,
    "email": "ilianpetev67@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2260,
    "email": "skinnylaural@wshu.net",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 58,
    "email": "erikpetrovweb@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 1
  }, {
    "id": 2276,
    "email": "petya_mitoncheva@abv.bg",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 955,
    "email": "angel.guygov@icloud.com",
    "plan": "solo",
    "total": 3,
    "types": 1
  }, {
    "id": 2199,
    "email": "stefaniivanova2612@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2203,
    "email": "jorkataqa@test.qa",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2078,
    "email": "moni.zarko@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2307,
    "email": "magacademy2@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 194,
    "email": "stu2201681036@uni-plovdiv.bg",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2213,
    "email": "balansvarna@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2216,
    "email": "dbstroyltd@gmai.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2032,
    "email": "sybev.dimitar@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2271,
    "email": "manolova.monika@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2222,
    "email": "chilltobone@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2294,
    "email": "bastosgroup@outlook.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2224,
    "email": "evhristovltd@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2225,
    "email": "ivanov955@mail.bg",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2226,
    "email": "s_manchev@yahoo.co.uk",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2227,
    "email": "alextest@abv.bg",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2228,
    "email": "office@aomeda.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2282,
    "email": "atanasmilcev787@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2141,
    "email": "eli135q@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2146,
    "email": "ihawxgbusiness@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2147,
    "email": "schetovodstvo_sv@abv.bg",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2151,
    "email": "andonb@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2131,
    "email": "pb27mir@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2156,
    "email": "m.ivvanova53@gmail.com",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2127,
    "email": "dimsinvest@abv.bg",
    "plan": "solo",
    "total": 3,
    "types": 2
  }, {
    "id": 2278,
    "email": "boris.stoilov@proton.me",
    "plan": "solo",
    "total": 3,
    "types": 3
  }, {
    "id": 2312,
    "email": "ikundevska@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2148,
    "email": "lassfed@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2290,
    "email": "denislavpetkov1809@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2311,
    "email": "doormann111@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2091,
    "email": "gold6314@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2126,
    "email": "glimpseoog@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 1
  }, {
    "id": 2086,
    "email": "snyvx@mailto.plus",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2240,
    "email": "miroslav_IIVANOV@ABV.BG",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2286,
    "email": "desislava.dicheva87@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 717,
    "email": "info@mnlogistic.bg",
    "plan": "solo",
    "total": 2,
    "types": 1
  }, {
    "id": 2120,
    "email": "mazen@tradelane.ai",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2166,
    "email": "rvd18@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2118,
    "email": "pi_petrov@mail.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2113,
    "email": "rosi.detinska@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 1658,
    "email": "dmistoykov@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 1
  }, {
    "id": 2013,
    "email": "galiana.vasileva@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2171,
    "email": "rvd18@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2172,
    "email": "rvd18@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2044,
    "email": "nedev.group@aol.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 1888,
    "email": "anackhov.i.e@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2300,
    "email": "naskoshefa@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2257,
    "email": "Ivailo8101daskalov@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2281,
    "email": "enjoigooddays@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2103,
    "email": "donsandini@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2099,
    "email": "kallnoob11@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2180,
    "email": "monika.ivanova@braindonors.agency",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 1063,
    "email": "d.petkova29@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 1
  }, {
    "id": 798,
    "email": "h.s.atanasov@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 1
  }, {
    "id": 653,
    "email": "viki.peicheva@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2051,
    "email": "ivan.donkov@smartity.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2012,
    "email": "vityashevcov1@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2097,
    "email": "todosbackendmail.service@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2274,
    "email": "zaharievboyan@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2128,
    "email": "office@consulting-vi.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2327,
    "email": "nero8322@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 309,
    "email": "vipzoo@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 1
  }, {
    "id": 2323,
    "email": "ivaylo.g@smartico.ai",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2139,
    "email": "nianed3007@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 970,
    "email": "nikolovk1992@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 1270,
    "email": "hristiana@sharlopova.com",
    "plan": "solo",
    "total": 2,
    "types": 1
  }, {
    "id": 2069,
    "email": "hristo.v.hristov@outlook.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2007,
    "email": "l_borisova@abv.bg",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 1191,
    "email": "cankovpantev@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2133,
    "email": "denislava.koeva@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2313,
    "email": "billy.dimitrov@gmail.com",
    "plan": "solo",
    "total": 2,
    "types": 2
  }, {
    "id": 2018,
    "email": "ngerzilova@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2010,
    "email": "pspavlov75@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2028,
    "email": "arsainvestbg@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2029,
    "email": "zhuj8119@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2031,
    "email": "divestavarna@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2033,
    "email": "stefangogov@proton.me",
    "plan": "enterprise",
    "total": 1,
    "types": 1
  }, {
    "id": 1993,
    "email": "aspar.software@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2036,
    "email": "stoyan.n@voidweb.eu",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2037,
    "email": "rradoslavova@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2039,
    "email": "alexandyrfreelance@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1968,
    "email": "ilcho.eftimov@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1949,
    "email": "hello@drvelev.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1947,
    "email": "miladima@veda.finance",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2058,
    "email": "yordankgeorgiev@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2062,
    "email": "testbaitacount@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2067,
    "email": "mimisteli2@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2068,
    "email": "office@vizualnatehnika.bg",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2073,
    "email": "venchan.valkov@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2075,
    "email": "elena.paskova68@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1851,
    "email": "samarovdimitar@gmail.com",
    "plan": "enterprise",
    "total": 1,
    "types": 1
  }, {
    "id": 1812,
    "email": "todor@cosmonavt.studio",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1784,
    "email": "stanimirstefanov105@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1774,
    "email": "astyle.studio.asya@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2085,
    "email": "hristov@aquaconsult.biz",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2087,
    "email": "ksvetieva@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2090,
    "email": "rzasohin@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2094,
    "email": "stefaniya.tzvetkova89@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1735,
    "email": "gneissbg.com@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1670,
    "email": "airblasterbulgaria@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1549,
    "email": "wizard97@abv.bg",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1458,
    "email": "splay333@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2130,
    "email": "zevstatiev@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2136,
    "email": "erikkkkk@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2137,
    "email": "mst2027@abv.bg",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2138,
    "email": "testerikkkkk@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2153,
    "email": "vstefcheva@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1111,
    "email": "setndq@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1101,
    "email": "org #1101",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2185,
    "email": "antondjingarov7@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1057,
    "email": "office@reflect-studio.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 1024,
    "email": "sergey@finbiztech.eu",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2208,
    "email": "svetla.test2026@proton.me",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2214,
    "email": "erikk@voidweb.eu",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2236,
    "email": "ivaylo.g@smartico.ai",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2252,
    "email": "z299npsh4h@privaterelay.appleid.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 709,
    "email": "anlimltd@hotmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 705,
    "email": "tvishnevski@enivid.net",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2258,
    "email": "erik@voidweb.eu",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 451,
    "email": "sanjaracic77@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2287,
    "email": "desislava.dicheva87@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2292,
    "email": "rvd18@abv.bg",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2298,
    "email": "georgitestingverification@test.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2309,
    "email": "nick_stankov@abv.bg",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2325,
    "email": "tgspedition2026@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }, {
    "id": 2015,
    "email": "opetrova.bg@gmail.com",
    "plan": "solo",
    "total": 1,
    "types": 1
  }],
  "events": [{
    "e": "invoice_downloaded",
    "n": 16520,
    "o": 278
  }, {
    "e": "invoice_created",
    "n": 11253,
    "o": 285
  }, {
    "e": "report_viewed",
    "n": 6960,
    "o": 348
  }, {
    "e": "invoice_updated",
    "n": 6572,
    "o": 217
  }, {
    "e": "invoice_paid",
    "n": 3559,
    "o": 117
  }, {
    "e": "invoice_sent",
    "n": 1976,
    "o": 158
  }, {
    "e": "invoice_viewed_by_client",
    "n": 1515,
    "o": 87
  }, {
    "e": "template_created",
    "n": 1218,
    "o": 121
  }, {
    "e": "customer_created",
    "n": 1002,
    "o": 169
  }, {
    "e": "invoice_downloaded_by_client",
    "n": 971,
    "o": 92
  }, {
    "e": "invoice_viewed_by_owner",
    "n": 964,
    "o": 145
  }, {
    "e": "subscription_status_changed",
    "n": 795,
    "o": 145
  }, {
    "e": "ai_assistant_used",
    "n": 549,
    "o": 74
  }, {
    "e": "organization_updated",
    "n": 407,
    "o": 240
  }, {
    "e": "payment_failed",
    "n": 373,
    "o": 80
  }, {
    "e": "report_filter_changed",
    "n": 338,
    "o": 100
  }, {
    "e": "invoices_exported",
    "n": 256,
    "o": 37
  }, {
    "e": "onboarding_completed",
    "n": 241,
    "o": 241
  }, {
    "e": "partner_portal_accessed",
    "n": 233,
    "o": 97
  }, {
    "e": "invoice_reminder_toggled",
    "n": 217,
    "o": 30
  }, {
    "e": "invoice_deleted",
    "n": 203,
    "o": 97
  }, {
    "e": "customer_updated",
    "n": 178,
    "o": 54
  }, {
    "e": "registration",
    "n": 117,
    "o": 117
  }, {
    "e": "invoice_canceled",
    "n": 97,
    "o": 46
  }, {
    "e": "service_updated",
    "n": 92,
    "o": 16
  }, {
    "e": "checkout_completed",
    "n": 90,
    "o": 81
  }, {
    "e": "invoice_unpaid",
    "n": 87,
    "o": 38
  }, {
    "e": "subscription_canceled",
    "n": 81,
    "o": 78
  }, {
    "e": "subscription_created",
    "n": 72,
    "o": 68
  }, {
    "e": "plan_changed",
    "n": 68,
    "o": 36
  }, {
    "e": "trial_will_end",
    "n": 62,
    "o": 62
  }, {
    "e": "bank_account_connected",
    "n": 61,
    "o": 30
  }, {
    "e": "bulk_invoices_updated",
    "n": 58,
    "o": 15
  }, {
    "e": "service_created",
    "n": 56,
    "o": 20
  }, {
    "e": "organization_logo_uploaded",
    "n": 50,
    "o": 24
  }, {
    "e": "invoice_sequence_updated",
    "n": 43,
    "o": 6
  }, {
    "e": "quote_updated",
    "n": 43,
    "o": 7
  }, {
    "e": "invoice_reminder_sent",
    "n": 42,
    "o": 2
  }, {
    "e": "service_deleted",
    "n": 38,
    "o": 8
  }, {
    "e": "report_drilldown_opened",
    "n": 33,
    "o": 3
  }, {
    "e": "report_graph_toggled",
    "n": 30,
    "o": 1
  }, {
    "e": "transaction_document_uploaded",
    "n": 29,
    "o": 7
  }, {
    "e": "invoice_template_settings_changed",
    "n": 26,
    "o": 19
  }, {
    "e": "organization_logo_removed",
    "n": 24,
    "o": 12
  }, {
    "e": "invoice_template_changed",
    "n": 22,
    "o": 16
  }, {
    "e": "quote_created",
    "n": 20,
    "o": 7
  }, {
    "e": "payment_action_required",
    "n": 20,
    "o": 12
  }, {
    "e": "invoice_uncanceled",
    "n": 18,
    "o": 16
  }, {
    "e": "bulk_invoices_deleted",
    "n": 17,
    "o": 16
  }, {
    "e": "recurring_invoice_created",
    "n": 17,
    "o": 5
  }, {
    "e": "report_exported",
    "n": 16,
    "o": 4
  }, {
    "e": "trial_expired",
    "n": 15,
    "o": 15
  }, {
    "e": "bank_transactions_imported",
    "n": 13,
    "o": 3
  }, {
    "e": "invoice_sequence_created",
    "n": 13,
    "o": 9
  }, {
    "e": "invoices_imported",
    "n": 12,
    "o": 7
  }, {
    "e": "bank_account_disconnected",
    "n": 11,
    "o": 3
  }, {
    "e": "accountant_integration_connected",
    "n": 11,
    "o": 9
  }, {
    "e": "accountant_invited",
    "n": 11,
    "o": 9
  }, {
    "e": "inbound_document_unmatched",
    "n": 9,
    "o": 3
  }, {
    "e": "inbound_document_matched",
    "n": 9,
    "o": 4
  }, {
    "e": "accountant_joined",
    "n": 9,
    "o": 8
  }, {
    "e": "documents_exported",
    "n": 8,
    "o": 3
  }, {
    "e": "customer_deleted",
    "n": 8,
    "o": 8
  }, {
    "e": "dashboard_viewed",
    "n": 8,
    "o": 3
  }, {
    "e": "member_joined",
    "n": 6,
    "o": 4
  }, {
    "e": "inbound_document_discarded",
    "n": 4,
    "o": 2
  }, {
    "e": "transaction_document_auto_matched",
    "n": 4,
    "o": 1
  }, {
    "e": "subscription_cancellation_portal_opened",
    "n": 3,
    "o": 3
  }, {
    "e": "transaction_document_deleted",
    "n": 3,
    "o": 3
  }, {
    "e": "subscription_cancellation_feedback_submitted",
    "n": 3,
    "o": 3
  }, {
    "e": "subscription_cancellation_confirmed",
    "n": 2,
    "o": 2
  }, {
    "e": "invoice_transaction_matched",
    "n": 2,
    "o": 1
  }, {
    "e": "report_overdue_clicked",
    "n": 1,
    "o": 1
  }, {
    "e": "invoice_transaction_unmatched",
    "n": 1,
    "o": 1
  }],
  "cells": [[0, 0, 4724, "2026-01-02", "2026-08-11"], [0, 1, 2655, "2026-01-02", "2026-08-11"], [0, 3, 570, "2026-02-26", "2026-08-10"], [0, 7, 225, "2026-01-02", "2026-02-25"], [0, 2, 128, "2026-04-21", "2026-07-30"], [0, 8, 115, "2026-02-26", "2026-08-11"], [0, 10, 50, "2026-01-02", "2026-08-07"], [0, 11, 11, "2026-01-05", "2026-08-06"], [0, 16, 10, "2026-01-05", "2026-07-23"], [0, 23, 7, "2026-01-20", "2026-04-07"], [0, 14, 5, "2026-02-05", "2026-02-26"], [0, 12, 5, "2026-01-02", "2026-03-12"], [0, 21, 4, "2026-03-02", "2026-07-15"], [0, 15, 4, "2026-06-23", "2026-07-07"], [0, 5, 3, "2026-01-02", "2026-02-25"], [0, 18, 3, "2026-01-07", "2026-01-16"], [0, 47, 2, "2026-02-04", "2026-02-04"], [0, 20, 2, "2026-03-10", "2026-06-25"], [0, 19, 1, "2026-08-10", "2026-08-10"], [0, 29, 1, "2026-08-06", "2026-08-06"], [0, 27, 1, "2026-02-26", "2026-02-26"], [0, 25, 1, "2026-03-06", "2026-03-06"], [0, 30, 1, "2026-01-02", "2026-01-02"], [0, 28, 1, "2026-03-06", "2026-03-06"], [0, 4, 1, "2026-07-07", "2026-07-07"], [0, 26, 1, "2026-07-07", "2026-07-07"], [1, 1, 760, "2026-01-05", "2026-08-05"], [1, 0, 686, "2026-01-05", "2026-08-11"], [1, 3, 613, "2026-02-27", "2026-08-07"], [1, 4, 547, "2026-01-05", "2026-08-07"], [1, 2, 139, "2026-04-21", "2026-08-11"], [1, 8, 36, "2026-03-05", "2026-08-04"], [1, 7, 32, "2026-01-05", "2026-02-23"], [1, 24, 18, "2026-05-18", "2026-05-18"], [1, 11, 9, "2026-03-07", "2026-03-20"], [1, 38, 8, "2026-05-18", "2026-05-18"], [1, 10, 8, "2026-02-14", "2026-07-30"], [1, 20, 6, "2026-01-20", "2026-06-05"], [1, 14, 6, "2026-03-07", "2026-03-20"], [1, 26, 5, "2026-02-23", "2026-06-16"], [1, 23, 4, "2026-01-23", "2026-07-30"], [1, 21, 3, "2026-04-01", "2026-04-28"], [1, 16, 2, "2026-08-03", "2026-08-04"], [1, 18, 1, "2026-03-10", "2026-03-10"], [1, 45, 1, "2026-04-28", "2026-04-28"], [1, 9, 1, "2026-06-16", "2026-06-16"], [1, 36, 1, "2026-04-28", "2026-04-28"], [2, 0, 701, "2026-01-05", "2026-08-10"], [2, 2, 275, "2026-02-27", "2026-08-11"], [2, 1, 264, "2026-01-05", "2026-08-10"], [2, 3, 254, "2026-02-27", "2026-08-10"], [2, 4, 208, "2026-01-05", "2026-08-07"], [2, 6, 187, "2026-01-13", "2026-08-05"], [2, 5, 124, "2026-01-13", "2026-08-04"], [2, 8, 72, "2026-02-26", "2026-08-10"], [2, 7, 42, "2026-01-09", "2026-02-19"], [2, 9, 39, "2026-02-28", "2026-07-22"], [2, 21, 17, "2026-03-02", "2026-08-10"], [2, 15, 17, "2026-02-27", "2026-07-22"], [2, 11, 8, "2026-01-15", "2026-07-15"], [2, 26, 4, "2026-03-09", "2026-06-22"], [2, 10, 4, "2026-04-04", "2026-08-04"], [2, 12, 4, "2026-07-22", "2026-07-22"], [2, 16, 3, "2026-01-16", "2026-07-22"], [2, 13, 1, "2026-07-22", "2026-07-22"], [3, 2, 350, "2026-03-19", "2026-08-11"], [3, 0, 304, "2026-01-08", "2026-08-06"], [3, 1, 298, "2026-01-14", "2026-08-10"], [3, 4, 213, "2026-01-07", "2026-08-11"], [3, 3, 188, "2026-02-26", "2026-08-11"], [3, 5, 185, "2026-01-05", "2026-08-10"], [3, 6, 173, "2026-01-05", "2026-08-10"], [3, 19, 109, "2026-03-19", "2026-08-10"], [3, 9, 75, "2026-02-26", "2026-08-10"], [3, 10, 34, "2026-01-19", "2026-08-10"], [3, 37, 27, "2026-04-29", "2026-08-12"], [3, 8, 25, "2026-03-11", "2026-08-10"], [3, 21, 8, "2026-02-26", "2026-08-10"], [3, 26, 8, "2026-02-11", "2026-08-04"], [3, 18, 3, "2026-03-19", "2026-06-10"], [3, 31, 2, "2026-06-10", "2026-06-10"], [3, 11, 2, "2026-03-13", "2026-03-13"], [3, 15, 2, "2026-03-19", "2026-04-04"], [3, 17, 1, "2026-06-09", "2026-06-09"], [3, 13, 1, "2026-06-09", "2026-06-09"], [3, 42, 1, "2026-06-09", "2026-06-09"], [3, 16, 1, "2026-03-09", "2026-03-09"], [3, 7, 1, "2026-02-05", "2026-02-05"], [3, 20, 1, "2026-06-29", "2026-06-29"], [4, 0, 492, "2026-01-05", "2026-08-11"], [4, 2, 405, "2026-04-15", "2026-08-11"], [4, 1, 218, "2026-01-04", "2026-08-07"], [4, 3, 206, "2026-02-27", "2026-08-11"], [4, 5, 132, "2026-01-05", "2026-08-11"], [4, 4, 97, "2026-01-19", "2026-08-11"], [4, 6, 60, "2026-01-05", "2026-08-11"], [4, 7, 45, "2026-01-05", "2026-02-24"], [4, 16, 38, "2026-05-05", "2026-08-04"], [4, 38, 16, "2026-05-02", "2026-05-02"], [4, 9, 15, "2026-03-16", "2026-06-05"], [4, 24, 13, "2026-05-04", "2026-05-04"], [4, 15, 13, "2026-04-15", "2026-08-01"], [4, 8, 12, "2026-04-11", "2026-07-24"], [4, 10, 6, "2026-03-11", "2026-07-28"], [4, 21, 5, "2026-04-28", "2026-06-26"], [4, 31, 5, "2026-04-21", "2026-05-27"], [4, 12, 3, "2026-01-06", "2026-04-30"], [4, 26, 3, "2026-02-24", "2026-05-07"], [4, 20, 3, "2026-05-04", "2026-06-10"], [4, 23, 2, "2026-02-24", "2026-06-22"], [4, 49, 1, "2026-03-20", "2026-03-20"], [4, 19, 1, "2026-03-11", "2026-03-11"], [5, 3, 579, "2026-03-06", "2026-08-11"], [5, 1, 400, "2026-03-06", "2026-08-11"], [5, 0, 313, "2026-01-09", "2026-08-11"], [5, 4, 297, "2026-01-09", "2026-08-11"], [5, 7, 65, "2026-01-09", "2026-02-09"], [5, 8, 52, "2026-03-06", "2026-08-10"], [5, 2, 27, "2026-05-08", "2026-07-13"], [5, 21, 8, "2026-04-06", "2026-07-28"], [5, 20, 4, "2026-05-11", "2026-07-06"], [5, 26, 3, "2026-01-09", "2026-06-06"], [5, 23, 2, "2026-01-09", "2026-01-09"], [5, 16, 2, "2026-06-28", "2026-06-28"], [5, 15, 1, "2026-06-28", "2026-06-28"], [5, 48, 1, "2026-07-06", "2026-07-06"], [6, 3, 467, "2026-03-07", "2026-06-08"], [6, 0, 450, "2026-01-02", "2026-06-08"], [6, 1, 296, "2026-02-02", "2026-05-30"], [6, 4, 153, "2026-04-04", "2026-05-09"], [6, 9, 44, "2026-03-09", "2026-04-09"], [6, 6, 42, "2026-01-03", "2026-04-09"], [6, 5, 42, "2026-01-02", "2026-04-09"], [6, 7, 40, "2026-01-02", "2026-02-04"], [6, 2, 28, "2026-05-04", "2026-07-01"], [6, 11, 11, "2026-01-13", "2026-08-04"], [6, 20, 7, "2026-02-02", "2026-05-13"], [6, 14, 7, "2026-01-26", "2026-03-19"], [6, 16, 5, "2026-01-08", "2026-04-04"], [6, 12, 5, "2026-04-04", "2026-05-06"], [6, 32, 3, "2026-04-04", "2026-05-09"], [6, 8, 1, "2026-05-06", "2026-05-06"], [6, 25, 1, "2026-04-04", "2026-04-04"], [6, 27, 1, "2026-03-19", "2026-03-19"], [6, 29, 1, "2026-08-04", "2026-08-04"], [6, 28, 1, "2026-04-04", "2026-04-04"], [7, 0, 325, "2026-01-05", "2026-08-11"], [7, 1, 278, "2026-01-05", "2026-08-11"], [7, 2, 198, "2026-04-24", "2026-08-10"], [7, 4, 189, "2026-01-05", "2026-08-08"], [7, 3, 177, "2026-02-26", "2026-08-08"], [7, 6, 89, "2026-01-05", "2026-07-02"], [7, 5, 88, "2026-01-05", "2026-08-10"], [7, 8, 50, "2026-03-02", "2026-08-10"], [7, 9, 22, "2026-02-26", "2026-06-24"], [7, 21, 14, "2026-02-26", "2026-07-17"], [7, 15, 5, "2026-06-03", "2026-07-10"], [7, 26, 4, "2026-02-16", "2026-06-05"], [7, 7, 4, "2026-01-14", "2026-01-29"], [7, 11, 4, "2026-06-17", "2026-06-18"], [7, 24, 4, "2026-05-27", "2026-05-27"], [7, 23, 3, "2026-04-07", "2026-07-06"], [7, 19, 2, "2026-06-24", "2026-06-24"], [7, 14, 2, "2026-06-17", "2026-06-18"], [7, 47, 2, "2026-04-07", "2026-07-06"], [7, 46, 1, "2026-06-18", "2026-06-18"], [7, 20, 1, "2026-07-01", "2026-07-01"], [8, 0, 534, "2026-01-06", "2026-08-11"], [8, 1, 271, "2026-01-06", "2026-08-10"], [8, 3, 197, "2026-02-26", "2026-08-11"], [8, 4, 195, "2026-01-21", "2026-08-11"], [8, 2, 102, "2026-04-02", "2026-08-11"], [8, 16, 36, "2026-01-07", "2026-04-16"], [8, 7, 22, "2026-01-06", "2026-02-25"], [8, 11, 6, "2026-04-06", "2026-04-06"], [8, 18, 4, "2026-02-20", "2026-04-28"], [8, 26, 3, "2026-01-21", "2026-06-19"], [8, 15, 2, "2026-04-02", "2026-05-27"], [8, 33, 2, "2026-04-29", "2026-06-03"], [8, 8, 2, "2026-05-25", "2026-07-20"], [8, 27, 1, "2026-04-06", "2026-04-06"], [8, 14, 1, "2026-04-06", "2026-04-06"], [8, 20, 1, "2026-04-18", "2026-04-18"], [8, 23, 1, "2026-04-02", "2026-04-02"], [9, 1, 196, "2026-01-14", "2026-08-10"], [9, 2, 185, "2026-04-21", "2026-08-10"], [9, 0, 176, "2026-01-11", "2026-08-06"], [9, 4, 134, "2026-01-11", "2026-07-29"], [9, 5, 134, "2026-01-11", "2026-08-10"], [9, 6, 130, "2026-01-05", "2026-07-31"], [9, 3, 129, "2026-03-02", "2026-07-29"], [9, 9, 45, "2026-03-02", "2026-07-31"], [9, 8, 31, "2026-03-12", "2026-08-10"], [9, 10, 22, "2026-02-23", "2026-07-28"], [9, 16, 11, "2026-02-27", "2026-07-11"], [9, 21, 4, "2026-03-14", "2026-07-11"], [9, 7, 3, "2026-02-25", "2026-02-25"], [9, 23, 3, "2026-03-18", "2026-04-09"], [9, 31, 2, "2026-05-04", "2026-05-05"], [9, 11, 2, "2026-07-21", "2026-07-21"], [9, 20, 1, "2026-05-04", "2026-05-04"], [9, 47, 1, "2026-04-09", "2026-04-09"], [9, 26, 1, "2026-03-17", "2026-03-17"], [10, 0, 383, "2026-01-06", "2026-08-11"], [10, 1, 175, "2026-01-08", "2026-08-11"], [10, 2, 115, "2026-04-20", "2026-08-11"], [10, 3, 111, "2026-02-28", "2026-08-11"], [10, 4, 101, "2026-01-08", "2026-07-08"], [10, 8, 34, "2026-02-28", "2026-08-11"], [10, 10, 11, "2026-04-01", "2026-07-24"], [10, 12, 9, "2026-02-13", "2026-02-13"], [10, 26, 4, "2026-04-09", "2026-04-27"], [10, 23, 3, "2026-04-20", "2026-08-11"], [10, 7, 3, "2026-01-08", "2026-01-14"], [10, 20, 2, "2026-04-20", "2026-08-11"], [10, 21, 2, "2026-02-28", "2026-03-10"], [10, 47, 1, "2026-05-13", "2026-05-13"], [11, 2, 279, "2026-03-23", "2026-08-11"], [11, 0, 152, "2026-02-26", "2026-08-10"], [11, 1, 146, "2026-02-12", "2026-08-10"], [11, 3, 113, "2026-02-26", "2026-08-10"], [11, 4, 83, "2026-02-23", "2026-08-10"], [11, 9, 71, "2026-03-18", "2026-07-24"], [11, 8, 37, "2026-02-26", "2026-08-04"], [11, 11, 10, "2026-01-09", "2026-06-25"], [11, 23, 9, "2026-03-17", "2026-08-04"], [11, 12, 6, "2026-04-20", "2026-07-11"], [11, 10, 5, "2026-04-17", "2026-06-24"], [11, 15, 5, "2026-03-23", "2026-08-07"], [11, 14, 5, "2026-01-09", "2026-01-30"], [11, 26, 4, "2026-02-23", "2026-05-04"], [11, 18, 3, "2026-03-23", "2026-07-11"], [11, 31, 2, "2026-05-30", "2026-05-30"], [11, 16, 2, "2026-07-02", "2026-07-02"], [11, 13, 2, "2026-04-20", "2026-07-11"], [11, 28, 1, "2026-03-25", "2026-03-25"], [11, 25, 1, "2026-03-25", "2026-03-25"], [11, 21, 1, "2026-07-13", "2026-07-13"], [11, 27, 1, "2026-01-30", "2026-01-30"], [11, 43, 1, "2026-07-11", "2026-07-11"], [11, 34, 1, "2026-07-11", "2026-07-11"], [11, 17, 1, "2026-04-20", "2026-04-20"], [12, 1, 327, "2026-01-09", "2026-08-06"], [12, 0, 285, "2026-01-09", "2026-08-10"], [12, 3, 203, "2026-02-26", "2026-08-06"], [12, 2, 38, "2026-04-29", "2026-08-10"], [12, 7, 21, "2026-01-09", "2026-02-25"], [12, 8, 7, "2026-04-06", "2026-07-23"], [12, 20, 5, "2026-03-13", "2026-06-29"], [12, 12, 1, "2026-02-07", "2026-02-07"], [12, 52, 1, "2026-02-27", "2026-02-27"], [12, 31, 1, "2026-02-27", "2026-02-27"], [13, 3, 150, "2026-02-27", "2026-08-10"], [13, 1, 138, "2026-01-07", "2026-08-10"], [13, 0, 82, "2026-01-07", "2026-08-10"], [13, 2, 60, "2026-03-05", "2026-08-10"], [13, 7, 54, "2026-01-07", "2026-02-18"], [13, 5, 32, "2026-01-07", "2026-06-05"], [13, 21, 22, "2026-03-05", "2026-08-04"], [13, 10, 19, "2026-01-07", "2026-06-08"], [13, 11, 16, "2026-01-15", "2026-08-10"], [13, 9, 15, "2026-04-06", "2026-04-15"], [13, 4, 13, "2026-02-06", "2026-05-04"], [13, 6, 13, "2026-01-07", "2026-03-05"], [13, 14, 11, "2026-02-05", "2026-08-10"], [13, 18, 6, "2026-01-07", "2026-08-10"], [13, 16, 5, "2026-02-18", "2026-08-04"], [13, 20, 5, "2026-01-07", "2026-04-06"], [13, 25, 4, "2026-01-07", "2026-08-10"], [13, 8, 4, "2026-03-05", "2026-08-04"], [13, 28, 3, "2026-01-07", "2026-04-06"], [13, 27, 3, "2026-01-21", "2026-08-06"], [13, 54, 3, "2026-01-07", "2026-07-14"], [13, 15, 2, "2026-03-05", "2026-08-04"], [13, 13, 2, "2026-04-06", "2026-06-11"], [13, 12, 2, "2026-01-07", "2026-01-07"], [13, 30, 1, "2026-01-18", "2026-01-18"], [13, 62, 1, "2026-08-04", "2026-08-04"], [13, 29, 1, "2026-08-10", "2026-08-10"], [13, 46, 1, "2026-08-10", "2026-08-10"], [13, 44, 1, "2026-04-06", "2026-04-06"], [13, 31, 1, "2026-05-12", "2026-05-12"], [13, 42, 1, "2026-04-06", "2026-04-06"], [14, 0, 312, "2026-01-01", "2026-07-10"], [14, 6, 97, "2026-01-06", "2026-05-21"], [14, 5, 69, "2026-01-08", "2026-03-30"], [14, 1, 31, "2026-01-09", "2026-03-30"], [14, 2, 27, "2026-04-22", "2026-07-10"], [14, 7, 23, "2026-01-12", "2026-02-20"], [14, 4, 20, "2026-01-27", "2026-04-14"], [14, 3, 20, "2026-03-02", "2026-04-14"], [14, 16, 18, "2026-01-01", "2026-05-07"], [14, 9, 15, "2026-03-04", "2026-05-21"], [14, 10, 12, "2026-01-26", "2026-02-11"], [14, 11, 8, "2026-01-01", "2026-05-05"], [14, 23, 2, "2026-01-03", "2026-01-09"], [14, 19, 2, "2026-03-30", "2026-03-30"], [14, 20, 1, "2026-02-17", "2026-02-17"], [14, 8, 1, "2026-03-05", "2026-03-05"], [14, 27, 1, "2026-06-01", "2026-06-01"], [15, 6, 111, "2026-02-08", "2026-08-11"], [15, 1, 97, "2026-02-25", "2026-08-10"], [15, 0, 90, "2026-02-26", "2026-08-04"], [15, 2, 67, "2026-02-27", "2026-08-10"], [15, 5, 62, "2026-02-08", "2026-08-10"], [15, 3, 58, "2026-02-26", "2026-08-10"], [15, 9, 51, "2026-02-26", "2026-08-11"], [15, 4, 43, "2026-05-02", "2026-08-10"], [15, 8, 28, "2026-02-25", "2026-08-10"], [15, 10, 9, "2026-05-05", "2026-08-07"], [15, 21, 7, "2026-03-30", "2026-08-10"], [15, 11, 6, "2026-03-12", "2026-07-26"], [15, 13, 3, "2026-03-12", "2026-04-07"], [15, 44, 2, "2026-03-12", "2026-03-31"], [15, 23, 2, "2026-02-26", "2026-05-12"], [15, 25, 1, "2026-03-12", "2026-03-12"], [15, 28, 1, "2026-03-12", "2026-03-12"], [15, 20, 1, "2026-05-13", "2026-05-13"], [15, 15, 1, "2026-02-27", "2026-02-27"], [15, 34, 1, "2026-03-12", "2026-03-12"], [15, 30, 1, "2026-03-23", "2026-03-23"], [16, 0, 137, "2026-01-05", "2026-08-10"], [16, 1, 113, "2026-01-29", "2026-08-10"], [16, 5, 109, "2026-01-29", "2026-08-10"], [16, 6, 105, "2026-01-02", "2026-08-11"], [16, 9, 40, "2026-02-25", "2026-08-11"], [16, 4, 37, "2026-02-16", "2026-04-27"], [16, 10, 33, "2026-01-29", "2026-06-16"], [16, 2, 23, "2026-04-27", "2026-08-10"], [16, 3, 14, "2026-03-31", "2026-08-10"], [16, 19, 10, "2026-05-12", "2026-05-12"], [16, 21, 7, "2026-03-31", "2026-05-12"], [16, 20, 3, "2026-04-27", "2026-07-08"], [16, 11, 2, "2026-04-10", "2026-04-10"], [16, 8, 1, "2026-03-31", "2026-03-31"], [16, 23, 1, "2026-04-27", "2026-04-27"], [16, 48, 1, "2026-02-25", "2026-02-25"], [16, 26, 1, "2026-03-31", "2026-03-31"], [16, 15, 1, "2026-07-08", "2026-07-08"], [17, 0, 178, "2026-01-03", "2026-08-06"], [17, 3, 114, "2026-03-04", "2026-08-06"], [17, 1, 85, "2026-01-03", "2026-08-06"], [17, 4, 61, "2026-02-04", "2026-08-06"], [17, 7, 42, "2026-01-03", "2026-02-10"], [17, 2, 40, "2026-03-04", "2026-08-10"], [17, 39, 23, "2026-03-04", "2026-03-04"], [17, 16, 12, "2026-03-04", "2026-08-11"], [17, 11, 9, "2026-02-14", "2026-08-06"], [17, 15, 6, "2026-03-04", "2026-05-02"], [17, 14, 5, "2026-02-14", "2026-03-07"], [17, 26, 5, "2026-02-04", "2026-06-03"], [17, 8, 3, "2026-05-02", "2026-07-01"], [17, 9, 3, "2026-08-04", "2026-08-04"], [17, 10, 2, "2026-08-04", "2026-08-05"], [17, 50, 2, "2026-04-07", "2026-04-07"], [17, 25, 2, "2026-04-04", "2026-05-15"], [17, 28, 2, "2026-04-04", "2026-05-15"], [17, 27, 1, "2026-03-07", "2026-03-07"], [17, 42, 1, "2026-04-04", "2026-04-04"], [17, 29, 1, "2026-08-06", "2026-08-06"], [17, 21, 1, "2026-04-14", "2026-04-14"], [17, 12, 1, "2026-08-04", "2026-08-04"], [17, 44, 1, "2026-04-04", "2026-04-04"], [17, 17, 1, "2026-04-04", "2026-04-04"], [17, 13, 1, "2026-04-04", "2026-04-04"], [18, 0, 175, "2026-01-14", "2026-06-24"], [18, 1, 112, "2026-01-14", "2026-06-24"], [18, 4, 68, "2026-01-15", "2026-06-24"], [18, 3, 67, "2026-02-26", "2026-06-24"], [18, 2, 62, "2026-04-22", "2026-07-16"], [18, 8, 26, "2026-02-26", "2026-06-18"], [18, 7, 10, "2026-01-14", "2026-02-24"], [18, 14, 5, "2026-06-23", "2026-07-14"], [18, 11, 3, "2026-06-22", "2026-06-23"], [18, 20, 2, "2026-03-06", "2026-05-11"], [18, 27, 1, "2026-07-14", "2026-07-14"], [18, 23, 1, "2026-02-24", "2026-02-24"], [18, 47, 1, "2026-03-04", "2026-03-04"], [19, 2, 144, "2026-02-27", "2026-07-30"], [19, 1, 71, "2026-01-30", "2026-07-16"], [19, 15, 34, "2026-02-27", "2026-07-23"], [19, 40, 30, "2026-02-27", "2026-02-27"], [19, 19, 27, "2026-02-27", "2026-07-16"], [19, 5, 24, "2026-01-30", "2026-06-15"], [19, 37, 15, "2026-06-26", "2026-07-16"], [19, 36, 15, "2026-05-28", "2026-07-16"], [19, 3, 14, "2026-02-25", "2026-06-12"], [19, 0, 14, "2026-01-30", "2026-07-16"], [19, 7, 14, "2026-01-06", "2026-02-10"], [19, 16, 11, "2026-01-06", "2026-05-14"], [19, 4, 11, "2026-01-30", "2026-06-15"], [19, 50, 10, "2026-02-27", "2026-02-27"], [19, 13, 10, "2026-02-25", "2026-07-16"], [19, 45, 9, "2026-05-28", "2026-07-16"], [19, 32, 7, "2026-02-11", "2026-06-15"], [19, 18, 6, "2026-01-23", "2026-07-23"], [19, 58, 6, "2026-04-15", "2026-04-15"], [19, 23, 5, "2026-01-30", "2026-06-12"], [19, 42, 5, "2026-03-31", "2026-06-03"], [19, 39, 5, "2026-02-27", "2026-02-27"], [19, 10, 4, "2026-01-30", "2026-03-31"], [19, 59, 4, "2026-04-15", "2026-04-15"], [19, 44, 4, "2026-02-25", "2026-07-16"], [19, 57, 3, "2026-02-25", "2026-03-24"], [19, 6, 3, "2026-01-30", "2026-05-05"], [19, 34, 2, "2026-02-25", "2026-02-25"], [19, 60, 2, "2026-02-25", "2026-03-24"], [19, 53, 2, "2026-03-31", "2026-03-31"], [19, 31, 2, "2026-04-15", "2026-04-15"], [19, 41, 2, "2026-04-15", "2026-04-15"], [19, 48, 1, "2026-02-11", "2026-02-11"], [19, 54, 1, "2026-01-07", "2026-01-07"], [19, 21, 1, "2026-05-05", "2026-05-05"], [19, 8, 1, "2026-02-27", "2026-02-27"], [19, 62, 1, "2026-02-27", "2026-02-27"], [19, 38, 1, "2026-02-27", "2026-02-27"], [19, 24, 1, "2026-05-05", "2026-05-05"], [19, 35, 1, "2026-03-31", "2026-03-31"], [19, 43, 1, "2026-02-25", "2026-02-25"], [19, 47, 1, "2026-06-12", "2026-06-12"], [19, 33, 1, "2026-02-27", "2026-02-27"], [20, 0, 180, "2026-01-05", "2026-08-03"], [20, 1, 143, "2026-01-05", "2026-08-03"], [20, 3, 49, "2026-03-12", "2026-08-03"], [20, 2, 48, "2026-04-29", "2026-08-03"], [20, 8, 24, "2026-02-26", "2026-07-07"], [20, 7, 10, "2026-01-13", "2026-02-24"], [20, 23, 5, "2026-03-12", "2026-06-12"], [20, 5, 5, "2026-01-05", "2026-02-24"], [20, 6, 5, "2026-01-12", "2026-01-12"], [20, 11, 3, "2026-01-19", "2026-02-07"], [20, 21, 3, "2026-02-26", "2026-07-23"], [20, 14, 3, "2026-01-19", "2026-02-01"], [20, 20, 2, "2026-02-24", "2026-05-05"], [20, 12, 1, "2026-07-28", "2026-07-28"], [20, 4, 1, "2026-07-29", "2026-07-29"], [20, 28, 1, "2026-01-05", "2026-01-05"], [20, 47, 1, "2026-03-12", "2026-03-12"], [20, 30, 1, "2026-01-16", "2026-01-16"], [20, 25, 1, "2026-01-05", "2026-01-05"], [20, 17, 1, "2026-01-05", "2026-01-05"], [20, 10, 1, "2026-07-17", "2026-07-17"], [20, 22, 1, "2026-01-05", "2026-01-05"], [20, 16, 1, "2026-05-13", "2026-05-13"], [21, 3, 109, "2026-03-13", "2026-08-06"], [21, 0, 66, "2026-03-09", "2026-08-03"], [21, 2, 56, "2026-03-31", "2026-08-06"], [21, 1, 51, "2026-03-09", "2026-08-06"], [21, 5, 37, "2026-03-09", "2026-07-22"], [21, 4, 30, "2026-03-15", "2026-07-27"], [21, 41, 16, "2026-06-22", "2026-08-05"], [21, 10, 15, "2026-03-13", "2026-07-09"], [21, 19, 12, "2026-03-09", "2026-07-08"], [21, 11, 11, "2026-03-15", "2026-07-11"], [21, 49, 11, "2026-07-08", "2026-08-06"], [21, 6, 10, "2026-03-16", "2026-07-23"], [21, 8, 9, "2026-03-13", "2026-04-14"], [21, 21, 8, "2026-03-15", "2026-05-11"], [21, 14, 6, "2026-04-29", "2026-07-07"], [21, 18, 4, "2026-03-31", "2026-06-22"], [21, 15, 4, "2026-03-31", "2026-08-05"], [21, 13, 2, "2026-03-13", "2026-03-31"], [21, 9, 2, "2026-07-09", "2026-07-09"], [21, 34, 2, "2026-03-16", "2026-03-16"], [21, 23, 2, "2026-04-24", "2026-07-27"], [21, 43, 1, "2026-03-16", "2026-03-16"], [21, 31, 1, "2026-05-27", "2026-05-27"], [21, 25, 1, "2026-03-15", "2026-03-15"], [21, 16, 1, "2026-05-07", "2026-05-07"], [21, 60, 1, "2026-05-27", "2026-05-27"], [21, 61, 1, "2026-07-03", "2026-07-03"], [21, 68, 1, "2026-08-05", "2026-08-05"], [21, 57, 1, "2026-05-27", "2026-05-27"], [21, 30, 1, "2026-03-26", "2026-03-26"], [21, 28, 1, "2026-03-15", "2026-03-15"], [21, 47, 1, "2026-07-27", "2026-07-27"], [21, 12, 1, "2026-07-27", "2026-07-27"], [21, 26, 1, "2026-03-15", "2026-03-15"], [22, 2, 239, "2026-03-10", "2026-08-10"], [22, 3, 45, "2026-03-04", "2026-08-10"], [22, 0, 40, "2026-02-06", "2026-08-10"], [22, 1, 30, "2026-02-06", "2026-08-10"], [22, 18, 22, "2026-01-15", "2026-08-02"], [22, 15, 19, "2026-03-10", "2026-06-26"], [22, 4, 18, "2026-02-06", "2026-08-10"], [22, 7, 15, "2026-02-06", "2026-02-12"], [22, 5, 9, "2026-02-06", "2026-07-31"], [22, 6, 5, "2026-02-06", "2026-05-04"], [22, 9, 4, "2026-05-04", "2026-07-31"], [22, 12, 4, "2026-01-19", "2026-07-28"], [22, 10, 4, "2026-02-06", "2026-07-14"], [22, 59, 3, "2026-04-23", "2026-04-24"], [22, 20, 3, "2026-02-12", "2026-07-27"], [22, 31, 3, "2026-03-23", "2026-04-24"], [22, 8, 3, "2026-05-04", "2026-07-08"], [22, 52, 2, "2026-03-23", "2026-03-23"], [22, 65, 2, "2026-04-23", "2026-04-23"], [22, 23, 2, "2026-06-11", "2026-07-01"], [22, 47, 1, "2026-07-04", "2026-07-04"], [22, 17, 1, "2026-02-06", "2026-02-06"], [22, 62, 1, "2026-03-26", "2026-03-26"], [22, 57, 1, "2026-03-03", "2026-03-03"], [23, 2, 138, "2026-05-28", "2026-08-10"], [23, 1, 79, "2026-03-04", "2026-07-13"], [23, 3, 60, "2026-05-28", "2026-07-24"], [23, 6, 37, "2026-05-29", "2026-08-05"], [23, 5, 30, "2026-05-29", "2026-07-20"], [23, 12, 21, "2026-03-18", "2026-06-29"], [23, 4, 19, "2026-05-28", "2026-07-24"], [23, 11, 13, "2026-03-02", "2026-07-28"], [23, 0, 13, "2026-05-28", "2026-08-03"], [23, 10, 8, "2026-05-28", "2026-08-03"], [23, 13, 6, "2026-03-02", "2026-05-28"], [23, 8, 5, "2026-03-02", "2026-06-03"], [23, 14, 5, "2026-06-28", "2026-08-07"], [23, 18, 3, "2026-05-28", "2026-07-01"], [23, 20, 3, "2026-03-09", "2026-06-04"], [23, 34, 2, "2026-03-02", "2026-03-16"], [23, 42, 2, "2026-05-28", "2026-05-28"], [23, 9, 2, "2026-06-01", "2026-06-01"], [23, 28, 2, "2026-03-02", "2026-05-28"], [23, 25, 2, "2026-03-02", "2026-05-28"], [23, 16, 2, "2026-06-10", "2026-07-13"], [23, 44, 1, "2026-03-02", "2026-03-02"], [23, 15, 1, "2026-05-28", "2026-05-28"], [23, 27, 1, "2026-04-16", "2026-04-16"], [23, 46, 1, "2026-06-30", "2026-06-30"], [23, 30, 1, "2026-03-13", "2026-03-13"], [23, 31, 1, "2026-05-28", "2026-05-28"], [23, 17, 1, "2026-03-02", "2026-03-02"], [23, 43, 1, "2026-03-16", "2026-03-16"], [23, 21, 1, "2026-07-01", "2026-07-01"], [23, 22, 1, "2026-03-02", "2026-03-02"], [23, 26, 1, "2026-06-01", "2026-06-01"], [24, 0, 145, "2026-01-02", "2026-08-11"], [24, 1, 113, "2026-02-26", "2026-08-11"], [24, 5, 111, "2026-01-02", "2026-08-11"], [24, 2, 38, "2026-04-22", "2026-07-27"], [24, 11, 12, "2026-01-01", "2026-08-01"], [24, 20, 7, "2026-01-29", "2026-07-23"], [24, 29, 3, "2026-08-01", "2026-08-01"], [24, 10, 2, "2026-02-16", "2026-03-11"], [24, 8, 2, "2026-06-21", "2026-07-13"], [25, 0, 154, "2026-01-05", "2026-07-30"], [25, 1, 54, "2026-01-06", "2026-07-29"], [25, 2, 51, "2026-03-31", "2026-07-30"], [25, 4, 42, "2026-01-05", "2026-07-29"], [25, 3, 34, "2026-03-31", "2026-07-29"], [25, 14, 8, "2026-02-04", "2026-03-31"], [25, 8, 7, "2026-03-31", "2026-07-06"], [25, 11, 6, "2026-01-04", "2026-04-01"], [25, 18, 6, "2026-01-05", "2026-06-18"], [25, 7, 5, "2026-01-22", "2026-02-16"], [25, 16, 3, "2026-04-06", "2026-05-20"], [25, 31, 2, "2026-06-18", "2026-06-18"], [25, 15, 2, "2026-03-31", "2026-06-18"], [25, 27, 1, "2026-02-25", "2026-02-25"], [25, 20, 1, "2026-04-06", "2026-04-06"], [25, 13, 1, "2026-03-31", "2026-03-31"], [26, 2, 109, "2026-04-22", "2026-08-05"], [26, 0, 54, "2026-01-05", "2026-07-05"], [26, 4, 40, "2026-01-04", "2026-08-05"], [26, 1, 37, "2026-03-04", "2026-07-28"], [26, 5, 35, "2026-01-05", "2026-07-28"], [26, 3, 28, "2026-02-27", "2026-08-05"], [26, 10, 20, "2026-01-05", "2026-07-28"], [26, 9, 11, "2026-03-04", "2026-07-28"], [26, 6, 9, "2026-02-08", "2026-06-08"], [26, 11, 9, "2026-01-11", "2026-08-11"], [26, 26, 1, "2026-01-07", "2026-01-07"], [27, 0, 85, "2026-01-06", "2026-08-04"], [27, 1, 81, "2026-01-06", "2026-08-04"], [27, 3, 53, "2026-03-02", "2026-08-04"], [27, 2, 47, "2026-04-29", "2026-08-06"], [27, 4, 17, "2026-01-06", "2026-05-22"], [27, 6, 11, "2026-01-06", "2026-03-10"], [27, 7, 11, "2026-01-06", "2026-02-18"], [27, 5, 11, "2026-01-06", "2026-03-10"], [27, 16, 8, "2026-03-10", "2026-08-06"], [27, 10, 4, "2026-01-08", "2026-06-09"], [27, 20, 3, "2026-01-08", "2026-03-13"], [27, 33, 3, "2026-03-10", "2026-04-22"], [27, 8, 3, "2026-02-26", "2026-04-29"], [27, 11, 2, "2026-03-07", "2026-03-07"], [27, 9, 2, "2026-03-10", "2026-03-11"], [27, 44, 1, "2026-04-29", "2026-04-29"], [27, 42, 1, "2026-04-29", "2026-04-29"], [27, 18, 1, "2026-01-08", "2026-01-08"], [27, 21, 1, "2026-04-29", "2026-04-29"], [27, 13, 1, "2026-04-29", "2026-04-29"], [28, 3, 67, "2026-03-10", "2026-07-10"], [28, 0, 60, "2026-01-15", "2026-07-30"], [28, 1, 56, "2026-01-15", "2026-07-30"], [28, 2, 50, "2026-04-22", "2026-08-05"], [28, 4, 25, "2026-02-03", "2026-07-10"], [28, 7, 21, "2026-01-15", "2026-02-10"], [28, 16, 10, "2026-06-05", "2026-08-04"], [28, 5, 8, "2026-02-25", "2026-07-27"], [28, 6, 8, "2026-03-13", "2026-07-11"], [28, 12, 7, "2026-02-03", "2026-02-13"], [28, 10, 5, "2026-01-15", "2026-05-14"], [28, 20, 5, "2026-02-03", "2026-07-10"], [28, 8, 4, "2026-04-30", "2026-07-03"], [28, 49, 3, "2026-02-04", "2026-07-10"], [28, 18, 2, "2026-01-15", "2026-02-04"], [28, 56, 2, "2026-01-13", "2026-02-04"], [28, 11, 2, "2026-02-03", "2026-02-17"], [28, 31, 1, "2026-06-22", "2026-06-22"], [28, 22, 1, "2026-01-15", "2026-01-15"], [28, 17, 1, "2026-01-15", "2026-01-15"], [28, 28, 1, "2026-02-03", "2026-02-03"], [28, 23, 1, "2026-04-03", "2026-04-03"], [28, 25, 1, "2026-02-03", "2026-02-03"], [28, 26, 1, "2026-02-03", "2026-02-03"], [28, 30, 1, "2026-02-14", "2026-02-14"], [28, 9, 1, "2026-07-10", "2026-07-10"], [29, 0, 123, "2026-01-05", "2026-08-03"], [29, 1, 62, "2026-01-05", "2026-08-03"], [29, 3, 46, "2026-03-02", "2026-07-06"], [29, 2, 38, "2026-04-21", "2026-08-03"], [29, 7, 26, "2026-01-05", "2026-02-23"], [29, 10, 23, "2026-01-05", "2026-08-03"], [29, 11, 11, "2026-01-16", "2026-07-16"], [29, 16, 2, "2026-01-09", "2026-01-09"], [29, 14, 1, "2026-03-16", "2026-03-16"], [29, 18, 1, "2026-01-09", "2026-01-09"], [30, 2, 47, "2026-05-11", "2026-08-11"], [30, 1, 42, "2026-02-26", "2026-08-10"], [30, 6, 33, "2026-01-09", "2026-08-11"], [30, 3, 32, "2026-02-26", "2026-08-10"], [30, 5, 32, "2026-01-09", "2026-08-10"], [30, 4, 32, "2026-01-09", "2026-08-10"], [30, 0, 28, "2026-01-09", "2026-08-10"], [30, 9, 20, "2026-02-26", "2026-08-11"], [30, 10, 15, "2026-01-09", "2026-08-10"], [30, 20, 10, "2026-01-05", "2026-08-10"], [30, 11, 8, "2026-01-07", "2026-06-23"], [30, 14, 5, "2026-02-07", "2026-02-28"], [30, 8, 2, "2026-05-11", "2026-05-21"], [30, 13, 2, "2026-06-23", "2026-06-23"], [30, 12, 1, "2026-03-10", "2026-03-10"], [30, 28, 1, "2026-03-10", "2026-03-10"], [30, 18, 1, "2026-03-10", "2026-03-10"], [30, 25, 1, "2026-03-10", "2026-03-10"], [30, 27, 1, "2026-02-28", "2026-02-28"], [30, 7, 1, "2026-02-10", "2026-02-10"], [31, 0, 77, "2026-01-12", "2026-08-05"], [31, 3, 66, "2026-03-01", "2026-08-05"], [31, 1, 65, "2026-01-12", "2026-08-05"], [31, 4, 38, "2026-01-12", "2026-08-05"], [31, 7, 19, "2026-01-12", "2026-02-11"], [31, 2, 10, "2026-05-10", "2026-08-05"], [31, 11, 6, "2026-01-26", "2026-07-26"], [31, 9, 6, "2026-05-10", "2026-05-10"], [31, 16, 3, "2026-01-12", "2026-05-10"], [31, 18, 3, "2026-01-12", "2026-01-23"], [31, 13, 3, "2026-03-01", "2026-05-10"], [31, 26, 2, "2026-01-12", "2026-03-01"], [31, 10, 2, "2026-01-12", "2026-03-01"], [31, 20, 2, "2026-01-12", "2026-03-01"], [31, 21, 2, "2026-03-01", "2026-03-01"], [31, 17, 1, "2026-01-12", "2026-01-12"], [31, 25, 1, "2026-01-12", "2026-01-12"], [31, 30, 1, "2026-01-23", "2026-01-23"], [31, 15, 1, "2026-05-10", "2026-05-10"], [31, 5, 1, "2026-01-12", "2026-01-12"], [31, 28, 1, "2026-01-12", "2026-01-12"], [31, 22, 1, "2026-01-12", "2026-01-12"], [31, 34, 1, "2026-05-10", "2026-05-10"], [31, 42, 1, "2026-05-10", "2026-05-10"], [32, 2, 101, "2026-04-30", "2026-08-11"], [32, 3, 57, "2026-03-05", "2026-08-06"], [32, 4, 42, "2026-06-15", "2026-08-06"], [32, 1, 32, "2026-01-10", "2026-08-07"], [32, 0, 29, "2026-01-08", "2026-08-07"], [32, 12, 13, "2026-06-15", "2026-08-03"], [32, 15, 8, "2026-06-15", "2026-06-15"], [32, 26, 6, "2026-06-15", "2026-06-28"], [32, 18, 4, "2026-06-15", "2026-06-15"], [32, 8, 3, "2026-06-28", "2026-08-04"], [32, 29, 3, "2026-08-03", "2026-08-03"], [32, 11, 3, "2026-06-22", "2026-08-03"], [32, 25, 2, "2026-06-15", "2026-08-03"], [32, 21, 2, "2026-06-28", "2026-08-03"], [32, 7, 2, "2026-01-08", "2026-01-08"], [32, 28, 1, "2026-06-15", "2026-06-15"], [32, 27, 1, "2026-06-29", "2026-06-29"], [32, 30, 1, "2026-06-26", "2026-06-26"], [33, 0, 114, "2026-01-05", "2026-08-04"], [33, 1, 45, "2026-01-15", "2026-07-12"], [33, 3, 43, "2026-02-25", "2026-08-04"], [33, 4, 35, "2026-01-08", "2026-08-04"], [33, 2, 33, "2026-05-08", "2026-08-04"], [33, 10, 10, "2026-01-22", "2026-07-22"], [33, 11, 7, "2026-01-26", "2026-06-20"], [33, 14, 7, "2026-04-27", "2026-06-19"], [33, 7, 4, "2026-01-26", "2026-02-11"], [33, 47, 1, "2026-03-28", "2026-03-28"], [33, 5, 1, "2026-06-03", "2026-06-03"], [33, 8, 1, "2026-07-02", "2026-07-02"], [33, 23, 1, "2026-03-28", "2026-03-28"], [33, 27, 1, "2026-05-18", "2026-05-18"], [33, 46, 1, "2026-06-12", "2026-06-12"], [34, 3, 85, "2026-03-02", "2026-08-07"], [34, 1, 68, "2026-02-06", "2026-08-07"], [34, 0, 59, "2026-01-30", "2026-08-07"], [34, 4, 38, "2026-02-17", "2026-08-07"], [34, 2, 17, "2026-05-01", "2026-08-07"], [34, 7, 13, "2026-01-30", "2026-02-18"], [34, 20, 5, "2026-02-18", "2026-07-13"], [34, 8, 4, "2026-04-02", "2026-07-13"], [34, 19, 2, "2026-04-02", "2026-04-02"], [34, 26, 2, "2026-02-17", "2026-08-07"], [34, 21, 2, "2026-07-20", "2026-07-20"], [34, 48, 1, "2026-03-23", "2026-03-23"], [34, 13, 1, "2026-08-07", "2026-08-07"], [34, 10, 1, "2026-02-18", "2026-02-18"], [34, 34, 1, "2026-05-13", "2026-05-13"], [34, 5, 1, "2026-02-18", "2026-02-18"], [35, 0, 174, "2026-01-09", "2026-08-03"], [35, 1, 36, "2026-01-09", "2026-08-03"], [35, 2, 34, "2026-04-21", "2026-08-10"], [35, 10, 20, "2026-02-03", "2026-06-19"], [35, 3, 17, "2026-03-11", "2026-07-01"], [35, 11, 8, "2026-01-17", "2026-07-17"], [35, 63, 2, "2026-01-31", "2026-01-31"], [35, 8, 1, "2026-03-30", "2026-03-30"], [35, 7, 1, "2026-01-16", "2026-01-16"], [35, 13, 1, "2026-06-30", "2026-06-30"], [36, 0, 77, "2026-01-05", "2026-07-13"], [36, 2, 55, "2026-05-02", "2026-08-11"], [36, 1, 53, "2026-01-05", "2026-06-19"], [36, 3, 39, "2026-03-05", "2026-06-19"], [36, 7, 22, "2026-01-05", "2026-02-21"], [36, 9, 11, "2026-04-05", "2026-06-04"], [36, 11, 7, "2026-01-26", "2026-07-26"], [36, 19, 5, "2026-03-06", "2026-05-31"], [36, 20, 4, "2026-04-05", "2026-06-19"], [36, 21, 3, "2026-04-02", "2026-04-03"], [36, 4, 3, "2026-01-05", "2026-02-04"], [36, 8, 2, "2026-03-04", "2026-04-03"], [36, 13, 1, "2026-06-18", "2026-06-18"], [36, 16, 1, "2026-06-01", "2026-06-01"], [36, 67, 1, "2026-08-11", "2026-08-11"], [36, 69, 1, "2026-08-11", "2026-08-11"], [37, 0, 87, "2026-01-13", "2026-08-11"], [37, 1, 80, "2026-01-13", "2026-08-11"], [37, 3, 29, "2026-03-05", "2026-08-11"], [37, 2, 24, "2026-04-25", "2026-07-28"], [37, 5, 23, "2026-01-13", "2026-08-10"], [37, 6, 15, "2026-01-25", "2026-08-11"], [37, 8, 7, "2026-03-03", "2026-08-11"], [37, 9, 7, "2026-03-05", "2026-08-11"], [37, 4, 5, "2026-04-26", "2026-04-26"], [37, 20, 3, "2026-03-05", "2026-05-05"], [37, 31, 2, "2026-06-02", "2026-06-25"], [37, 48, 1, "2026-04-01", "2026-04-01"], [37, 26, 1, "2026-04-26", "2026-04-26"], [38, 0, 83, "2026-01-24", "2026-08-10"], [38, 2, 78, "2026-05-04", "2026-08-11"], [38, 3, 28, "2026-03-03", "2026-07-29"], [38, 1, 24, "2026-01-24", "2026-08-10"], [38, 5, 19, "2026-01-24", "2026-08-10"], [38, 4, 11, "2026-03-03", "2026-07-29"], [38, 6, 6, "2026-01-28", "2026-06-16"], [38, 18, 5, "2026-01-24", "2026-07-29"], [38, 10, 5, "2026-01-25", "2026-07-21"], [38, 9, 5, "2026-05-13", "2026-07-21"], [38, 8, 3, "2026-03-23", "2026-06-08"], [38, 26, 2, "2026-05-21", "2026-06-29"], [38, 15, 2, "2026-05-29", "2026-07-29"], [38, 7, 2, "2026-01-24", "2026-01-24"], [38, 31, 1, "2026-05-12", "2026-05-12"], [38, 49, 1, "2026-07-17", "2026-07-17"], [38, 20, 1, "2026-05-10", "2026-05-10"], [38, 25, 1, "2026-01-24", "2026-01-24"], [38, 11, 1, "2026-01-24", "2026-01-24"], [38, 21, 1, "2026-05-22", "2026-05-22"], [38, 17, 1, "2026-01-24", "2026-01-24"], [38, 28, 1, "2026-01-24", "2026-01-24"], [38, 30, 1, "2026-02-04", "2026-02-04"], [38, 13, 1, "2026-06-16", "2026-06-16"], [39, 2, 158, "2026-05-05", "2026-07-30"], [39, 15, 31, "2026-05-07", "2026-07-17"], [39, 1, 9, "2026-05-07", "2026-05-07"], [39, 36, 8, "2026-05-07", "2026-05-07"], [39, 3, 8, "2026-05-07", "2026-06-08"], [39, 18, 7, "2026-05-07", "2026-07-17"], [39, 5, 7, "2026-05-07", "2026-05-07"], [39, 61, 6, "2026-05-13", "2026-06-03"], [39, 33, 5, "2026-05-05", "2026-05-05"], [39, 4, 4, "2026-05-07", "2026-05-07"], [39, 41, 4, "2026-05-13", "2026-05-13"], [39, 19, 4, "2026-05-19", "2026-06-12"], [39, 50, 3, "2026-05-13", "2026-06-12"], [39, 45, 3, "2026-05-07", "2026-05-07"], [39, 23, 3, "2026-05-07", "2026-06-08"], [39, 8, 3, "2026-05-05", "2026-05-05"], [39, 53, 3, "2026-05-05", "2026-05-05"], [39, 9, 2, "2026-06-05", "2026-06-05"], [39, 12, 2, "2026-06-12", "2026-06-12"], [39, 13, 2, "2026-05-05", "2026-05-05"], [39, 59, 1, "2026-06-30", "2026-06-30"], [39, 57, 1, "2026-05-13", "2026-05-13"], [39, 17, 1, "2026-05-05", "2026-05-05"], [39, 34, 1, "2026-05-05", "2026-05-05"], [39, 58, 1, "2026-07-28", "2026-07-28"], [39, 22, 1, "2026-05-05", "2026-05-05"], [39, 38, 1, "2026-06-05", "2026-06-05"], [39, 60, 1, "2026-05-13", "2026-05-13"], [40, 2, 110, "2026-03-09", "2026-07-31"], [40, 1, 24, "2026-01-14", "2026-07-30"], [40, 35, 11, "2026-04-21", "2026-07-30"], [40, 3, 10, "2026-03-09", "2026-06-03"], [40, 31, 9, "2026-04-16", "2026-05-08"], [40, 36, 9, "2026-04-27", "2026-05-12"], [40, 10, 8, "2026-03-18", "2026-07-30"], [40, 5, 8, "2026-03-09", "2026-06-03"], [40, 55, 7, "2026-04-15", "2026-05-08"], [40, 15, 7, "2026-03-09", "2026-06-03"], [40, 33, 6, "2026-03-09", "2026-06-03"], [40, 0, 6, "2026-03-09", "2026-06-03"], [40, 21, 6, "2026-03-09", "2026-04-30"], [40, 16, 5, "2026-04-27", "2026-04-27"], [40, 39, 5, "2026-03-09", "2026-03-10"], [40, 66, 4, "2026-04-16", "2026-04-23"], [40, 4, 4, "2026-03-09", "2026-06-03"], [40, 45, 4, "2026-04-27", "2026-05-12"], [40, 13, 3, "2026-04-27", "2026-04-30"], [40, 8, 3, "2026-03-09", "2026-06-03"], [40, 41, 3, "2026-04-16", "2026-04-23"], [40, 18, 2, "2026-04-30", "2026-04-30"], [40, 58, 2, "2026-04-16", "2026-04-23"], [40, 71, 2, "2026-04-16", "2026-04-16"], [40, 65, 2, "2026-04-16", "2026-04-23"], [40, 19, 2, "2026-04-30", "2026-04-30"], [40, 64, 1, "2026-04-20", "2026-04-20"], [40, 59, 1, "2026-04-23", "2026-04-23"], [40, 62, 1, "2026-06-03", "2026-06-03"], [40, 38, 1, "2026-03-09", "2026-03-09"], [40, 12, 1, "2026-04-30", "2026-04-30"], [40, 54, 1, "2026-03-09", "2026-03-09"], [40, 73, 1, "2026-04-16", "2026-04-16"], [40, 68, 1, "2026-04-16", "2026-04-16"], [40, 53, 1, "2026-04-21", "2026-04-21"], [40, 60, 1, "2026-03-24", "2026-03-24"], [40, 23, 1, "2026-06-03", "2026-06-03"], [40, 57, 1, "2026-03-24", "2026-03-24"], [41, 0, 77, "2026-01-06", "2026-08-10"], [41, 4, 55, "2026-03-05", "2026-06-22"], [41, 1, 52, "2026-01-14", "2026-08-10"], [41, 3, 33, "2026-03-03", "2026-08-10"], [41, 32, 11, "2026-03-05", "2026-06-22"], [41, 11, 11, "2026-01-26", "2026-07-26"], [41, 7, 8, "2026-01-06", "2026-02-18"], [41, 15, 5, "2026-03-05", "2026-05-25"], [41, 2, 5, "2026-03-05", "2026-05-25"], [41, 5, 5, "2026-05-11", "2026-06-22"], [41, 19, 2, "2026-05-13", "2026-05-13"], [41, 14, 2, "2026-02-26", "2026-03-26"], [41, 6, 2, "2026-01-05", "2026-06-18"], [41, 20, 1, "2026-05-20", "2026-05-20"], [42, 1, 80, "2026-01-10", "2026-07-29"], [42, 0, 75, "2026-01-10", "2026-08-05"], [42, 2, 39, "2026-04-21", "2026-08-05"], [42, 10, 32, "2026-01-10", "2026-07-03"], [42, 12, 18, "2026-04-02", "2026-04-02"], [42, 8, 9, "2026-02-28", "2026-07-03"], [42, 11, 8, "2026-01-17", "2026-07-17"], [42, 3, 4, "2026-03-09", "2026-05-06"], [42, 7, 1, "2026-02-17", "2026-02-17"], [43, 1, 118, "2026-01-19", "2026-08-11"], [43, 0, 78, "2026-01-19", "2026-08-11"], [43, 2, 39, "2026-04-22", "2026-08-11"], [43, 11, 8, "2026-01-14", "2026-07-14"], [43, 5, 6, "2026-02-16", "2026-07-14"], [43, 3, 3, "2026-03-09", "2026-06-15"], [43, 10, 2, "2026-02-24", "2026-02-24"], [43, 6, 2, "2026-05-25", "2026-05-25"], [43, 23, 1, "2026-06-15", "2026-06-15"], [43, 7, 1, "2026-02-11", "2026-02-11"], [43, 8, 1, "2026-05-25", "2026-05-25"], [44, 2, 48, "2026-04-21", "2026-08-04"], [44, 1, 41, "2026-04-20", "2026-07-29"], [44, 3, 34, "2026-04-21", "2026-07-15"], [44, 35, 23, "2026-04-20", "2026-07-29"], [44, 5, 21, "2026-04-21", "2026-07-29"], [44, 4, 19, "2026-05-16", "2026-07-15"], [44, 8, 11, "2026-04-20", "2026-07-08"], [44, 6, 11, "2026-04-21", "2026-07-01"], [44, 16, 9, "2026-05-11", "2026-08-03"], [44, 9, 7, "2026-05-07", "2026-07-01"], [44, 0, 5, "2026-04-21", "2026-08-04"], [44, 13, 4, "2026-04-20", "2026-04-20"], [44, 12, 3, "2026-04-20", "2026-04-20"], [44, 18, 2, "2026-04-20", "2026-07-07"], [44, 11, 2, "2026-04-20", "2026-05-04"], [44, 21, 2, "2026-04-21", "2026-07-08"], [44, 20, 2, "2026-07-08", "2026-07-08"], [44, 10, 2, "2026-04-21", "2026-05-07"], [44, 42, 1, "2026-04-20", "2026-04-20"], [44, 44, 1, "2026-04-20", "2026-04-20"], [44, 28, 1, "2026-04-20", "2026-04-20"], [44, 17, 1, "2026-04-20", "2026-04-20"], [44, 25, 1, "2026-04-20", "2026-04-20"], [44, 26, 1, "2026-06-16", "2026-06-16"], [44, 34, 1, "2026-04-20", "2026-04-20"], [44, 30, 1, "2026-05-01", "2026-05-01"], [44, 57, 1, "2026-04-20", "2026-04-20"], [44, 53, 1, "2026-04-20", "2026-04-20"], [44, 15, 1, "2026-07-08", "2026-07-08"], [44, 19, 1, "2026-07-01", "2026-07-01"], [45, 0, 104, "2026-01-05", "2026-08-11"], [45, 3, 81, "2026-03-04", "2026-08-11"], [45, 7, 27, "2026-01-05", "2026-02-16"], [45, 1, 14, "2026-01-05", "2026-07-15"], [45, 2, 12, "2026-04-27", "2026-07-23"], [45, 10, 6, "2026-01-07", "2026-08-03"], [45, 5, 3, "2026-01-05", "2026-08-11"], [45, 8, 3, "2026-04-29", "2026-07-15"], [45, 6, 2, "2026-01-05", "2026-06-22"], [45, 17, 1, "2026-02-18", "2026-02-18"], [46, 2, 76, "2026-04-21", "2026-08-04"], [46, 0, 53, "2026-01-31", "2026-08-09"], [46, 1, 29, "2026-01-31", "2026-07-28"], [46, 3, 27, "2026-02-26", "2026-07-21"], [46, 4, 26, "2026-01-31", "2026-07-21"], [46, 11, 11, "2026-01-12", "2026-07-12"], [46, 8, 10, "2026-03-11", "2026-07-28"], [46, 15, 3, "2026-05-03", "2026-05-12"], [46, 12, 2, "2026-03-15", "2026-03-15"], [46, 18, 2, "2026-01-02", "2026-01-02"], [46, 14, 2, "2026-01-12", "2026-01-17"], [46, 7, 2, "2026-01-31", "2026-02-09"], [46, 26, 1, "2026-04-10", "2026-04-10"], [46, 9, 1, "2026-07-17", "2026-07-17"], [46, 72, 1, "2026-05-12", "2026-05-12"], [46, 10, 1, "2026-02-09", "2026-02-09"], [47, 0, 69, "2026-01-04", "2026-08-10"], [47, 3, 48, "2026-03-03", "2026-08-10"], [47, 1, 41, "2026-02-24", "2026-08-10"], [47, 4, 36, "2026-01-05", "2026-08-10"], [47, 2, 20, "2026-04-28", "2026-07-27"], [47, 7, 11, "2026-01-04", "2026-02-24"], [47, 11, 9, "2026-01-02", "2026-08-02"], [47, 20, 3, "2026-03-03", "2026-04-28"], [47, 12, 3, "2026-01-14", "2026-01-14"], [47, 9, 2, "2026-05-29", "2026-05-29"], [47, 8, 2, "2026-03-31", "2026-05-21"], [47, 6, 2, "2026-05-29", "2026-05-29"], [47, 29, 1, "2026-08-02", "2026-08-02"], [48, 2, 98, "2026-03-06", "2026-08-11"], [48, 16, 32, "2026-02-10", "2026-08-05"], [48, 0, 11, "2026-01-05", "2026-04-03"], [48, 7, 9, "2026-01-05", "2026-02-10"], [48, 3, 8, "2026-04-07", "2026-07-15"], [48, 36, 8, "2026-04-27", "2026-07-08"], [48, 31, 8, "2026-07-08", "2026-07-08"], [48, 34, 7, "2026-04-03", "2026-05-19"], [48, 1, 7, "2026-01-16", "2026-05-12"], [48, 18, 6, "2026-01-13", "2026-08-10"], [48, 10, 6, "2026-02-16", "2026-04-07"], [48, 43, 5, "2026-04-03", "2026-05-19"], [48, 13, 4, "2026-03-31", "2026-07-31"], [48, 55, 3, "2026-07-08", "2026-07-08"], [48, 15, 3, "2026-03-06", "2026-04-17"], [48, 54, 2, "2026-01-07", "2026-01-12"], [48, 41, 2, "2026-08-05", "2026-08-05"], [48, 44, 2, "2026-03-31", "2026-04-27"], [48, 4, 1, "2026-01-26", "2026-01-26"], [48, 53, 1, "2026-03-31", "2026-03-31"], [48, 68, 1, "2026-08-05", "2026-08-05"], [48, 12, 1, "2026-02-12", "2026-02-12"], [48, 45, 1, "2026-04-27", "2026-04-27"], [48, 20, 1, "2026-03-31", "2026-03-31"], [48, 9, 1, "2026-04-07", "2026-04-07"], [48, 5, 1, "2026-04-08", "2026-04-08"], [48, 35, 1, "2026-05-12", "2026-05-12"], [48, 42, 1, "2026-03-31", "2026-03-31"], [49, 1, 85, "2026-01-17", "2026-08-10"], [49, 0, 81, "2026-01-17", "2026-08-10"], [49, 2, 25, "2026-04-24", "2026-08-10"], [49, 3, 22, "2026-03-18", "2026-08-04"], [49, 11, 11, "2026-01-02", "2026-08-02"], [49, 7, 3, "2026-02-04", "2026-02-16"], [49, 14, 1, "2026-03-02", "2026-03-02"], [49, 8, 1, "2026-04-23", "2026-04-23"], [49, 29, 1, "2026-08-02", "2026-08-02"], [50, 0, 66, "2026-01-17", "2026-08-05"], [50, 2, 51, "2026-04-01", "2026-08-05"], [50, 1, 35, "2026-01-17", "2026-07-22"], [50, 3, 27, "2026-03-23", "2026-08-05"], [50, 12, 15, "2026-04-27", "2026-04-27"], [50, 10, 14, "2026-01-17", "2026-07-22"], [50, 11, 6, "2026-01-25", "2026-07-22"], [50, 7, 6, "2026-01-17", "2026-02-09"], [50, 8, 3, "2026-03-10", "2026-06-19"], [50, 20, 2, "2026-02-09", "2026-06-09"], [50, 27, 1, "2026-04-25", "2026-04-25"], [50, 15, 1, "2026-04-01", "2026-04-01"], [50, 13, 1, "2026-04-13", "2026-04-13"], [50, 25, 1, "2026-07-22", "2026-07-22"], [50, 28, 1, "2026-07-22", "2026-07-22"], [51, 0, 96, "2026-01-14", "2026-08-11"], [51, 1, 69, "2026-01-04", "2026-08-11"], [51, 2, 19, "2026-04-23", "2026-08-11"], [51, 8, 8, "2026-03-15", "2026-08-11"], [51, 11, 7, "2026-02-04", "2026-04-05"], [51, 3, 7, "2026-03-08", "2026-04-23"], [51, 14, 6, "2026-02-04", "2026-04-05"], [51, 7, 3, "2026-01-14", "2026-02-22"], [51, 42, 2, "2026-04-05", "2026-04-05"], [51, 13, 2, "2026-04-05", "2026-04-05"], [51, 20, 1, "2026-03-15", "2026-03-15"], [51, 10, 1, "2026-04-01", "2026-04-01"], [51, 25, 1, "2026-04-05", "2026-04-05"], [51, 28, 1, "2026-04-05", "2026-04-05"], [51, 27, 1, "2026-02-25", "2026-02-25"], [51, 9, 1, "2026-04-01", "2026-04-01"], [51, 17, 1, "2026-04-05", "2026-04-05"], [51, 44, 1, "2026-04-05", "2026-04-05"], [52, 0, 88, "2026-01-14", "2026-08-10"], [52, 1, 28, "2026-01-14", "2026-07-13"], [52, 3, 24, "2026-03-31", "2026-08-07"], [52, 2, 14, "2026-04-28", "2026-07-13"], [52, 24, 12, "2026-04-24", "2026-05-20"], [52, 7, 12, "2026-01-14", "2026-02-04"], [52, 4, 11, "2026-01-27", "2026-08-07"], [52, 14, 8, "2026-01-03", "2026-02-11"], [52, 8, 5, "2026-04-24", "2026-07-13"], [52, 18, 4, "2026-01-11", "2026-05-18"], [52, 11, 3, "2026-01-11", "2026-01-21"], [52, 23, 2, "2026-06-25", "2026-07-13"], [52, 10, 2, "2026-04-24", "2026-08-10"], [52, 17, 1, "2026-01-14", "2026-01-14"], [52, 27, 1, "2026-02-11", "2026-02-11"], [53, 10, 48, "2026-02-24", "2026-08-12"], [53, 9, 28, "2026-02-26", "2026-08-08"], [53, 1, 25, "2026-02-05", "2026-08-08"], [53, 3, 24, "2026-03-17", "2026-08-08"], [53, 5, 21, "2026-01-29", "2026-08-08"], [53, 6, 18, "2026-01-29", "2026-03-30"], [53, 4, 13, "2026-02-23", "2026-08-08"], [53, 2, 13, "2026-06-05", "2026-08-08"], [53, 0, 9, "2026-01-29", "2026-04-16"], [53, 7, 7, "2026-02-24", "2026-02-24"], [53, 11, 2, "2026-07-20", "2026-08-03"], [53, 30, 1, "2026-07-31", "2026-07-31"], [53, 29, 1, "2026-08-03", "2026-08-03"], [53, 25, 1, "2026-07-20", "2026-07-20"], [53, 28, 1, "2026-07-20", "2026-07-20"], [53, 12, 1, "2026-07-20", "2026-07-20"], [53, 51, 1, "2026-08-03", "2026-08-03"], [54, 0, 52, "2026-01-03", "2026-07-03"], [54, 1, 34, "2026-01-03", "2026-07-03"], [54, 5, 22, "2026-01-13", "2026-06-17"], [54, 4, 22, "2026-03-26", "2026-06-17"], [54, 6, 21, "2026-01-13", "2026-02-23"], [54, 3, 12, "2026-03-03", "2026-06-17"], [54, 2, 11, "2026-04-27", "2026-07-03"], [54, 11, 6, "2026-02-05", "2026-05-05"], [54, 32, 5, "2026-03-26", "2026-03-26"], [54, 10, 5, "2026-01-22", "2026-04-27"], [54, 8, 4, "2026-03-26", "2026-04-28"], [54, 23, 3, "2026-01-30", "2026-04-29"], [54, 27, 1, "2026-06-05", "2026-06-05"], [54, 18, 1, "2026-04-14", "2026-04-14"], [54, 20, 1, "2026-03-24", "2026-03-24"], [54, 30, 1, "2026-02-02", "2026-02-02"], [54, 25, 1, "2026-01-22", "2026-01-22"], [54, 7, 1, "2026-02-03", "2026-02-03"], [54, 28, 1, "2026-01-22", "2026-01-22"], [55, 0, 42, "2026-02-06", "2026-08-10"], [55, 2, 39, "2026-04-10", "2026-08-11"], [55, 1, 29, "2026-02-06", "2026-08-10"], [55, 3, 21, "2026-02-27", "2026-08-11"], [55, 4, 13, "2026-02-09", "2026-08-11"], [55, 8, 10, "2026-02-27", "2026-07-07"], [55, 10, 9, "2026-05-27", "2026-07-31"], [55, 15, 8, "2026-04-10", "2026-07-10"], [55, 33, 5, "2026-05-18", "2026-05-18"], [55, 18, 4, "2026-01-19", "2026-07-10"], [55, 7, 3, "2026-02-06", "2026-02-23"], [55, 20, 3, "2026-05-10", "2026-08-06"], [55, 19, 2, "2026-03-10", "2026-03-12"], [55, 5, 2, "2026-02-24", "2026-02-27"], [55, 21, 2, "2026-04-26", "2026-04-26"], [55, 6, 2, "2026-02-24", "2026-02-24"], [55, 13, 1, "2026-05-18", "2026-05-18"], [55, 22, 1, "2026-01-19", "2026-01-19"], [55, 11, 1, "2026-02-02", "2026-02-02"], [55, 16, 1, "2026-03-10", "2026-03-10"], [55, 30, 1, "2026-01-30", "2026-01-30"], [55, 24, 1, "2026-05-18", "2026-05-18"], [55, 17, 1, "2026-01-19", "2026-01-19"], [55, 28, 1, "2026-01-19", "2026-01-19"], [55, 25, 1, "2026-01-19", "2026-01-19"], [55, 31, 1, "2026-07-10", "2026-07-10"], [56, 2, 75, "2026-04-21", "2026-08-10"], [56, 0, 40, "2026-01-03", "2026-08-10"], [56, 1, 20, "2026-01-03", "2026-06-30"], [56, 10, 17, "2026-01-03", "2026-04-07"], [56, 3, 9, "2026-04-20", "2026-06-30"], [56, 4, 9, "2026-02-06", "2026-05-18"], [56, 14, 6, "2026-06-03", "2026-08-03"], [56, 9, 6, "2026-03-27", "2026-04-20"], [56, 31, 5, "2026-05-20", "2026-05-20"], [56, 11, 2, "2026-06-03", "2026-06-03"], [56, 55, 1, "2026-05-20", "2026-05-20"], [56, 30, 1, "2026-05-31", "2026-05-31"], [56, 60, 1, "2026-05-21", "2026-05-21"], [56, 15, 1, "2026-08-05", "2026-08-05"], [56, 57, 1, "2026-05-21", "2026-05-21"], [56, 46, 1, "2026-08-03", "2026-08-03"], [56, 28, 1, "2026-05-20", "2026-05-20"], [56, 25, 1, "2026-05-20", "2026-05-20"], [56, 27, 1, "2026-06-24", "2026-06-24"], [57, 0, 72, "2026-01-04", "2026-08-03"], [57, 1, 47, "2026-01-20", "2026-07-27"], [57, 8, 16, "2026-03-04", "2026-07-09"], [57, 2, 15, "2026-05-05", "2026-08-03"], [57, 11, 13, "2026-01-11", "2026-08-11"], [57, 3, 12, "2026-03-30", "2026-07-27"], [57, 9, 9, "2026-04-16", "2026-07-24"], [57, 7, 5, "2026-01-26", "2026-02-24"], [57, 14, 2, "2026-04-11", "2026-06-11"], [57, 23, 2, "2026-01-29", "2026-03-30"], [57, 10, 2, "2026-01-26", "2026-02-06"], [57, 20, 1, "2026-05-04", "2026-05-04"], [57, 48, 1, "2026-05-04", "2026-05-04"], [57, 32, 1, "2026-03-05", "2026-03-05"], [58, 0, 52, "2026-02-02", "2026-08-11"], [58, 1, 38, "2026-02-02", "2026-08-11"], [58, 4, 31, "2026-02-02", "2026-07-01"], [58, 2, 27, "2026-04-24", "2026-08-11"], [58, 3, 12, "2026-03-30", "2026-07-01"], [58, 14, 10, "2026-03-22", "2026-08-11"], [58, 8, 7, "2026-03-24", "2026-08-11"], [58, 11, 4, "2026-02-22", "2026-08-11"], [58, 10, 4, "2026-02-19", "2026-06-11"], [58, 46, 3, "2026-08-11", "2026-08-11"], [58, 25, 2, "2026-02-08", "2026-08-11"], [58, 12, 1, "2026-02-08", "2026-02-08"], [58, 29, 1, "2026-08-11", "2026-08-11"], [58, 27, 1, "2026-04-12", "2026-04-12"], [58, 30, 1, "2026-02-19", "2026-02-19"], [58, 28, 1, "2026-02-08", "2026-02-08"], [58, 20, 1, "2026-04-07", "2026-04-07"], [59, 0, 68, "2026-01-08", "2026-08-09"], [59, 1, 48, "2026-01-08", "2026-08-07"], [59, 2, 30, "2026-05-04", "2026-08-09"], [59, 8, 16, "2026-02-26", "2026-07-30"], [59, 11, 8, "2026-01-23", "2026-07-23"], [59, 3, 7, "2026-02-26", "2026-07-30"], [59, 10, 7, "2026-02-10", "2026-07-10"], [59, 5, 2, "2026-05-04", "2026-07-09"], [59, 6, 2, "2026-05-05", "2026-07-10"], [59, 9, 1, "2026-05-05", "2026-05-05"], [59, 21, 1, "2026-03-31", "2026-03-31"], [60, 0, 70, "2026-01-14", "2026-08-11"], [60, 1, 43, "2026-03-06", "2026-08-11"], [60, 5, 33, "2026-01-14", "2026-08-11"], [60, 2, 15, "2026-04-30", "2026-07-22"], [60, 6, 14, "2026-01-14", "2026-08-04"], [60, 11, 8, "2026-01-22", "2026-07-22"], [60, 9, 5, "2026-04-27", "2026-07-24"], [60, 10, 2, "2026-04-30", "2026-04-30"], [61, 6, 41, "2026-02-13", "2026-07-24"], [61, 3, 29, "2026-03-03", "2026-06-26"], [61, 0, 25, "2026-03-03", "2026-08-06"], [61, 1, 21, "2026-02-10", "2026-07-22"], [61, 5, 17, "2026-02-10", "2026-07-22"], [61, 2, 16, "2026-05-02", "2026-08-06"], [61, 9, 9, "2026-02-28", "2026-07-24"], [61, 7, 6, "2026-02-12", "2026-02-24"], [61, 10, 5, "2026-02-15", "2026-05-14"], [61, 4, 3, "2026-02-22", "2026-05-02"], [61, 23, 2, "2026-03-06", "2026-03-27"], [61, 11, 2, "2026-07-29", "2026-07-29"], [61, 17, 1, "2026-02-10", "2026-02-10"], [61, 30, 1, "2026-08-02", "2026-08-02"], [61, 27, 1, "2026-08-05", "2026-08-05"], [61, 26, 1, "2026-03-03", "2026-03-03"], [61, 47, 1, "2026-03-28", "2026-03-28"], [61, 28, 1, "2026-07-22", "2026-07-22"], [61, 22, 1, "2026-02-10", "2026-02-10"], [61, 25, 1, "2026-07-22", "2026-07-22"], [61, 8, 1, "2026-03-03", "2026-03-03"], [62, 0, 83, "2026-01-05", "2026-08-11"], [62, 1, 40, "2026-01-09", "2026-08-11"], [62, 2, 19, "2026-04-29", "2026-07-16"], [62, 3, 11, "2026-03-02", "2026-07-31"], [62, 7, 7, "2026-01-09", "2026-02-19"], [62, 8, 7, "2026-03-02", "2026-08-11"], [62, 10, 6, "2026-03-02", "2026-03-03"], [62, 29, 4, "2026-07-31", "2026-07-31"], [62, 23, 2, "2026-01-28", "2026-04-04"], [62, 11, 1, "2026-07-31", "2026-07-31"], [62, 30, 1, "2026-08-11", "2026-08-11"], [62, 5, 1, "2026-07-04", "2026-07-04"], [62, 47, 1, "2026-04-06", "2026-04-06"], [62, 25, 1, "2026-07-31", "2026-07-31"], [63, 0, 49, "2026-01-10", "2026-08-04"], [63, 1, 37, "2026-01-10", "2026-08-04"], [63, 2, 31, "2026-04-23", "2026-08-04"], [63, 14, 17, "2026-05-28", "2026-06-18"], [63, 3, 11, "2026-02-26", "2026-08-04"], [63, 11, 8, "2026-01-28", "2026-07-27"], [63, 10, 8, "2026-03-27", "2026-05-07"], [63, 46, 6, "2026-05-28", "2026-05-29"], [63, 7, 4, "2026-01-12", "2026-02-25"], [63, 16, 2, "2026-01-12", "2026-03-13"], [63, 8, 2, "2026-04-14", "2026-04-29"], [63, 15, 1, "2026-06-29", "2026-06-29"], [63, 28, 1, "2026-07-27", "2026-07-27"], [63, 27, 1, "2026-06-18", "2026-06-18"], [63, 13, 1, "2026-04-29", "2026-04-29"], [63, 25, 1, "2026-07-27", "2026-07-27"], [64, 12, 86, "2026-03-29", "2026-04-02"], [64, 2, 24, "2026-04-06", "2026-07-23"], [64, 5, 18, "2026-03-29", "2026-07-06"], [64, 1, 10, "2026-03-29", "2026-05-12"], [64, 0, 9, "2026-03-29", "2026-06-15"], [64, 6, 6, "2026-03-29", "2026-07-30"], [64, 8, 6, "2026-03-31", "2026-05-02"], [64, 10, 6, "2026-03-29", "2026-07-31"], [64, 9, 5, "2026-03-29", "2026-07-07"], [64, 3, 2, "2026-05-02", "2026-06-15"], [64, 15, 1, "2026-04-06", "2026-04-06"], [65, 1, 48, "2026-07-01", "2026-08-06"], [65, 0, 30, "2026-07-01", "2026-08-06"], [65, 5, 25, "2026-07-01", "2026-08-06"], [65, 8, 15, "2026-07-01", "2026-07-24"], [65, 2, 14, "2026-07-03", "2026-08-11"], [65, 10, 11, "2026-07-01", "2026-08-06"], [65, 6, 8, "2026-07-08", "2026-07-25"], [65, 9, 6, "2026-07-01", "2026-07-17"], [65, 3, 3, "2026-07-06", "2026-07-22"], [65, 13, 2, "2026-07-01", "2026-07-01"], [65, 11, 2, "2026-07-08", "2026-07-22"], [65, 28, 1, "2026-07-08", "2026-07-08"], [65, 23, 1, "2026-07-22", "2026-07-22"], [65, 22, 1, "2026-07-01", "2026-07-01"], [65, 30, 1, "2026-07-19", "2026-07-19"], [65, 25, 1, "2026-07-08", "2026-07-08"], [65, 17, 1, "2026-07-01", "2026-07-01"], [66, 0, 50, "2026-01-06", "2026-07-21"], [66, 1, 48, "2026-01-06", "2026-07-21"], [66, 2, 19, "2026-05-12", "2026-07-30"], [66, 3, 13, "2026-03-01", "2026-06-22"], [66, 11, 11, "2026-01-13", "2026-07-13"], [66, 10, 10, "2026-01-06", "2026-07-15"], [66, 8, 4, "2026-03-27", "2026-06-14"], [66, 7, 3, "2026-01-06", "2026-01-26"], [66, 21, 1, "2026-03-30", "2026-03-30"], [66, 15, 1, "2026-06-22", "2026-06-22"], [66, 14, 1, "2026-04-13", "2026-04-13"], [66, 13, 1, "2026-03-30", "2026-03-30"], [66, 16, 1, "2026-06-22", "2026-06-22"], [67, 0, 36, "2026-03-25", "2026-08-04"], [67, 1, 33, "2026-04-14", "2026-08-04"], [67, 2, 29, "2026-05-21", "2026-08-07"], [67, 5, 21, "2026-01-06", "2026-08-04"], [67, 4, 10, "2026-07-29", "2026-08-07"], [67, 3, 8, "2026-07-31", "2026-08-07"], [67, 6, 5, "2026-01-07", "2026-08-03"], [67, 11, 4, "2026-07-24", "2026-08-07"], [67, 20, 3, "2026-06-22", "2026-06-22"], [67, 8, 3, "2026-07-24", "2026-08-04"], [67, 51, 1, "2026-08-07", "2026-08-07"], [67, 30, 1, "2026-08-04", "2026-08-04"], [67, 32, 1, "2026-07-29", "2026-07-29"], [67, 14, 1, "2026-08-07", "2026-08-07"], [67, 28, 1, "2026-07-24", "2026-07-24"], [67, 21, 1, "2026-07-01", "2026-07-01"], [67, 18, 1, "2026-07-29", "2026-07-29"], [67, 15, 1, "2026-07-29", "2026-07-29"], [67, 25, 1, "2026-07-24", "2026-07-24"], [67, 9, 1, "2026-08-03", "2026-08-03"], [68, 0, 35, "2026-03-02", "2026-05-23"], [68, 10, 20, "2026-01-31", "2026-08-03"], [68, 1, 16, "2026-02-28", "2026-05-28"], [68, 6, 16, "2026-02-01", "2026-07-20"], [68, 3, 16, "2026-02-28", "2026-08-03"], [68, 4, 12, "2026-02-28", "2026-08-03"], [68, 5, 12, "2026-01-31", "2026-05-28"], [68, 9, 12, "2026-04-03", "2026-08-03"], [68, 2, 7, "2026-04-21", "2026-08-03"], [68, 20, 6, "2026-03-17", "2026-04-06"], [68, 8, 4, "2026-02-28", "2026-05-28"], [68, 23, 2, "2026-02-28", "2026-04-10"], [68, 21, 1, "2026-03-02", "2026-03-02"], [69, 0, 60, "2026-03-21", "2026-07-30"], [69, 2, 35, "2026-05-08", "2026-07-27"], [69, 1, 33, "2026-02-23", "2026-07-30"], [69, 3, 18, "2026-03-21", "2026-07-30"], [69, 11, 2, "2026-07-02", "2026-08-02"], [69, 8, 2, "2026-03-21", "2026-07-04"], [69, 26, 2, "2026-03-21", "2026-03-21"], [69, 4, 2, "2026-03-21", "2026-03-21"], [69, 25, 1, "2026-06-18", "2026-06-18"], [69, 21, 1, "2026-07-04", "2026-07-04"], [69, 30, 1, "2026-06-29", "2026-06-29"], [69, 29, 1, "2026-08-02", "2026-08-02"], [69, 28, 1, "2026-06-18", "2026-06-18"], [70, 0, 63, "2026-01-08", "2026-08-07"], [70, 2, 23, "2026-04-20", "2026-08-07"], [70, 1, 18, "2026-01-08", "2026-07-20"], [70, 11, 14, "2026-01-13", "2026-07-30"], [70, 9, 12, "2026-03-11", "2026-04-05"], [70, 3, 8, "2026-02-27", "2026-08-05"], [70, 5, 7, "2026-01-14", "2026-02-26"], [70, 14, 5, "2026-03-13", "2026-07-27"], [70, 12, 3, "2026-07-03", "2026-07-03"], [70, 30, 1, "2026-01-10", "2026-01-10"], [70, 8, 1, "2026-02-26", "2026-02-26"], [70, 7, 1, "2026-02-25", "2026-02-25"], [71, 0, 39, "2026-01-06", "2026-07-29"], [71, 2, 24, "2026-05-04", "2026-07-29"], [71, 3, 21, "2026-03-10", "2026-07-29"], [71, 1, 15, "2026-01-06", "2026-07-27"], [71, 4, 15, "2026-01-06", "2026-07-29"], [71, 7, 11, "2026-01-06", "2026-02-24"], [71, 11, 11, "2026-01-03", "2026-08-03"], [71, 10, 3, "2026-01-08", "2026-02-06"], [71, 6, 2, "2026-04-02", "2026-04-03"], [71, 18, 2, "2026-05-04", "2026-06-01"], [71, 9, 2, "2026-04-02", "2026-05-05"], [71, 12, 2, "2026-05-04", "2026-05-04"], [71, 26, 2, "2026-05-04", "2026-05-04"], [71, 5, 1, "2026-04-01", "2026-04-01"], [71, 29, 1, "2026-08-03", "2026-08-03"], [71, 23, 1, "2026-01-13", "2026-01-13"], [72, 0, 50, "2026-01-05", "2026-08-05"], [72, 1, 41, "2026-01-05", "2026-08-05"], [72, 2, 19, "2026-04-20", "2026-08-05"], [72, 10, 15, "2026-02-03", "2026-05-04"], [72, 11, 9, "2026-01-06", "2026-08-06"], [72, 3, 6, "2026-02-27", "2026-04-29"], [72, 13, 2, "2026-03-17", "2026-03-17"], [72, 20, 1, "2026-04-29", "2026-04-29"], [72, 29, 1, "2026-08-06", "2026-08-06"], [73, 0, 38, "2026-01-19", "2026-08-05"], [73, 5, 25, "2026-01-19", "2026-08-05"], [73, 1, 25, "2026-05-01", "2026-08-05"], [73, 2, 19, "2026-05-01", "2026-08-05"], [73, 6, 8, "2026-06-22", "2026-08-05"], [73, 9, 8, "2026-06-22", "2026-08-05"], [73, 11, 5, "2026-01-24", "2026-07-24"], [73, 14, 5, "2026-01-24", "2026-02-14"], [73, 8, 4, "2026-05-01", "2026-06-24"], [73, 13, 2, "2026-07-16", "2026-08-04"], [73, 3, 1, "2026-07-16", "2026-07-16"], [73, 27, 1, "2026-02-14", "2026-02-14"], [73, 28, 1, "2026-06-24", "2026-06-24"], [73, 25, 1, "2026-06-24", "2026-06-24"], [74, 0, 31, "2026-01-08", "2026-08-07"], [74, 2, 28, "2026-03-17", "2026-08-07"], [74, 3, 23, "2026-02-28", "2026-07-17"], [74, 1, 18, "2026-02-28", "2026-07-20"], [74, 4, 13, "2026-01-13", "2026-07-17"], [74, 11, 11, "2026-01-15", "2026-07-15"], [74, 7, 4, "2026-01-20", "2026-02-17"], [74, 8, 3, "2026-02-28", "2026-07-16"], [74, 14, 3, "2026-05-15", "2026-05-23"], [74, 15, 3, "2026-03-17", "2026-03-17"], [74, 46, 1, "2026-05-23", "2026-05-23"], [74, 9, 1, "2026-07-17", "2026-07-17"], [74, 18, 1, "2026-03-17", "2026-03-17"], [75, 1, 37, "2026-01-08", "2026-08-10"], [75, 2, 30, "2026-05-11", "2026-08-10"], [75, 9, 26, "2026-03-06", "2026-08-10"], [75, 8, 8, "2026-06-26", "2026-08-10"], [75, 3, 6, "2026-05-11", "2026-08-10"], [75, 12, 4, "2026-06-26", "2026-06-26"], [75, 10, 4, "2026-06-26", "2026-08-04"], [75, 5, 3, "2026-04-15", "2026-06-23"], [75, 4, 3, "2026-05-11", "2026-08-04"], [75, 0, 3, "2026-01-08", "2026-02-06"], [75, 13, 2, "2026-07-03", "2026-07-03"], [75, 33, 2, "2026-06-09", "2026-08-10"], [75, 11, 2, "2026-07-03", "2026-07-17"], [75, 15, 1, "2026-07-21", "2026-07-21"], [75, 30, 1, "2026-07-14", "2026-07-14"], [75, 42, 1, "2026-07-03", "2026-07-03"], [75, 31, 1, "2026-07-03", "2026-07-03"], [75, 60, 1, "2026-07-08", "2026-07-08"], [75, 57, 1, "2026-07-08", "2026-07-08"], [75, 28, 1, "2026-07-03", "2026-07-03"], [75, 25, 1, "2026-07-03", "2026-07-03"], [75, 34, 1, "2026-07-03", "2026-07-03"], [76, 0, 53, "2026-01-06", "2026-08-09"], [76, 1, 32, "2026-01-06", "2026-08-08"], [76, 4, 15, "2026-01-25", "2026-02-03"], [76, 2, 11, "2026-04-28", "2026-08-08"], [76, 11, 8, "2026-01-21", "2026-07-21"], [76, 8, 2, "2026-03-25", "2026-05-01"], [76, 20, 2, "2026-01-25", "2026-08-07"], [76, 3, 2, "2026-03-16", "2026-03-26"], [76, 7, 2, "2026-01-06", "2026-02-08"], [76, 23, 1, "2026-01-25", "2026-01-25"], [76, 10, 1, "2026-01-06", "2026-01-06"], [77, 3, 29, "2026-03-13", "2026-08-05"], [77, 1, 21, "2026-02-01", "2026-07-27"], [77, 4, 20, "2026-02-18", "2026-08-05"], [77, 2, 18, "2026-05-05", "2026-07-27"], [77, 0, 15, "2026-02-01", "2026-08-03"], [77, 8, 3, "2026-05-05", "2026-07-06"], [77, 7, 3, "2026-02-18", "2026-02-24"], [77, 11, 3, "2026-07-27", "2026-08-10"], [77, 15, 2, "2026-05-17", "2026-07-27"], [77, 26, 2, "2026-05-21", "2026-07-17"], [77, 25, 2, "2026-07-27", "2026-07-30"], [77, 14, 1, "2026-08-10", "2026-08-10"], [77, 30, 1, "2026-08-07", "2026-08-07"], [77, 28, 1, "2026-07-27", "2026-07-27"], [77, 20, 1, "2026-05-21", "2026-05-21"], [77, 13, 1, "2026-07-27", "2026-07-27"], [77, 51, 1, "2026-08-10", "2026-08-10"], [77, 18, 1, "2026-07-27", "2026-07-27"], [77, 5, 1, "2026-02-24", "2026-02-24"], [77, 34, 1, "2026-07-27", "2026-07-27"], [77, 23, 1, "2026-02-18", "2026-02-18"], [78, 0, 27, "2026-04-19", "2026-07-20"], [78, 3, 24, "2026-04-19", "2026-07-07"], [78, 1, 23, "2026-04-19", "2026-07-07"], [78, 2, 23, "2026-04-24", "2026-07-23"], [78, 4, 9, "2026-05-05", "2026-07-03"], [78, 13, 7, "2026-04-19", "2026-05-13"], [78, 12, 6, "2026-05-20", "2026-05-20"], [78, 8, 5, "2026-04-19", "2026-07-07"], [78, 20, 2, "2026-07-03", "2026-07-03"], [78, 48, 1, "2026-07-03", "2026-07-03"], [78, 17, 1, "2026-04-19", "2026-04-19"], [79, 6, 35, "2026-01-12", "2026-08-05"], [79, 5, 22, "2026-01-12", "2026-08-04"], [79, 1, 13, "2026-03-17", "2026-08-03"], [79, 2, 13, "2026-04-22", "2026-08-04"], [79, 11, 8, "2026-01-04", "2026-07-28"], [79, 9, 7, "2026-03-18", "2026-08-05"], [79, 3, 7, "2026-05-01", "2026-05-15"], [79, 8, 6, "2026-03-17", "2026-08-03"], [79, 0, 5, "2026-03-17", "2026-05-21"], [79, 4, 4, "2026-05-15", "2026-05-15"], [79, 23, 2, "2026-02-23", "2026-05-15"], [79, 21, 2, "2026-03-17", "2026-08-04"], [79, 7, 1, "2026-02-25", "2026-02-25"], [79, 17, 1, "2026-01-04", "2026-01-04"], [80, 1, 27, "2026-02-10", "2026-08-11"], [80, 0, 23, "2026-04-07", "2026-08-11"], [80, 2, 17, "2026-05-08", "2026-08-11"], [80, 4, 17, "2026-02-12", "2026-08-11"], [80, 32, 13, "2026-04-07", "2026-08-11"], [80, 3, 12, "2026-04-07", "2026-07-15"], [80, 29, 4, "2026-08-04", "2026-08-04"], [80, 7, 4, "2026-02-11", "2026-02-16"], [80, 5, 2, "2026-02-10", "2026-04-07"], [80, 8, 2, "2026-05-08", "2026-06-18"], [80, 17, 1, "2026-02-10", "2026-02-10"], [80, 26, 1, "2026-04-07", "2026-04-07"], [80, 25, 1, "2026-08-04", "2026-08-04"], [80, 13, 1, "2026-05-08", "2026-05-08"], [81, 3, 23, "2026-03-02", "2026-08-03"], [81, 0, 19, "2026-02-02", "2026-08-03"], [81, 1, 18, "2026-03-02", "2026-08-03"], [81, 4, 15, "2026-02-02", "2026-08-03"], [81, 5, 14, "2026-02-02", "2026-08-03"], [81, 2, 13, "2026-05-04", "2026-07-08"], [81, 11, 9, "2026-01-04", "2026-08-04"], [81, 6, 6, "2026-02-02", "2026-07-08"], [81, 9, 4, "2026-03-02", "2026-07-08"], [81, 7, 2, "2026-02-02", "2026-02-02"], [81, 29, 1, "2026-08-04", "2026-08-04"], [81, 10, 1, "2026-04-07", "2026-04-07"], [82, 0, 29, "2026-01-15", "2026-07-28"], [82, 1, 27, "2026-01-15", "2026-07-27"], [82, 3, 21, "2026-02-26", "2026-07-28"], [82, 4, 16, "2026-05-11", "2026-07-27"], [82, 2, 15, "2026-04-23", "2026-07-27"], [82, 11, 9, "2026-01-31", "2026-07-31"], [82, 14, 3, "2026-03-01", "2026-03-09"], [82, 8, 2, "2026-05-29", "2026-06-04"], [82, 20, 1, "2026-06-19", "2026-06-19"], [83, 9, 40, "2026-03-05", "2026-08-05"], [83, 1, 29, "2026-01-06", "2026-08-05"], [83, 0, 27, "2026-01-06", "2026-08-05"], [83, 2, 13, "2026-05-04", "2026-08-05"], [83, 10, 4, "2026-03-12", "2026-03-12"], [83, 29, 3, "2026-08-03", "2026-08-03"], [83, 3, 3, "2026-03-12", "2026-05-14"], [83, 11, 1, "2026-08-03", "2026-08-03"], [83, 21, 1, "2026-08-05", "2026-08-05"], [83, 25, 1, "2026-08-03", "2026-08-03"], [83, 17, 1, "2026-01-08", "2026-01-08"], [84, 0, 29, "2026-02-05", "2026-08-05"], [84, 2, 29, "2026-04-26", "2026-08-05"], [84, 1, 18, "2026-01-09", "2026-08-05"], [84, 5, 11, "2026-01-09", "2026-08-05"], [84, 14, 6, "2026-01-09", "2026-05-29"], [84, 11, 6, "2026-01-09", "2026-07-25"], [84, 8, 5, "2026-03-16", "2026-05-30"], [84, 10, 4, "2026-04-02", "2026-04-25"], [84, 3, 3, "2026-04-07", "2026-04-26"], [84, 6, 2, "2026-01-09", "2026-01-09"], [84, 28, 1, "2026-06-25", "2026-06-25"], [84, 20, 1, "2026-07-27", "2026-07-27"], [84, 46, 1, "2026-05-29", "2026-05-29"], [84, 4, 1, "2026-04-26", "2026-04-26"], [84, 25, 1, "2026-06-25", "2026-06-25"], [84, 31, 1, "2026-06-25", "2026-06-25"], [84, 27, 1, "2026-01-30", "2026-01-30"], [85, 0, 61, "2026-01-06", "2026-07-10"], [85, 1, 27, "2026-01-06", "2026-07-10"], [85, 2, 12, "2026-04-24", "2026-07-10"], [85, 3, 7, "2026-03-11", "2026-07-06"], [85, 7, 3, "2026-01-06", "2026-01-07"], [85, 14, 3, "2026-01-03", "2026-01-14"], [85, 8, 3, "2026-04-17", "2026-05-07"], [85, 9, 2, "2026-07-06", "2026-07-06"], [85, 27, 1, "2026-01-14", "2026-01-14"], [86, 9, 29, "2026-04-15", "2026-07-28"], [86, 1, 22, "2026-01-20", "2026-07-28"], [86, 0, 18, "2026-01-06", "2026-04-02"], [86, 4, 15, "2026-01-06", "2026-07-22"], [86, 3, 12, "2026-02-26", "2026-07-22"], [86, 10, 4, "2026-02-12", "2026-05-05"], [86, 2, 3, "2026-05-05", "2026-07-28"], [86, 24, 2, "2026-07-28", "2026-07-28"], [86, 32, 2, "2026-02-23", "2026-05-20"], [86, 11, 2, "2026-07-22", "2026-08-05"], [86, 30, 1, "2026-08-02", "2026-08-02"], [86, 28, 1, "2026-07-22", "2026-07-22"], [86, 15, 1, "2026-07-22", "2026-07-22"], [86, 41, 1, "2026-07-22", "2026-07-22"], [86, 31, 1, "2026-07-22", "2026-07-22"], [86, 29, 1, "2026-08-05", "2026-08-05"], [86, 51, 1, "2026-08-05", "2026-08-05"], [86, 38, 1, "2026-07-28", "2026-07-28"], [86, 25, 1, "2026-07-22", "2026-07-22"], [87, 2, 22, "2026-06-23", "2026-08-07"], [87, 0, 21, "2026-06-24", "2026-07-23"], [87, 3, 14, "2026-06-24", "2026-07-23"], [87, 1, 14, "2026-06-23", "2026-08-07"], [87, 10, 8, "2026-06-24", "2026-07-23"], [87, 4, 6, "2026-07-17", "2026-07-22"], [87, 5, 6, "2026-06-26", "2026-08-07"], [87, 20, 4, "2026-06-24", "2026-07-23"], [87, 18, 2, "2026-07-17", "2026-08-07"], [87, 11, 2, "2026-07-22", "2026-08-05"], [87, 12, 2, "2026-07-17", "2026-07-17"], [87, 8, 2, "2026-06-23", "2026-06-23"], [87, 26, 2, "2026-07-17", "2026-07-17"], [87, 13, 2, "2026-06-23", "2026-06-23"], [87, 21, 2, "2026-06-26", "2026-07-23"], [87, 29, 1, "2026-08-05", "2026-08-05"], [87, 25, 1, "2026-07-22", "2026-07-22"], [87, 15, 1, "2026-08-07", "2026-08-07"], [87, 30, 1, "2026-08-02", "2026-08-02"], [87, 6, 1, "2026-06-26", "2026-06-26"], [87, 17, 1, "2026-06-23", "2026-06-23"], [87, 51, 1, "2026-08-05", "2026-08-05"], [87, 28, 1, "2026-07-22", "2026-07-22"], [88, 10, 30, "2026-01-14", "2026-08-05"], [88, 1, 30, "2026-01-14", "2026-08-05"], [88, 0, 24, "2026-01-14", "2026-08-05"], [88, 2, 12, "2026-05-05", "2026-07-20"], [88, 14, 6, "2026-01-16", "2026-05-15"], [88, 11, 5, "2026-01-16", "2026-07-20"], [88, 3, 3, "2026-05-11", "2026-07-13"], [88, 8, 1, "2026-07-14", "2026-07-14"], [88, 27, 1, "2026-02-06", "2026-02-06"], [88, 17, 1, "2026-07-13", "2026-07-13"], [88, 25, 1, "2026-07-20", "2026-07-20"], [88, 46, 1, "2026-05-15", "2026-05-15"], [88, 13, 1, "2026-07-13", "2026-07-13"], [88, 28, 1, "2026-07-20", "2026-07-20"], [89, 0, 87, "2026-01-06", "2026-05-29"], [89, 3, 14, "2026-03-19", "2026-05-29"], [89, 1, 6, "2026-03-19", "2026-05-29"], [89, 2, 3, "2026-04-29", "2026-05-29"], [89, 7, 2, "2026-01-06", "2026-02-19"], [89, 8, 1, "2026-04-02", "2026-04-02"], [89, 20, 1, "2026-04-02", "2026-04-02"], [90, 10, 33, "2026-01-21", "2026-07-16"], [90, 0, 25, "2026-01-21", "2026-07-02"], [90, 2, 18, "2026-04-25", "2026-07-20"], [90, 3, 14, "2026-03-16", "2026-06-25"], [90, 1, 13, "2026-01-21", "2026-07-02"], [90, 7, 10, "2026-02-11", "2026-02-16"], [91, 2, 28, "2026-07-24", "2026-08-06"], [91, 9, 12, "2026-08-05", "2026-08-05"], [91, 13, 8, "2026-07-24", "2026-08-03"], [91, 0, 6, "2026-08-04", "2026-08-05"], [91, 1, 6, "2026-08-03", "2026-08-05"], [91, 15, 6, "2026-07-24", "2026-08-03"], [91, 19, 4, "2026-08-03", "2026-08-03"], [91, 35, 4, "2026-08-03", "2026-08-05"], [91, 5, 4, "2026-08-03", "2026-08-05"], [91, 10, 4, "2026-08-04", "2026-08-05"], [91, 18, 3, "2026-07-24", "2026-08-03"], [91, 11, 3, "2026-07-24", "2026-08-07"], [91, 6, 2, "2026-08-04", "2026-08-04"], [91, 8, 2, "2026-08-03", "2026-08-05"], [91, 34, 1, "2026-07-24", "2026-07-24"], [91, 60, 1, "2026-07-24", "2026-07-24"], [91, 4, 1, "2026-08-06", "2026-08-06"], [91, 50, 1, "2026-07-24", "2026-07-24"], [91, 41, 1, "2026-07-29", "2026-07-29"], [91, 30, 1, "2026-08-04", "2026-08-04"], [91, 64, 1, "2026-07-24", "2026-07-24"], [91, 33, 1, "2026-07-24", "2026-07-24"], [91, 17, 1, "2026-07-24", "2026-07-24"], [91, 57, 1, "2026-07-24", "2026-07-24"], [91, 3, 1, "2026-08-06", "2026-08-06"], [91, 61, 1, "2026-07-29", "2026-07-29"], [91, 31, 1, "2026-07-24", "2026-07-24"], [91, 44, 1, "2026-07-24", "2026-07-24"], [91, 42, 1, "2026-07-24", "2026-07-24"], [91, 51, 1, "2026-08-07", "2026-08-07"], [91, 28, 1, "2026-07-24", "2026-07-24"], [91, 53, 1, "2026-07-29", "2026-07-29"], [91, 25, 1, "2026-07-24", "2026-07-24"], [92, 9, 36, "2026-04-14", "2026-07-09"], [92, 0, 21, "2026-01-06", "2026-08-05"], [92, 1, 21, "2026-01-06", "2026-08-05"], [92, 3, 10, "2026-03-31", "2026-06-02"], [92, 2, 9, "2026-04-30", "2026-08-05"], [92, 29, 4, "2026-08-05", "2026-08-05"], [92, 7, 3, "2026-02-02", "2026-02-02"], [92, 21, 2, "2026-04-14", "2026-04-14"], [92, 8, 1, "2026-04-14", "2026-04-14"], [92, 20, 1, "2026-04-14", "2026-04-14"], [92, 62, 1, "2026-04-14", "2026-04-14"], [92, 25, 1, "2026-08-05", "2026-08-05"], [93, 0, 51, "2026-01-03", "2026-07-21"], [93, 1, 35, "2026-01-03", "2026-07-21"], [93, 2, 10, "2026-05-03", "2026-07-21"], [93, 7, 3, "2026-01-22", "2026-02-08"], [93, 11, 3, "2026-07-21", "2026-08-04"], [93, 29, 2, "2026-08-04", "2026-08-04"], [93, 28, 1, "2026-07-21", "2026-07-21"], [93, 25, 1, "2026-07-21", "2026-07-21"], [93, 51, 1, "2026-08-04", "2026-08-04"], [93, 14, 1, "2026-08-04", "2026-08-04"], [93, 30, 1, "2026-08-01", "2026-08-01"], [94, 0, 39, "2026-01-04", "2026-08-05"], [94, 1, 23, "2026-01-14", "2026-06-25"], [94, 2, 21, "2026-04-27", "2026-08-11"], [94, 3, 13, "2026-04-20", "2026-06-25"], [94, 14, 4, "2026-01-02", "2026-01-15"], [94, 7, 3, "2026-01-04", "2026-02-23"], [94, 10, 2, "2026-04-27", "2026-04-27"], [94, 8, 2, "2026-03-18", "2026-06-07"], [94, 27, 1, "2026-01-15", "2026-01-15"], [95, 0, 32, "2026-01-10", "2026-08-07"], [95, 3, 24, "2026-03-02", "2026-08-07"], [95, 4, 18, "2026-01-10", "2026-08-07"], [95, 1, 17, "2026-01-10", "2026-07-10"], [95, 7, 7, "2026-01-10", "2026-02-12"], [95, 9, 5, "2026-04-25", "2026-05-07"], [95, 2, 3, "2026-05-17", "2026-08-02"], [95, 20, 1, "2026-01-10", "2026-01-10"], [95, 18, 1, "2026-01-10", "2026-01-10"], [96, 7, 36, "2026-01-05", "2026-02-10"], [96, 1, 24, "2026-01-05", "2026-07-06"], [96, 9, 17, "2026-03-05", "2026-07-06"], [96, 0, 14, "2026-01-05", "2026-03-12"], [96, 3, 7, "2026-03-05", "2026-05-07"], [96, 10, 6, "2026-02-09", "2026-02-09"], [96, 48, 1, "2026-02-24", "2026-02-24"], [96, 21, 1, "2026-03-05", "2026-03-05"], [96, 20, 1, "2026-08-10", "2026-08-10"], [97, 0, 31, "2026-03-05", "2026-03-27"], [97, 12, 22, "2026-02-06", "2026-02-06"], [97, 10, 9, "2026-02-06", "2026-03-19"], [97, 1, 9, "2026-02-06", "2026-03-27"], [97, 14, 5, "2026-04-02", "2026-04-24"], [97, 2, 5, "2026-04-24", "2026-07-14"], [97, 5, 4, "2026-02-06", "2026-03-19"], [97, 8, 3, "2026-03-05", "2026-03-12"], [97, 7, 3, "2026-02-06", "2026-02-10"], [97, 3, 3, "2026-03-12", "2026-03-19"], [97, 11, 3, "2026-03-19", "2026-04-02"], [97, 20, 2, "2026-02-06", "2026-03-12"], [97, 28, 1, "2026-03-19", "2026-03-19"], [97, 17, 1, "2026-02-06", "2026-02-06"], [97, 22, 1, "2026-02-06", "2026-02-06"], [97, 6, 1, "2026-02-06", "2026-02-06"], [97, 27, 1, "2026-04-24", "2026-04-24"], [97, 30, 1, "2026-03-30", "2026-03-30"], [97, 25, 1, "2026-03-19", "2026-03-19"], [98, 0, 39, "2026-01-13", "2026-05-14"], [98, 1, 23, "2026-01-13", "2026-05-14"], [98, 7, 18, "2026-01-13", "2026-02-09"], [98, 11, 6, "2026-01-27", "2026-05-27"], [98, 14, 5, "2026-05-27", "2026-06-17"], [98, 3, 5, "2026-03-10", "2026-04-07"], [98, 2, 3, "2026-05-14", "2026-06-10"], [98, 30, 1, "2026-01-24", "2026-01-24"], [98, 27, 1, "2026-06-17", "2026-06-17"], [98, 16, 1, "2026-05-19", "2026-05-19"], [98, 25, 1, "2026-01-13", "2026-01-13"], [98, 28, 1, "2026-01-13", "2026-01-13"], [98, 17, 1, "2026-01-13", "2026-01-13"], [98, 22, 1, "2026-01-13", "2026-01-13"], [99, 2, 16, "2026-05-08", "2026-08-04"], [99, 1, 16, "2026-02-10", "2026-08-07"], [99, 4, 13, "2026-01-11", "2026-06-24"], [99, 3, 13, "2026-03-11", "2026-06-24"], [99, 5, 12, "2026-01-11", "2026-08-07"], [99, 6, 8, "2026-01-13", "2026-08-07"], [99, 11, 8, "2026-01-11", "2026-07-25"], [99, 16, 6, "2026-03-16", "2026-07-14"], [99, 0, 4, "2026-01-14", "2026-06-12"], [99, 30, 1, "2026-01-22", "2026-01-22"], [99, 23, 1, "2026-06-24", "2026-06-24"], [99, 49, 1, "2026-02-10", "2026-02-10"], [99, 7, 1, "2026-02-10", "2026-02-10"], [99, 9, 1, "2026-06-24", "2026-06-24"], [99, 15, 1, "2026-06-12", "2026-06-12"], [99, 25, 1, "2026-01-11", "2026-01-11"], [99, 20, 1, "2026-02-10", "2026-02-10"], [99, 28, 1, "2026-01-11", "2026-01-11"], [100, 0, 48, "2026-01-11", "2026-07-04"], [100, 2, 18, "2026-05-04", "2026-07-26"], [100, 5, 18, "2026-01-11", "2026-06-29"], [100, 1, 17, "2026-01-11", "2026-06-29"], [100, 17, 1, "2026-01-11", "2026-01-11"], [100, 20, 1, "2026-05-28", "2026-05-28"], [100, 22, 1, "2026-01-11", "2026-01-11"], [100, 48, 1, "2026-05-28", "2026-05-28"], [101, 0, 39, "2026-01-05", "2026-07-12"], [101, 1, 30, "2026-01-05", "2026-06-30"], [101, 9, 23, "2026-03-02", "2026-06-30"], [101, 2, 5, "2026-05-13", "2026-08-11"], [101, 8, 5, "2026-03-02", "2026-05-05"], [101, 16, 1, "2026-07-12", "2026-07-12"], [101, 10, 1, "2026-03-16", "2026-03-16"], [102, 3, 28, "2026-03-04", "2026-08-05"], [102, 0, 22, "2026-03-04", "2026-08-05"], [102, 2, 21, "2026-05-08", "2026-08-05"], [102, 1, 11, "2026-02-23", "2026-07-22"], [102, 4, 7, "2026-03-23", "2026-08-05"], [102, 11, 3, "2026-07-22", "2026-07-22"], [102, 8, 2, "2026-03-04", "2026-06-25"], [102, 30, 1, "2026-08-02", "2026-08-02"], [102, 20, 1, "2026-03-04", "2026-03-04"], [102, 13, 1, "2026-03-04", "2026-03-04"], [102, 22, 1, "2026-02-23", "2026-02-23"], [102, 17, 1, "2026-02-23", "2026-02-23"], [102, 10, 1, "2026-03-04", "2026-03-04"], [102, 25, 1, "2026-07-22", "2026-07-22"], [102, 28, 1, "2026-07-22", "2026-07-22"], [102, 27, 1, "2026-08-05", "2026-08-05"], [103, 0, 32, "2026-03-04", "2026-08-06"], [103, 1, 15, "2026-03-04", "2026-07-23"], [103, 2, 9, "2026-05-13", "2026-08-06"], [103, 3, 9, "2026-03-10", "2026-04-02"], [103, 8, 7, "2026-03-04", "2026-07-23"], [103, 11, 7, "2026-03-11", "2026-08-06"], [103, 9, 6, "2026-03-16", "2026-03-16"], [103, 14, 5, "2026-05-21", "2026-06-11"], [103, 19, 2, "2026-07-23", "2026-07-23"], [103, 13, 2, "2026-03-04", "2026-03-10"], [103, 29, 1, "2026-08-06", "2026-08-06"], [103, 28, 1, "2026-07-23", "2026-07-23"], [103, 51, 1, "2026-08-06", "2026-08-06"], [103, 27, 1, "2026-06-11", "2026-06-11"], [103, 30, 1, "2026-08-03", "2026-08-03"], [103, 25, 1, "2026-07-23", "2026-07-23"], [103, 17, 1, "2026-03-04", "2026-03-04"], [104, 0, 31, "2026-01-07", "2026-08-09"], [104, 6, 19, "2026-01-12", "2026-03-17"], [104, 1, 14, "2026-03-17", "2026-08-10"], [104, 2, 13, "2026-04-28", "2026-08-09"], [104, 5, 11, "2026-01-09", "2026-08-10"], [104, 3, 4, "2026-05-05", "2026-07-29"], [104, 9, 2, "2026-04-14", "2026-04-14"], [104, 23, 2, "2026-05-05", "2026-05-05"], [104, 47, 1, "2026-05-05", "2026-05-05"], [104, 20, 1, "2026-05-05", "2026-05-05"], [105, 1, 19, "2026-01-13", "2026-08-05"], [105, 2, 19, "2026-05-08", "2026-08-05"], [105, 3, 15, "2026-03-05", "2026-08-05"], [105, 0, 10, "2026-01-04", "2026-08-05"], [105, 14, 5, "2026-01-03", "2026-08-09"], [105, 6, 5, "2026-01-14", "2026-02-05"], [105, 7, 5, "2026-01-04", "2026-02-03"], [105, 5, 5, "2026-01-13", "2026-07-30"], [105, 4, 4, "2026-02-17", "2026-06-01"], [105, 18, 2, "2026-02-01", "2026-08-05"], [105, 11, 2, "2026-08-09", "2026-08-09"], [105, 20, 2, "2026-06-02", "2026-06-02"], [105, 19, 2, "2026-05-08", "2026-05-08"], [105, 51, 1, "2026-08-09", "2026-08-09"], [105, 30, 1, "2026-08-06", "2026-08-06"], [105, 27, 1, "2026-01-16", "2026-01-16"], [106, 0, 66, "2026-01-06", "2026-01-22"], [106, 1, 20, "2026-01-09", "2026-01-21"], [106, 14, 5, "2026-01-23", "2026-02-13"], [106, 11, 3, "2026-01-23", "2026-01-23"], [106, 27, 1, "2026-02-13", "2026-02-13"], [106, 10, 1, "2026-01-06", "2026-01-06"], [106, 18, 1, "2026-01-16", "2026-01-16"], [107, 0, 33, "2026-01-22", "2026-07-09"], [107, 1, 17, "2026-01-22", "2026-07-09"], [107, 11, 13, "2026-01-18", "2026-07-18"], [107, 10, 8, "2026-02-05", "2026-02-10"], [107, 14, 7, "2026-05-18", "2026-06-18"], [107, 7, 5, "2026-01-22", "2026-02-25"], [107, 2, 4, "2026-03-17", "2026-07-11"], [107, 9, 4, "2026-04-08", "2026-05-25"], [107, 3, 3, "2026-05-26", "2026-06-05"], [107, 46, 2, "2026-05-22", "2026-05-22"], [107, 15, 1, "2026-03-17", "2026-03-17"], [108, 9, 26, "2026-04-06", "2026-08-07"], [108, 1, 18, "2026-02-28", "2026-07-22"], [108, 2, 15, "2026-05-01", "2026-08-07"], [108, 5, 11, "2026-02-05", "2026-07-22"], [108, 3, 5, "2026-05-01", "2026-06-22"], [108, 0, 5, "2026-02-05", "2026-03-12"], [108, 8, 4, "2026-02-28", "2026-06-08"], [108, 6, 1, "2026-06-27", "2026-06-27"], [108, 7, 1, "2026-02-05", "2026-02-05"], [108, 17, 1, "2026-02-05", "2026-02-05"], [108, 51, 1, "2026-08-05", "2026-08-05"], [108, 29, 1, "2026-08-05", "2026-08-05"], [108, 11, 1, "2026-08-05", "2026-08-05"], [108, 28, 1, "2026-07-22", "2026-07-22"], [108, 20, 1, "2026-06-27", "2026-06-27"], [108, 30, 1, "2026-08-02", "2026-08-02"], [108, 25, 1, "2026-07-22", "2026-07-22"], [108, 22, 1, "2026-02-05", "2026-02-05"], [109, 2, 18, "2026-03-27", "2026-08-10"], [109, 1, 12, "2026-03-24", "2026-08-08"], [109, 5, 10, "2026-03-26", "2026-08-08"], [109, 10, 8, "2026-03-26", "2026-05-12"], [109, 0, 8, "2026-03-24", "2026-08-10"], [109, 3, 8, "2026-03-26", "2026-07-20"], [109, 4, 5, "2026-04-01", "2026-07-20"], [109, 12, 4, "2026-03-27", "2026-03-27"], [109, 9, 4, "2026-03-27", "2026-05-12"], [109, 13, 3, "2026-03-24", "2026-03-26"], [109, 18, 2, "2026-03-27", "2026-08-08"], [109, 15, 2, "2026-03-27", "2026-03-27"], [109, 20, 2, "2026-03-27", "2026-08-08"], [109, 24, 1, "2026-03-31", "2026-03-31"], [109, 48, 1, "2026-03-27", "2026-03-27"], [109, 21, 1, "2026-03-27", "2026-03-27"], [109, 6, 1, "2026-05-01", "2026-05-01"], [109, 25, 1, "2026-08-08", "2026-08-08"], [109, 29, 1, "2026-08-08", "2026-08-08"], [109, 32, 1, "2026-04-01", "2026-04-01"], [109, 8, 1, "2026-03-24", "2026-03-24"], [109, 17, 1, "2026-03-24", "2026-03-24"], [110, 1, 20, "2026-01-21", "2026-06-26"], [110, 0, 18, "2026-01-21", "2026-06-26"], [110, 24, 13, "2026-04-01", "2026-06-17"], [110, 2, 12, "2026-04-30", "2026-06-26"], [110, 38, 9, "2026-06-17", "2026-06-17"], [110, 3, 6, "2026-03-13", "2026-06-26"], [110, 4, 6, "2026-02-12", "2026-05-07"], [110, 8, 5, "2026-03-13", "2026-05-28"], [110, 21, 2, "2026-03-13", "2026-06-17"], [110, 33, 2, "2026-05-20", "2026-06-26"], [110, 23, 1, "2026-02-12", "2026-02-12"], [111, 0, 32, "2026-03-08", "2026-08-10"], [111, 1, 21, "2026-02-17", "2026-07-28"], [111, 2, 13, "2026-04-28", "2026-08-10"], [111, 11, 6, "2026-03-23", "2026-08-06"], [111, 3, 5, "2026-03-23", "2026-07-28"], [111, 8, 4, "2026-03-08", "2026-06-02"], [111, 10, 2, "2026-03-23", "2026-05-07"], [111, 34, 2, "2026-03-23", "2026-03-23"], [111, 25, 1, "2026-03-23", "2026-03-23"], [111, 23, 1, "2026-03-23", "2026-03-23"], [111, 30, 1, "2026-04-03", "2026-04-03"], [111, 29, 1, "2026-08-06", "2026-08-06"], [111, 7, 1, "2026-02-19", "2026-02-19"], [111, 20, 1, "2026-03-10", "2026-03-10"], [111, 28, 1, "2026-03-23", "2026-03-23"], [111, 43, 1, "2026-03-23", "2026-03-23"], [112, 33, 13, "2026-05-15", "2026-05-15"], [112, 2, 12, "2026-05-12", "2026-08-04"], [112, 24, 11, "2026-05-15", "2026-05-15"], [112, 34, 8, "2026-05-12", "2026-05-20"], [112, 43, 7, "2026-05-12", "2026-05-20"], [112, 13, 6, "2026-05-12", "2026-05-20"], [112, 0, 6, "2026-06-19", "2026-08-04"], [112, 1, 6, "2026-06-19", "2026-08-04"], [112, 35, 3, "2026-06-19", "2026-08-04"], [112, 5, 3, "2026-06-19", "2026-08-04"], [112, 6, 3, "2026-06-19", "2026-08-04"], [112, 8, 2, "2026-05-12", "2026-08-04"], [112, 22, 1, "2026-01-21", "2026-01-21"], [112, 44, 1, "2026-05-20", "2026-05-20"], [112, 3, 1, "2026-08-04", "2026-08-04"], [112, 27, 1, "2026-05-12", "2026-05-12"], [112, 42, 1, "2026-05-20", "2026-05-20"], [112, 17, 1, "2026-05-12", "2026-05-12"], [112, 4, 1, "2026-08-04", "2026-08-04"], [112, 53, 1, "2026-05-12", "2026-05-12"], [112, 10, 1, "2026-06-19", "2026-06-19"], [112, 11, 1, "2026-05-12", "2026-05-12"], [113, 2, 61, "2026-04-02", "2026-07-28"], [113, 1, 17, "2026-03-27", "2026-07-28"], [113, 63, 2, "2026-01-12", "2026-01-12"], [113, 4, 1, "2026-05-20", "2026-05-20"], [113, 10, 1, "2026-06-05", "2026-06-05"], [113, 5, 1, "2026-05-20", "2026-05-20"], [113, 15, 1, "2026-04-02", "2026-04-02"], [113, 7, 1, "2026-01-21", "2026-01-21"], [113, 18, 1, "2026-07-20", "2026-07-20"], [113, 3, 1, "2026-05-20", "2026-05-20"], [114, 2, 25, "2026-04-02", "2026-08-06"], [114, 4, 20, "2026-04-29", "2026-06-23"], [114, 1, 14, "2026-04-01", "2026-08-04"], [114, 0, 12, "2026-04-01", "2026-08-06"], [114, 32, 8, "2026-04-29", "2026-08-04"], [114, 15, 3, "2026-04-02", "2026-05-01"], [114, 3, 2, "2026-04-29", "2026-08-05"], [114, 8, 1, "2026-04-01", "2026-04-01"], [114, 16, 1, "2026-05-25", "2026-05-25"], [114, 31, 1, "2026-05-01", "2026-05-01"], [115, 0, 31, "2026-01-07", "2026-07-07"], [115, 3, 15, "2026-04-22", "2026-06-18"], [115, 2, 15, "2026-04-22", "2026-06-18"], [115, 1, 10, "2026-01-07", "2026-06-16"], [115, 9, 8, "2026-04-22", "2026-04-22"], [115, 7, 3, "2026-01-15", "2026-01-28"], [115, 8, 2, "2026-06-12", "2026-06-17"], [115, 20, 1, "2026-05-05", "2026-05-05"], [115, 5, 1, "2026-06-12", "2026-06-12"], [115, 10, 1, "2026-07-07", "2026-07-07"], [116, 1, 22, "2026-03-05", "2026-08-11"], [116, 0, 21, "2026-03-05", "2026-08-07"], [116, 2, 8, "2026-05-05", "2026-08-11"], [116, 3, 7, "2026-04-08", "2026-04-13"], [116, 13, 4, "2026-08-11", "2026-08-11"], [116, 8, 3, "2026-03-05", "2026-08-11"], [116, 5, 2, "2026-03-05", "2026-03-05"], [116, 34, 2, "2026-08-11", "2026-08-11"], [116, 11, 2, "2026-08-07", "2026-08-11"], [116, 43, 1, "2026-08-11", "2026-08-11"], [116, 48, 1, "2026-04-13", "2026-04-13"], [116, 17, 1, "2026-08-11", "2026-08-11"], [116, 25, 1, "2026-08-07", "2026-08-07"], [116, 42, 1, "2026-08-11", "2026-08-11"], [116, 29, 1, "2026-08-07", "2026-08-07"], [116, 69, 1, "2026-08-11", "2026-08-11"], [116, 67, 1, "2026-08-11", "2026-08-11"], [116, 44, 1, "2026-08-11", "2026-08-11"], [116, 20, 1, "2026-04-13", "2026-04-13"], [116, 70, 1, "2026-08-11", "2026-08-11"], [117, 0, 29, "2026-01-14", "2026-07-02"], [117, 1, 20, "2026-01-14", "2026-07-02"], [117, 3, 14, "2026-03-04", "2026-07-02"], [117, 7, 8, "2026-01-14", "2026-02-17"], [117, 2, 8, "2026-04-30", "2026-07-28"], [117, 10, 1, "2026-06-02", "2026-06-02"], [118, 2, 27, "2026-02-27", "2026-08-07"], [118, 1, 20, "2026-01-02", "2026-05-19"], [118, 15, 10, "2026-02-27", "2026-08-07"], [118, 18, 9, "2026-01-21", "2026-08-03"], [118, 13, 4, "2026-05-19", "2026-05-19"], [118, 0, 2, "2026-05-19", "2026-08-03"], [118, 34, 2, "2026-05-19", "2026-05-19"], [118, 10, 2, "2026-02-02", "2026-08-03"], [118, 43, 2, "2026-05-19", "2026-05-19"], [118, 42, 1, "2026-05-19", "2026-05-19"], [118, 33, 1, "2026-05-19", "2026-05-19"], [119, 0, 17, "2026-01-05", "2026-08-03"], [119, 3, 14, "2026-03-02", "2026-08-03"], [119, 2, 13, "2026-05-05", "2026-08-03"], [119, 1, 11, "2026-01-05", "2026-08-03"], [119, 4, 7, "2026-02-04", "2026-08-03"], [119, 34, 3, "2026-07-17", "2026-07-17"], [119, 13, 3, "2026-07-17", "2026-07-17"], [119, 24, 2, "2026-04-06", "2026-04-06"], [119, 11, 2, "2026-07-16", "2026-07-30"], [119, 21, 1, "2026-05-05", "2026-05-05"], [119, 43, 1, "2026-07-17", "2026-07-17"], [119, 25, 1, "2026-07-16", "2026-07-16"], [119, 62, 1, "2026-07-16", "2026-07-16"], [119, 28, 1, "2026-07-16", "2026-07-16"], [119, 30, 1, "2026-07-27", "2026-07-27"], [119, 18, 1, "2026-07-17", "2026-07-17"], [120, 0, 23, "2026-01-18", "2026-03-28"], [120, 3, 17, "2026-03-17", "2026-03-28"], [120, 1, 16, "2026-01-18", "2026-07-16"], [120, 9, 9, "2026-04-17", "2026-07-16"], [120, 24, 9, "2026-03-17", "2026-07-16"], [120, 2, 3, "2026-08-10", "2026-08-11"], [120, 38, 1, "2026-06-08", "2026-06-08"], [120, 13, 1, "2026-03-17", "2026-03-17"], [121, 0, 45, "2026-01-27", "2026-08-09"], [121, 2, 15, "2026-04-22", "2026-08-09"], [121, 1, 12, "2026-02-18", "2026-06-24"], [121, 8, 3, "2026-02-26", "2026-06-24"], [121, 3, 2, "2026-04-16", "2026-07-05"], [121, 20, 1, "2026-04-26", "2026-04-26"], [122, 0, 17, "2026-01-28", "2026-07-17"], [122, 7, 14, "2026-01-28", "2026-01-28"], [122, 3, 11, "2026-03-31", "2026-07-17"], [122, 10, 9, "2026-01-28", "2026-03-31"], [122, 1, 7, "2026-01-28", "2026-07-17"], [122, 4, 4, "2026-02-03", "2026-07-17"], [122, 5, 3, "2026-02-25", "2026-07-17"], [122, 2, 2, "2026-05-29", "2026-07-17"], [122, 11, 2, "2026-07-17", "2026-07-31"], [122, 51, 1, "2026-07-31", "2026-07-31"], [122, 30, 1, "2026-07-28", "2026-07-28"], [122, 28, 1, "2026-07-17", "2026-07-17"], [122, 13, 1, "2026-03-31", "2026-03-31"], [122, 29, 1, "2026-07-31", "2026-07-31"], [122, 12, 1, "2026-01-27", "2026-01-27"], [122, 25, 1, "2026-07-17", "2026-07-17"], [122, 17, 1, "2026-01-15", "2026-01-15"], [123, 0, 20, "2026-01-27", "2026-07-06"], [123, 1, 20, "2026-01-27", "2026-07-06"], [123, 2, 10, "2026-05-14", "2026-07-06"], [123, 14, 5, "2026-02-12", "2026-03-05"], [123, 7, 4, "2026-01-27", "2026-02-07"], [123, 3, 3, "2026-05-14", "2026-06-07"], [123, 11, 3, "2026-01-12", "2026-02-12"], [123, 20, 2, "2026-03-06", "2026-06-08"], [123, 8, 2, "2026-04-03", "2026-05-14"], [123, 10, 2, "2026-02-24", "2026-04-03"], [123, 5, 1, "2026-03-06", "2026-03-06"], [123, 21, 1, "2026-03-06", "2026-03-06"], [123, 27, 1, "2026-03-05", "2026-03-05"], [123, 30, 1, "2026-01-09", "2026-01-09"], [123, 23, 1, "2026-06-05", "2026-06-05"], [124, 0, 19, "2026-01-21", "2026-07-21"], [124, 3, 14, "2026-03-21", "2026-07-21"], [124, 1, 12, "2026-01-26", "2026-07-21"], [124, 2, 10, "2026-04-21", "2026-08-04"], [124, 7, 7, "2026-01-21", "2026-02-18"], [124, 29, 2, "2026-08-04", "2026-08-04"], [124, 11, 2, "2026-08-04", "2026-08-04"], [124, 18, 2, "2026-07-21", "2026-07-21"], [124, 51, 1, "2026-08-04", "2026-08-04"], [124, 15, 1, "2026-07-21", "2026-07-21"], [124, 25, 1, "2026-07-21", "2026-07-21"], [124, 30, 1, "2026-08-01", "2026-08-01"], [124, 28, 1, "2026-07-21", "2026-07-21"], [124, 20, 1, "2026-06-10", "2026-06-10"], [124, 31, 1, "2026-07-21", "2026-07-21"], [125, 1, 16, "2026-01-30", "2026-08-03"], [125, 4, 12, "2026-01-15", "2026-08-10"], [125, 0, 11, "2026-01-30", "2026-08-03"], [125, 2, 10, "2026-04-30", "2026-08-10"], [125, 3, 10, "2026-03-31", "2026-08-10"], [125, 11, 2, "2026-07-16", "2026-07-30"], [125, 8, 2, "2026-06-30", "2026-07-31"], [125, 13, 2, "2026-07-16", "2026-07-16"], [125, 30, 1, "2026-07-27", "2026-07-27"], [125, 44, 1, "2026-07-16", "2026-07-16"], [125, 24, 1, "2026-07-31", "2026-07-31"], [125, 28, 1, "2026-07-16", "2026-07-16"], [125, 25, 1, "2026-07-16", "2026-07-16"], [125, 42, 1, "2026-07-16", "2026-07-16"], [125, 33, 1, "2026-07-31", "2026-07-31"], [125, 34, 1, "2026-07-16", "2026-07-16"], [125, 26, 1, "2026-04-20", "2026-04-20"], [126, 0, 27, "2026-04-03", "2026-08-10"], [126, 1, 26, "2026-04-03", "2026-07-14"], [126, 2, 16, "2026-04-27", "2026-07-28"], [126, 3, 3, "2026-04-27", "2026-07-14"], [126, 8, 2, "2026-04-03", "2026-04-17"], [127, 0, 22, "2026-01-05", "2026-05-13"], [127, 1, 17, "2026-01-05", "2026-08-04"], [127, 9, 9, "2026-03-04", "2026-08-04"], [127, 11, 9, "2026-01-07", "2026-08-04"], [127, 14, 5, "2026-05-07", "2026-05-28"], [127, 29, 4, "2026-08-04", "2026-08-04"], [127, 2, 2, "2026-05-13", "2026-05-13"], [127, 8, 2, "2026-04-07", "2026-05-13"], [127, 25, 1, "2026-08-04", "2026-08-04"], [127, 3, 1, "2026-05-13", "2026-05-13"], [127, 27, 1, "2026-05-28", "2026-05-28"], [128, 10, 16, "2026-01-05", "2026-05-28"], [128, 3, 13, "2026-03-05", "2026-07-02"], [128, 1, 11, "2026-01-05", "2026-07-02"], [128, 2, 10, "2026-03-31", "2026-07-02"], [128, 9, 6, "2026-04-03", "2026-07-02"], [128, 0, 5, "2026-01-05", "2026-04-02"], [128, 4, 4, "2026-03-17", "2026-03-17"], [128, 15, 3, "2026-03-31", "2026-06-15"], [128, 7, 1, "2026-02-01", "2026-02-01"], [128, 8, 1, "2026-06-17", "2026-06-17"], [128, 20, 1, "2026-03-05", "2026-03-05"], [128, 21, 1, "2026-03-10", "2026-03-10"], [129, 0, 17, "2026-01-12", "2026-07-09"], [129, 2, 13, "2026-04-30", "2026-07-09"], [129, 3, 13, "2026-02-26", "2026-07-09"], [129, 1, 9, "2026-01-12", "2026-07-04"], [129, 4, 8, "2026-01-12", "2026-07-04"], [129, 11, 7, "2026-01-29", "2026-07-29"], [129, 7, 3, "2026-01-18", "2026-01-28"], [129, 10, 1, "2026-01-28", "2026-01-28"], [130, 0, 36, "2026-01-08", "2026-07-13"], [130, 2, 12, "2026-04-22", "2026-08-11"], [130, 1, 9, "2026-01-13", "2026-06-18"], [130, 12, 4, "2026-01-13", "2026-01-13"], [130, 14, 4, "2026-01-02", "2026-01-15"], [130, 3, 2, "2026-06-09", "2026-06-09"], [130, 7, 2, "2026-01-13", "2026-02-02"], [130, 27, 1, "2026-01-15", "2026-01-15"], [130, 8, 1, "2026-03-13", "2026-03-13"], [131, 1, 18, "2026-06-09", "2026-08-07"], [131, 0, 8, "2026-06-09", "2026-07-30"], [131, 5, 7, "2026-06-09", "2026-08-07"], [131, 2, 6, "2026-06-09", "2026-07-30"], [131, 6, 6, "2026-06-09", "2026-07-29"], [131, 10, 5, "2026-06-09", "2026-07-29"], [131, 9, 5, "2026-06-09", "2026-07-29"], [131, 13, 3, "2026-06-09", "2026-06-09"], [131, 8, 2, "2026-06-09", "2026-06-09"], [131, 23, 2, "2026-07-30", "2026-07-30"], [131, 3, 2, "2026-07-30", "2026-07-30"], [131, 30, 1, "2026-08-09", "2026-08-09"], [131, 20, 1, "2026-07-30", "2026-07-30"], [131, 11, 1, "2026-07-29", "2026-07-29"], [131, 17, 1, "2026-06-09", "2026-06-09"], [131, 25, 1, "2026-07-29", "2026-07-29"], [131, 28, 1, "2026-07-29", "2026-07-29"], [132, 0, 16, "2026-01-10", "2026-08-06"], [132, 3, 15, "2026-03-14", "2026-08-06"], [132, 1, 14, "2026-01-26", "2026-07-07"], [132, 4, 14, "2026-06-06", "2026-07-07"], [132, 2, 7, "2026-05-01", "2026-08-06"], [132, 5, 1, "2026-01-26", "2026-01-26"], [132, 32, 1, "2026-06-06", "2026-06-06"], [132, 7, 1, "2026-01-26", "2026-01-26"], [132, 8, 1, "2026-03-14", "2026-03-14"], [133, 6, 22, "2026-01-09", "2026-02-23"], [133, 0, 15, "2026-01-12", "2026-06-12"], [133, 1, 11, "2026-01-12", "2026-06-12"], [133, 2, 7, "2026-05-11", "2026-06-15"], [133, 8, 6, "2026-03-17", "2026-06-12"], [133, 5, 5, "2026-01-12", "2026-05-11"], [133, 9, 1, "2026-03-18", "2026-03-18"], [133, 3, 1, "2026-04-02", "2026-04-02"], [133, 11, 1, "2026-04-28", "2026-04-28"], [133, 21, 1, "2026-04-22", "2026-04-22"], [134, 1, 25, "2026-01-06", "2026-07-06"], [134, 0, 17, "2026-01-06", "2026-07-06"], [134, 2, 16, "2026-04-26", "2026-07-20"], [134, 8, 8, "2026-02-28", "2026-07-20"], [134, 3, 3, "2026-02-28", "2026-05-26"], [135, 4, 14, "2026-01-23", "2026-07-10"], [135, 0, 11, "2026-02-27", "2026-07-10"], [135, 1, 10, "2026-02-27", "2026-07-10"], [135, 3, 10, "2026-02-27", "2026-07-10"], [135, 5, 9, "2026-01-23", "2026-07-10"], [135, 2, 6, "2026-04-27", "2026-07-10"], [135, 19, 2, "2026-05-31", "2026-05-31"], [135, 26, 1, "2026-03-30", "2026-03-30"], [135, 7, 1, "2026-01-23", "2026-01-23"], [135, 12, 1, "2026-04-27", "2026-04-27"], [136, 1, 13, "2026-02-04", "2026-08-03"], [136, 2, 13, "2026-05-04", "2026-06-25"], [136, 0, 12, "2026-02-04", "2026-08-03"], [136, 12, 10, "2026-01-02", "2026-01-02"], [136, 4, 8, "2026-02-04", "2026-06-15"], [136, 3, 7, "2026-02-26", "2026-06-15"], [136, 10, 1, "2026-03-11", "2026-03-11"], [137, 0, 14, "2026-03-10", "2026-07-02"], [137, 14, 10, "2026-03-25", "2026-05-26"], [137, 1, 9, "2026-03-10", "2026-07-02"], [137, 11, 5, "2026-03-25", "2026-04-25"], [137, 5, 5, "2026-03-10", "2026-07-02"], [137, 10, 4, "2026-03-10", "2026-03-18"], [137, 2, 3, "2026-03-11", "2026-07-02"], [137, 20, 2, "2026-03-10", "2026-07-02"], [137, 34, 2, "2026-03-11", "2026-03-11"], [137, 30, 1, "2026-03-22", "2026-03-22"], [137, 27, 1, "2026-05-16", "2026-05-16"], [137, 15, 1, "2026-03-11", "2026-03-11"], [137, 28, 1, "2026-03-11", "2026-03-11"], [137, 25, 1, "2026-03-11", "2026-03-11"], [137, 8, 1, "2026-05-26", "2026-05-26"], [137, 46, 1, "2026-05-26", "2026-05-26"], [137, 3, 1, "2026-07-02", "2026-07-02"], [137, 48, 1, "2026-07-02", "2026-07-02"], [137, 43, 1, "2026-03-11", "2026-03-11"], [138, 2, 15, "2026-05-24", "2026-06-07"], [138, 13, 10, "2026-05-24", "2026-05-24"], [138, 0, 7, "2026-05-24", "2026-06-07"], [138, 10, 5, "2026-05-24", "2026-06-07"], [138, 14, 5, "2026-06-07", "2026-06-28"], [138, 11, 3, "2026-05-24", "2026-06-07"], [138, 3, 2, "2026-05-24", "2026-05-24"], [138, 42, 2, "2026-05-24", "2026-05-24"], [138, 1, 2, "2026-05-24", "2026-05-24"], [138, 44, 2, "2026-05-24", "2026-05-24"], [138, 34, 1, "2026-05-24", "2026-05-24"], [138, 18, 1, "2026-05-24", "2026-05-24"], [138, 17, 1, "2026-05-24", "2026-05-24"], [138, 28, 1, "2026-05-24", "2026-05-24"], [138, 30, 1, "2026-06-04", "2026-06-04"], [138, 15, 1, "2026-05-24", "2026-05-24"], [138, 25, 1, "2026-05-24", "2026-05-24"], [138, 8, 1, "2026-05-24", "2026-05-24"], [138, 27, 1, "2026-06-28", "2026-06-28"], [138, 4, 1, "2026-05-24", "2026-05-24"], [139, 1, 11, "2026-01-04", "2026-08-03"], [139, 2, 11, "2026-05-03", "2026-08-03"], [139, 11, 10, "2026-01-07", "2026-08-07"], [139, 3, 8, "2026-03-03", "2026-08-03"], [139, 0, 8, "2026-02-01", "2026-08-03"], [139, 4, 8, "2026-01-17", "2026-08-03"], [139, 10, 5, "2026-01-04", "2026-05-04"], [139, 18, 1, "2026-04-09", "2026-04-09"], [140, 0, 25, "2026-01-05", "2026-07-28"], [140, 1, 16, "2026-01-05", "2026-07-28"], [140, 2, 8, "2026-05-05", "2026-07-28"], [140, 8, 5, "2026-04-23", "2026-07-28"], [140, 11, 2, "2026-07-28", "2026-08-11"], [140, 7, 1, "2026-02-12", "2026-02-12"], [140, 28, 1, "2026-07-28", "2026-07-28"], [140, 51, 1, "2026-08-11", "2026-08-11"], [140, 3, 1, "2026-05-05", "2026-05-05"], [140, 30, 1, "2026-08-08", "2026-08-08"], [140, 25, 1, "2026-07-28", "2026-07-28"], [141, 1, 23, "2026-01-07", "2026-07-24"], [141, 0, 13, "2026-01-07", "2026-07-24"], [141, 2, 7, "2026-05-13", "2026-07-24"], [141, 12, 5, "2026-07-24", "2026-07-24"], [141, 11, 3, "2026-07-24", "2026-08-07"], [141, 19, 2, "2026-07-24", "2026-07-24"], [141, 15, 1, "2026-07-24", "2026-07-24"], [141, 14, 1, "2026-08-07", "2026-08-07"], [141, 28, 1, "2026-07-24", "2026-07-24"], [141, 18, 1, "2026-07-24", "2026-07-24"], [141, 30, 1, "2026-08-04", "2026-08-04"], [141, 8, 1, "2026-07-07", "2026-07-07"], [141, 51, 1, "2026-08-07", "2026-08-07"], [141, 3, 1, "2026-07-24", "2026-07-24"], [141, 25, 1, "2026-07-24", "2026-07-24"], [142, 1, 21, "2026-01-16", "2026-08-04"], [142, 0, 17, "2026-01-16", "2026-08-04"], [142, 2, 9, "2026-05-08", "2026-08-04"], [142, 10, 7, "2026-01-15", "2026-03-14"], [142, 3, 2, "2026-04-08", "2026-05-08"], [142, 11, 1, "2026-07-30", "2026-07-30"], [142, 25, 1, "2026-07-30", "2026-07-30"], [142, 28, 1, "2026-07-30", "2026-07-30"], [142, 30, 1, "2026-08-10", "2026-08-10"], [143, 2, 39, "2026-04-03", "2026-08-04"], [143, 15, 6, "2026-04-03", "2026-04-24"], [143, 1, 6, "2026-07-09", "2026-07-09"], [143, 18, 6, "2026-01-05", "2026-01-19"], [143, 5, 1, "2026-02-25", "2026-02-25"], [143, 20, 1, "2026-02-25", "2026-02-25"], [143, 7, 1, "2026-01-06", "2026-01-06"], [144, 1, 11, "2026-02-15", "2026-04-01"], [144, 2, 8, "2026-04-01", "2026-05-03"], [144, 3, 7, "2026-03-18", "2026-04-25"], [144, 5, 6, "2026-02-15", "2026-04-25"], [144, 20, 6, "2026-04-25", "2026-04-25"], [144, 11, 3, "2026-04-25", "2026-05-03"], [144, 6, 3, "2026-02-15", "2026-02-15"], [144, 54, 3, "2026-04-25", "2026-04-25"], [144, 48, 2, "2026-02-15", "2026-04-25"], [144, 27, 2, "2026-05-11", "2026-05-11"], [144, 15, 2, "2026-04-01", "2026-04-25"], [144, 30, 1, "2026-05-06", "2026-05-06"], [144, 28, 1, "2026-04-25", "2026-04-25"], [144, 62, 1, "2026-04-25", "2026-04-25"], [144, 25, 1, "2026-04-25", "2026-04-25"], [144, 24, 1, "2026-04-01", "2026-04-01"], [144, 17, 1, "2026-02-15", "2026-02-15"], [144, 16, 1, "2026-04-25", "2026-04-25"], [145, 1, 11, "2026-03-26", "2026-06-17"], [145, 3, 10, "2026-03-26", "2026-06-17"], [145, 0, 9, "2026-03-26", "2026-06-17"], [145, 4, 9, "2026-03-26", "2026-06-17"], [145, 8, 8, "2026-03-26", "2026-06-17"], [145, 21, 6, "2026-03-26", "2026-03-26"], [145, 2, 3, "2026-05-11", "2026-06-17"], [145, 20, 1, "2026-03-31", "2026-03-31"], [145, 9, 1, "2026-04-18", "2026-04-18"], [146, 0, 21, "2026-01-07", "2026-04-16"], [146, 1, 10, "2026-01-07", "2026-04-16"], [146, 7, 10, "2026-01-07", "2026-02-03"], [146, 3, 6, "2026-03-20", "2026-04-16"], [146, 8, 2, "2026-03-20", "2026-04-16"], [146, 21, 2, "2026-04-16", "2026-04-16"], [146, 24, 2, "2026-04-03", "2026-04-03"], [146, 33, 2, "2026-03-20", "2026-04-03"], [146, 5, 1, "2026-02-03", "2026-02-03"], [146, 20, 1, "2026-02-03", "2026-02-03"], [147, 0, 31, "2026-03-05", "2026-04-25"], [147, 5, 9, "2026-04-07", "2026-04-07"], [147, 3, 6, "2026-03-17", "2026-05-04"], [147, 1, 3, "2026-03-05", "2026-04-25"], [147, 21, 2, "2026-04-07", "2026-04-07"], [147, 23, 2, "2026-05-04", "2026-05-04"], [147, 2, 2, "2026-05-04", "2026-05-18"], [147, 47, 1, "2026-05-04", "2026-05-04"], [147, 10, 1, "2026-04-07", "2026-04-07"], [148, 3, 13, "2026-02-26", "2026-04-27"], [148, 0, 12, "2026-01-14", "2026-07-27"], [148, 4, 10, "2026-02-26", "2026-04-27"], [148, 2, 9, "2026-04-30", "2026-07-27"], [148, 1, 7, "2026-02-03", "2026-06-19"], [148, 26, 2, "2026-03-21", "2026-04-03"], [148, 17, 1, "2026-03-02", "2026-03-02"], [148, 5, 1, "2026-02-03", "2026-02-03"], [148, 6, 1, "2026-02-03", "2026-02-03"], [148, 13, 1, "2026-03-02", "2026-03-02"], [149, 0, 33, "2026-01-19", "2026-07-15"], [149, 1, 13, "2026-01-19", "2026-07-15"], [149, 2, 7, "2026-04-30", "2026-07-16"], [149, 8, 1, "2026-03-05", "2026-03-05"], [150, 1, 17, "2026-01-15", "2026-07-07"], [150, 0, 16, "2026-01-15", "2026-07-16"], [150, 2, 13, "2026-04-21", "2026-07-16"], [150, 8, 4, "2026-04-28", "2026-07-07"], [150, 3, 1, "2026-03-10", "2026-03-10"], [150, 7, 1, "2026-01-26", "2026-01-26"], [150, 9, 1, "2026-04-20", "2026-04-20"], [151, 0, 29, "2026-01-06", "2026-07-02"], [151, 1, 15, "2026-01-06", "2026-07-02"], [151, 2, 6, "2026-05-06", "2026-08-04"], [151, 7, 2, "2026-01-06", "2026-02-06"], [151, 3, 1, "2026-02-26", "2026-02-26"], [152, 0, 22, "2026-03-12", "2026-06-22"], [152, 3, 14, "2026-03-12", "2026-06-22"], [152, 1, 12, "2026-03-12", "2026-06-22"], [152, 2, 5, "2026-04-21", "2026-06-22"], [153, 0, 13, "2026-01-14", "2026-08-10"], [153, 1, 11, "2026-03-14", "2026-08-09"], [153, 5, 11, "2026-01-31", "2026-08-09"], [153, 4, 6, "2026-01-14", "2026-08-09"], [153, 3, 5, "2026-06-19", "2026-08-09"], [153, 2, 4, "2026-06-19", "2026-08-10"], [153, 29, 1, "2026-08-09", "2026-08-09"], [153, 25, 1, "2026-08-09", "2026-08-09"], [153, 20, 1, "2026-03-14", "2026-03-14"], [154, 0, 12, "2026-03-17", "2026-06-24"], [154, 2, 11, "2026-03-18", "2026-06-24"], [154, 1, 10, "2026-03-17", "2026-06-24"], [154, 10, 4, "2026-03-18", "2026-06-24"], [154, 5, 4, "2026-03-17", "2026-06-24"], [154, 3, 3, "2026-03-18", "2026-06-24"], [154, 8, 2, "2026-03-18", "2026-06-24"], [154, 13, 2, "2026-03-17", "2026-03-17"], [154, 22, 1, "2026-03-17", "2026-03-17"], [154, 15, 1, "2026-03-18", "2026-03-18"], [154, 20, 1, "2026-03-17", "2026-03-17"], [154, 17, 1, "2026-03-17", "2026-03-17"], [155, 0, 28, "2026-01-02", "2026-04-03"], [155, 7, 9, "2026-01-02", "2026-02-16"], [155, 3, 7, "2026-03-01", "2026-03-15"], [155, 1, 7, "2026-01-16", "2026-03-15"], [155, 10, 1, "2026-01-02", "2026-01-02"], [156, 0, 15, "2026-07-14", "2026-08-05"], [156, 3, 13, "2026-07-14", "2026-08-05"], [156, 1, 10, "2026-07-14", "2026-07-14"], [156, 2, 7, "2026-07-30", "2026-08-05"], [156, 13, 2, "2026-07-14", "2026-07-14"], [156, 17, 1, "2026-07-14", "2026-07-14"], [156, 48, 1, "2026-07-30", "2026-07-30"], [156, 8, 1, "2026-07-14", "2026-07-14"], [156, 20, 1, "2026-07-30", "2026-07-30"], [156, 21, 1, "2026-07-14", "2026-07-14"], [157, 0, 12, "2026-01-05", "2026-07-02"], [157, 5, 9, "2026-02-24", "2026-06-15"], [157, 1, 9, "2026-03-12", "2026-06-15"], [157, 11, 7, "2026-01-27", "2026-07-27"], [157, 3, 7, "2026-03-12", "2026-06-08"], [157, 2, 5, "2026-04-30", "2026-07-02"], [157, 7, 1, "2026-02-24", "2026-02-24"], [157, 6, 1, "2026-02-24", "2026-02-24"], [158, 2, 27, "2026-07-31", "2026-07-31"], [158, 12, 7, "2026-07-31", "2026-07-31"], [158, 15, 7, "2026-07-31", "2026-07-31"], [158, 33, 2, "2026-07-31", "2026-07-31"], [158, 36, 1, "2026-07-31", "2026-07-31"], [158, 22, 1, "2026-07-31", "2026-07-31"], [158, 45, 1, "2026-07-31", "2026-07-31"], [158, 13, 1, "2026-07-31", "2026-07-31"], [158, 18, 1, "2026-07-31", "2026-07-31"], [158, 8, 1, "2026-07-31", "2026-07-31"], [158, 17, 1, "2026-07-31", "2026-07-31"], [158, 24, 1, "2026-07-31", "2026-07-31"], [159, 0, 20, "2026-01-12", "2026-07-14"], [159, 11, 8, "2026-01-14", "2026-06-14"], [159, 1, 6, "2026-02-27", "2026-05-11"], [159, 2, 5, "2026-04-24", "2026-07-14"], [159, 14, 5, "2026-06-14", "2026-07-05"], [159, 20, 3, "2026-02-27", "2026-05-11"], [159, 33, 1, "2026-02-27", "2026-02-27"], [159, 3, 1, "2026-03-13", "2026-03-13"], [159, 27, 1, "2026-07-05", "2026-07-05"], [160, 2, 20, "2026-05-10", "2026-08-10"], [160, 0, 8, "2026-01-12", "2026-07-07"], [160, 1, 5, "2026-05-19", "2026-06-30"], [160, 14, 4, "2026-01-03", "2026-01-16"], [160, 3, 3, "2026-06-30", "2026-06-30"], [160, 10, 2, "2026-05-19", "2026-06-09"], [160, 5, 2, "2026-05-19", "2026-06-30"], [160, 8, 2, "2026-05-19", "2026-06-30"], [160, 9, 1, "2026-06-09", "2026-06-09"], [160, 15, 1, "2026-08-10", "2026-08-10"], [160, 27, 1, "2026-01-16", "2026-01-16"], [161, 12, 15, "2026-02-02", "2026-02-02"], [161, 0, 11, "2026-02-02", "2026-02-27"], [161, 3, 5, "2026-02-27", "2026-02-27"], [161, 10, 5, "2026-02-02", "2026-02-04"], [161, 7, 5, "2026-02-02", "2026-02-02"], [161, 1, 2, "2026-02-02", "2026-02-27"], [161, 2, 2, "2026-07-16", "2026-07-16"], [161, 17, 1, "2026-02-02", "2026-02-02"], [161, 4, 1, "2026-02-27", "2026-02-27"], [161, 5, 1, "2026-02-02", "2026-02-02"], [161, 6, 1, "2026-02-02", "2026-02-02"], [162, 0, 18, "2026-01-09", "2026-03-09"], [162, 1, 6, "2026-01-19", "2026-02-14"], [162, 4, 4, "2026-01-19", "2026-01-26"], [162, 11, 3, "2026-01-19", "2026-01-30"], [162, 7, 3, "2026-01-19", "2026-02-14"], [162, 10, 2, "2026-01-19", "2026-03-02"], [162, 5, 2, "2026-01-09", "2026-01-19"], [162, 23, 2, "2026-01-31", "2026-01-31"], [162, 22, 1, "2026-01-09", "2026-01-09"], [162, 17, 1, "2026-01-09", "2026-01-09"], [162, 28, 1, "2026-01-19", "2026-01-19"], [162, 47, 1, "2026-01-31", "2026-01-31"], [162, 30, 1, "2026-01-30", "2026-01-30"], [162, 27, 1, "2026-02-02", "2026-02-02"], [162, 25, 1, "2026-01-19", "2026-01-19"], [162, 20, 1, "2026-01-19", "2026-01-19"], [163, 3, 13, "2026-04-01", "2026-06-29"], [163, 0, 9, "2026-03-28", "2026-04-03"], [163, 1, 6, "2026-03-28", "2026-06-29"], [163, 9, 5, "2026-04-07", "2026-06-29"], [163, 4, 5, "2026-04-01", "2026-06-29"], [163, 5, 3, "2026-04-08", "2026-06-29"], [163, 8, 2, "2026-04-02", "2026-04-02"], [163, 6, 1, "2026-06-29", "2026-06-29"], [163, 10, 1, "2026-04-08", "2026-04-08"], [163, 23, 1, "2026-04-20", "2026-04-20"], [163, 32, 1, "2026-04-01", "2026-04-01"], [163, 13, 1, "2026-03-28", "2026-03-28"], [164, 2, 19, "2026-06-23", "2026-07-14"], [164, 15, 6, "2026-06-23", "2026-07-09"], [164, 14, 5, "2026-07-07", "2026-07-28"], [164, 11, 4, "2026-07-07", "2026-07-09"], [164, 13, 2, "2026-06-23", "2026-06-23"], [164, 31, 1, "2026-06-23", "2026-06-23"], [164, 0, 1, "2026-06-23", "2026-06-23"], [164, 30, 1, "2026-07-04", "2026-07-04"], [164, 28, 1, "2026-06-23", "2026-06-23"], [164, 17, 1, "2026-06-23", "2026-06-23"], [164, 25, 1, "2026-06-23", "2026-06-23"], [164, 54, 1, "2026-06-23", "2026-06-23"], [164, 27, 1, "2026-07-28", "2026-07-28"], [164, 34, 1, "2026-06-23", "2026-06-23"], [164, 42, 1, "2026-06-23", "2026-06-23"], [164, 44, 1, "2026-06-23", "2026-06-23"], [165, 7, 16, "2026-01-12", "2026-02-18"], [165, 11, 7, "2026-01-04", "2026-02-22"], [165, 4, 6, "2026-01-06", "2026-02-19"], [165, 20, 3, "2026-02-05", "2026-02-05"], [165, 5, 3, "2026-01-12", "2026-02-18"], [165, 14, 3, "2026-02-04", "2026-02-18"], [165, 26, 2, "2026-02-19", "2026-02-19"], [165, 6, 2, "2026-01-13", "2026-02-18"], [165, 10, 1, "2026-01-15", "2026-01-15"], [165, 18, 1, "2026-01-13", "2026-01-13"], [165, 0, 1, "2026-01-16", "2026-01-16"], [165, 27, 1, "2026-03-04", "2026-03-04"], [165, 1, 1, "2026-01-12", "2026-01-12"], [166, 2, 38, "2026-04-22", "2026-07-16"], [166, 18, 6, "2026-01-14", "2026-06-15"], [166, 15, 1, "2026-06-15", "2026-06-15"], [166, 17, 1, "2026-01-14", "2026-01-14"], [167, 0, 23, "2026-01-05", "2026-06-25"], [167, 1, 10, "2026-01-29", "2026-06-25"], [167, 2, 5, "2026-04-21", "2026-08-05"], [167, 12, 4, "2026-01-29", "2026-01-29"], [167, 5, 2, "2026-01-05", "2026-01-05"], [167, 17, 1, "2026-08-05", "2026-08-05"], [167, 13, 1, "2026-08-05", "2026-08-05"], [168, 2, 14, "2026-03-16", "2026-07-21"], [168, 0, 6, "2026-01-20", "2026-05-20"], [168, 1, 5, "2026-01-20", "2026-05-20"], [168, 4, 5, "2026-01-20", "2026-05-26"], [168, 10, 4, "2026-02-13", "2026-07-21"], [168, 3, 4, "2026-03-11", "2026-05-26"], [168, 15, 3, "2026-03-16", "2026-03-24"], [168, 9, 2, "2026-03-16", "2026-04-17"], [168, 18, 1, "2026-03-23", "2026-03-23"], [168, 12, 1, "2026-03-16", "2026-03-16"], [169, 1, 10, "2026-02-09", "2026-08-04"], [169, 5, 7, "2026-02-09", "2026-08-04"], [169, 10, 6, "2026-02-09", "2026-05-08"], [169, 2, 4, "2026-05-07", "2026-08-04"], [169, 12, 4, "2026-02-09", "2026-02-09"], [169, 0, 3, "2026-03-10", "2026-07-03"], [169, 29, 3, "2026-08-04", "2026-08-04"], [169, 6, 2, "2026-02-10", "2026-02-11"], [169, 9, 1, "2026-05-08", "2026-05-08"], [169, 17, 1, "2026-02-09", "2026-02-09"], [169, 18, 1, "2026-08-04", "2026-08-04"], [169, 25, 1, "2026-08-04", "2026-08-04"], [169, 22, 1, "2026-02-09", "2026-02-09"], [170, 2, 14, "2026-04-04", "2026-08-06"], [170, 18, 6, "2026-02-15", "2026-04-08"], [170, 10, 5, "2026-02-18", "2026-04-11"], [170, 1, 4, "2026-02-18", "2026-07-27"], [170, 15, 3, "2026-04-04", "2026-07-07"], [170, 3, 3, "2026-02-26", "2026-04-11"], [170, 26, 2, "2026-02-18", "2026-04-11"], [170, 4, 2, "2026-02-18", "2026-04-11"], [170, 20, 1, "2026-02-18", "2026-02-18"], [170, 5, 1, "2026-07-27", "2026-07-27"], [170, 17, 1, "2026-02-15", "2026-02-15"], [170, 9, 1, "2026-07-27", "2026-07-27"], [170, 7, 1, "2026-02-18", "2026-02-18"], [171, 1, 13, "2026-01-14", "2026-06-30"], [171, 0, 8, "2026-01-14", "2026-06-30"], [171, 11, 8, "2026-01-17", "2026-07-17"], [171, 4, 6, "2026-01-14", "2026-04-30"], [171, 3, 4, "2026-03-28", "2026-04-30"], [171, 2, 3, "2026-04-30", "2026-06-30"], [171, 9, 1, "2026-04-30", "2026-04-30"], [171, 8, 1, "2026-03-28", "2026-03-28"], [172, 0, 14, "2026-01-05", "2026-04-08"], [172, 6, 8, "2026-03-05", "2026-03-31"], [172, 1, 8, "2026-01-05", "2026-04-08"], [172, 2, 6, "2026-05-16", "2026-05-16"], [172, 5, 4, "2026-03-05", "2026-03-31"], [172, 8, 3, "2026-02-26", "2026-03-31"], [172, 9, 1, "2026-03-05", "2026-03-05"], [173, 0, 17, "2026-01-05", "2026-06-30"], [173, 1, 8, "2026-01-05", "2026-06-30"], [173, 4, 6, "2026-01-02", "2026-05-31"], [173, 10, 4, "2026-01-31", "2026-02-01"], [173, 3, 4, "2026-03-01", "2026-05-31"], [173, 2, 3, "2026-05-31", "2026-07-22"], [173, 7, 1, "2026-01-05", "2026-01-05"], [174, 12, 31, "2026-01-03", "2026-01-03"], [174, 14, 8, "2026-01-03", "2026-02-12"], [174, 11, 3, "2026-01-12", "2026-01-22"], [174, 27, 1, "2026-02-12", "2026-02-12"], [175, 1, 10, "2026-02-04", "2026-07-14"], [175, 0, 8, "2026-02-04", "2026-06-12"], [175, 2, 7, "2026-04-22", "2026-08-07"], [175, 5, 7, "2026-02-04", "2026-07-14"], [175, 6, 6, "2026-02-08", "2026-07-31"], [175, 9, 3, "2026-03-12", "2026-07-31"], [175, 8, 1, "2026-04-22", "2026-04-22"], [176, 2, 13, "2026-05-18", "2026-08-11"], [176, 0, 8, "2026-06-22", "2026-07-07"], [176, 1, 7, "2026-05-18", "2026-06-22"], [176, 5, 4, "2026-05-18", "2026-06-04"], [176, 3, 3, "2026-06-04", "2026-06-22"], [176, 13, 2, "2026-05-18", "2026-05-18"], [176, 8, 1, "2026-05-18", "2026-05-18"], [176, 6, 1, "2026-06-04", "2026-06-04"], [176, 17, 1, "2026-05-18", "2026-05-18"], [176, 22, 1, "2026-05-18", "2026-05-18"], [177, 0, 10, "2026-01-06", "2026-05-07"], [177, 4, 9, "2026-01-06", "2026-04-14"], [177, 3, 8, "2026-03-01", "2026-05-07"], [177, 7, 5, "2026-01-06", "2026-02-08"], [177, 1, 4, "2026-02-08", "2026-04-14"], [177, 2, 4, "2026-03-01", "2026-05-07"], [177, 15, 1, "2026-03-01", "2026-03-01"], [178, 10, 18, "2026-03-27", "2026-03-31"], [178, 0, 12, "2026-03-27", "2026-03-30"], [178, 5, 4, "2026-03-27", "2026-03-31"], [178, 1, 3, "2026-03-27", "2026-03-30"], [178, 3, 2, "2026-03-30", "2026-03-30"], [178, 9, 2, "2026-03-31", "2026-03-31"], [179, 9, 11, "2026-04-06", "2026-08-04"], [179, 2, 10, "2026-05-08", "2026-08-06"], [179, 5, 9, "2026-04-06", "2026-08-04"], [179, 1, 5, "2026-04-06", "2026-06-10"], [179, 15, 2, "2026-05-08", "2026-05-08"], [179, 20, 1, "2026-04-07", "2026-04-07"], [179, 8, 1, "2026-04-06", "2026-04-06"], [179, 6, 1, "2026-04-17", "2026-04-17"], [180, 0, 19, "2026-01-05", "2026-03-16"], [180, 1, 10, "2026-01-05", "2026-03-10"], [180, 11, 3, "2026-01-11", "2026-02-21"], [180, 14, 3, "2026-01-04", "2026-01-11"], [180, 3, 2, "2026-03-10", "2026-03-10"], [180, 8, 1, "2026-03-10", "2026-03-10"], [180, 7, 1, "2026-01-20", "2026-01-20"], [180, 20, 1, "2026-03-10", "2026-03-10"], [181, 0, 11, "2026-01-07", "2026-07-15"], [181, 1, 9, "2026-01-07", "2026-07-15"], [181, 14, 6, "2026-01-01", "2026-02-01"], [181, 11, 3, "2026-01-01", "2026-01-11"], [181, 7, 3, "2026-01-13", "2026-02-01"], [181, 5, 2, "2026-07-10", "2026-07-15"], [181, 2, 2, "2026-07-10", "2026-07-15"], [181, 8, 1, "2026-07-10", "2026-07-10"], [181, 10, 1, "2026-02-01", "2026-02-01"], [181, 27, 1, "2026-02-01", "2026-02-01"], [182, 0, 13, "2026-03-10", "2026-08-06"], [182, 1, 8, "2026-02-25", "2026-08-05"], [182, 3, 4, "2026-03-10", "2026-08-06"], [182, 2, 3, "2026-05-20", "2026-08-06"], [182, 5, 2, "2026-08-06", "2026-08-06"], [182, 20, 1, "2026-02-25", "2026-02-25"], [182, 16, 1, "2026-08-06", "2026-08-06"], [182, 25, 1, "2026-07-30", "2026-07-30"], [182, 21, 1, "2026-08-06", "2026-08-06"], [182, 30, 1, "2026-08-10", "2026-08-10"], [182, 28, 1, "2026-07-30", "2026-07-30"], [182, 11, 1, "2026-07-30", "2026-07-30"], [182, 10, 1, "2026-08-06", "2026-08-06"], [183, 0, 12, "2026-01-05", "2026-08-06"], [183, 1, 11, "2026-01-05", "2026-08-06"], [183, 5, 5, "2026-02-04", "2026-07-04"], [183, 2, 5, "2026-05-07", "2026-08-06"], [183, 29, 4, "2026-08-06", "2026-08-06"], [183, 25, 1, "2026-08-06", "2026-08-06"], [184, 0, 14, "2026-01-06", "2026-05-26"], [184, 1, 10, "2026-01-06", "2026-02-11"], [184, 7, 6, "2026-01-08", "2026-02-11"], [184, 10, 4, "2026-02-02", "2026-03-07"], [184, 2, 3, "2026-05-26", "2026-07-03"], [185, 0, 9, "2026-04-01", "2026-07-22"], [185, 2, 7, "2026-04-29", "2026-07-22"], [185, 1, 6, "2026-04-01", "2026-07-22"], [185, 3, 3, "2026-04-01", "2026-04-29"], [185, 8, 3, "2026-04-29", "2026-07-22"], [185, 11, 2, "2026-07-22", "2026-08-05"], [185, 29, 1, "2026-08-05", "2026-08-05"], [185, 30, 1, "2026-08-02", "2026-08-02"], [185, 25, 1, "2026-07-22", "2026-07-22"], [185, 20, 1, "2026-04-01", "2026-04-01"], [185, 51, 1, "2026-08-05", "2026-08-05"], [185, 28, 1, "2026-07-22", "2026-07-22"], [185, 48, 1, "2026-04-01", "2026-04-01"], [186, 12, 24, "2026-03-02", "2026-03-02"], [186, 6, 7, "2026-01-26", "2026-04-27"], [186, 0, 1, "2026-01-26", "2026-01-26"], [186, 5, 1, "2026-01-26", "2026-01-26"], [186, 9, 1, "2026-04-27", "2026-04-27"], [186, 10, 1, "2026-01-26", "2026-01-26"], [187, 0, 8, "2026-01-05", "2026-04-19"], [187, 7, 8, "2026-01-05", "2026-02-02"], [187, 14, 5, "2026-01-24", "2026-02-14"], [187, 1, 5, "2026-01-05", "2026-02-12"], [187, 4, 4, "2026-01-03", "2026-02-02"], [187, 11, 2, "2026-01-24", "2026-01-24"], [187, 6, 1, "2026-05-18", "2026-05-18"], [187, 9, 1, "2026-05-18", "2026-05-18"], [187, 27, 1, "2026-02-14", "2026-02-14"], [188, 0, 13, "2026-03-04", "2026-07-05"], [188, 1, 11, "2026-03-04", "2026-07-05"], [188, 8, 5, "2026-03-04", "2026-03-20"], [188, 2, 4, "2026-04-28", "2026-07-05"], [188, 3, 2, "2026-03-10", "2026-04-29"], [189, 0, 17, "2026-01-08", "2026-08-10"], [189, 1, 10, "2026-01-08", "2026-06-19"], [189, 2, 7, "2026-05-02", "2026-08-10"], [189, 3, 1, "2026-03-08", "2026-03-08"], [190, 10, 11, "2026-01-07", "2026-03-19"], [190, 0, 8, "2026-01-07", "2026-01-12"], [190, 7, 6, "2026-01-12", "2026-01-12"], [190, 4, 2, "2026-01-07", "2026-01-07"], [190, 6, 2, "2026-03-19", "2026-03-19"], [190, 3, 2, "2026-03-19", "2026-03-19"], [190, 26, 2, "2026-01-07", "2026-01-07"], [190, 18, 1, "2026-01-30", "2026-01-30"], [190, 5, 1, "2026-01-07", "2026-01-07"], [191, 1, 11, "2026-01-22", "2026-07-06"], [191, 2, 7, "2026-04-28", "2026-07-14"], [191, 0, 6, "2026-01-22", "2026-07-06"], [191, 5, 3, "2026-05-27", "2026-06-12"], [191, 7, 3, "2026-02-04", "2026-02-23"], [191, 12, 2, "2026-08-07", "2026-08-07"], [191, 8, 1, "2026-04-28", "2026-04-28"], [191, 17, 1, "2026-02-04", "2026-02-04"], [192, 0, 15, "2026-03-16", "2026-07-12"], [192, 1, 7, "2026-03-16", "2026-07-12"], [192, 9, 4, "2026-04-13", "2026-04-14"], [192, 2, 3, "2026-07-12", "2026-08-03"], [192, 13, 2, "2026-03-16", "2026-03-16"], [192, 8, 1, "2026-03-24", "2026-03-24"], [192, 3, 1, "2026-04-02", "2026-04-02"], [192, 17, 1, "2026-03-16", "2026-03-16"], [193, 0, 8, "2026-01-09", "2026-03-04"], [193, 20, 7, "2026-03-04", "2026-03-05"], [193, 1, 6, "2026-01-09", "2026-03-05"], [193, 10, 5, "2026-03-04", "2026-03-04"], [193, 2, 3, "2026-08-07", "2026-08-07"], [193, 3, 2, "2026-03-04", "2026-03-05"], [193, 9, 1, "2026-03-04", "2026-03-04"], [193, 5, 1, "2026-01-09", "2026-01-09"], [193, 7, 1, "2026-01-09", "2026-01-09"], [194, 1, 12, "2026-01-19", "2026-06-18"], [194, 0, 11, "2026-01-19", "2026-06-18"], [194, 8, 5, "2026-03-01", "2026-06-18"], [194, 2, 3, "2026-05-20", "2026-06-18"], [194, 10, 1, "2026-05-20", "2026-05-20"], [194, 7, 1, "2026-01-19", "2026-01-19"], [194, 20, 1, "2026-01-20", "2026-01-20"], [195, 0, 13, "2026-01-13", "2026-07-12"], [195, 1, 9, "2026-01-13", "2026-07-12"], [195, 2, 5, "2026-04-23", "2026-07-12"], [195, 3, 3, "2026-04-23", "2026-06-07"], [195, 5, 3, "2026-01-13", "2026-04-23"], [196, 0, 11, "2026-01-06", "2026-03-13"], [196, 11, 9, "2026-01-26", "2026-07-26"], [196, 4, 6, "2026-01-16", "2026-02-10"], [196, 5, 4, "2026-01-06", "2026-02-06"], [196, 14, 1, "2026-06-26", "2026-06-26"], [196, 3, 1, "2026-03-13", "2026-03-13"], [196, 1, 1, "2026-02-06", "2026-02-06"], [197, 5, 6, "2026-03-06", "2026-03-06"], [197, 1, 4, "2026-03-06", "2026-03-06"], [197, 6, 4, "2026-03-06", "2026-03-06"], [197, 3, 4, "2026-03-06", "2026-03-06"], [197, 0, 4, "2026-03-06", "2026-03-06"], [197, 33, 3, "2026-03-06", "2026-03-06"], [197, 8, 2, "2026-03-06", "2026-03-06"], [197, 21, 2, "2026-03-06", "2026-03-06"], [197, 13, 2, "2026-03-06", "2026-03-06"], [197, 22, 1, "2026-03-06", "2026-03-06"], [197, 17, 1, "2026-03-06", "2026-03-06"], [198, 12, 22, "2026-03-03", "2026-03-03"], [198, 10, 2, "2026-03-06", "2026-03-06"], [198, 33, 2, "2026-03-06", "2026-03-06"], [198, 3, 2, "2026-03-06", "2026-03-06"], [198, 1, 2, "2026-03-03", "2026-03-06"], [198, 4, 2, "2026-03-06", "2026-03-06"], [198, 17, 1, "2026-01-09", "2026-01-09"], [199, 1, 9, "2026-01-06", "2026-07-09"], [199, 0, 9, "2026-01-06", "2026-07-09"], [199, 4, 5, "2026-02-03", "2026-02-27"], [199, 2, 4, "2026-04-30", "2026-07-09"], [199, 3, 4, "2026-02-27", "2026-06-09"], [199, 26, 1, "2026-02-27", "2026-02-27"], [199, 7, 1, "2026-01-06", "2026-01-06"], [200, 3, 9, "2026-03-11", "2026-05-13"], [200, 1, 9, "2026-03-11", "2026-06-01"], [200, 0, 7, "2026-03-11", "2026-06-01"], [200, 2, 4, "2026-05-12", "2026-06-01"], [200, 8, 2, "2026-03-11", "2026-05-12"], [200, 16, 1, "2026-03-13", "2026-03-13"], [201, 12, 10, "2026-02-09", "2026-02-18"], [201, 11, 9, "2026-02-05", "2026-08-10"], [201, 6, 3, "2026-02-09", "2026-03-04"], [201, 5, 3, "2026-02-09", "2026-02-10"], [201, 18, 1, "2026-02-09", "2026-02-09"], [201, 17, 1, "2026-02-09", "2026-02-09"], [201, 28, 1, "2026-02-05", "2026-02-05"], [201, 30, 1, "2026-02-10", "2026-02-10"], [201, 25, 1, "2026-02-05", "2026-02-05"], [201, 9, 1, "2026-03-04", "2026-03-04"], [201, 10, 1, "2026-02-10", "2026-02-10"], [202, 7, 10, "2026-01-24", "2026-02-11"], [202, 1, 7, "2026-02-11", "2026-07-06"], [202, 3, 7, "2026-03-03", "2026-07-06"], [202, 0, 6, "2026-01-24", "2026-07-06"], [202, 2, 2, "2026-04-29", "2026-07-06"], [203, 1, 9, "2026-01-16", "2026-08-09"], [203, 2, 8, "2026-06-25", "2026-08-09"], [203, 0, 7, "2026-01-16", "2026-08-09"], [203, 29, 4, "2026-08-01", "2026-08-01"], [203, 25, 2, "2026-08-01", "2026-08-01"], [203, 15, 1, "2026-08-01", "2026-08-01"], [203, 12, 1, "2026-08-01", "2026-08-01"], [204, 2, 10, "2026-03-14", "2026-05-31"], [204, 10, 7, "2026-03-14", "2026-05-21"], [204, 19, 6, "2026-05-17", "2026-05-21"], [204, 15, 4, "2026-03-14", "2026-05-21"], [204, 6, 2, "2026-03-14", "2026-03-14"], [204, 18, 1, "2026-03-24", "2026-03-24"], [204, 0, 1, "2026-03-14", "2026-03-14"], [204, 3, 1, "2026-03-14", "2026-03-14"], [205, 11, 8, "2026-01-08", "2026-04-22"], [205, 1, 6, "2026-01-08", "2026-01-08"], [205, 0, 6, "2026-01-08", "2026-01-08"], [205, 14, 6, "2026-01-22", "2026-05-13"], [205, 7, 2, "2026-01-08", "2026-01-08"], [205, 28, 1, "2026-01-08", "2026-01-08"], [205, 30, 1, "2026-01-19", "2026-01-19"], [205, 27, 1, "2026-05-13", "2026-05-13"], [205, 25, 1, "2026-01-08", "2026-01-08"], [206, 12, 27, "2026-02-06", "2026-04-11"], [206, 10, 2, "2026-02-06", "2026-02-06"], [206, 5, 1, "2026-02-06", "2026-02-06"], [206, 6, 1, "2026-02-06", "2026-02-06"], [207, 2, 22, "2026-03-11", "2026-06-03"], [207, 15, 6, "2026-03-11", "2026-06-03"], [207, 12, 2, "2026-03-19", "2026-03-19"], [207, 18, 1, "2026-03-19", "2026-03-19"], [208, 0, 6, "2026-06-12", "2026-06-26"], [208, 2, 5, "2026-06-12", "2026-07-28"], [208, 1, 5, "2026-03-09", "2026-06-24"], [208, 5, 4, "2026-03-09", "2026-06-24"], [208, 9, 3, "2026-03-09", "2026-03-30"], [208, 8, 2, "2026-03-09", "2026-06-12"], [208, 3, 2, "2026-06-24", "2026-06-26"], [208, 19, 2, "2026-06-26", "2026-06-26"], [208, 6, 1, "2026-03-30", "2026-03-30"], [209, 12, 12, "2026-04-02", "2026-04-02"], [209, 2, 6, "2026-07-30", "2026-07-30"], [209, 0, 4, "2026-04-02", "2026-04-02"], [209, 13, 2, "2026-04-02", "2026-04-02"], [209, 5, 1, "2026-04-02", "2026-04-02"], [209, 15, 1, "2026-07-30", "2026-07-30"], [209, 17, 1, "2026-04-02", "2026-04-02"], [209, 1, 1, "2026-04-02", "2026-04-02"], [209, 18, 1, "2026-04-02", "2026-04-02"], [210, 0, 7, "2026-03-17", "2026-06-15"], [210, 4, 5, "2026-03-17", "2026-06-15"], [210, 1, 5, "2026-03-17", "2026-06-15"], [210, 2, 5, "2026-06-02", "2026-06-15"], [210, 3, 3, "2026-06-04", "2026-06-15"], [210, 8, 3, "2026-03-17", "2026-06-15"], [210, 32, 1, "2026-03-17", "2026-03-17"], [211, 2, 12, "2026-05-13", "2026-06-19"], [211, 13, 4, "2026-05-13", "2026-05-20"], [211, 34, 4, "2026-05-14", "2026-05-20"], [211, 64, 3, "2026-05-15", "2026-05-15"], [211, 43, 2, "2026-05-14", "2026-05-14"], [211, 44, 1, "2026-05-20", "2026-05-20"], [211, 17, 1, "2026-05-13", "2026-05-13"], [211, 22, 1, "2026-05-13", "2026-05-13"], [211, 42, 1, "2026-05-20", "2026-05-20"], [212, 0, 18, "2026-01-23", "2026-01-23"], [212, 7, 9, "2026-01-23", "2026-01-23"], [212, 2, 1, "2026-05-28", "2026-05-28"], [212, 20, 1, "2026-01-23", "2026-01-23"], [213, 0, 11, "2026-01-29", "2026-07-22"], [213, 10, 5, "2026-02-10", "2026-04-28"], [213, 5, 4, "2026-01-29", "2026-03-04"], [213, 4, 2, "2026-01-29", "2026-03-04"], [213, 2, 2, "2026-04-28", "2026-07-22"], [213, 20, 1, "2026-01-29", "2026-01-29"], [213, 1, 1, "2026-03-04", "2026-03-04"], [213, 9, 1, "2026-04-28", "2026-04-28"], [213, 3, 1, "2026-03-04", "2026-03-04"], [214, 3, 9, "2026-05-11", "2026-07-09"], [214, 0, 9, "2026-01-29", "2026-07-09"], [214, 2, 5, "2026-05-11", "2026-07-09"], [214, 1, 4, "2026-01-29", "2026-07-01"], [214, 4, 1, "2026-05-11", "2026-05-11"], [215, 11, 12, "2026-01-26", "2026-06-16"], [215, 2, 6, "2026-04-29", "2026-07-14"], [215, 14, 4, "2026-02-26", "2026-05-03"], [215, 18, 2, "2026-02-24", "2026-04-29"], [215, 10, 1, "2026-06-16", "2026-06-16"], [215, 15, 1, "2026-04-29", "2026-04-29"], [215, 32, 1, "2026-06-16", "2026-06-16"], [215, 27, 1, "2026-06-26", "2026-06-26"], [216, 2, 10, "2026-05-11", "2026-07-06"], [216, 12, 4, "2026-07-06", "2026-07-06"], [216, 1, 3, "2026-05-13", "2026-06-04"], [216, 0, 3, "2026-05-13", "2026-06-04"], [216, 13, 2, "2026-05-11", "2026-05-11"], [216, 8, 1, "2026-05-13", "2026-05-13"], [216, 21, 1, "2026-05-13", "2026-05-13"], [216, 22, 1, "2026-05-11", "2026-05-11"], [216, 17, 1, "2026-05-11", "2026-05-11"], [216, 3, 1, "2026-05-13", "2026-05-13"], [217, 0, 9, "2026-06-03", "2026-07-09"], [217, 1, 6, "2026-06-03", "2026-06-08"], [217, 5, 4, "2026-06-03", "2026-06-03"], [217, 2, 3, "2026-06-03", "2026-07-09"], [217, 10, 3, "2026-06-03", "2026-06-08"], [217, 20, 1, "2026-06-03", "2026-06-03"], [217, 3, 1, "2026-06-08", "2026-06-08"], [218, 6, 6, "2026-02-21", "2026-02-24"], [218, 0, 5, "2026-03-16", "2026-04-03"], [218, 5, 4, "2026-02-20", "2026-04-03"], [218, 10, 3, "2026-02-21", "2026-02-21"], [218, 1, 3, "2026-02-17", "2026-04-03"], [218, 7, 2, "2026-02-20", "2026-02-21"], [218, 8, 2, "2026-03-16", "2026-04-03"], [218, 4, 1, "2026-02-20", "2026-02-20"], [218, 2, 1, "2026-04-29", "2026-04-29"], [219, 2, 7, "2026-05-01", "2026-05-15"], [219, 14, 5, "2026-05-15", "2026-06-05"], [219, 13, 3, "2026-05-01", "2026-05-01"], [219, 11, 3, "2026-05-01", "2026-05-15"], [219, 34, 2, "2026-05-01", "2026-05-01"], [219, 12, 2, "2026-05-01", "2026-05-01"], [219, 28, 1, "2026-05-01", "2026-05-01"], [219, 17, 1, "2026-05-01", "2026-05-01"], [219, 25, 1, "2026-05-01", "2026-05-01"], [219, 30, 1, "2026-05-12", "2026-05-12"], [219, 27, 1, "2026-06-05", "2026-06-05"], [220, 3, 8, "2026-03-31", "2026-06-08"], [220, 0, 6, "2026-03-31", "2026-05-14"], [220, 1, 3, "2026-03-31", "2026-05-14"], [220, 2, 3, "2026-05-14", "2026-06-08"], [220, 13, 2, "2026-03-31", "2026-03-31"], [220, 23, 1, "2026-06-08", "2026-06-08"], [220, 17, 1, "2026-03-31", "2026-03-31"], [220, 22, 1, "2026-03-31", "2026-03-31"], [220, 5, 1, "2026-05-14", "2026-05-14"], [221, 12, 20, "2026-03-03", "2026-03-03"], [221, 1, 2, "2026-03-03", "2026-03-07"], [221, 3, 2, "2026-03-03", "2026-03-07"], [221, 0, 1, "2026-01-17", "2026-01-17"], [221, 23, 1, "2026-03-03", "2026-03-03"], [222, 0, 9, "2026-04-22", "2026-07-16"], [222, 3, 6, "2026-04-22", "2026-07-16"], [222, 1, 6, "2026-04-22", "2026-07-07"], [222, 2, 5, "2026-04-22", "2026-07-16"], [223, 2, 9, "2026-05-05", "2026-05-05"], [223, 15, 3, "2026-05-05", "2026-05-05"], [223, 11, 3, "2026-05-05", "2026-05-05"], [223, 12, 2, "2026-05-05", "2026-05-05"], [223, 27, 1, "2026-05-19", "2026-05-19"], [223, 30, 1, "2026-05-16", "2026-05-16"], [223, 31, 1, "2026-05-05", "2026-05-05"], [223, 18, 1, "2026-05-05", "2026-05-05"], [223, 28, 1, "2026-05-05", "2026-05-05"], [223, 60, 1, "2026-05-05", "2026-05-05"], [223, 25, 1, "2026-05-05", "2026-05-05"], [223, 13, 1, "2026-05-05", "2026-05-05"], [224, 9, 9, "2026-03-14", "2026-08-06"], [224, 2, 7, "2026-05-08", "2026-08-06"], [224, 5, 5, "2026-04-06", "2026-08-06"], [224, 19, 2, "2026-07-07", "2026-07-07"], [224, 13, 1, "2026-04-06", "2026-04-06"], [224, 1, 1, "2026-04-06", "2026-04-06"], [225, 3, 7, "2026-05-15", "2026-07-11"], [225, 1, 4, "2026-05-15", "2026-07-11"], [225, 4, 3, "2026-02-09", "2026-07-11"], [225, 0, 3, "2026-05-15", "2026-07-11"], [225, 2, 2, "2026-05-15", "2026-07-11"], [225, 10, 2, "2026-02-09", "2026-02-09"], [225, 5, 2, "2026-02-09", "2026-07-11"], [225, 20, 1, "2026-05-15", "2026-05-15"], [225, 6, 1, "2026-02-09", "2026-02-09"], [226, 1, 8, "2026-02-10", "2026-07-03"], [226, 9, 5, "2026-04-14", "2026-07-03"], [226, 3, 4, "2026-03-05", "2026-04-02"], [226, 0, 4, "2026-01-07", "2026-04-02"], [226, 5, 2, "2026-01-07", "2026-02-10"], [226, 10, 2, "2026-04-02", "2026-05-05"], [227, 0, 15, "2026-05-22", "2026-05-22"], [227, 2, 2, "2026-05-22", "2026-05-22"], [227, 1, 2, "2026-05-22", "2026-05-22"], [227, 10, 2, "2026-05-22", "2026-05-22"], [227, 3, 1, "2026-05-22", "2026-05-22"], [227, 12, 1, "2026-05-22", "2026-05-22"], [227, 8, 1, "2026-05-22", "2026-05-22"], [228, 0, 11, "2026-01-06", "2026-07-02"], [228, 1, 4, "2026-05-14", "2026-07-02"], [228, 2, 3, "2026-05-14", "2026-05-20"], [228, 8, 2, "2026-05-20", "2026-07-02"], [228, 7, 2, "2026-01-06", "2026-01-12"], [228, 3, 1, "2026-05-20", "2026-05-20"], [228, 10, 1, "2026-03-12", "2026-03-12"], [229, 10, 10, "2026-01-28", "2026-04-25"], [229, 2, 4, "2026-04-24", "2026-05-11"], [229, 0, 4, "2026-01-28", "2026-05-11"], [229, 5, 2, "2026-01-28", "2026-04-24"], [229, 6, 1, "2026-01-28", "2026-01-28"], [229, 1, 1, "2026-04-24", "2026-04-24"], [229, 17, 1, "2026-01-27", "2026-01-27"], [229, 22, 1, "2026-01-27", "2026-01-27"], [230, 1, 8, "2026-06-24", "2026-06-24"], [230, 3, 5, "2026-06-24", "2026-06-24"], [230, 0, 3, "2026-06-24", "2026-06-25"], [230, 4, 3, "2026-06-24", "2026-06-24"], [230, 2, 2, "2026-06-24", "2026-06-25"], [230, 10, 1, "2026-06-24", "2026-06-24"], [230, 5, 1, "2026-06-24", "2026-06-24"], [230, 9, 1, "2026-06-24", "2026-06-24"], [231, 1, 9, "2026-02-23", "2026-07-14"], [231, 0, 6, "2026-03-03", "2026-07-14"], [231, 2, 5, "2026-06-24", "2026-07-14"], [231, 3, 2, "2026-03-19", "2026-04-07"], [231, 23, 1, "2026-03-19", "2026-03-19"], [231, 8, 1, "2026-07-14", "2026-07-14"], [232, 0, 7, "2026-04-06", "2026-07-13"], [232, 2, 7, "2026-05-11", "2026-08-11"], [232, 1, 5, "2026-02-12", "2026-06-22"], [232, 3, 2, "2026-04-17", "2026-06-22"], [232, 8, 1, "2026-06-22", "2026-06-22"], [232, 5, 1, "2026-06-22", "2026-06-22"], [233, 2, 4, "2026-06-23", "2026-07-15"], [233, 1, 4, "2026-06-23", "2026-07-13"], [233, 5, 3, "2026-06-23", "2026-07-13"], [233, 13, 3, "2026-06-23", "2026-06-23"], [233, 6, 2, "2026-07-13", "2026-07-13"], [233, 0, 2, "2026-08-10", "2026-08-10"], [233, 8, 2, "2026-06-23", "2026-07-13"], [233, 4, 1, "2026-07-15", "2026-07-15"], [233, 17, 1, "2026-06-23", "2026-06-23"], [233, 3, 1, "2026-07-15", "2026-07-15"], [234, 18, 7, "2026-07-01", "2026-07-07"], [234, 2, 6, "2026-07-01", "2026-07-08"], [234, 12, 3, "2026-07-02", "2026-07-02"], [234, 13, 2, "2026-07-01", "2026-07-02"], [234, 17, 1, "2026-07-01", "2026-07-01"], [234, 8, 1, "2026-07-02", "2026-07-02"], [234, 15, 1, "2026-07-01", "2026-07-01"], [234, 22, 1, "2026-07-01", "2026-07-01"], [235, 2, 18, "2026-05-18", "2026-07-23"], [235, 18, 2, "2026-06-09", "2026-07-22"], [235, 13, 1, "2026-05-18", "2026-05-18"], [235, 17, 1, "2026-05-18", "2026-05-18"], [236, 14, 5, "2026-01-23", "2026-02-13"], [236, 11, 2, "2026-01-23", "2026-01-23"], [236, 4, 2, "2026-01-09", "2026-01-09"], [236, 1, 2, "2026-01-09", "2026-01-09"], [236, 28, 1, "2026-01-09", "2026-01-09"], [236, 25, 1, "2026-01-09", "2026-01-09"], [236, 0, 1, "2026-01-09", "2026-01-09"], [236, 18, 1, "2026-01-09", "2026-01-09"], [236, 26, 1, "2026-01-09", "2026-01-09"], [236, 17, 1, "2026-01-09", "2026-01-09"], [236, 22, 1, "2026-01-09", "2026-01-09"], [236, 10, 1, "2026-01-09", "2026-01-09"], [236, 30, 1, "2026-01-20", "2026-01-20"], [236, 27, 1, "2026-02-13", "2026-02-13"], [236, 7, 1, "2026-01-09", "2026-01-09"], [237, 16, 7, "2026-02-11", "2026-02-11"], [237, 6, 3, "2026-01-31", "2026-01-31"], [237, 18, 3, "2026-02-06", "2026-04-07"], [237, 11, 2, "2026-02-11", "2026-02-11"], [237, 25, 1, "2026-02-11", "2026-02-11"], [237, 7, 1, "2026-02-11", "2026-02-11"], [237, 30, 1, "2026-02-22", "2026-02-22"], [237, 1, 1, "2026-02-11", "2026-02-11"], [237, 28, 1, "2026-02-11", "2026-02-11"], [237, 27, 1, "2026-02-25", "2026-02-25"], [238, 1, 7, "2026-02-02", "2026-06-09"], [238, 0, 6, "2026-02-02", "2026-06-09"], [238, 2, 5, "2026-05-29", "2026-07-17"], [238, 8, 2, "2026-05-29", "2026-06-09"], [238, 3, 1, "2026-04-06", "2026-04-06"], [239, 2, 6, "2026-08-04", "2026-08-04"], [239, 29, 5, "2026-08-04", "2026-08-04"], [239, 22, 1, "2026-08-04", "2026-08-04"], [239, 31, 1, "2026-08-04", "2026-08-04"], [239, 70, 1, "2026-08-04", "2026-08-04"], [239, 69, 1, "2026-08-04", "2026-08-04"], [239, 25, 1, "2026-08-04", "2026-08-04"], [239, 67, 1, "2026-08-04", "2026-08-04"], [239, 11, 1, "2026-08-04", "2026-08-04"], [239, 13, 1, "2026-08-04", "2026-08-04"], [239, 17, 1, "2026-08-04", "2026-08-04"], [240, 0, 9, "2026-01-15", "2026-05-20"], [240, 7, 6, "2026-01-15", "2026-01-25"], [240, 2, 2, "2026-05-17", "2026-05-20"], [240, 1, 2, "2026-01-15", "2026-05-17"], [240, 3, 1, "2026-05-20", "2026-05-20"], [241, 12, 3, "2026-01-06", "2026-01-06"], [241, 11, 2, "2026-03-12", "2026-03-12"], [241, 4, 2, "2026-01-05", "2026-01-06"], [241, 7, 2, "2026-01-05", "2026-01-05"], [241, 6, 2, "2026-01-05", "2026-01-05"], [241, 10, 2, "2026-01-05", "2026-01-05"], [241, 1, 2, "2026-01-05", "2026-01-05"], [241, 0, 2, "2026-01-05", "2026-01-05"], [241, 27, 1, "2026-03-13", "2026-03-13"], [241, 5, 1, "2026-01-05", "2026-01-05"], [241, 18, 1, "2026-01-06", "2026-01-06"], [242, 0, 8, "2026-01-12", "2026-06-02"], [242, 1, 5, "2026-01-12", "2026-05-03"], [242, 2, 4, "2026-05-03", "2026-07-27"], [242, 13, 1, "2026-07-03", "2026-07-03"], [242, 10, 1, "2026-05-03", "2026-05-03"], [242, 3, 1, "2026-05-03", "2026-05-03"], [243, 0, 11, "2026-01-06", "2026-06-22"], [243, 1, 6, "2026-01-06", "2026-06-22"], [243, 7, 1, "2026-01-06", "2026-01-06"], [243, 2, 1, "2026-06-22", "2026-06-22"], [243, 10, 1, "2026-03-23", "2026-03-23"], [244, 2, 15, "2026-04-24", "2026-07-31"], [244, 12, 1, "2026-04-24", "2026-04-24"], [244, 18, 1, "2026-04-24", "2026-04-24"], [244, 17, 1, "2026-01-14", "2026-01-14"], [244, 15, 1, "2026-04-24", "2026-04-24"], [244, 22, 1, "2026-01-14", "2026-01-14"], [245, 15, 8, "2026-04-13", "2026-04-13"], [245, 2, 8, "2026-04-13", "2026-04-13"], [245, 18, 1, "2026-04-13", "2026-04-13"], [245, 13, 1, "2026-04-13", "2026-04-13"], [245, 17, 1, "2026-04-13", "2026-04-13"], [246, 2, 8, "2026-04-07", "2026-05-05"], [246, 19, 2, "2026-04-07", "2026-04-07"], [246, 18, 2, "2026-04-07", "2026-04-07"], [246, 13, 1, "2026-04-07", "2026-04-07"], [246, 1, 1, "2026-04-07", "2026-04-07"], [246, 8, 1, "2026-04-07", "2026-04-07"], [246, 48, 1, "2026-05-04", "2026-05-04"], [246, 17, 1, "2026-04-07", "2026-04-07"], [246, 20, 1, "2026-05-04", "2026-05-04"], [246, 15, 1, "2026-04-07", "2026-04-07"], [247, 6, 5, "2026-01-01", "2026-02-09"], [247, 0, 5, "2026-01-28", "2026-05-16"], [247, 1, 3, "2026-02-12", "2026-05-16"], [247, 8, 2, "2026-03-31", "2026-05-16"], [247, 5, 2, "2026-01-28", "2026-03-31"], [247, 10, 1, "2026-01-28", "2026-01-28"], [247, 2, 1, "2026-05-16", "2026-05-16"], [248, 2, 8, "2026-06-02", "2026-06-22"], [248, 18, 6, "2026-05-31", "2026-07-06"], [248, 15, 2, "2026-06-02", "2026-06-16"], [248, 17, 1, "2026-05-31", "2026-05-31"], [248, 13, 1, "2026-05-31", "2026-05-31"], [248, 22, 1, "2026-05-31", "2026-05-31"], [249, 0, 7, "2026-01-05", "2026-07-07"], [249, 1, 5, "2026-01-05", "2026-06-01"], [249, 3, 2, "2026-03-13", "2026-06-01"], [249, 2, 2, "2026-06-01", "2026-07-07"], [249, 4, 2, "2026-02-07", "2026-02-07"], [249, 7, 1, "2026-02-07", "2026-02-07"], [250, 2, 9, "2026-08-10", "2026-08-10"], [250, 13, 4, "2026-08-10", "2026-08-10"], [250, 1, 2, "2026-08-10", "2026-08-10"], [250, 0, 1, "2026-08-10", "2026-08-10"], [250, 8, 1, "2026-08-10", "2026-08-10"], [250, 17, 1, "2026-08-10", "2026-08-10"], [251, 12, 16, "2026-05-28", "2026-05-28"], [251, 8, 1, "2026-05-28", "2026-05-28"], [251, 2, 1, "2026-05-28", "2026-05-28"], [252, 0, 4, "2026-07-20", "2026-07-20"], [252, 2, 3, "2026-07-20", "2026-07-20"], [252, 13, 2, "2026-07-20", "2026-07-20"], [252, 3, 2, "2026-07-20", "2026-07-20"], [252, 1, 2, "2026-07-20", "2026-07-20"], [252, 15, 1, "2026-07-20", "2026-07-20"], [252, 19, 1, "2026-07-20", "2026-07-20"], [252, 4, 1, "2026-07-20", "2026-07-20"], [252, 17, 1, "2026-07-20", "2026-07-20"], [252, 8, 1, "2026-07-20", "2026-07-20"], [253, 2, 8, "2026-04-26", "2026-05-09"], [253, 19, 5, "2026-04-26", "2026-04-26"], [253, 1, 1, "2026-04-26", "2026-04-26"], [253, 17, 1, "2026-04-26", "2026-04-26"], [253, 53, 1, "2026-05-09", "2026-05-09"], [253, 13, 1, "2026-04-26", "2026-04-26"], [253, 22, 1, "2026-04-26", "2026-04-26"], [254, 0, 4, "2026-05-07", "2026-05-08"], [254, 10, 3, "2026-02-16", "2026-05-07"], [254, 3, 3, "2026-05-07", "2026-05-08"], [254, 1, 2, "2026-02-16", "2026-05-07"], [254, 2, 2, "2026-05-07", "2026-05-08"], [254, 4, 1, "2026-05-07", "2026-05-07"], [254, 17, 1, "2026-02-12", "2026-02-12"], [254, 5, 1, "2026-05-08", "2026-05-08"], [254, 22, 1, "2026-02-12", "2026-02-12"], [255, 6, 6, "2026-01-09", "2026-01-20"], [255, 1, 3, "2026-03-20", "2026-06-12"], [255, 5, 3, "2026-01-09", "2026-03-20"], [255, 10, 2, "2026-01-09", "2026-01-09"], [255, 0, 2, "2026-01-09", "2026-06-12"], [255, 8, 1, "2026-03-20", "2026-03-20"], [255, 2, 1, "2026-06-12", "2026-06-12"], [256, 11, 14, "2026-01-24", "2026-07-24"], [256, 14, 4, "2026-03-24", "2026-06-24"], [257, 0, 5, "2026-03-10", "2026-03-11"], [257, 13, 3, "2026-03-10", "2026-03-10"], [257, 3, 2, "2026-03-11", "2026-03-11"], [257, 21, 2, "2026-03-10", "2026-03-10"], [257, 1, 1, "2026-03-10", "2026-03-10"], [257, 17, 1, "2026-03-10", "2026-03-10"], [257, 5, 1, "2026-03-11", "2026-03-11"], [257, 8, 1, "2026-03-10", "2026-03-10"], [257, 33, 1, "2026-03-10", "2026-03-10"], [258, 2, 15, "2026-03-02", "2026-08-01"], [258, 15, 1, "2026-03-02", "2026-03-02"], [258, 18, 1, "2026-01-25", "2026-01-25"], [259, 14, 5, "2026-02-21", "2026-03-14"], [259, 12, 4, "2026-01-07", "2026-01-07"], [259, 11, 3, "2026-01-21", "2026-02-21"], [259, 28, 1, "2026-01-07", "2026-01-07"], [259, 30, 1, "2026-01-18", "2026-01-18"], [259, 17, 1, "2026-01-07", "2026-01-07"], [259, 27, 1, "2026-03-14", "2026-03-14"], [259, 25, 1, "2026-01-07", "2026-01-07"], [260, 5, 5, "2026-01-24", "2026-06-19"], [260, 2, 4, "2026-04-20", "2026-07-16"], [260, 1, 4, "2026-04-20", "2026-06-19"], [260, 6, 3, "2026-01-24", "2026-07-13"], [260, 0, 1, "2026-01-24", "2026-01-24"], [261, 12, 5, "2026-04-06", "2026-04-06"], [261, 3, 5, "2026-04-04", "2026-04-06"], [261, 0, 3, "2026-04-04", "2026-04-04"], [261, 2, 2, "2026-05-02", "2026-05-03"], [261, 1, 1, "2026-04-04", "2026-04-04"], [262, 2, 6, "2026-06-02", "2026-08-06"], [262, 11, 2, "2026-06-16", "2026-07-16"], [262, 13, 2, "2026-06-02", "2026-06-02"], [262, 28, 1, "2026-06-02", "2026-06-02"], [262, 30, 1, "2026-06-13", "2026-06-13"], [262, 25, 1, "2026-06-02", "2026-06-02"], [262, 17, 1, "2026-06-02", "2026-06-02"], [262, 31, 1, "2026-06-02", "2026-06-02"], [262, 15, 1, "2026-06-02", "2026-06-02"], [263, 0, 5, "2026-03-06", "2026-05-25"], [263, 1, 4, "2026-02-09", "2026-05-11"], [263, 5, 3, "2026-05-11", "2026-05-11"], [263, 3, 2, "2026-05-11", "2026-05-25"], [263, 2, 2, "2026-05-11", "2026-05-25"], [264, 2, 4, "2026-07-17", "2026-08-11"], [264, 5, 4, "2026-07-20", "2026-07-20"], [264, 0, 3, "2026-07-17", "2026-08-11"], [264, 1, 2, "2026-07-17", "2026-07-17"], [264, 10, 1, "2026-07-20", "2026-07-20"], [264, 8, 1, "2026-07-17", "2026-07-17"], [264, 21, 1, "2026-07-20", "2026-07-20"], [265, 14, 5, "2026-03-20", "2026-04-10"], [265, 11, 2, "2026-03-20", "2026-03-20"], [265, 28, 1, "2026-03-06", "2026-03-06"], [265, 18, 1, "2026-03-06", "2026-03-06"], [265, 13, 1, "2026-03-06", "2026-03-06"], [265, 30, 1, "2026-03-17", "2026-03-17"], [265, 27, 1, "2026-04-10", "2026-04-10"], [265, 22, 1, "2026-03-06", "2026-03-06"], [265, 17, 1, "2026-03-06", "2026-03-06"], [265, 25, 1, "2026-03-06", "2026-03-06"], [266, 11, 8, "2026-01-28", "2026-05-28"], [266, 14, 6, "2026-02-28", "2026-06-18"], [266, 27, 1, "2026-06-18", "2026-06-18"], [267, 2, 4, "2026-05-08", "2026-06-02"], [267, 0, 4, "2026-05-08", "2026-05-08"], [267, 1, 3, "2026-05-08", "2026-05-08"], [267, 5, 2, "2026-05-08", "2026-05-08"], [267, 20, 1, "2026-05-08", "2026-05-08"], [267, 13, 1, "2026-05-08", "2026-05-08"], [268, 12, 5, "2026-02-09", "2026-02-09"], [268, 2, 4, "2026-05-06", "2026-06-03"], [268, 6, 2, "2026-01-08", "2026-01-08"], [268, 5, 1, "2026-01-08", "2026-01-08"], [268, 1, 1, "2026-01-08", "2026-01-08"], [268, 10, 1, "2026-01-08", "2026-01-08"], [268, 0, 1, "2026-01-08", "2026-01-08"], [269, 2, 13, "2026-06-12", "2026-08-09"], [269, 18, 1, "2026-06-15", "2026-06-15"], [269, 13, 1, "2026-06-12", "2026-06-12"], [270, 12, 11, "2026-03-06", "2026-03-06"], [270, 13, 2, "2026-03-06", "2026-03-06"], [270, 17, 1, "2026-02-09", "2026-02-09"], [270, 8, 1, "2026-03-06", "2026-03-06"], [271, 11, 12, "2026-01-22", "2026-07-30"], [271, 14, 3, "2026-05-22", "2026-07-22"], [272, 2, 6, "2026-08-05", "2026-08-09"], [272, 13, 2, "2026-08-05", "2026-08-09"], [272, 17, 1, "2026-08-05", "2026-08-05"], [272, 36, 1, "2026-08-09", "2026-08-09"], [272, 33, 1, "2026-08-05", "2026-08-05"], [272, 22, 1, "2026-08-05", "2026-08-05"], [272, 8, 1, "2026-08-05", "2026-08-05"], [272, 15, 1, "2026-08-05", "2026-08-05"], [272, 45, 1, "2026-08-09", "2026-08-09"], [273, 2, 4, "2026-05-12", "2026-08-11"], [273, 1, 3, "2026-05-12", "2026-06-10"], [273, 0, 3, "2026-01-02", "2026-06-10"], [273, 3, 2, "2026-05-12", "2026-06-10"], [273, 8, 1, "2026-05-12", "2026-05-12"], [273, 7, 1, "2026-01-02", "2026-01-02"], [274, 15, 6, "2026-04-08", "2026-04-08"], [274, 2, 6, "2026-04-08", "2026-04-08"], [274, 18, 2, "2026-04-08", "2026-04-08"], [275, 12, 6, "2026-02-24", "2026-02-25"], [275, 5, 2, "2026-02-24", "2026-02-24"], [275, 20, 1, "2026-02-24", "2026-02-24"], [275, 6, 1, "2026-02-24", "2026-02-24"], [275, 0, 1, "2026-02-25", "2026-02-25"], [275, 18, 1, "2026-02-25", "2026-02-25"], [275, 2, 1, "2026-05-22", "2026-05-22"], [275, 17, 1, "2026-02-24", "2026-02-24"], [276, 11, 3, "2026-07-16", "2026-07-30"], [276, 0, 2, "2026-07-16", "2026-07-17"], [276, 2, 2, "2026-07-16", "2026-07-17"], [276, 14, 2, "2026-07-30", "2026-08-05"], [276, 1, 2, "2026-07-16", "2026-07-16"], [276, 25, 1, "2026-07-16", "2026-07-16"], [276, 28, 1, "2026-07-16", "2026-07-16"], [276, 30, 1, "2026-07-27", "2026-07-27"], [277, 52, 10, "2026-03-13", "2026-03-17"], [277, 22, 1, "2026-03-13", "2026-03-13"], [277, 13, 1, "2026-03-13", "2026-03-13"], [277, 31, 1, "2026-03-13", "2026-03-13"], [277, 17, 1, "2026-03-13", "2026-03-13"], [278, 5, 5, "2026-01-05", "2026-01-05"], [278, 6, 4, "2026-01-05", "2026-01-06"], [278, 10, 1, "2026-02-26", "2026-02-26"], [278, 1, 1, "2026-02-26", "2026-02-26"], [278, 8, 1, "2026-02-26", "2026-02-26"], [278, 0, 1, "2026-02-26", "2026-02-26"], [278, 17, 1, "2026-01-05", "2026-01-05"], [279, 0, 4, "2026-07-03", "2026-07-03"], [279, 13, 3, "2026-07-03", "2026-07-03"], [279, 1, 2, "2026-07-03", "2026-07-03"], [279, 5, 1, "2026-07-03", "2026-07-03"], [279, 22, 1, "2026-07-03", "2026-07-03"], [279, 8, 1, "2026-07-03", "2026-07-03"], [279, 3, 1, "2026-07-03", "2026-07-03"], [279, 17, 1, "2026-07-03", "2026-07-03"], [280, 1, 5, "2026-05-20", "2026-05-20"], [280, 2, 5, "2026-05-15", "2026-05-20"], [280, 13, 2, "2026-05-15", "2026-05-20"], [280, 5, 1, "2026-05-20", "2026-05-20"], [280, 17, 1, "2026-05-15", "2026-05-15"], [281, 0, 5, "2026-08-09", "2026-08-09"], [281, 1, 2, "2026-08-09", "2026-08-09"], [281, 2, 2, "2026-08-09", "2026-08-09"], [281, 13, 2, "2026-08-09", "2026-08-09"], [281, 5, 1, "2026-08-09", "2026-08-09"], [281, 8, 1, "2026-08-09", "2026-08-09"], [281, 17, 1, "2026-08-09", "2026-08-09"], [282, 2, 3, "2026-08-10", "2026-08-11"], [282, 1, 2, "2026-08-10", "2026-08-10"], [282, 9, 2, "2026-08-10", "2026-08-10"], [282, 13, 2, "2026-08-10", "2026-08-10"], [282, 5, 2, "2026-08-10", "2026-08-10"], [282, 22, 1, "2026-08-10", "2026-08-10"], [282, 10, 1, "2026-08-12", "2026-08-12"], [282, 17, 1, "2026-08-10", "2026-08-10"], [283, 13, 4, "2026-07-31", "2026-07-31"], [283, 0, 2, "2026-07-31", "2026-07-31"], [283, 1, 2, "2026-07-31", "2026-07-31"], [283, 2, 2, "2026-07-31", "2026-08-07"], [283, 8, 1, "2026-07-31", "2026-07-31"], [283, 17, 1, "2026-07-31", "2026-07-31"], [283, 3, 1, "2026-07-31", "2026-07-31"], [284, 0, 2, "2026-03-08", "2026-03-08"], [284, 18, 2, "2026-03-02", "2026-03-06"], [284, 3, 2, "2026-03-02", "2026-03-02"], [284, 23, 1, "2026-03-02", "2026-03-02"], [284, 13, 1, "2026-03-02", "2026-03-02"], [284, 47, 1, "2026-03-02", "2026-03-02"], [284, 2, 1, "2026-03-06", "2026-03-06"], [284, 1, 1, "2026-03-02", "2026-03-02"], [284, 15, 1, "2026-03-06", "2026-03-06"], [284, 5, 1, "2026-03-02", "2026-03-02"], [285, 1, 2, "2026-06-05", "2026-06-05"], [285, 2, 2, "2026-06-05", "2026-06-05"], [285, 13, 2, "2026-06-05", "2026-06-05"], [285, 33, 2, "2026-06-05", "2026-06-05"], [285, 18, 1, "2026-06-05", "2026-06-05"], [285, 15, 1, "2026-06-05", "2026-06-05"], [285, 8, 1, "2026-06-05", "2026-06-05"], [285, 17, 1, "2026-06-05", "2026-06-05"], [285, 12, 1, "2026-06-05", "2026-06-05"], [286, 11, 10, "2026-01-08", "2026-07-02"], [286, 2, 2, "2026-06-01", "2026-07-02"], [286, 27, 1, "2026-07-08", "2026-07-08"], [287, 1, 4, "2026-08-08", "2026-08-10"], [287, 5, 2, "2026-08-08", "2026-08-10"], [287, 13, 2, "2026-08-03", "2026-08-03"], [287, 8, 1, "2026-08-08", "2026-08-08"], [287, 2, 1, "2026-08-08", "2026-08-08"], [287, 25, 1, "2026-08-10", "2026-08-10"], [287, 29, 1, "2026-08-10", "2026-08-10"], [287, 0, 1, "2026-08-10", "2026-08-10"], [288, 10, 7, "2026-02-17", "2026-03-18"], [288, 6, 3, "2026-02-17", "2026-02-17"], [288, 1, 1, "2026-02-17", "2026-02-17"], [288, 0, 1, "2026-03-16", "2026-03-16"], [288, 5, 1, "2026-02-17", "2026-02-17"], [289, 1, 4, "2026-06-21", "2026-07-15"], [289, 0, 3, "2026-06-21", "2026-07-30"], [289, 3, 2, "2026-07-15", "2026-07-30"], [289, 13, 2, "2026-06-18", "2026-06-21"], [289, 17, 1, "2026-06-18", "2026-06-18"], [289, 2, 1, "2026-07-28", "2026-07-28"], [290, 2, 4, "2026-05-01", "2026-05-03"], [290, 21, 2, "2026-05-03", "2026-05-03"], [290, 3, 2, "2026-05-03", "2026-05-03"], [290, 17, 1, "2026-05-01", "2026-05-01"], [290, 15, 1, "2026-05-03", "2026-05-03"], [290, 13, 1, "2026-05-01", "2026-05-01"], [290, 1, 1, "2026-05-03", "2026-05-03"], [290, 8, 1, "2026-05-03", "2026-05-03"], [291, 14, 7, "2026-01-30", "2026-03-21"], [291, 11, 5, "2026-01-30", "2026-02-28"], [291, 27, 1, "2026-03-21", "2026-03-21"], [292, 18, 4, "2026-01-22", "2026-06-27"], [292, 2, 4, "2026-06-27", "2026-06-27"], [292, 1, 2, "2026-06-27", "2026-06-27"], [292, 53, 2, "2026-06-27", "2026-06-27"], [293, 14, 5, "2026-03-26", "2026-04-16"], [293, 11, 4, "2026-01-26", "2026-03-26"], [293, 0, 2, "2026-01-14", "2026-01-14"], [293, 27, 1, "2026-04-16", "2026-04-16"], [294, 0, 3, "2026-06-27", "2026-06-27"], [294, 13, 2, "2026-06-27", "2026-06-27"], [294, 1, 2, "2026-06-27", "2026-06-27"], [294, 17, 1, "2026-06-27", "2026-06-27"], [294, 8, 1, "2026-06-27", "2026-06-27"], [294, 5, 1, "2026-06-27", "2026-06-27"], [294, 22, 1, "2026-06-27", "2026-06-27"], [295, 10, 5, "2026-01-06", "2026-01-07"], [295, 63, 4, "2026-01-06", "2026-01-06"], [295, 0, 1, "2026-01-06", "2026-01-06"], [295, 2, 1, "2026-07-16", "2026-07-16"], [296, 2, 4, "2026-05-05", "2026-05-05"], [296, 13, 2, "2026-05-05", "2026-05-05"], [296, 22, 1, "2026-05-05", "2026-05-05"], [296, 17, 1, "2026-05-05", "2026-05-05"], [296, 64, 1, "2026-05-05", "2026-05-05"], [296, 1, 1, "2026-05-05", "2026-05-05"], [296, 5, 1, "2026-05-05", "2026-05-05"], [297, 2, 3, "2026-04-20", "2026-04-20"], [297, 5, 1, "2026-04-20", "2026-04-20"], [297, 13, 1, "2026-04-20", "2026-04-20"], [297, 22, 1, "2026-04-20", "2026-04-20"], [297, 4, 1, "2026-04-20", "2026-04-20"], [297, 17, 1, "2026-04-20", "2026-04-20"], [297, 8, 1, "2026-04-20", "2026-04-20"], [297, 1, 1, "2026-04-20", "2026-04-20"], [297, 3, 1, "2026-04-20", "2026-04-20"], [298, 14, 5, "2026-01-07", "2026-01-28"], [298, 11, 3, "2026-01-07", "2026-01-07"], [298, 0, 1, "2026-02-07", "2026-02-07"], [298, 5, 1, "2026-02-07", "2026-02-07"], [298, 27, 1, "2026-01-28", "2026-01-28"], [299, 14, 6, "2026-01-02", "2026-01-23"], [299, 11, 3, "2026-01-02", "2026-01-02"], [299, 27, 1, "2026-01-23", "2026-01-23"], [300, 10, 10, "2026-01-02", "2026-01-02"], [301, 0, 4, "2026-03-02", "2026-03-02"], [301, 6, 1, "2026-03-02", "2026-03-02"], [301, 1, 1, "2026-03-02", "2026-03-02"], [301, 3, 1, "2026-03-02", "2026-03-02"], [301, 5, 1, "2026-03-02", "2026-03-02"], [301, 8, 1, "2026-03-02", "2026-03-02"], [301, 21, 1, "2026-03-02", "2026-03-02"], [302, 1, 5, "2026-05-20", "2026-05-20"], [302, 13, 2, "2026-05-20", "2026-05-20"], [302, 17, 1, "2026-05-20", "2026-05-20"], [302, 5, 1, "2026-05-20", "2026-05-20"], [302, 22, 1, "2026-05-20", "2026-05-20"], [303, 14, 5, "2026-01-07", "2026-01-28"], [303, 11, 3, "2026-01-07", "2026-01-07"], [303, 27, 1, "2026-01-28", "2026-01-28"], [304, 11, 7, "2026-01-03", "2026-02-11"], [304, 14, 1, "2026-02-03", "2026-02-03"], [304, 27, 1, "2026-03-03", "2026-03-03"], [305, 14, 5, "2026-04-10", "2026-05-01"], [305, 11, 3, "2026-04-10", "2026-04-10"], [305, 27, 1, "2026-05-01", "2026-05-01"], [306, 12, 3, "2026-07-04", "2026-07-04"], [306, 2, 2, "2026-07-04", "2026-07-04"], [306, 13, 1, "2026-07-04", "2026-07-04"], [306, 15, 1, "2026-07-04", "2026-07-04"], [306, 18, 1, "2026-07-04", "2026-07-04"], [306, 17, 1, "2026-07-04", "2026-07-04"], [307, 15, 2, "2026-06-30", "2026-06-30"], [307, 12, 2, "2026-06-30", "2026-06-30"], [307, 2, 2, "2026-06-30", "2026-06-30"], [307, 13, 1, "2026-06-30", "2026-06-30"], [307, 18, 1, "2026-06-30", "2026-06-30"], [307, 17, 1, "2026-06-30", "2026-06-30"], [308, 2, 5, "2026-04-27", "2026-04-27"], [308, 15, 3, "2026-04-27", "2026-04-27"], [308, 62, 1, "2026-04-27", "2026-04-27"], [309, 0, 3, "2026-08-04", "2026-08-04"], [309, 1, 2, "2026-08-04", "2026-08-04"], [309, 2, 2, "2026-07-12", "2026-08-03"], [309, 5, 1, "2026-08-04", "2026-08-04"], [309, 8, 1, "2026-08-04", "2026-08-04"], [310, 14, 5, "2026-01-14", "2026-02-04"], [310, 11, 3, "2026-01-14", "2026-01-14"], [310, 27, 1, "2026-02-04", "2026-02-04"], [311, 11, 3, "2026-01-05", "2026-01-19"], [311, 0, 2, "2026-04-02", "2026-04-07"], [311, 1, 1, "2026-04-02", "2026-04-02"], [311, 3, 1, "2026-04-07", "2026-04-07"], [311, 27, 1, "2026-02-05", "2026-02-05"], [312, 0, 5, "2026-03-26", "2026-03-26"], [312, 3, 3, "2026-03-26", "2026-03-26"], [313, 0, 2, "2026-05-05", "2026-05-05"], [313, 1, 2, "2026-02-23", "2026-05-05"], [313, 5, 1, "2026-05-05", "2026-05-05"], [313, 4, 1, "2026-02-23", "2026-02-23"], [313, 2, 1, "2026-05-05", "2026-05-05"], [313, 8, 1, "2026-05-05", "2026-05-05"], [314, 0, 3, "2026-03-02", "2026-03-04"], [314, 1, 2, "2026-03-02", "2026-03-04"], [314, 3, 2, "2026-03-02", "2026-03-02"], [314, 10, 1, "2026-03-02", "2026-03-02"], [315, 2, 3, "2026-05-14", "2026-05-15"], [315, 13, 2, "2026-05-13", "2026-05-13"], [315, 5, 1, "2026-05-13", "2026-05-13"], [315, 1, 1, "2026-05-13", "2026-05-13"], [315, 17, 1, "2026-05-13", "2026-05-13"], [316, 2, 7, "2026-07-01", "2026-07-09"], [316, 13, 1, "2026-06-20", "2026-06-20"], [317, 2, 5, "2026-05-05", "2026-05-05"], [317, 17, 1, "2026-05-05", "2026-05-05"], [317, 15, 1, "2026-05-05", "2026-05-05"], [317, 13, 1, "2026-05-05", "2026-05-05"], [318, 2, 5, "2026-07-20", "2026-07-30"], [318, 18, 1, "2026-07-20", "2026-07-20"], [318, 13, 1, "2026-07-20", "2026-07-20"], [318, 17, 1, "2026-07-20", "2026-07-20"], [319, 2, 4, "2026-06-08", "2026-06-08"], [319, 13, 2, "2026-06-08", "2026-06-08"], [319, 22, 1, "2026-06-08", "2026-06-08"], [319, 17, 1, "2026-06-08", "2026-06-08"], [320, 4, 2, "2026-03-30", "2026-03-30"], [320, 32, 2, "2026-03-30", "2026-03-30"], [320, 20, 1, "2026-03-30", "2026-03-30"], [320, 8, 1, "2026-03-30", "2026-03-30"], [320, 0, 1, "2026-03-30", "2026-03-30"], [320, 1, 1, "2026-03-30", "2026-03-30"], [321, 12, 7, "2026-03-02", "2026-03-02"], [321, 17, 1, "2026-01-29", "2026-01-29"], [322, 5, 2, "2026-06-29", "2026-06-29"], [322, 1, 2, "2026-06-29", "2026-06-29"], [322, 13, 2, "2026-06-26", "2026-06-26"], [322, 17, 1, "2026-06-26", "2026-06-26"], [322, 8, 1, "2026-06-29", "2026-06-29"], [323, 2, 3, "2026-07-28", "2026-07-28"], [323, 18, 1, "2026-07-28", "2026-07-28"], [323, 15, 1, "2026-07-28", "2026-07-28"], [323, 13, 1, "2026-07-28", "2026-07-28"], [323, 22, 1, "2026-07-28", "2026-07-28"], [323, 17, 1, "2026-07-28", "2026-07-28"], [324, 1, 3, "2026-04-06", "2026-04-06"], [324, 20, 2, "2026-04-06", "2026-04-06"], [324, 2, 2, "2026-05-25", "2026-05-30"], [324, 3, 1, "2026-04-06", "2026-04-06"], [325, 20, 3, "2026-03-02", "2026-03-02"], [325, 15, 2, "2026-03-02", "2026-03-02"], [325, 2, 2, "2026-03-02", "2026-03-02"], [326, 2, 3, "2026-06-04", "2026-06-04"], [326, 13, 2, "2026-06-04", "2026-06-04"], [326, 17, 1, "2026-06-04", "2026-06-04"], [326, 22, 1, "2026-06-04", "2026-06-04"], [327, 2, 6, "2026-07-23", "2026-07-30"], [327, 13, 1, "2026-07-23", "2026-07-23"], [328, 3, 2, "2026-05-11", "2026-05-11"], [328, 9, 2, "2026-05-11", "2026-05-11"], [328, 1, 1, "2026-05-11", "2026-05-11"], [328, 5, 1, "2026-05-11", "2026-05-11"], [328, 2, 1, "2026-05-11", "2026-05-11"], [329, 2, 4, "2026-07-23", "2026-07-28"], [329, 15, 2, "2026-07-23", "2026-07-23"], [329, 13, 1, "2026-07-23", "2026-07-23"], [330, 2, 5, "2026-07-03", "2026-08-07"], [330, 15, 1, "2026-08-07", "2026-08-07"], [330, 13, 1, "2026-07-03", "2026-07-03"], [331, 0, 3, "2026-05-08", "2026-05-08"], [331, 1, 2, "2026-05-08", "2026-05-08"], [331, 2, 1, "2026-05-08", "2026-05-08"], [331, 20, 1, "2026-05-08", "2026-05-08"], [332, 12, 2, "2026-05-20", "2026-05-20"], [332, 13, 1, "2026-05-20", "2026-05-20"], [332, 17, 1, "2026-05-20", "2026-05-20"], [332, 2, 1, "2026-05-20", "2026-05-20"], [332, 8, 1, "2026-05-20", "2026-05-20"], [332, 22, 1, "2026-05-20", "2026-05-20"], [333, 2, 5, "2026-03-06", "2026-03-06"], [333, 15, 2, "2026-03-06", "2026-03-06"], [334, 0, 3, "2026-03-18", "2026-03-18"], [334, 18, 2, "2026-01-19", "2026-02-20"], [334, 2, 1, "2026-07-16", "2026-07-16"], [334, 1, 1, "2026-03-18", "2026-03-18"], [335, 13, 2, "2026-03-09", "2026-03-09"], [335, 19, 2, "2026-03-09", "2026-03-09"], [335, 17, 1, "2026-03-09", "2026-03-09"], [335, 1, 1, "2026-03-09", "2026-03-09"], [335, 22, 1, "2026-03-09", "2026-03-09"], [336, 11, 6, "2026-01-13", "2026-04-06"], [336, 27, 1, "2026-04-13", "2026-04-13"], [337, 12, 7, "2026-02-22", "2026-02-22"], [338, 2, 2, "2026-03-23", "2026-03-23"], [338, 15, 2, "2026-03-23", "2026-03-23"], [338, 22, 1, "2026-03-23", "2026-03-23"], [338, 13, 1, "2026-03-23", "2026-03-23"], [338, 17, 1, "2026-03-23", "2026-03-23"], [339, 0, 2, "2026-01-27", "2026-01-27"], [339, 5, 1, "2026-01-27", "2026-01-27"], [339, 1, 1, "2026-01-27", "2026-01-27"], [339, 17, 1, "2026-01-27", "2026-01-27"], [339, 22, 1, "2026-01-27", "2026-01-27"], [339, 7, 1, "2026-01-27", "2026-01-27"], [340, 2, 3, "2026-03-29", "2026-07-23"], [340, 15, 2, "2026-03-29", "2026-07-23"], [340, 18, 2, "2026-01-11", "2026-03-29"], [341, 5, 3, "2026-01-29", "2026-01-29"], [341, 6, 2, "2026-01-29", "2026-01-29"], [341, 17, 1, "2026-01-29", "2026-01-29"], [341, 0, 1, "2026-01-29", "2026-01-29"], [342, 14, 5, "2026-01-03", "2026-01-21"], [342, 27, 1, "2026-01-21", "2026-01-21"], [343, 2, 2, "2026-04-28", "2026-04-28"], [343, 13, 2, "2026-04-28", "2026-04-28"], [343, 17, 1, "2026-04-28", "2026-04-28"], [343, 22, 1, "2026-04-28", "2026-04-28"], [344, 2, 3, "2026-07-18", "2026-07-18"], [344, 13, 1, "2026-07-18", "2026-07-18"], [344, 17, 1, "2026-07-18", "2026-07-18"], [344, 15, 1, "2026-07-18", "2026-07-18"], [345, 0, 2, "2026-01-26", "2026-01-26"], [345, 5, 1, "2026-01-26", "2026-01-26"], [345, 17, 1, "2026-01-26", "2026-01-26"], [345, 1, 1, "2026-01-26", "2026-01-26"], [345, 10, 1, "2026-01-26", "2026-01-26"], [346, 2, 2, "2026-07-02", "2026-07-02"], [346, 12, 1, "2026-07-02", "2026-07-02"], [346, 13, 1, "2026-07-02", "2026-07-02"], [346, 22, 1, "2026-07-02", "2026-07-02"], [346, 17, 1, "2026-07-02", "2026-07-02"], [347, 13, 2, "2026-05-20", "2026-05-20"], [347, 1, 1, "2026-05-20", "2026-05-20"], [347, 5, 1, "2026-05-20", "2026-05-20"], [347, 22, 1, "2026-05-20", "2026-05-20"], [347, 17, 1, "2026-05-20", "2026-05-20"], [348, 2, 2, "2026-08-10", "2026-08-10"], [348, 13, 2, "2026-08-10", "2026-08-10"], [348, 22, 1, "2026-08-10", "2026-08-10"], [348, 17, 1, "2026-08-10", "2026-08-10"], [349, 13, 2, "2026-05-20", "2026-05-20"], [349, 1, 1, "2026-05-20", "2026-05-20"], [349, 22, 1, "2026-05-20", "2026-05-20"], [349, 5, 1, "2026-05-20", "2026-05-20"], [349, 17, 1, "2026-05-20", "2026-05-20"], [350, 13, 2, "2026-08-07", "2026-08-07"], [350, 22, 1, "2026-08-07", "2026-08-07"], [350, 2, 1, "2026-08-07", "2026-08-07"], [350, 19, 1, "2026-08-07", "2026-08-07"], [350, 17, 1, "2026-08-07", "2026-08-07"], [351, 2, 3, "2026-05-14", "2026-05-15"], [351, 22, 1, "2026-05-14", "2026-05-14"], [351, 13, 1, "2026-05-14", "2026-05-14"], [351, 17, 1, "2026-05-14", "2026-05-14"], [352, 2, 3, "2026-08-10", "2026-08-10"], [352, 13, 1, "2026-08-10", "2026-08-10"], [352, 22, 1, "2026-08-10", "2026-08-10"], [352, 17, 1, "2026-08-10", "2026-08-10"], [353, 2, 4, "2026-05-14", "2026-05-15"], [353, 13, 1, "2026-05-14", "2026-05-14"], [353, 15, 1, "2026-05-14", "2026-05-14"], [354, 2, 4, "2026-04-08", "2026-07-28"], [354, 15, 2, "2026-04-08", "2026-07-28"], [355, 0, 2, "2026-01-15", "2026-01-15"], [355, 7, 1, "2026-01-15", "2026-01-15"], [355, 1, 1, "2026-01-15", "2026-01-15"], [355, 17, 1, "2026-01-15", "2026-01-15"], [355, 22, 1, "2026-01-15", "2026-01-15"], [356, 13, 2, "2026-05-11", "2026-05-11"], [356, 2, 2, "2026-05-11", "2026-05-11"], [356, 17, 1, "2026-05-11", "2026-05-11"], [356, 22, 1, "2026-05-11", "2026-05-11"], [357, 13, 4, "2026-03-03", "2026-03-13"], [357, 17, 1, "2026-03-03", "2026-03-03"], [357, 8, 1, "2026-03-13", "2026-03-13"], [358, 13, 3, "2026-04-30", "2026-04-30"], [358, 17, 1, "2026-04-30", "2026-04-30"], [358, 2, 1, "2026-04-30", "2026-04-30"], [358, 22, 1, "2026-04-30", "2026-04-30"], [359, 1, 3, "2026-01-10", "2026-01-28"], [359, 0, 2, "2026-01-10", "2026-01-16"], [359, 5, 1, "2026-01-10", "2026-01-10"], [360, 2, 2, "2026-04-30", "2026-04-30"], [360, 18, 1, "2026-04-30", "2026-04-30"], [360, 13, 1, "2026-04-30", "2026-04-30"], [360, 17, 1, "2026-04-30", "2026-04-30"], [360, 22, 1, "2026-04-30", "2026-04-30"], [361, 11, 5, "2026-01-14", "2026-03-15"], [361, 27, 1, "2026-04-14", "2026-04-14"], [362, 10, 2, "2026-03-20", "2026-03-20"], [362, 13, 1, "2026-03-20", "2026-03-20"], [362, 22, 1, "2026-03-20", "2026-03-20"], [362, 17, 1, "2026-03-20", "2026-03-20"], [362, 1, 1, "2026-03-20", "2026-03-20"], [363, 2, 2, "2026-04-07", "2026-05-15"], [363, 15, 1, "2026-04-07", "2026-04-07"], [363, 13, 1, "2026-04-07", "2026-04-07"], [363, 17, 1, "2026-04-07", "2026-04-07"], [364, 13, 3, "2026-06-11", "2026-06-11"], [364, 22, 1, "2026-06-11", "2026-06-11"], [364, 17, 1, "2026-06-11", "2026-06-11"], [365, 13, 2, "2026-04-22", "2026-04-22"], [365, 17, 1, "2026-04-22", "2026-04-22"], [365, 2, 1, "2026-04-22", "2026-04-22"], [365, 22, 1, "2026-04-22", "2026-04-22"], [366, 13, 3, "2026-04-08", "2026-04-08"], [366, 22, 1, "2026-04-08", "2026-04-08"], [366, 17, 1, "2026-04-08", "2026-04-08"], [367, 2, 2, "2026-04-28", "2026-04-28"], [367, 13, 1, "2026-04-28", "2026-04-28"], [367, 22, 1, "2026-04-28", "2026-04-28"], [367, 17, 1, "2026-04-28", "2026-04-28"], [368, 2, 2, "2026-04-30", "2026-04-30"], [368, 17, 1, "2026-04-30", "2026-04-30"], [368, 22, 1, "2026-04-30", "2026-04-30"], [368, 13, 1, "2026-04-30", "2026-04-30"], [369, 9, 2, "2026-04-27", "2026-04-27"], [369, 6, 2, "2026-04-27", "2026-04-27"], [369, 27, 1, "2026-01-08", "2026-01-08"], [370, 13, 2, "2026-03-08", "2026-03-09"], [370, 17, 1, "2026-03-08", "2026-03-08"], [370, 22, 1, "2026-03-08", "2026-03-08"], [370, 2, 1, "2026-08-07", "2026-08-07"], [371, 11, 4, "2026-01-09", "2026-03-09"], [371, 27, 1, "2026-03-11", "2026-03-11"], [372, 2, 5, "2026-06-01", "2026-06-02"], [373, 13, 2, "2026-08-10", "2026-08-10"], [373, 17, 1, "2026-08-10", "2026-08-10"], [373, 22, 1, "2026-08-10", "2026-08-10"], [373, 2, 1, "2026-08-10", "2026-08-10"], [374, 15, 2, "2026-03-02", "2026-03-02"], [374, 2, 2, "2026-03-02", "2026-03-02"], [374, 18, 1, "2026-03-02", "2026-03-02"], [375, 18, 2, "2026-03-13", "2026-04-03"], [375, 2, 2, "2026-04-23", "2026-04-23"], [375, 3, 1, "2026-03-18", "2026-03-18"], [376, 13, 1, "2026-04-29", "2026-04-29"], [376, 17, 1, "2026-04-29", "2026-04-29"], [376, 2, 1, "2026-04-29", "2026-04-29"], [376, 22, 1, "2026-04-29", "2026-04-29"], [376, 31, 1, "2026-04-29", "2026-04-29"], [377, 2, 2, "2026-07-10", "2026-07-10"], [377, 22, 1, "2026-07-10", "2026-07-10"], [377, 17, 1, "2026-07-10", "2026-07-10"], [377, 13, 1, "2026-07-10", "2026-07-10"], [378, 2, 2, "2026-06-16", "2026-06-16"], [378, 13, 1, "2026-05-19", "2026-05-19"], [378, 22, 1, "2026-05-19", "2026-05-19"], [378, 17, 1, "2026-05-19", "2026-05-19"], [379, 56, 2, "2026-03-24", "2026-03-24"], [379, 22, 1, "2026-03-24", "2026-03-24"], [379, 17, 1, "2026-03-24", "2026-03-24"], [379, 13, 1, "2026-03-24", "2026-03-24"], [380, 13, 3, "2026-04-29", "2026-04-29"], [380, 17, 1, "2026-04-29", "2026-04-29"], [380, 2, 1, "2026-04-29", "2026-04-29"], [381, 0, 5, "2026-01-19", "2026-01-19"], [382, 13, 2, "2026-05-27", "2026-05-27"], [382, 17, 1, "2026-05-27", "2026-05-27"], [382, 56, 1, "2026-05-27", "2026-05-27"], [382, 22, 1, "2026-05-27", "2026-05-27"], [383, 13, 1, "2026-04-30", "2026-04-30"], [383, 22, 1, "2026-04-30", "2026-04-30"], [383, 2, 1, "2026-04-30", "2026-04-30"], [383, 17, 1, "2026-04-30", "2026-04-30"], [384, 14, 3, "2026-01-06", "2026-01-14"], [384, 27, 1, "2026-01-14", "2026-01-14"], [385, 17, 1, "2026-07-08", "2026-07-08"], [385, 13, 1, "2026-07-08", "2026-07-08"], [385, 56, 1, "2026-07-08", "2026-07-08"], [385, 22, 1, "2026-07-08", "2026-07-08"], [386, 13, 2, "2026-07-08", "2026-07-08"], [386, 18, 1, "2026-07-08", "2026-07-08"], [386, 17, 1, "2026-07-08", "2026-07-08"], [387, 0, 2, "2026-03-20", "2026-03-20"], [387, 5, 1, "2026-03-20", "2026-03-20"], [387, 1, 1, "2026-03-20", "2026-03-20"], [388, 56, 1, "2026-07-24", "2026-07-24"], [388, 17, 1, "2026-07-24", "2026-07-24"], [388, 22, 1, "2026-07-24", "2026-07-24"], [388, 13, 1, "2026-07-24", "2026-07-24"], [389, 22, 1, "2026-07-28", "2026-07-28"], [389, 2, 1, "2026-07-28", "2026-07-28"], [389, 13, 1, "2026-07-28", "2026-07-28"], [389, 17, 1, "2026-07-28", "2026-07-28"], [390, 0, 2, "2026-02-05", "2026-02-05"], [390, 10, 1, "2026-02-09", "2026-02-09"], [390, 2, 1, "2026-06-25", "2026-06-25"], [391, 56, 1, "2026-02-25", "2026-02-25"], [391, 13, 1, "2026-02-25", "2026-02-25"], [391, 22, 1, "2026-02-25", "2026-02-25"], [391, 17, 1, "2026-02-25", "2026-02-25"], [392, 2, 1, "2026-03-02", "2026-03-02"], [392, 13, 1, "2026-03-02", "2026-03-02"], [392, 17, 1, "2026-03-02", "2026-03-02"], [392, 15, 1, "2026-03-02", "2026-03-02"], [393, 13, 2, "2026-03-09", "2026-03-09"], [393, 17, 1, "2026-03-09", "2026-03-09"], [393, 8, 1, "2026-03-09", "2026-03-09"], [394, 15, 1, "2026-03-10", "2026-03-10"], [394, 13, 1, "2026-03-10", "2026-03-10"], [394, 17, 1, "2026-03-10", "2026-03-10"], [394, 2, 1, "2026-03-10", "2026-03-10"], [395, 2, 3, "2026-06-30", "2026-08-05"], [395, 13, 1, "2026-07-31", "2026-07-31"], [396, 10, 2, "2026-01-23", "2026-01-23"], [396, 0, 1, "2026-01-23", "2026-01-23"], [396, 1, 1, "2026-01-23", "2026-01-23"], [397, 2, 4, "2026-05-28", "2026-05-28"], [398, 13, 1, "2026-04-02", "2026-04-02"], [398, 2, 1, "2026-04-02", "2026-04-02"], [398, 15, 1, "2026-04-02", "2026-04-02"], [398, 17, 1, "2026-04-02", "2026-04-02"], [399, 0, 4, "2026-01-02", "2026-01-02"], [400, 13, 3, "2026-04-06", "2026-04-06"], [400, 17, 1, "2026-04-06", "2026-04-06"], [401, 13, 2, "2026-04-15", "2026-04-15"], [401, 22, 1, "2026-04-15", "2026-04-15"], [401, 17, 1, "2026-04-15", "2026-04-15"], [402, 2, 2, "2026-04-28", "2026-04-28"], [402, 13, 1, "2026-04-28", "2026-04-28"], [402, 17, 1, "2026-04-28", "2026-04-28"], [403, 22, 1, "2026-04-29", "2026-04-29"], [403, 2, 1, "2026-04-29", "2026-04-29"], [403, 13, 1, "2026-04-29", "2026-04-29"], [403, 17, 1, "2026-04-29", "2026-04-29"], [404, 13, 1, "2026-05-04", "2026-05-04"], [404, 2, 1, "2026-05-04", "2026-05-04"], [404, 22, 1, "2026-05-04", "2026-05-04"], [404, 17, 1, "2026-05-04", "2026-05-04"], [405, 2, 3, "2026-07-15", "2026-07-15"], [405, 3, 1, "2026-07-15", "2026-07-15"], [406, 13, 2, "2026-05-05", "2026-05-05"], [406, 22, 1, "2026-05-05", "2026-05-05"], [406, 17, 1, "2026-05-05", "2026-05-05"], [407, 13, 2, "2026-05-05", "2026-05-05"], [407, 22, 1, "2026-05-05", "2026-05-05"], [407, 17, 1, "2026-05-05", "2026-05-05"], [408, 56, 1, "2026-05-13", "2026-05-13"], [408, 13, 1, "2026-05-13", "2026-05-13"], [408, 17, 1, "2026-05-13", "2026-05-13"], [408, 22, 1, "2026-05-13", "2026-05-13"], [409, 13, 1, "2026-05-15", "2026-05-15"], [409, 2, 1, "2026-05-15", "2026-05-15"], [409, 17, 1, "2026-05-15", "2026-05-15"], [409, 22, 1, "2026-05-15", "2026-05-15"], [410, 13, 2, "2026-05-21", "2026-05-21"], [410, 2, 2, "2026-06-17", "2026-06-17"], [411, 13, 2, "2026-05-28", "2026-05-28"], [411, 17, 1, "2026-05-28", "2026-05-28"], [411, 22, 1, "2026-05-28", "2026-05-28"], [412, 13, 2, "2026-07-16", "2026-07-16"], [412, 17, 1, "2026-07-16", "2026-07-16"], [412, 2, 1, "2026-07-16", "2026-07-16"], [413, 14, 3, "2026-01-06", "2026-01-14"], [413, 27, 1, "2026-01-14", "2026-01-14"], [414, 13, 2, "2026-06-16", "2026-06-16"], [414, 17, 1, "2026-06-16", "2026-06-16"], [414, 22, 1, "2026-06-16", "2026-06-16"], [415, 15, 1, "2026-06-26", "2026-06-26"], [415, 2, 1, "2026-06-26", "2026-06-26"], [415, 13, 1, "2026-06-26", "2026-06-26"], [415, 17, 1, "2026-06-26", "2026-06-26"], [416, 2, 3, "2026-07-07", "2026-07-07"], [416, 13, 1, "2026-07-07", "2026-07-07"], [417, 13, 2, "2026-06-18", "2026-06-18"], [417, 17, 1, "2026-06-18", "2026-06-18"], [417, 2, 1, "2026-06-18", "2026-06-18"], [418, 18, 2, "2026-01-21", "2026-01-21"], [418, 2, 1, "2026-04-28", "2026-04-28"], [419, 22, 1, "2026-03-25", "2026-03-25"], [419, 17, 1, "2026-03-25", "2026-03-25"], [419, 13, 1, "2026-03-25", "2026-03-25"], [420, 13, 2, "2026-03-24", "2026-03-24"], [420, 17, 1, "2026-03-24", "2026-03-24"], [421, 13, 1, "2026-04-29", "2026-04-29"], [421, 17, 1, "2026-04-29", "2026-04-29"], [421, 22, 1, "2026-04-29", "2026-04-29"], [422, 13, 2, "2026-06-15", "2026-06-15"], [422, 17, 1, "2026-06-15", "2026-06-15"], [423, 17, 1, "2026-05-05", "2026-05-05"], [423, 56, 1, "2026-05-05", "2026-05-05"], [423, 13, 1, "2026-05-05", "2026-05-05"], [424, 2, 2, "2026-05-07", "2026-05-07"], [424, 13, 1, "2026-05-05", "2026-05-05"], [425, 13, 1, "2026-06-30", "2026-06-30"], [425, 22, 1, "2026-06-30", "2026-06-30"], [425, 17, 1, "2026-06-30", "2026-06-30"], [426, 0, 2, "2026-01-16", "2026-01-16"], [426, 5, 1, "2026-01-16", "2026-01-16"], [427, 17, 1, "2026-01-19", "2026-01-19"], [427, 18, 1, "2026-01-19", "2026-01-19"], [427, 22, 1, "2026-01-19", "2026-01-19"], [428, 19, 1, "2026-06-18", "2026-06-18"], [428, 17, 1, "2026-06-18", "2026-06-18"], [428, 13, 1, "2026-06-18", "2026-06-18"], [429, 13, 2, "2026-08-09", "2026-08-09"], [429, 17, 1, "2026-08-09", "2026-08-09"], [430, 17, 1, "2026-06-26", "2026-06-26"], [430, 22, 1, "2026-06-26", "2026-06-26"], [430, 13, 1, "2026-06-26", "2026-06-26"], [431, 2, 3, "2026-05-21", "2026-05-21"], [432, 13, 1, "2026-08-03", "2026-08-03"], [432, 2, 1, "2026-08-03", "2026-08-03"], [432, 17, 1, "2026-08-03", "2026-08-03"], [433, 2, 3, "2026-08-03", "2026-08-03"], [434, 13, 2, "2026-05-16", "2026-05-16"], [434, 17, 1, "2026-05-16", "2026-05-16"], [435, 22, 1, "2026-05-19", "2026-05-19"], [435, 17, 1, "2026-05-19", "2026-05-19"], [435, 13, 1, "2026-05-19", "2026-05-19"], [436, 17, 1, "2026-02-09", "2026-02-09"], [436, 2, 1, "2026-07-04", "2026-07-04"], [436, 22, 1, "2026-02-09", "2026-02-09"], [437, 13, 2, "2026-08-04", "2026-08-04"], [437, 17, 1, "2026-08-04", "2026-08-04"], [438, 11, 2, "2026-01-14", "2026-01-14"], [438, 27, 1, "2026-01-14", "2026-01-14"], [439, 13, 1, "2026-05-21", "2026-05-21"], [439, 56, 1, "2026-05-21", "2026-05-21"], [439, 17, 1, "2026-05-21", "2026-05-21"], [440, 13, 2, "2026-05-23", "2026-05-23"], [440, 17, 1, "2026-05-23", "2026-05-23"], [441, 18, 2, "2026-01-13", "2026-01-14"], [441, 17, 1, "2026-01-13", "2026-01-13"], [442, 17, 1, "2026-07-06", "2026-07-06"], [442, 19, 1, "2026-07-06", "2026-07-06"], [442, 13, 1, "2026-07-06", "2026-07-06"], [443, 17, 1, "2026-06-02", "2026-06-02"], [443, 13, 1, "2026-06-02", "2026-06-02"], [443, 22, 1, "2026-06-02", "2026-06-02"], [444, 13, 1, "2026-07-23", "2026-07-23"], [444, 17, 1, "2026-07-23", "2026-07-23"], [444, 22, 1, "2026-07-23", "2026-07-23"], [445, 17, 1, "2026-06-02", "2026-06-02"], [445, 22, 1, "2026-06-02", "2026-06-02"], [445, 13, 1, "2026-06-02", "2026-06-02"], [446, 22, 1, "2026-06-03", "2026-06-03"], [446, 13, 1, "2026-06-03", "2026-06-03"], [446, 17, 1, "2026-06-03", "2026-06-03"], [447, 13, 2, "2026-06-03", "2026-06-03"], [447, 17, 1, "2026-06-03", "2026-06-03"], [448, 17, 1, "2026-06-04", "2026-06-04"], [448, 22, 1, "2026-06-04", "2026-06-04"], [448, 13, 1, "2026-06-04", "2026-06-04"], [449, 17, 1, "2026-06-04", "2026-06-04"], [449, 13, 1, "2026-06-04", "2026-06-04"], [449, 22, 1, "2026-06-04", "2026-06-04"], [450, 17, 1, "2026-07-16", "2026-07-16"], [450, 22, 1, "2026-07-16", "2026-07-16"], [450, 13, 1, "2026-07-16", "2026-07-16"], [451, 2, 2, "2026-08-04", "2026-08-04"], [451, 13, 1, "2026-04-06", "2026-04-06"], [452, 22, 1, "2026-04-13", "2026-04-13"], [452, 17, 1, "2026-04-13", "2026-04-13"], [452, 13, 1, "2026-04-13", "2026-04-13"], [453, 22, 1, "2026-04-14", "2026-04-14"], [453, 13, 1, "2026-04-14", "2026-04-14"], [453, 17, 1, "2026-04-14", "2026-04-14"], [454, 13, 2, "2026-04-18", "2026-04-18"], [454, 17, 1, "2026-04-18", "2026-04-18"], [455, 13, 2, "2026-03-27", "2026-03-27"], [455, 17, 1, "2026-03-27", "2026-03-27"], [456, 17, 1, "2026-04-21", "2026-04-21"], [456, 2, 1, "2026-04-21", "2026-04-21"], [456, 13, 1, "2026-04-21", "2026-04-21"], [457, 13, 2, "2026-03-26", "2026-03-26"], [457, 17, 1, "2026-03-26", "2026-03-26"], [458, 17, 1, "2026-07-14", "2026-07-14"], [458, 13, 1, "2026-07-14", "2026-07-14"], [458, 22, 1, "2026-07-14", "2026-07-14"], [459, 17, 1, "2026-08-06", "2026-08-06"], [459, 13, 1, "2026-08-06", "2026-08-06"], [460, 17, 1, "2026-04-14", "2026-04-14"], [460, 13, 1, "2026-04-14", "2026-04-14"], [461, 13, 1, "2026-07-22", "2026-07-22"], [461, 17, 1, "2026-07-22", "2026-07-22"], [462, 17, 1, "2026-08-05", "2026-08-05"], [462, 13, 1, "2026-08-05", "2026-08-05"], [463, 1, 1, "2026-02-19", "2026-02-19"], [463, 17, 1, "2026-02-19", "2026-02-19"], [464, 13, 2, "2026-03-25", "2026-03-25"], [465, 18, 1, "2026-02-17", "2026-02-17"], [465, 17, 1, "2026-02-17", "2026-02-17"], [466, 13, 1, "2026-06-15", "2026-06-15"], [466, 17, 1, "2026-06-15", "2026-06-15"], [467, 13, 1, "2026-07-20", "2026-07-20"], [467, 17, 1, "2026-07-20", "2026-07-20"], [468, 2, 2, "2026-07-13", "2026-07-13"], [469, 13, 1, "2026-03-23", "2026-03-23"], [469, 17, 1, "2026-03-23", "2026-03-23"], [470, 2, 1, "2026-04-30", "2026-04-30"], [470, 13, 1, "2026-04-30", "2026-04-30"], [471, 17, 1, "2026-03-17", "2026-03-17"], [471, 13, 1, "2026-03-17", "2026-03-17"], [472, 13, 1, "2026-03-12", "2026-03-12"], [472, 17, 1, "2026-03-12", "2026-03-12"], [473, 2, 2, "2026-08-11", "2026-08-11"], [474, 22, 1, "2026-01-05", "2026-01-05"], [474, 17, 1, "2026-01-05", "2026-01-05"], [475, 13, 1, "2026-04-30", "2026-04-30"], [475, 2, 1, "2026-04-30", "2026-04-30"], [476, 2, 1, "2026-05-04", "2026-05-04"], [476, 13, 1, "2026-05-04", "2026-05-04"], [477, 22, 1, "2026-01-15", "2026-01-15"], [477, 17, 1, "2026-01-15", "2026-01-15"], [478, 17, 1, "2026-02-16", "2026-02-16"], [478, 18, 1, "2026-02-16", "2026-02-16"], [479, 13, 1, "2026-07-28", "2026-07-28"], [479, 17, 1, "2026-07-28", "2026-07-28"], [480, 17, 1, "2026-06-25", "2026-06-25"], [480, 13, 1, "2026-06-25", "2026-06-25"], [481, 13, 1, "2026-07-16", "2026-07-16"], [481, 17, 1, "2026-07-16", "2026-07-16"], [482, 13, 1, "2026-03-11", "2026-03-11"], [482, 17, 1, "2026-03-11", "2026-03-11"], [483, 13, 1, "2026-03-02", "2026-03-02"], [483, 1, 1, "2026-03-02", "2026-03-02"], [484, 2, 1, "2026-05-13", "2026-05-13"], [484, 13, 1, "2026-05-05", "2026-05-05"], [485, 2, 2, "2026-06-14", "2026-06-14"], [486, 0, 2, "2026-03-25", "2026-03-25"], [487, 2, 1, "2026-04-24", "2026-04-24"], [487, 0, 1, "2026-04-24", "2026-04-24"], [488, 22, 1, "2026-01-19", "2026-01-19"], [488, 17, 1, "2026-01-19", "2026-01-19"], [489, 17, 1, "2026-01-04", "2026-01-04"], [489, 22, 1, "2026-01-04", "2026-01-04"], [490, 17, 1, "2026-02-25", "2026-02-25"], [490, 13, 1, "2026-02-25", "2026-02-25"], [491, 17, 1, "2026-07-08", "2026-07-08"], [491, 13, 1, "2026-07-08", "2026-07-08"], [492, 17, 1, "2026-03-26", "2026-03-26"], [492, 13, 1, "2026-03-26", "2026-03-26"], [493, 17, 1, "2026-08-10", "2026-08-10"], [493, 13, 1, "2026-08-10", "2026-08-10"], [494, 2, 2, "2026-07-20", "2026-07-20"], [495, 13, 1, "2026-08-10", "2026-08-10"], [495, 18, 1, "2026-08-10", "2026-08-10"], [496, 13, 1, "2026-04-02", "2026-04-02"], [496, 17, 1, "2026-04-02", "2026-04-02"], [497, 7, 1, "2026-01-09", "2026-01-09"], [497, 0, 1, "2026-01-09", "2026-01-09"], [498, 0, 2, "2026-04-15", "2026-04-15"], [499, 17, 1, "2026-02-04", "2026-02-04"], [499, 22, 1, "2026-02-04", "2026-02-04"], [500, 0, 1, "2026-01-04", "2026-01-04"], [500, 5, 1, "2026-01-04", "2026-01-04"], [501, 0, 1, "2026-01-13", "2026-01-13"], [501, 1, 1, "2026-01-13", "2026-01-13"], [502, 17, 1, "2026-04-02", "2026-04-02"], [502, 13, 1, "2026-04-02", "2026-04-02"], [503, 17, 1, "2026-08-06", "2026-08-06"], [503, 13, 1, "2026-08-06", "2026-08-06"], [504, 17, 1, "2026-01-06", "2026-01-06"], [505, 18, 1, "2026-02-23", "2026-02-23"], [506, 17, 1, "2026-01-12", "2026-01-12"], [507, 17, 1, "2026-01-13", "2026-01-13"], [508, 17, 1, "2026-01-13", "2026-01-13"], [509, 2, 1, "2026-07-15", "2026-07-15"], [510, 18, 1, "2026-02-02", "2026-02-02"], [511, 18, 1, "2026-01-14", "2026-01-14"], [512, 17, 1, "2026-01-14", "2026-01-14"], [513, 17, 1, "2026-01-14", "2026-01-14"], [514, 10, 1, "2026-01-02", "2026-01-02"], [515, 27, 1, "2026-01-30", "2026-01-30"], [516, 18, 1, "2026-03-20", "2026-03-20"], [517, 17, 1, "2026-01-26", "2026-01-26"], [518, 17, 1, "2026-01-29", "2026-01-29"], [519, 17, 1, "2026-02-03", "2026-02-03"], [520, 10, 1, "2026-02-04", "2026-02-04"], [521, 17, 1, "2026-02-06", "2026-02-06"], [522, 17, 1, "2026-02-09", "2026-02-09"], [523, 54, 1, "2026-01-05", "2026-01-05"], [524, 18, 1, "2026-01-19", "2026-01-19"], [525, 13, 1, "2026-03-12", "2026-03-12"], [526, 13, 1, "2026-02-25", "2026-02-25"], [527, 17, 1, "2026-02-16", "2026-02-16"], [528, 17, 1, "2026-02-17", "2026-02-17"], [529, 17, 1, "2026-02-19", "2026-02-19"], [530, 17, 1, "2026-02-24", "2026-02-24"], [531, 27, 1, "2026-01-03", "2026-01-03"], [532, 0, 1, "2026-01-08", "2026-01-08"], [533, 2, 1, "2026-05-02", "2026-05-02"], [534, 13, 1, "2026-07-31", "2026-07-31"], [535, 13, 1, "2026-03-27", "2026-03-27"], [536, 22, 1, "2026-04-02", "2026-04-02"], [537, 22, 1, "2026-04-02", "2026-04-02"], [538, 22, 1, "2026-04-02", "2026-04-02"], [539, 13, 1, "2026-04-19", "2026-04-19"], [540, 2, 1, "2026-04-25", "2026-04-25"], [541, 14, 1, "2026-01-04", "2026-01-04"], [542, 22, 1, "2026-05-08", "2026-05-08"], [543, 18, 1, "2026-02-26", "2026-02-26"], [544, 18, 1, "2026-01-27", "2026-01-27"], [545, 22, 1, "2026-05-20", "2026-05-20"], [546, 22, 1, "2026-05-21", "2026-05-21"], [547, 13, 1, "2026-06-12", "2026-06-12"], [548, 13, 1, "2026-06-22", "2026-06-22"], [549, 2, 1, "2026-05-11", "2026-05-11"], [550, 0, 1, "2026-03-09", "2026-03-09"], [551, 13, 1, "2026-07-01", "2026-07-01"], [552, 27, 1, "2026-01-01", "2026-01-01"], [553, 13, 1, "2026-07-20", "2026-07-20"], [554, 13, 1, "2026-07-23", "2026-07-23"], [555, 22, 1, "2026-07-28", "2026-07-28"], [556, 22, 1, "2026-08-05", "2026-08-05"], [557, 22, 1, "2026-08-10", "2026-08-10"], [558, 17, 1, "2026-01-05", "2026-01-05"]]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_feature_adoption/data/events.js", error: String((e && e.message) || e) }); }

// doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <doc-page> — paged-document shell for printable HTML.
 *
 * FIRST, decide how the document paginates — up front, before building:
 *
 * - FLOWING document (the default): write the whole document as one
 *   normal HTML flow inside <doc-page>; the browser's print engine
 *   splits it onto pages at export. Use for long-form documents with a
 *   single text flow: reports, memos, letters, essays.
 * - EXPLICIT pagination: a fixed set of pre-paginated pages, one
 *   <section class="page"> child per page. Use when the user asks for a
 *   specific page count, or the design implies one: a one-page resume, a
 *   two-sided flier, a poster, a certificate, a brochure — any richly
 *   laid-out document without a single text flow.
 * - If in doubt, ask the user as part of the build.
 *
 * PAGE SIZING — paper differs by country (letter vs A4), so the printed
 * sheet is not one fixed truth:
 * - FLOWING documents pin NO paper size: the print engine paginates
 *   onto the user's real paper, and the content reflows to it.
 * - EXPLICITLY PAGINATED documents print each page at a FIXED page box
 *   with overflow hidden — letter by default, size="a4" for a clearly
 *   metric user, the user's chosen paper when they export. Design each
 *   page to FILL that box, fitting letter and A4 alike without overlap.
 * - width/height pin an explicit fixed size, ONLY when the user gives
 *   one.
 * Never write your own @page rule or hard-code paper dimensions in the
 * content.
 *
 * Sizing modes (attributes):
 *   (none)                      — portrait: flowing docs use the user's
 *           paper; explicitly paginated pages use the named size box
 *           (letter unless size="a4")
 *   orientation="landscape"     — the same, landscape
 *   width / height              — explicit fixed size, ONLY when the user
 *           gives one (e.g. width="22in" height="30in" for a 22×30
 *           poster): the page IS the design's size, printed at true
 *           dimensions (or scaled onto the user's paper at print time).
 *           Any absolute CSS length: px/in/mm/cm/pt/pc.
 * The component announces the chosen mode to the host app at runtime (a
 * meta tag it injects), so the print path can inject the user's true
 * paper size.
 *
 * On screen the document renders on a desk background: a flowing
 * document as one tall scrolling sheet (Google Docs' pageless view);
 * explicitly paginated documents as one card per page.
 *
 * EXPLICIT pagination usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page>
 *     <section class="page" id="p1">…one page's design…</section>
 *     <section class="page" id="p2">…</section>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * How the page box works, concretely: each .page prints as ONE full-bleed
 * sheet at a FIXED physical size — letter by default (set size="a4" for
 * a clearly metric user), the user's chosen paper when they export —
 * with overflow hidden. Nothing scrolls and nothing reflows onto a next
 * sheet: content that misses the box is CLIPPED. Design each page to
 * FILL that page box, and to fit it — letter and A4 alike — without
 * overlap. Each page is a size container; don't size anything in
 * viewport units (they track the window, not the page), and never set
 * width or height on the .page section itself (the component sizes the
 * page box; an authored height like 100% is meaningless at print and is
 * overridden). The component owns the page box, the screen card chrome,
 * and the page breaks (never add your own break-before/after). Don't mix
 * .page sections with flowing content or header/footer slots in the same
 * document.
 *
 * FLOWING usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page margin="0.75in">
 *     <h1>Title</h1>
 *     <p>…body…</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * There is no manual page-splitting — the browser's print engine
 * paginates at export. Standard break-hygiene rules (`break-inside:
 * avoid` on figures, code blocks, images and table rows; `orphans/
 * widows: 3`) are applied so paragraphs and groups split cleanly. On
 * screen and at print, headings default to `text-wrap: balance` and
 * body text to `text-wrap: pretty`; the defaults have zero specificity,
 * so any text-wrap you declare wins.
 *
 * Other attributes:
 *   size    — letter | a4 | legal (default letter). Flowing documents:
 *           preview proportion only — it does NOT pin their printed
 *           paper (the print dialog's paper governs); leave it alone
 *           there. Explicitly paginated documents: it sets the page box
 *           the cards and the pinned @page share (the export dialog's
 *           choice overrides both at print) — set size="a4" for a
 *           clearly metric user. Scaled-fit: names the sheet the fit is
 *           computed against, same a4-for-metric-users advice.
 *   content-width / content-height — the design's own fixed dimensions
 *           (CSS lengths), for scaling a fixed-size design ONTO the
 *           named sheet: content lays out at exactly this size, and the
 *           component scales it to fit that sheet's printable area
 *           (centered horizontally, top-aligned; the export dialog
 *           re-fits to the user's actual paper choice where available).
 *           Both must be set; they do not change the page box. For pages
 *           WITHOUT running header/footer slots.
 *   margin  — printable inset on every page of a FLOWING document
 *           (default 0.75in); margin="0" makes pages full-bleed.
 *           Explicitly paginated pages are always full-bleed.
 *
 * Running header/footer (flowing documents only): give an element
 * `slot="header"` or `slot="footer"` and it repeats on every printed
 * page via `position: fixed`. To keep body text from sliding under it,
 * the component prints inside a single-cell table whose <thead>/<tfoot>
 * are spacers sized to the header/footer height — browsers repeat
 * thead/tfoot on every page, so each sheet's content starts below the
 * header and ends above the footer. On screen the header/footer render
 * once at the top/bottom of the sheet.
 *
 * At print the component injects `@page { margin: 0 }` (which leaves
 * Chrome no margin box to draw its date/URL/page-count header in) and
 * moves the visual margin onto the sheet's own padding. It also marks
 * the document as owning its print CSS (a
 * `meta[name="omelette-owns-print"]` it injects at runtime), so the
 * PDF export never injects page-geometry CSS of its own on top.
 *
 * Print best practices for the content you author:
 * - Multi-column text: use CSS columns (`column-count` +
 *   `column-gap`), never side-by-side flex/grid columns — only real
 *   CSS columns flow and break across pages. `column-span: all` lets
 *   a heading span the columns; `hyphens: auto` (needs `lang` on
 *   the html element) keeps narrow columns readable.
 * - Page breaks in flowing documents: `break-before: page` on an
 *   element that must start a new page (a chapter, an appendix). Add
 *   your own kept-together blocks (callouts, stat tiles, cards) to a
 *   `break-inside: avoid` rule, and keep each one shorter than a page.
 * - Extend `orphans: 3; widows: 3` to any custom text blocks you add
 *   (p and li are covered by default).
 * - Give long tables a <thead> — browsers repeat it on every printed
 *   page.
 * - No `position: fixed`/`sticky` and no viewport units in content:
 *   fixed elements stamp every printed page (running headers/footers go
 *   in the component's slots) and `100vh` mis-sizes at print.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body —
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  // Unitless "0" is a valid CSS length and the natural way to write
  // margin="0"; normalise it to 0px so max()/calc() (which reject a bare
  // number) keep working.
  const safeLen = (v, fb) => {
    v = (v || '').trim();
    return v === '0' ? '0px' : CSS_LENGTH.test(v) ? v : fb;
  };
  // WebKit (Safari and every iOS browser shell) never repeats a table's
  // thead/tfoot on printed pages (WebKit bug 17205), so the spacer-borne
  // vertical margins of a FLOWING document reach only the first page
  // there. Engine check, not browser check: vendor is 'Apple Computer,
  // Inc.' exactly for WebKit and 'Google Inc.' for Blink.
  const WK_PRINT = /apple/i.test(navigator.vendor || '');
  // CSS length → px number (CSS absolute units are exact: 1in = 96px).
  // Returns NaN for anything safeLen would reject — callers gate on it.
  const PX_PER = {
    px: 1,
    in: 96,
    mm: 96 / 25.4,
    cm: 96 / 2.54,
    pt: 96 / 72,
    pc: 16
  };
  const toPx = v => {
    const m = /^(\d+(?:\.\d+)?)(px|in|mm|cm|pt|pc)$/.exec((v || '').trim());
    return m ? parseFloat(m[1]) * PX_PER[m[2]] : NaN;
  };
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      /* When the viewport is narrower than the page, grow to wrap the
       * sheet (plus this padding) instead of staying viewport-width, so
       * the desk background and right margin reach the sheet's far edge
       * in the horizontal scroll. */
      min-width: max-content;
      min-height: 100vh;
      background: #f5f5f4;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
      --doc-hdr-pad: 0px;
      --doc-ftr-pad: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 10px rgba(20, 20, 19, 0.12);
      border-radius: 7px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    /* Scaled-fit mode (content-width/content-height): the inner .fit box
     * lays the content out at its authored fixed size and scales it onto
     * the printable area; .fit-box reserves the scaled footprint in flow
     * (transforms don't affect layout) and centers it. Without the mode,
     * both divs are unstyled block pass-throughs. */
    /* Explicit pagination: direct .page children are the pages. The sheet
     * becomes a transparent stack and each page carries the card look on
     * screen; at print each page is exactly one full-bleed sheet. The
     * ::slotted defaults are deliberately weak (document CSS wins), so
     * authored page styling can override any of this. */
    .sheet.paginated {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }
    .paginated ::slotted(.page) {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: var(--doc-page-ar);
      container-type: size;
      overflow: hidden;
      box-sizing: border-box;
      background: #fff;
      border-radius: 7px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      break-inside: avoid;
    }
    .paginated ::slotted(.page:not(:first-child)) { margin-top: 1rem; }
    @media print {
      .sheet.paginated { padding: 0; }
      /* The flowing-document vertical inset lives on the repeating
       * thead/tfoot spacers, not the sheet padding — they must go too,
       * or each full-sheet .page is pushed ~margin down and spills onto
       * a second sheet. Paginated pages are full-bleed by definition
       * (content owns its insets). */
      .sheet.paginated .hdr-space,
      .sheet.paginated .ftr-space { height: 0; }
      .paginated ::slotted(.page) {
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        /* Physical page-box sizing, no viewport units: Safari resolves
         * 100vh against the window, not the page box, so a vh-sized card
         * paginates wrong there. --doc-page-w/h are the named size by
         * default and are overridden to the user's chosen paper by the
         * export path, so every card is exactly one sheet either way.
         * Width + height (same source values as @page size) rather than
         * width + aspect-ratio: the ratio is a 6-decimal rounding of the
         * same division, and a few millionths of overflow would spill a
         * blank sheet after every page. The screen-only aspect-ratio
         * (preview proportions) must not leak into print. cqh typography
         * tracks the same box.
         *
         * Every declaration is !important: per CSS Scoping, unimportant
         * shadow ::slotted rules LOSE to the document context, so a page
         * section's authored inline style would silently beat this print
         * geometry. A model-authored height:100% did exactly that — the
         * percentage resolves as auto in the all-auto print ancestry, the
         * base rule's size containment turns auto into ZERO, and
         * overflow:hidden then paints nothing: a blank PDF with perfect
         * page boxes. At print the component's geometry is the design's
         * whole contract, so it must win over any authored sizing. */
        aspect-ratio: auto !important;
        width: var(--doc-page-w) !important;
        height: var(--doc-page-h) !important;
        overflow: hidden !important;
      }
      .paginated ::slotted(.page:not(:first-child)) {
        break-before: page !important;
        margin-top: 0 !important;
      }
    }
    .fit-mode .fit-box {
      width: calc(var(--doc-fit-w) * var(--doc-fit-scale));
      height: calc(var(--doc-fit-h) * var(--doc-fit-scale));
      margin: 0 auto;
      break-inside: avoid;
    }
    .fit-mode .fit {
      width: var(--doc-fit-w);
      height: var(--doc-fit-h);
      transform: scale(var(--doc-fit-scale));
      transform-origin: top left;
    }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-width: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      /* The 0.35in is breathing room between a running header/footer and
       * the body; without one the spacer is exactly the page margin, so a
       * margin="0" full-bleed document gets truly full-bleed pages. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))); }
      /* WebKit flowing documents: @page carries the vertical margin (see
       * _syncPrintPageRule), so the spacers keep only whatever a running
       * header/footer needs BEYOND it — page 1 would otherwise double its
       * top inset. Paginated sheets already zero their spacers above. */
      .sheet.wk-print:not(.paginated) .hdr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))) - var(--doc-page-margin))); }
      .sheet.wk-print:not(.paginated) .ftr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))) - var(--doc-page-margin))); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin', 'orientation', 'content-width', 'content-height'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }

    /** The named paper's [w, h], swapped when orientation="landscape".
     *  Only the named size swaps — explicit width/height are exact values
     *  the author already oriented. */
    _paperSize() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()] || PAPER.letter;
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? [named[1], named[0]] : named;
    }
    get pageWidth() {
      return safeLen(this.getAttribute('width'), this._paperSize()[0]);
    }
    get pageHeight() {
      return safeLen(this.getAttribute('height'), this._paperSize()[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }

    /** Scaled-fit mode's content box [w, h] as CSS lengths, or null when
     *  the mode is off (either attribute missing/invalid/zero — a partial
     *  declaration falls back to normal flow rather than guessing). */
    _contentFit() {
      const w = safeLen(this.getAttribute('content-width'), null);
      const h = safeLen(this.getAttribute('content-height'), null);
      if (!w || !h) return null;
      const wPx = toPx(w),
        hPx = toPx(h);
      return wPx > 0 && hPx > 0 ? [w, h, wPx, hPx] : null;
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      this._ensureOwnsPrintMeta();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      const survivor = document.querySelector('doc-page');
      if (!survivor) {
        ['doc-page-print', 'doc-page-text-wrap', 'doc-page-owns-print', 'doc-page-fixed-size', 'doc-page-print-sizing'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
        // A live deck-stage deferred its own print-sizing meta to ours —
        // hand the page-global meta over so the deck isn't left unmarked.
        const deck = document.querySelector('deck-stage');
        if (deck && typeof deck._ensurePrintSizingMeta === 'function') {
          deck._ensurePrintSizingMeta();
        }
      } else {
        // A departed owner hands each page-global meta to whatever
        // doc-page remains (or it's removed).
        if (typeof survivor._syncFixedSizeMeta === 'function') {
          survivor._syncFixedSizeMeta();
        }
        if (typeof survivor._syncPrintSizingMeta === 'function') {
          survivor._syncPrintSizingMeta();
        }
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><div class="fit-box"><div class="fit"><slot></slot></div></div></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      // Scaled-fit mode: content at its authored size, scaled onto the
      // printable area (page minus margins on both axes). The factor is a
      // plain number var so calc(length * number) stays valid; 4 decimals
      // keeps the shadow style stable across re-measures. Upscaling is
      // allowed — print transforms are vector, so text and CSS stay crisp
      // (raster images soften, which the catalog bullet warns about).
      const fit = this._contentFit();
      let fitVars = '';
      if (fit) {
        const marginPx = toPx(this.pageMargin) || 0;
        const availW = toPx(this.pageWidth) - 2 * marginPx;
        const availH = toPx(this.pageHeight) - 2 * marginPx;
        const scale = Math.min(availW / fit[2], availH / fit[3]);
        if (scale > 0 && Number.isFinite(scale)) {
          fitVars = '--doc-fit-w:' + fit[0] + ';' + '--doc-fit-h:' + fit[1] + ';' + '--doc-fit-scale:' + scale.toFixed(4) + ';';
        }
      }
      this._sheet.classList.toggle('fit-mode', !!fitVars);
      // Numeric w/h ratio for the paginated page cards' aspect-ratio —
      // aspect-ratio takes a number, not a length ratio, so compute it
      // here (CSS length division isn't portable). 6 decimals keeps the
      // shadow style stable across re-syncs.
      const arW = toPx(this.pageWidth);
      const arH = toPx(this.pageHeight);
      const ar = arW > 0 && arH > 0 ? (arW / arH).toFixed(6) : '0.772727';
      this._vars.textContent = ':host{' + fitVars + '--doc-page-ar:' + ar + ';' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px;' + '--doc-hdr-pad:' + (hdrH ? '0.35in' : '0px') + ';' + '--doc-ftr-pad:' + (ftrH ? '0.35in' : '0px') + '}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order — the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document.
     *
     *  The @page SIZE is pinned where the page box IS part of the design:
     *  explicit-fixed-size mode (width + height authored), scaled-fit
     *  mode (the named sheet the fit targets), and explicit pagination
     *  (the named size the cards share — so card and sheet agree on
     *  every print path, and the export path's chosen paper overrides
     *  BOTH with one later rule). For FLOWING documents no paper size is
     *  emitted at all — the true size comes from the user's preference,
     *  injected by the export path or chosen in the print dialog — so a
     *  flowing document never fights the paper it lands on.
     *  margin: 0 is emitted in every mode: it leaves Chrome no margin box
     *  to draw its date/URL/page-count header in, and the visual margin
     *  lives on the sheet's own padding. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      // Three print-geometry regimes:
      // - true-size: the page IS the design — pin its exact size.
      // - scaled-fit (content-width/height): the fit factor is computed
      //   against the NAMED paper's printable area, so that paper must
      //   stay pinned or the scaled content overflows a smaller sheet
      //   (the export path re-fits and re-pins at print time on top).
      // - default modes: no paper size — but landscape still needs the
      //   paper-agnostic 'size: landscape' keyword, because the size
      //   descriptor is what carries orientation; without it a landscape
      //   document prints portrait whenever nothing injects a size.
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      // Explicit pagination pins the page box to the SAME values that
      // size the cards (the named size by default, the export path's
      // chosen paper when its later rule overrides both) — card and
      // sheet agree on every print path, and a mismatched real paper
      // shrinks-to-fit in the dialog instead of clipping a Letter card
      // on A4. Declared before the paginated read below so both derive
      // from one check.
      const paginatedNow = this.querySelector(':scope > .page') !== null;
      const sizeDescriptor = this._trueSizePx() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : this._contentFit() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : paginatedNow ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : landscape ? 'size: landscape; ' : '';
      // WebKit never repeats the thead/tfoot spacers that carry a flowing
      // document's vertical page margins (see WK_PRINT above), so pages
      // after the first print edge-to-edge there. Carry the VERTICAL
      // margins on @page for WebKit instead, and the shadow print CSS
      // trims the first-page spacers by the same amount (.sheet.wk-print
      // rules). Horizontal inset stays on the sheet's own padding in
      // every engine. Blink keeps margin: 0 (a nonzero margin there
      // re-opens the box Chrome draws its header furniture in). One cost,
      // learned in testing: Safari's own date/URL headers are a USER
      // dialog setting ("Print headers and footers") that renders in the
      // margin area when room exists — margin: 0 only suppressed it by
      // leaving no room, and no CSS controls it. The export dialog's
      // Safari guide teaches turning the setting off for flowing
      // documents. Explicitly paginated and fixed-size documents keep
      // margin: 0 everywhere: their pages ARE the sheet.
      const wkFlowing = WK_PRINT && !paginatedNow && !this._trueSizePx() && !this._contentFit();
      const marginDescriptor = wkFlowing ? 'margin: ' + this.pageMargin + ' 0; ' : 'margin: 0; ';
      // Shadow-internal marker (never serialized), kept in lockstep with
      // the @page decision above: the print CSS trims the first-page
      // spacers ONLY while @page actually carries the margins — a
      // true-size or scaled-fit sheet keeps margin: 0 and must keep its
      // spacers too. Re-synced here so attribute changes and pagination
      // flips move both together.
      if (this._sheet) this._sheet.classList.toggle('wk-print', wkFlowing);
      tag.textContent = '@page { ' + sizeDescriptor + marginDescriptor + '} ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; ' + 'backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content — shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }

    /** Declares that this document owns its print CSS. The instant-PDF
     *  export checks for the meta by NAME PRESENCE alone (content is
     *  ignored) and skips its automatic print-CSS injections, so the
     *  component's @page geometry is never overridden by a heuristic.
     *  data-omelette-injected keeps it out of serialized source. */
    _ensureOwnsPrintMeta() {
      if (document.getElementById('doc-page-owns-print')) return;
      const tag = document.createElement('meta');
      tag.id = 'doc-page-owns-print';
      tag.name = 'omelette-owns-print';
      tag.content = 'true';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }

    /** This page's valid true-size page box (explicit width AND height)
     *  as [w, h] px ints, or null when the mode is off. */
    _trueSizePx() {
      if (!safeLen(this.getAttribute('width'), null) || !safeLen(this.getAttribute('height'), null)) return null;
      const w = Math.round(toPx(this.pageWidth));
      const h = Math.round(toPx(this.pageHeight));
      return w > 0 && h > 0 ? [w, h] : null;
    }

    /** True-size pages (explicit width AND height) also declare the page
     *  box as the preview size: the in-app preview reads
     *  meta[name="omelette-fixed-size"] (content "W,H" in px ints) and
     *  scales the sheet into view — without it an 18in poster previews at
     *  true size with scrollbars. Never overrides an author-set meta
     *  (only the component's own id is managed). The meta is page-global
     *  while doc-page instances are not, so every sync recomputes the
     *  page-wide owner — the first connected true-size doc-page — and a
     *  non-true-size sibling's sync can never delete the owner's meta.
     *  Removed when no true-size page remains (the owner's disconnect
     *  re-syncs via any survivor) or when an author-set meta exists. */
    _syncFixedSizeMeta() {
      const id = 'doc-page-fixed-size';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-fixed-size"]:not([data-omelette-injected])');
      // The page-wide owner, not this instance: an upgraded true-size page
      // anywhere in the document keeps the meta alive and sized.
      let box = null;
      for (const el of document.querySelectorAll('doc-page')) {
        box = typeof el._trueSizePx === 'function' ? el._trueSizePx() : null;
        if (box) break;
      }
      if (!box || authored) {
        if (own) own.remove();
        return;
      }
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-fixed-size';
      tag.content = box[0] + ',' + box[1];
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }

    /** This page's print-sizing mode: 'fixed' when an explicit width AND
     *  height are authored (the page is the design's own size), else the
     *  default paper in the authored orientation. */
    _printSizingMode() {
      if (this._trueSizePx()) return 'fixed';
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? 'default-landscape' : 'default-portrait';
    }

    /** Announces the print-sizing mode to the host app:
     *  meta[name="omelette-print-sizing"] with content 'default-portrait',
     *  'default-landscape', or 'fixed' (fixed pages also carry the
     *  omelette-fixed-size meta with the page box in px). The export path
     *  probes it to decide what true paper size to inject at print time —
     *  in the default modes the component emits no paper size of its own.
     *  Same page-global ownership rules as the fixed-size meta above:
     *  first connected doc-page owns it, an authored meta is never
     *  overridden, removed when no doc-page remains. */
    _syncPrintSizingMeta() {
      const id = 'doc-page-print-sizing';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-print-sizing"]:not([data-omelette-injected])');
      // A fixed page wins outright (mirroring the fixed-size loop above,
      // so the two metas can never contradict each other in a mixed
      // multi-page document); otherwise the first page's mode holds.
      let mode = null;
      for (const el of document.querySelectorAll('doc-page')) {
        if (typeof el._printSizingMode !== 'function') continue;
        const m = el._printSizingMode();
        if (m === 'fixed') {
          mode = m;
          break;
        }
        if (mode === null) mode = m;
      }
      if (!mode || authored) {
        if (own) own.remove();
        return;
      }
      // A deck-stage that connected first injected its own meta and
      // defers to any existing one — take it over, or the document ends
      // up with two conflicting injected metas (a doc-page page is the
      // document; the deck re-ensures its meta if every doc-page leaves).
      const deckMeta = document.getElementById('deck-stage-print-sizing');
      if (deckMeta) deckMeta.remove();
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-print-sizing';
      tag.content = mode;
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. The
     *  same pass detects explicit pagination (direct .page children) and
     *  toggles the sheet between the flowing-document card and the
     *  page-per-card stack — content edits can add or remove pages at any
     *  time, so this tracks the same mutations the measurement does. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      const wasPaginated = this._sheet.classList.contains('paginated');
      this._sheet.classList.toggle('paginated', this.querySelector(':scope > .page') !== null);
      // The WebKit @page margin is flowing-only, so a pagination flip
      // must re-emit the rule (content edits can add or remove .page
      // sections at any time).
      if (this._sheet.classList.contains('paginated') !== wasPaginated) {
        this._syncPrintPageRule();
      }
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "doc-page.js", error: String((e && e.message) || e) }); }

// export/feature-adoption-standalone.jsx
try { (() => {
const {
  useState,
  useMemo
} = React;

/* ── Plan mapping ───────────────────────────────────────────────
   The event export carries no plan column, so plans below are DERIVED
   from billing/team signals in the events themselves (see derivePlan).
   Paste the real values here to override — key is the account id:
   PLAN_OVERRIDES = { 34: 'team', 731: 'enterprise', ... }            */
const PLAN_OVERRIDES = {};
const D = window.EVENT_DATA;
const PLANS = [{
  k: 'free',
  label: 'Free'
}, {
  k: 'solo',
  label: 'Solo'
}, {
  k: 'team',
  label: 'Team'
}, {
  k: 'enterprise',
  label: 'Enterprise'
}];
const TEAM_SIGNALS = ['accountant_invited', 'accountant_joined', 'member_joined', 'partner_portal_accessed'];
const PAID_SIGNALS = ['checkout_completed', 'subscription_created', 'plan_changed'];

/* ── Capability taxonomy ────────────────────────────────────────
   Raw events grouped into the things a customer actually switches on.
   Add or re-cut a capability by editing one line here.               */
const CAPABILITIES = [{
  f: 'Invoicing',
  name: 'Create & edit invoices',
  kind: 'core',
  ev: ['invoice_created', 'invoice_updated']
}, {
  f: 'Invoicing',
  name: 'Download PDFs',
  kind: 'core',
  ev: ['invoice_downloaded', 'invoice_viewed_by_owner']
}, {
  f: 'Invoicing',
  name: 'Send invoices to clients',
  kind: 'core',
  ev: ['invoice_sent']
}, {
  f: 'Invoicing',
  name: 'Client portal (viewed / downloaded)',
  kind: 'core',
  ev: ['invoice_viewed_by_client', 'invoice_downloaded_by_client']
}, {
  f: 'Invoicing',
  name: 'Mark paid / unpaid',
  kind: 'core',
  ev: ['invoice_paid', 'invoice_unpaid']
}, {
  f: 'Invoicing',
  name: 'Automatic payment reminders',
  kind: 'opt-in',
  ev: ['invoice_reminder_toggled', 'invoice_reminder_sent']
}, {
  f: 'Invoicing',
  name: 'Custom invoice templates',
  kind: 'opt-in',
  ev: ['template_created', 'invoice_template_changed', 'invoice_template_settings_changed']
}, {
  f: 'Invoicing',
  name: 'Quotes & proformas',
  kind: 'opt-in',
  ev: ['quote_created', 'quote_updated']
}, {
  f: 'Invoicing',
  name: 'Recurring invoices',
  kind: 'opt-in',
  ev: ['recurring_invoice_created']
}, {
  f: 'Invoicing',
  name: 'Import invoices',
  kind: 'opt-in',
  ev: ['invoices_imported']
}, {
  f: 'Invoicing',
  name: 'Bulk invoice actions',
  kind: 'opt-in',
  ev: ['bulk_invoices_updated', 'bulk_invoices_deleted']
}, {
  f: 'Invoicing',
  name: 'Custom numbering sequences',
  kind: 'opt-in',
  ev: ['invoice_sequence_created', 'invoice_sequence_updated']
}, {
  f: 'Invoicing',
  name: 'Cancel / delete invoices',
  kind: 'core',
  ev: ['invoice_canceled', 'invoice_uncanceled', 'invoice_deleted']
}, {
  f: 'Invoicing',
  name: 'Bulk export',
  kind: 'opt-in',
  ev: ['invoices_exported']
}, {
  f: 'Reporting',
  name: 'View reports',
  kind: 'core',
  ev: ['report_viewed', 'dashboard_viewed']
}, {
  f: 'Reporting',
  name: 'Filter & segment reports',
  kind: 'opt-in',
  ev: ['report_filter_changed']
}, {
  f: 'Reporting',
  name: 'Drill into report charts',
  kind: 'opt-in',
  ev: ['report_drilldown_opened', 'report_graph_toggled']
}, {
  f: 'Reporting',
  name: 'Export reports & documents',
  kind: 'opt-in',
  ev: ['report_exported', 'documents_exported']
}, {
  f: 'Reporting',
  name: 'Chase overdue from report',
  kind: 'opt-in',
  ev: ['report_overdue_clicked']
}, {
  f: 'Documents',
  name: 'Transaction documents',
  kind: 'opt-in',
  ev: ['transaction_document_uploaded', 'transaction_document_deleted']
}, {
  f: 'Documents',
  name: 'Inbound document inbox',
  kind: 'opt-in',
  ev: ['inbound_document_matched', 'inbound_document_unmatched', 'inbound_document_discarded']
}, {
  f: 'Documents',
  name: 'Automatic document matching',
  kind: 'opt-in',
  ev: ['transaction_document_auto_matched']
}, {
  f: 'Customers',
  name: 'Customer records',
  kind: 'core',
  ev: ['customer_created']
}, {
  f: 'Customers',
  name: 'Maintain customer details',
  kind: 'core',
  ev: ['customer_updated', 'customer_deleted']
}, {
  f: 'Banking',
  name: 'Bank account connected',
  kind: 'opt-in',
  ev: ['bank_account_connected', 'bank_account_disconnected']
}, {
  f: 'Banking',
  name: 'Bank feed import',
  kind: 'opt-in',
  ev: ['bank_transactions_imported']
}, {
  f: 'Banking',
  name: 'Match payments to invoices',
  kind: 'opt-in',
  ev: ['invoice_transaction_matched', 'invoice_transaction_unmatched']
}, {
  f: 'Banking',
  name: 'Card checkout / subscription',
  kind: 'opt-in',
  ev: ['checkout_completed', 'subscription_created']
}, {
  f: 'Banking',
  name: 'Plan changes',
  kind: 'lifecycle',
  ev: ['plan_changed', 'subscription_status_changed']
}, {
  f: 'Banking',
  name: 'Cancellation flow',
  kind: 'lifecycle',
  ev: ['subscription_canceled', 'subscription_cancellation_portal_opened', 'subscription_cancellation_feedback_submitted', 'subscription_cancellation_confirmed']
}, {
  f: 'Banking',
  name: 'Payment friction (failed / 3DS)',
  kind: 'lifecycle',
  ev: ['payment_failed', 'payment_action_required']
}, {
  f: 'Banking',
  name: 'Trial lifecycle',
  kind: 'lifecycle',
  ev: ['trial_will_end', 'trial_expired']
}, {
  f: 'Team',
  name: 'Accountant access',
  kind: 'opt-in',
  ev: ['accountant_invited', 'accountant_joined']
}, {
  f: 'Team',
  name: 'Accounting software integration',
  kind: 'opt-in',
  ev: ['accountant_integration_connected']
}, {
  f: 'Team',
  name: 'Team members',
  kind: 'opt-in',
  ev: ['member_joined']
}, {
  f: 'Team',
  name: 'Partner portal',
  kind: 'opt-in',
  ev: ['partner_portal_accessed']
}, {
  f: 'AI',
  name: 'AI assistant',
  kind: 'opt-in',
  ev: ['ai_assistant_used']
}, {
  f: 'Setup',
  name: 'Onboarding completed',
  kind: 'lifecycle',
  ev: ['onboarding_completed', 'registration']
}, {
  f: 'Setup',
  name: 'Company profile & logo',
  kind: 'opt-in',
  ev: ['organization_updated', 'organization_logo_uploaded', 'organization_logo_removed']
}, {
  f: 'Setup',
  name: 'Service catalog',
  kind: 'opt-in',
  ev: ['service_created', 'service_updated', 'service_deleted']
}];
const fmt = n => n.toLocaleString('en-US');
const nice = e => e.replace(/_/g, ' ');
const pct = (a, b) => b ? a / b * 100 : 0;

/* ── index the export ─────────────────────────────────────────── */
const EV_FEATURE = {};
CAPABILITIES.forEach(c => c.ev.forEach(e => EV_FEATURE[e] = c.f));

/* The export carries first_seen / last_seen per account × event, not a full time
   series — so a date range selects activity that OVERLAPS the window. Counts stay
   export totals; re-run data/supabase-export.sql with a narrower window for exact
   per-period counts. */
function indexCells(from, to) {
  const byOrg = D.orgs.map(() => ({
    ev: {},
    feat: {},
    total: 0,
    last: '',
    first: ''
  }));
  D.cells.forEach(([o, e, n, first, last]) => {
    if (from && last < from) return;
    if (to && first > to) return;
    const ev = D.events[e],
      b = byOrg[o],
      f = EV_FEATURE[ev.e] || ev.f;
    b.ev[ev.e] = {
      n,
      first,
      last,
      f
    };
    b.feat[f] = (b.feat[f] || 0) + n;
    b.total += n;
    if (last > b.last) b.last = last;
    if (!b.first || first < b.first) b.first = first;
  });
  return byOrg;
}
const byOrg = indexCells();
const PLAN_KEYS = PLANS.map(p => p.k);
let PLANS_ARE_REAL = false;
function derivePlan(i) {
  const org = D.orgs[i],
    ev = byOrg[i].ev;
  if (PLAN_OVERRIDES[org.id]) return PLAN_OVERRIDES[org.id];
  // real plan straight off the export (data/supabase-export.sql emits orgs[].plan)
  const real = (org.plan || (D.plans || {})[org.id] || '').toLowerCase();
  if (PLAN_KEYS.includes(real)) {
    PLANS_ARE_REAL = true;
    return real;
  }
  const team = TEAM_SIGNALS.some(k => ev[k]);
  const paid = PAID_SIGNALS.some(k => ev[k]);
  if (team) return org.total > 800 ? 'enterprise' : 'team';
  return paid ? 'solo' : 'free';
}
const PLAN_OF = D.orgs.map((_, i) => derivePlan(i));
function buildAccounts(from, to) {
  const idx = from || to ? indexCells(from, to) : byOrg;
  return D.orgs.map((org, i) => ({
    ...org,
    i,
    plan: PLAN_OF[i],
    feat: idx[i].feat,
    ev: idx[i].ev,
    total: idx[i].total,
    last: idx[i].last,
    first: idx[i].first
  })).filter(a => a.total > 0);
}
const ACCOUNTS = buildAccounts();
const RANGES = [{
  k: 'all',
  label: 'All time'
}, {
  k: '30',
  label: 'Last 30 days'
}, {
  k: '90',
  label: 'Last 90 days'
}, {
  k: 'ytd',
  label: 'Year to date'
}, {
  k: 'custom',
  label: 'Custom'
}];
const shiftDays = (iso, d) => {
  const t = new Date(iso + 'T00:00:00Z');
  t.setUTCDate(t.getUTCDate() + d);
  return t.toISOString().slice(0, 10);
};
function rangeDates(k, from, to) {
  if (k === 'all') return [D.start, D.asof];
  if (k === 'custom') return [from, to];
  if (k === 'ytd') return [D.asof.slice(0, 4) + '-01-01', D.asof];
  return [shiftDays(D.asof, -(+k - 1)), D.asof];
}
const EV_TOTAL = {};
D.events.forEach(e => EV_TOTAL[e.e] = e.n);
const FEATURE_NAMES = [];
CAPABILITIES.forEach(c => {
  if (!FEATURE_NAMES.includes(c.f)) FEATURE_NAMES.push(c.f);
});
const FEATURES = FEATURE_NAMES.map(name => ({
  name,
  n: CAPABILITIES.filter(c => c.f === name).reduce((s, c) => s + c.ev.reduce((t, e) => t + (EV_TOTAL[e] || 0), 0), 0),
  caps: CAPABILITIES.filter(c => c.f === name).length
})).sort((a, b) => b.n - a.n);
const FEATURE_ORDER = FEATURES.map(f => f.name);
const FEATURE_ICON = {
  Invoicing: 'receipt',
  Reporting: 'chart-line',
  Customers: 'users-three',
  Banking: 'bank',
  Setup: 'sliders-horizontal',
  Team: 'user-plus',
  AI: 'sparkle',
  Documents: 'files'
};
const KIND_LABEL = {
  core: 'Core flow',
  'opt-in': 'Opt-in',
  lifecycle: 'Lifecycle'
};

/* ── shared bits ──────────────────────────────────────────────── */
function Seg({
  options,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "seg"
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.k,
    "aria-pressed": value === o.k,
    onClick: () => onChange(o.k)
  }, o.label)));
}
function Bar({
  v,
  max,
  color = '#AAE1C9'
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "track"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: Math.max(pct(v, max), 1.5) + '%',
      background: color
    }
  }));
}
function Tile({
  label,
  value,
  foot,
  tone
}) {
  const bg = {
    blue: '#E3F5FF',
    mint: 'rgba(170,225,201,.35)',
    grey: '#F7F9FB',
    slate: '#E5ECF6'
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    className: "tile",
    style: {
      background: bg
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lab"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "val"
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "foot"
  }, foot));
}
function heatStyle(share) {
  if (!share) return {};
  const a = 0.08 + Math.sqrt(Math.min(share, 1)) * 0.72;
  return {
    background: `rgba(170,225,201,${a.toFixed(3)})`,
    fontWeight: share > 0.45 ? 600 : 400
  };
}
function adoptionColor(p) {
  return p >= 60 ? '#AAE1C9' : p >= 25 ? '#B9E1F5' : '#FFCB9E';
}

/* ── app ──────────────────────────────────────────────────────── */
function App() {
  const [view, setView] = useState('features');
  const [plans, setPlans] = useState([]);
  const [feats, setFeats] = useState(FEATURE_ORDER);
  const [kinds, setKinds] = useState([]); // [] = all kinds
  const [measure, setMeasure] = useState('events');
  const [sort, setSort] = useState({
    key: 'total',
    dir: -1
  });
  const [capSort, setCapSort] = useState('adoption');
  const [grain, setGrain] = useState('caps'); // caps | events
  const [capQ, setCapQ] = useState('');
  const [q, setQ] = useState('');
  const [selUser, setSelUser] = useState(null);
  const [selCap, setSelCap] = useState(null);
  const [allRows, setAllRows] = useState(false);
  const [range, setRange] = useState('all');
  const [cFrom, setCFrom] = useState(D.start);
  const [cTo, setCTo] = useState(D.asof);
  const [from, to] = rangeDates(range, cFrom, cTo);
  const dated = range !== 'all';
  const accounts = useMemo(() => dated ? buildAccounts(from, to) : ACCOUNTS, [dated, from, to]);
  const togglePlan = k => setPlans(p => p.includes(k) ? p.filter(x => x !== k) : [...p, k]);
  const toggleFeat = k => setFeats(f => f.includes(k) ? f.length > 1 ? f.filter(x => x !== k) : f : FEATURE_ORDER.filter(n => f.includes(n) || n === k));
  const toggleKind = k => setKinds(s => s.includes(k) ? s.filter(x => x !== k) : [...s, k]);
  const inScope = useMemo(() => accounts.filter(a => !plans.length || plans.includes(a.plan)), [accounts, plans]);
  const caps = useMemo(() => {
    const N = inScope.length || 1;
    const base = CAPABILITIES.filter(c => feats.includes(c.f) && (!kinds.length || kinds.includes(c.kind)));
    const units = grain === 'events' ? base.flatMap(c => c.ev.filter(e => EV_TOTAL[e] != null).map(e => ({
      ...c,
      name: nice(e),
      cap: c.name,
      ev: [e]
    }))) : base;
    const needle = capQ.trim().toLowerCase().replace(/ /g, '_');
    return units.filter(c => !needle || c.ev.some(e => e.includes(needle)) || c.name.toLowerCase().replace(/ /g, '_').includes(needle) || c.f.toLowerCase().includes(needle)).map(c => {
      const users = inScope.filter(a => c.ev.some(e => a.ev[e]));
      const n = inScope.reduce((s, a) => s + c.ev.reduce((t, e) => t + ((a.ev[e] || {}).n || 0), 0), 0);
      const last = users.reduce((m, a) => {
        const l = c.ev.map(e => (a.ev[e] || {}).last).filter(Boolean).sort().pop() || '';
        return l > m ? l : m;
      }, '');
      const byPlan = {};
      PLANS.forEach(p => {
        const pool = inScope.filter(a => a.plan === p.k);
        byPlan[p.k] = {
          pool: pool.length,
          used: pool.filter(a => c.ev.some(e => a.ev[e])).length
        };
      });
      return {
        ...c,
        users,
        n,
        last,
        byPlan,
        adoption: pct(users.length, N),
        avg: users.length ? n / users.length : 0
      };
    });
  }, [inScope, feats, kinds, grain, capQ]);
  const capsSorted = useMemo(() => {
    const arr = [...caps];
    if (capSort === 'adoption') arr.sort((a, b) => b.adoption - a.adoption || b.n - a.n);else if (capSort === 'volume') arr.sort((a, b) => b.n - a.n);else if (capSort === 'gap') arr.sort((a, b) => a.adoption - b.adoption || b.n - a.n);else arr.sort((a, b) => FEATURE_ORDER.indexOf(a.f) - FEATURE_ORDER.indexOf(b.f) || b.adoption - a.adoption);
    return arr;
  }, [caps, capSort]);
  const rows = useMemo(() => {
    let r = inScope.filter(a => !q || a.email.toLowerCase().includes(q.toLowerCase()) || String(a.id).includes(q));
    r = r.map(a => ({
      ...a,
      inView: feats.reduce((s, f) => s + (a.feat[f] || 0), 0),
      used: feats.filter(f => a.feat[f]).length
    }));
    const val = (x, key) => key === 'email' ? x.email : key === 'plan' ? x.plan : key === 'used' ? x.used : key === 'last' ? x.last : key === 'total' ? x.inView : x.feat[key] || 0;
    return r.sort((a, b) => {
      const va = val(a, sort.key),
        vb = val(b, sort.key);
      return (va > vb ? 1 : va < vb ? -1 : 0) * sort.dir;
    });
  }, [inScope, feats, q, sort]);
  const scope = useMemo(() => {
    const eventsInView = caps.reduce((s, c) => s + c.n, 0);
    const colMax = {};
    feats.forEach(f => colMax[f] = Math.max(1, ...rows.map(r => r.feat[f] || 0)));
    const wide = caps.filter(c => c.adoption >= 50).length;
    const dormant = caps.filter(c => c.users.length <= 1).length;
    const optin = caps.filter(c => c.kind === 'opt-in');
    const avgOptin = optin.length ? optin.reduce((s, c) => s + c.adoption, 0) / optin.length : 0;
    return {
      eventsInView,
      colMax,
      wide,
      dormant,
      avgOptin
    };
  }, [caps, rows, feats]);
  const planLabel = plans.length ? plans.map(p => PLANS.find(x => x.k === p).label).join(' + ') : 'All plans';
  function cellValue(r, f) {
    const n = r.feat[f] || 0;
    if (!n) return {
      text: '—',
      share: 0,
      title: `${r.email} has never used ${f}`
    };
    if (measure === 'share') {
      const s = pct(n, r.inView);
      return {
        text: s.toFixed(0) + '%',
        share: s / 100,
        title: `${fmt(n)} events — ${s.toFixed(1)}% of this account's activity in view`
      };
    }
    if (measure === 'reach') {
      const list = CAPABILITIES.filter(c => c.f === f);
      const used = list.filter(c => c.ev.some(e => r.ev[e])).length;
      return {
        text: `${used}/${list.length}`,
        share: used / list.length,
        title: `Uses ${used} of ${list.length} ${f} capabilities`
      };
    }
    return {
      text: fmt(n),
      share: n / scope.colMax[f],
      title: `${fmt(n)} ${f} events`
    };
  }
  const sortIcon = k => sort.key === k ? sort.dir === -1 ? ' ↓' : ' ↑' : '';
  const clickSort = k => setSort(s => s.key === k ? {
    key: k,
    dir: -s.dir
  } : {
    key: k,
    dir: k === 'email' ? 1 : -1
  });
  const headline = capsSorted.filter(c => c.kind === 'opt-in').sort((a, b) => b.adoption - a.adoption)[0];
  return /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources.logo,
    alt: "Inverso"
  })), /*#__PURE__*/React.createElement("div", {
    className: "navlab"
  }, "Insights"), /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "on"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-squares-four"
  }), "Feature adoption")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    },
    className: "note"
  }, from, " \u2192 ", to)), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-sidebar",
    style: {
      fontSize: 18
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "crumb"
  }, "Insights"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(28,28,28,.2)'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", null, "Feature adoption"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, fmt(D.total), " events tracked \xB7 ", fmt(D.orgs.length), " accounts")), /*#__PURE__*/React.createElement("div", {
    className: "canvas"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, view === 'features' ? 'What actually gets switched on' : 'Who uses what'), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, view === 'features' ? /*#__PURE__*/React.createElement(React.Fragment, null, "Adoption of every capability inside the product, across ", fmt(inScope.length), " accounts. ", planLabel, dated ? ` · ${from} → ${to}` : '', ".") : /*#__PURE__*/React.createElement(React.Fragment, null, "Every tracked event rolled up per account. ", planLabel, " \xB7 ", feats.length, " of ", FEATURE_ORDER.length, " features shown."))), /*#__PURE__*/React.createElement(Seg, {
    value: view,
    onChange: v => {
      setView(v);
      setSelUser(null);
      setSelCap(null);
    },
    options: [{
      k: 'features',
      label: 'By capability'
    }, {
      k: 'accounts',
      label: 'By account'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Period"), /*#__PURE__*/React.createElement(Seg, {
    value: range,
    onChange: k => {
      setRange(k);
      setSelUser(null);
      setSelCap(null);
    },
    options: RANGES
  }), range === 'custom' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: cFrom,
    min: D.start,
    max: cTo,
    onChange: e => setCFrom(e.target.value),
    "aria-label": "From date"
  }), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, "\u2192"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: cTo,
    min: cFrom,
    max: D.asof,
    onChange: e => setCTo(e.target.value),
    "aria-label": "To date"
  })) : /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, from, " \u2192 ", to), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, fmt(accounts.length), " account", accounts.length === 1 ? '' : 's', " active in period")), /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Plans"), /*#__PURE__*/React.createElement("div", {
    className: "seg"
  }, /*#__PURE__*/React.createElement("button", {
    "aria-pressed": !plans.length,
    onClick: () => setPlans([])
  }, "All users"), PLANS.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.k,
    "aria-pressed": plans.includes(p.k),
    onClick: () => togglePlan(p.k)
  }, p.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 6,
      fontSize: 11
    }
  }, accounts.filter(a => a.plan === p.k).length)))), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, "Combine plans by clicking more than one.")), /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Features"), /*#__PURE__*/React.createElement("div", {
    className: "chips"
  }, FEATURES.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.name,
    className: "chip",
    "aria-pressed": feats.includes(f.name),
    onClick: () => toggleFeat(f.name)
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ph-${FEATURE_ICON[f.name] || 'circle'}`
  }), f.name, /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, f.caps, " caps")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "linkbtn",
    onClick: () => setFeats(FEATURE_ORDER)
  }, "All"), /*#__PURE__*/React.createElement("button", {
    className: "linkbtn",
    onClick: () => setFeats([FEATURE_ORDER[0]])
  }, "Reset"))), view === 'features' ? /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Capabilities"), /*#__PURE__*/React.createElement("div", {
    className: "chips"
  }, Object.keys(KIND_LABEL).map(k => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: "chip",
    "aria-pressed": kinds.includes(k),
    onClick: () => toggleKind(k)
  }, KIND_LABEL[k]))), /*#__PURE__*/React.createElement(Seg, {
    value: capSort,
    onChange: setCapSort,
    options: [{
      k: 'adoption',
      label: 'Most adopted'
    }, {
      k: 'volume',
      label: 'Most used'
    }, {
      k: 'gap',
      label: 'Least adopted'
    }, {
      k: 'feature',
      label: 'By feature'
    }]
  })) : null, view === 'features' ? /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Granularity"), /*#__PURE__*/React.createElement(Seg, {
    value: grain,
    onChange: g => {
      setGrain(g);
      setSelCap(null);
    },
    options: [{
      k: 'caps',
      label: 'Capabilities'
    }, {
      k: 'events',
      label: 'Single events'
    }]
  }), /*#__PURE__*/React.createElement("input", {
    type: "search",
    list: "evlist",
    value: capQ,
    onChange: e => {
      setCapQ(e.target.value);
      setSelCap(null);
    },
    style: {
      width: 250
    },
    placeholder: "Filter by event, e.g. reminder\u2026",
    "aria-label": "Filter by event"
  }), /*#__PURE__*/React.createElement("datalist", {
    id: "evlist"
  }, D.events.map(e => /*#__PURE__*/React.createElement("option", {
    key: e.e,
    value: nice(e.e)
  }))), capQ && /*#__PURE__*/React.createElement("button", {
    className: "linkbtn",
    onClick: () => setCapQ('')
  }, "clear"), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, caps.length, " ", grain === 'events' ? 'events' : 'capabilities', " shown")) : /*#__PURE__*/React.createElement("div", {
    className: "ctlrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ctllab"
  }, "Show cells as"), /*#__PURE__*/React.createElement(Seg, {
    value: measure,
    onChange: setMeasure,
    options: [{
      k: 'events',
      label: 'Event count'
    }, {
      k: 'share',
      label: '% of account'
    }, {
      k: 'reach',
      label: 'Capabilities used'
    }]
  }), /*#__PURE__*/React.createElement("input", {
    type: "search",
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Find an account\u2026",
    "aria-label": "Find an account"
  }))), view === 'features' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "tiles"
  }, /*#__PURE__*/React.createElement(Tile, {
    tone: "mint",
    label: grain === 'events' ? 'Events tracked' : 'Capabilities tracked',
    value: caps.length,
    foot: `across ${feats.length} feature${feats.length > 1 ? 's' : ''}`
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "blue",
    label: "Broadly adopted",
    value: scope.wide,
    foot: "used by half the accounts or more"
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "grey",
    label: "Avg opt-in adoption",
    value: scope.avgOptin.toFixed(0) + '%',
    foot: "of accounts, per optional capability"
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "slate",
    label: "Effectively dormant",
    value: scope.dormant,
    foot: "one account or none"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: '4px 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '14px 18px 8px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, "Capability adoption"), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, "Click a row to see exactly which accounts are in")), /*#__PURE__*/React.createElement("div", {
    className: "tblwrap"
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, grain === 'events' ? 'Event' : 'Capability'), /*#__PURE__*/React.createElement("th", {
    style: {
      minWidth: 190
    }
  }, "Adoption"), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Accounts"), PLANS.map(p => /*#__PURE__*/React.createElement("th", {
    key: p.k,
    className: "mid"
  }, p.label)), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Events"), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Avg / account"), /*#__PURE__*/React.createElement("th", null, "Last used"))), /*#__PURE__*/React.createElement("tbody", null, capsSorted.map(c => /*#__PURE__*/React.createElement("tr", {
    key: c.f + c.name,
    className: selCap === c.f + c.name ? 'sel' : '',
    onClick: () => setSelCap(selCap === c.f + c.name ? null : c.f + c.name),
    title: c.ev.map(nice).join(', ')
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "acct",
    style: {
      maxWidth: 260
    }
  }, /*#__PURE__*/React.createElement("b", null, c.name), /*#__PURE__*/React.createElement("small", null, c.f, c.cap ? ' · ' + c.cap : '', " \xB7 ", KIND_LABEL[c.kind]))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 90
    }
  }, /*#__PURE__*/React.createElement(Bar, {
    v: c.adoption,
    max: 100,
    color: adoptionColor(c.adoption)
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 600,
      width: 38,
      textAlign: 'right'
    }
  }, c.adoption.toFixed(0), "%"))), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, c.users.length, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(28,28,28,.35)'
    }
  }, "/", inScope.length)), PLANS.map(p => {
    const b = c.byPlan[p.k];
    const share = b.pool ? b.used / b.pool : 0;
    return /*#__PURE__*/React.createElement("td", {
      key: p.k,
      className: "mid",
      title: b.pool ? `${b.used} of ${b.pool} ${p.label} accounts` : `No ${p.label} accounts in view`
    }, /*#__PURE__*/React.createElement("span", {
      className: 'heat' + (b.used ? '' : ' zero'),
      style: heatStyle(b.pool ? share : 0)
    }, b.pool ? `${b.used}/${b.pool}` : '·'));
  }), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, fmt(c.n)), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, c.users.length ? c.avg.toFixed(1) : '—'), /*#__PURE__*/React.createElement("td", {
    className: "note",
    style: {
      fontSize: 12
    }
  }, c.last || '—'))))), !capsSorted.length && /*#__PURE__*/React.createElement("div", {
    className: "empty"
  }, "No capabilities match these filters."))), /*#__PURE__*/React.createElement(CapDetail, {
    caps: capsSorted,
    selCap: selCap,
    inScope: inScope,
    headline: headline
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "tiles"
  }, /*#__PURE__*/React.createElement(Tile, {
    tone: "mint",
    label: "Accounts in view",
    value: rows.length,
    foot: `of ${D.orgs.length} tracked`
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "blue",
    label: "Events in view",
    value: fmt(scope.eventsInView),
    foot: `${pct(scope.eventsInView, D.total).toFixed(0)}% of all activity`
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "grey",
    label: "Features per account",
    value: rows.length ? (rows.reduce((s, r) => s + r.used, 0) / rows.length).toFixed(1) : '0',
    foot: `average, of ${feats.length} shown`
  }), /*#__PURE__*/React.createElement(Tile, {
    tone: "slate",
    label: "Widest optional capability",
    value: headline ? headline.adoption.toFixed(0) + '%' : '—',
    foot: headline ? `${headline.name} · ${headline.users.length} of ${rows.length} accounts` : '—'
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: '4px 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '14px 18px 8px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, "Accounts \xD7 features"), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, "Click a row for the capability-level breakdown")), /*#__PURE__*/React.createElement("div", {
    className: "tblwrap"
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    onClick: () => clickSort('email')
  }, "Account", sortIcon('email')), /*#__PURE__*/React.createElement("th", {
    onClick: () => clickSort('plan')
  }, "Plan", sortIcon('plan')), /*#__PURE__*/React.createElement("th", {
    className: "num",
    onClick: () => clickSort('total')
  }, "Events", sortIcon('total')), /*#__PURE__*/React.createElement("th", {
    className: "num",
    onClick: () => clickSort('used')
  }, "Features", sortIcon('used')), feats.map(f => /*#__PURE__*/React.createElement("th", {
    key: f,
    className: "mid",
    onClick: () => clickSort(f)
  }, f, sortIcon(f))), /*#__PURE__*/React.createElement("th", {
    onClick: () => clickSort('last')
  }, "Last seen", sortIcon('last')))), /*#__PURE__*/React.createElement("tbody", null, (allRows ? rows : rows.slice(0, 50)).map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.id,
    className: selUser === r.i ? 'sel' : '',
    onClick: () => setSelUser(selUser === r.i ? null : r.i)
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "acct"
  }, /*#__PURE__*/React.createElement("b", null, r.email), /*#__PURE__*/React.createElement("small", null, "#", r.id))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: 'badge pl-' + r.plan
  }, PLANS.find(p => p.k === r.plan).label)), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, fmt(r.inView)), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, r.used, "/", feats.length), feats.map(f => {
    const c = cellValue(r, f);
    return /*#__PURE__*/React.createElement("td", {
      key: f,
      className: "mid",
      title: c.title
    }, /*#__PURE__*/React.createElement("span", {
      className: 'heat' + (c.share ? '' : ' zero'),
      style: heatStyle(c.share)
    }, c.text));
  }), /*#__PURE__*/React.createElement("td", {
    className: "note",
    style: {
      fontSize: 12
    }
  }, r.last || '—'))))), !rows.length && /*#__PURE__*/React.createElement("div", {
    className: "empty"
  }, "No accounts match this filter."), rows.length > 50 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 18px',
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "linkbtn",
    onClick: () => setAllRows(v => !v)
  }, allRows ? 'show top 50 only' : `show all ${fmt(rows.length)} accounts`), /*#__PURE__*/React.createElement("span", {
    className: "note"
  }, allRows ? `all ${fmt(rows.length)}` : `showing 50 of ${fmt(rows.length)}`, " \xB7 narrow with the plan filter or search")))), /*#__PURE__*/React.createElement(UserDetail, {
    selUser: selUser,
    rows: rows,
    feats: feats,
    accounts: accounts
  }))), dated && /*#__PURE__*/React.createElement("div", {
    className: "note",
    style: {
      display: 'flex',
      gap: 7,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-info",
    style: {
      fontSize: 14,
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("span", null, "The export stores first/last seen per account \xD7 event, so a period selects accounts and capabilities ", /*#__PURE__*/React.createElement("b", null, "active between ", from, " and ", to), "; the event counts remain totals for the full export window. Re-run ", /*#__PURE__*/React.createElement("code", null, "data/supabase-export.sql"), " with a narrower ", /*#__PURE__*/React.createElement("code", null, "from_ts"), " for exact per-period counts.")), PLANS_ARE_REAL ? /*#__PURE__*/React.createElement("div", {
    className: "note"
  }, "Plans read from the export \xB7 capability groupings live in ", /*#__PURE__*/React.createElement("code", null, "CAPABILITIES"), " in ", /*#__PURE__*/React.createElement("code", null, "app/feature-adoption.jsx"), " \xB7 refresh the numbers per ", /*#__PURE__*/React.createElement("code", null, "data/README-supabase.md"), ".") : /*#__PURE__*/React.createElement("div", {
    className: "flag"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-warning-circle",
    style: {
      fontSize: 16,
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Plans are derived, not imported."), " This export has no plan column, so each account is classified from its own billing and team events (checkout / subscription / invite signals). Run the refresh in ", /*#__PURE__*/React.createElement("code", null, "data/README-supabase.md"), " \u2014 the query in ", /*#__PURE__*/React.createElement("code", null, "data/supabase-export.sql"), " joins the real plan per account and this warning disappears.")))));
}
function CapDetail({
  caps,
  selCap,
  inScope,
  headline
}) {
  const [showAll, setShowAll] = useState(false);
  const cap = caps.find(c => c.f + c.name === selCap);
  React.useEffect(() => setShowAll(false), [selCap]);
  if (cap) {
    const users = cap.users.map(a => ({
      email: a.email,
      plan: a.plan,
      n: cap.ev.reduce((s, e) => s + ((a.ev[e] || {}).n || 0), 0),
      since: cap.ev.map(e => (a.ev[e] || {}).first).filter(Boolean).sort()[0] || ''
    })).sort((a, b) => b.n - a.n);
    const nonUsers = inScope.filter(a => !cap.ev.some(e => a.ev[e]));
    const max = users.length ? users[0].n : 1;
    const shown = showAll ? users : users.slice(0, 15);
    return /*#__PURE__*/React.createElement("div", {
      className: "panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "note"
    }, cap.f, " \xB7 ", KIND_LABEL[cap.kind]), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        margin: '2px 0 6px'
      }
    }, cap.name), /*#__PURE__*/React.createElement("div", {
      className: "note"
    }, cap.adoption.toFixed(0), "% adoption \xB7 ", fmt(cap.n), " events \xB7 ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)'
      }
    }, cap.ev.join(', '))), /*#__PURE__*/React.createElement("div", {
      className: "note",
      style: {
        marginTop: 14,
        marginBottom: 2
      }
    }, "In (", fmt(users.length), ")", users.length > shown.length ? ` · top ${shown.length} by volume` : ''), /*#__PURE__*/React.createElement("div", {
      className: "rowlist"
    }, shown.map(u => /*#__PURE__*/React.createElement("div", {
      className: "ri",
      key: u.email
    }, /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, /*#__PURE__*/React.createElement("span", null, u.email), /*#__PURE__*/React.createElement("b", null, fmt(u.n))), /*#__PURE__*/React.createElement(Bar, {
      v: u.n,
      max: max
    }), /*#__PURE__*/React.createElement("div", {
      className: "note",
      style: {
        fontSize: 11,
        marginTop: 3
      }
    }, PLANS.find(p => p.k === u.plan).label, " \xB7 since ", u.since))), !users.length && /*#__PURE__*/React.createElement("div", {
      className: "note"
    }, "Nobody in this scope has used it.")), users.length > 15 && /*#__PURE__*/React.createElement("button", {
      className: "linkbtn",
      style: {
        marginTop: 10
      },
      onClick: () => setShowAll(s => !s)
    }, showAll ? 'show top 15 only' : `show all ${fmt(users.length)}`), !!nonUsers.length && /*#__PURE__*/React.createElement("p", {
      className: "note",
      style: {
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement("b", null, "Not in (", fmt(nonUsers.length), "):"), " ", nonUsers.slice(0, 10).map(a => a.email).join(', '), nonUsers.length > 10 ? ', …' : ''));
  }
  const top = [...caps].sort((a, b) => b.adoption - a.adoption).slice(0, 6);
  const bottom = [...caps].sort((a, b) => a.adoption - b.adoption || a.n - b.n).slice(0, 5);
  return /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "note"
  }, "Read of the base"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      margin: '2px 0 8px'
    }
  }, "Switched on vs. sitting idle"), headline && /*#__PURE__*/React.createElement("p", {
    className: "note",
    style: {
      marginBottom: 12
    }
  }, "The most adopted optional capability is ", /*#__PURE__*/React.createElement("b", null, headline.name), " at ", headline.adoption.toFixed(0), "% of accounts."), /*#__PURE__*/React.createElement("div", {
    className: "note",
    style: {
      marginBottom: 2
    }
  }, "Highest adoption"), /*#__PURE__*/React.createElement("div", {
    className: "rowlist"
  }, top.map(c => /*#__PURE__*/React.createElement("div", {
    className: "ri",
    key: c.f + c.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, /*#__PURE__*/React.createElement("span", null, c.name), /*#__PURE__*/React.createElement("b", null, c.adoption.toFixed(0), "%")), /*#__PURE__*/React.createElement(Bar, {
    v: c.adoption,
    max: 100
  })))), /*#__PURE__*/React.createElement("div", {
    className: "note",
    style: {
      marginTop: 16,
      marginBottom: 2
    }
  }, "Barely touched"), /*#__PURE__*/React.createElement("div", {
    className: "rowlist"
  }, bottom.map(c => /*#__PURE__*/React.createElement("div", {
    className: "ri",
    key: c.f + c.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, /*#__PURE__*/React.createElement("span", null, c.name), /*#__PURE__*/React.createElement("b", null, c.adoption.toFixed(0), "%")), /*#__PURE__*/React.createElement(Bar, {
    v: c.adoption,
    max: 100,
    color: "#FFCB9E"
  })))), /*#__PURE__*/React.createElement("p", {
    className: "note",
    style: {
      marginTop: 16
    }
  }, "Select a capability row to list the accounts in and out of it."));
}
function UserDetail({
  selUser,
  rows,
  feats,
  accounts
}) {
  if (selUser == null) {
    const ranked = [...rows].sort((a, b) => b.used - a.used || b.inView - a.inView);
    return /*#__PURE__*/React.createElement("div", {
      className: "panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "note"
    }, "Breadth"), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        margin: '2px 0 8px'
      }
    }, "Who spreads out, who doesn't"), /*#__PURE__*/React.createElement("div", {
      className: "rowlist"
    }, ranked.slice(0, 6).map(r => /*#__PURE__*/React.createElement("div", {
      className: "ri",
      key: r.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, /*#__PURE__*/React.createElement("span", null, r.email), /*#__PURE__*/React.createElement("b", null, r.used, "/", feats.length)), /*#__PURE__*/React.createElement(Bar, {
      v: r.used,
      max: feats.length
    })))), /*#__PURE__*/React.createElement("div", {
      className: "note",
      style: {
        marginTop: 16,
        marginBottom: 2
      }
    }, "Narrowest usage"), /*#__PURE__*/React.createElement("div", {
      className: "rowlist"
    }, ranked.slice(-4).reverse().map(r => /*#__PURE__*/React.createElement("div", {
      className: "ri",
      key: r.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, /*#__PURE__*/React.createElement("span", null, r.email), /*#__PURE__*/React.createElement("b", null, r.used, "/", feats.length)), /*#__PURE__*/React.createElement(Bar, {
      v: r.used,
      max: feats.length,
      color: "#FFCB9E"
    })))), /*#__PURE__*/React.createElement("p", {
      className: "note",
      style: {
        marginTop: 16
      }
    }, "Select an account row to drill in."));
  }
  const a = accounts.find(x => x.i === selUser);
  if (!a) return null;
  const list = CAPABILITIES.filter(c => feats.includes(c.f)).map(c => ({
    ...c,
    n: c.ev.reduce((s, e) => s + ((a.ev[e] || {}).n || 0), 0)
  }));
  const used = list.filter(c => c.n).sort((x, y) => y.n - x.n).slice(0, 15);
  const missing = list.filter(c => !c.n && c.kind === 'opt-in');
  const max = used.length ? used[0].n : 1;
  return /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "note"
  }, "Account #", a.id), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      margin: '2px 0 2px',
      overflowWrap: 'anywhere'
    }
  }, a.email), /*#__PURE__*/React.createElement("div", {
    className: "note"
  }, PLANS.find(p => p.k === a.plan).label, " plan \xB7 ", fmt(a.total), " events \xB7 active ", a.first, " \u2192 ", a.last), /*#__PURE__*/React.createElement("div", {
    className: "note",
    style: {
      marginTop: 14,
      marginBottom: 2
    }
  }, "Capabilities in use (", list.filter(c => c.n).length, ")"), /*#__PURE__*/React.createElement("div", {
    className: "rowlist"
  }, used.map(c => /*#__PURE__*/React.createElement("div", {
    className: "ri",
    key: c.f + c.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, /*#__PURE__*/React.createElement("span", null, c.name), /*#__PURE__*/React.createElement("b", null, fmt(c.n))), /*#__PURE__*/React.createElement(Bar, {
    v: c.n,
    max: max
  })))), !!missing.length && /*#__PURE__*/React.createElement("p", {
    className: "note",
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("b", null, "Never switched on:"), " ", missing.map(c => c.name).join(', '), "."));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/feature-adoption-standalone.jsx", error: String((e && e.message) || e) }); }

// image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The sidecar is a SIBLING of the HTML file that uses this component: the
 * read is a document-relative fetch, and the host resolves the bridge's
 * sidecar writes into the previewed file's directory to match (same
 * contract as design_canvas.jsx). Pages in the same directory share one
 * sidecar; keep slot ids distinct across them.
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  // color:inherit (not a fixed near-black): the placeholder chrome —
  // empty-state icon/caption (currentColor) and the dashed ring — must
  // read on dark decks too, and the slide's own text color is the one
  // color guaranteed to contrast with the slide background. The soft
  // look comes from opacity on those parts, not from a baked-in alpha.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.empty .cap,.empty .sub{opacity:.75}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(127,127,127,.08)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px}' + '.empty:hover .sub{opacity:1}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed currentColor;' + '  opacity:.35;transition:border-color .12s,opacity .12s}' + ':host([data-over]) .ring{border-color:#c96442;opacity:1}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' +
  // Replacement in flight: after a src swap the browser keeps painting
  // the PREVIOUS image until the new one decodes, so a Replace would
  // flash the old photo and then pop. Hide the stale frame (visibility,
  // not display — _applyView geometry still applies) and spin until the
  // new image reports in (load/error clears data-swapping).
  ':host([data-swapping]) .frame img{visibility:hidden}' + '.loading{position:absolute;inset:0;display:none;align-items:center;' + '  justify-content:center;pointer-events:none}' + ':host([data-swapping]) .loading{display:flex}' + '.loading::after{content:"";width:22px;height:22px;border-radius:50%;' + '  border:2px solid rgba(127,127,127,.25);border-top-color:currentColor;' + '  animation:om-slot-spin .7s linear infinite}' + '@keyframes om-slot-spin{to{transform:rotate(360deg)}}' +
  // Reduced motion: the static two-tone ring still reads as "working".
  '@media (prefers-reduced-motion:reduce){.loading::after{animation:none}}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // Print must ship just the image too: the hover-gated controls can be
  // mid-hover when print() fires, and the credit chip is screen chrome —
  // the same rule the capture window gets, keyed on print media instead
  // of the host's data-om-exporting mark (the print path sets no mark).
  '@media print{.ctl,.credit{display:none !important}}' +
  // No export-window mask rules here on purpose: the export capture
  // releases the replacement mask by REMOVING data-swapping (the
  // shadow-root pass in pages/export/shared.ts HIDE_EXPORT_CHROME_SCRIPT)
  // — attribute removal works in every engine (:host-context is
  // Chromium-only), is scoped by construction to slots actually
  // mid-swap, and hides the spinner through the same gate. A masked img
  // would otherwise be silently dropped from PPTX decks (the capture
  // walk skips visibility:hidden imgs).
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="loading" part="loading"></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      // Encode-in-flight marker (the owning _ingest generation): while set,
      // the same-src "nothing in flight" clear in _render must not fire —
      // the stored value still points at the OLD image until the encode
      // lands, so that clear would unmask the stale image mid-replace.
      this._swapGen = 0;
      // Render-owned swap in flight: set when _render assigns a new src,
      // cleared only by the img's own load/error (or the empty branch).
      // img.complete CANNOT stand in for this — setting src only QUEUES
      // the current-request swap (a microtask), so synchronously after an
      // assignment, complete still reports the OLD settled request. The
      // pick path does exactly that: the host sets src, credit, and
      // credit-href back-to-back in one task, and renders #2/#3 would
      // read the stale complete === true and drop the mask one render
      // after it was set.
      this._loadPending = false;
      // See _render's empty branch: a transient attribution-error wipe of a
      // showing image must make the follow-up render a replacement (spinner),
      // not a first fill (blank frame).
      this._hidShowing = false;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      // load/error also release the replacement-in-flight mask (via the
      // single discipline in _releaseMask): the swap is only revealed once
      // the new image can actually paint (on error the frame shows its
      // background, same as a fresh slot with a broken src).
      this._img.addEventListener('load', () => {
        this._loadPending = false;
        this._releaseMask(true);
        this._applyView();
      });
      this._img.addEventListener('error', () => {
        this._loadPending = false;
        this._releaseMask(true);
      });
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }

    // A src write is a newer intent for this slot's content — the host
    // pick path (setImageSlotImage) or an agent edit — so it must win
    // over any encode still in flight from an earlier drop: left live,
    // that encode lands later, passes _ingest's gen guard, and its
    // setSlot silently overwrites the pick (the stored value shadows
    // src in _render). Bumping _gen kills the encode before its own
    // _swapGen clear runs, so clear the dead claim here too — otherwise
    // _releaseMask (gated on !_swapGen) never fires and the pick's
    // spinner is stranded. src ONLY: the pick sets credit/credit-href
    // in the same task, and clearing _swapGen on those would let the
    // same-src branch unmask the old image mid-encode.
    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'src' && oldVal !== newVal) {
        this._gen++;
        this._swapGen = 0;
      }
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      // Replacing a shown image: surface the swap through the encode too,
      // not just the decode — otherwise the old photo sits there with no
      // feedback while the canvas re-encode runs. An empty slot keeps its
      // placeholder (no spinner) until the encode lands, as before.
      // _swapGen guards the mask against re-renders DURING the encode
      // (pointerenter, ResizeObserver, another slot's store write): the
      // stored value still resolves to the old image there, so _render's
      // same-src clear would otherwise unmask it mid-replace.
      if (this.hasAttribute('data-filled')) {
        this.setAttribute('data-swapping', '');
        this._swapGen = gen;
      }
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        // Clear BEFORE setSlot: its synchronous re-render must see no
        // pending encode, so a byte-identical re-upload (same data URL, no
        // load event coming) still clears the mask via the complete branch.
        this._swapGen = 0;
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._swapGen = 0;
        // Reveal the kept old image — unless another replacement (a
        // remote pick's src swap) is still in flight, in which case the
        // mask stays until THAT image settles (its load/error releases).
        this._releaseMask();
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // The single release discipline for the replacement-in-flight mask
    // (data-swapping). The mask comes off only when BOTH hold:
    //  - no encode is pending (_swapGen) — mid-encode the stored value
    //    still resolves to the old image, so any reveal paints it;
    //  - the frame img has settled on its current src — an unsettled src
    //    means some replacement is still in flight (e.g. a remote pick),
    //    whoever started it, and revealing would paint the previous
    //    frame. The load/error listeners pass settled=true (the event IS
    //    the settlement signal, per spec complete is true by then);
    //    other callers rely on the complete flag (covers loaded AND
    //    failed).
    // Every release path funnels through here EXCEPT _render's empty
    // branch (the img is being cleared — nothing will ever settle).
    _releaseMask(settled) {
      if (!this._swapGen && !this._loadPending && (settled || this._img.complete)) {
        this.removeAttribute('data-swapping');
      }
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        const prev = this._img.getAttribute('src');
        if (prev !== url) {
          // Replacing an already-shown image: mark the swap BEFORE setting
          // src so the stale frame is never revealed (see the data-swapping
          // stylesheet rules). First fill (prev empty) keeps the existing
          // placeholder-until-load behavior — no spinner. _hidShowing
          // covers the pick path's transient attribution-error wipe: prev
          // is gone, but an image WAS showing, so this is a replacement.
          if (prev || this._hidShowing) this.setAttribute('data-swapping', '');
          // Mark the swap BEFORE assigning src: complete keeps reporting
          // the old settled request until the browser's
          // update-the-image-data microtask runs, so same-task re-renders
          // (the pick path's credit/credit-href setAttributes) need this
          // flag, not complete, to know a load is in flight.
          this._loadPending = true;
          this._img.src = url;
          this._ghost.src = url;
        } else {
          // Same-src re-render — release if settled, so an ingest-set
          // spinner can't stick after a byte-identical re-upload (same
          // data URL, no further load event ever fires).
          this._releaseMask();
        }
        this._hidShowing = false;
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this.removeAttribute('data-swapping');
        // The src is being removed — no load/error will ever fire for it.
        this._loadPending = false;
        // A transient attribution-error wipe of a showing image happens on
        // the pick path: the host sets src one setAttribute before credit,
        // so render N hides the old image (attrError) and render N+1
        // restores a URL. Remember the wipe so that restore renders as a
        // replacement (spinner), not a first fill (blank frame).
        this._hidShowing = attrError && !!this._img.getAttribute('src');
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "image-slot.js", error: String((e && e.message) || e) }); }

// ios-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ios-frame.jsx", error: String((e && e.message) || e) }); }

// logo-variants/app.jsx
try { (() => {
// Builds the Inverso logo-variant canvas from window globals.
const {
  DesignCanvas,
  DCSection,
  DCArtboard
} = window;
const {
  Wordmark,
  MarkAperture,
  MarkInversion,
  MarkContinuum,
  Lockup,
  IconTile,
  INK,
  MINT,
  MINTINK,
  ACCENT,
  PAPER
} = window;

// Fill an artboard edge-to-edge with a background + centred content.
function Stage({
  bg = PAPER,
  children,
  pad = 0
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      background: bg,
      padding: pad,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box'
    }
  }, children);
}
const LOCK_W = 560,
  LOCK_H = 200,
  ICON = 200;
function App() {
  return /*#__PURE__*/React.createElement(DesignCanvas, null, /*#__PURE__*/React.createElement(DCSection, {
    id: "v1-aperture",
    title: "01 \xB7 Aperture \u2014 Safe",
    subtitle: "A regularised, perfectly 8-fold cousin of today's pinwheel. Mint + black, untouched personality."
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "v1-light",
    label: "Primary",
    width: LOCK_W,
    height: LOCK_H
  }, /*#__PURE__*/React.createElement(Stage, {
    bg: PAPER
  }, /*#__PURE__*/React.createElement(Lockup, {
    wordColor: INK
  }, /*#__PURE__*/React.createElement(MarkAperture, {
    size: 104,
    color: MINT
  })))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "v1-dark",
    label: "Reversed",
    width: LOCK_W,
    height: LOCK_H
  }, /*#__PURE__*/React.createElement(Stage, {
    bg: INK
  }, /*#__PURE__*/React.createElement(Lockup, {
    wordColor: PAPER
  }, /*#__PURE__*/React.createElement(MarkAperture, {
    size: 104,
    color: MINT
  })))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "v1-icon",
    label: "App icon",
    width: ICON,
    height: ICON
  }, /*#__PURE__*/React.createElement(Stage, {
    bg: "#F4F6F8"
  }, /*#__PURE__*/React.createElement(IconTile, {
    bg: INK
  }, /*#__PURE__*/React.createElement(MarkAperture, {
    size: 84,
    color: MINT
  }))))), /*#__PURE__*/React.createElement(DCSection, {
    id: "v2-inversion",
    title: "02 \xB7 Inversion \u2014 Evolution",
    subtitle: "Two mirrored arcs split on a vertical seam \u2014 mint half, indigo half. The new accent enters; the dot is the axis."
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "v2-light",
    label: "Primary",
    width: LOCK_W,
    height: LOCK_H
  }, /*#__PURE__*/React.createElement(Stage, {
    bg: PAPER
  }, /*#__PURE__*/React.createElement(Lockup, {
    wordColor: INK,
    wordWeight: 700
  }, /*#__PURE__*/React.createElement(MarkInversion, {
    size: 104,
    left: MINT,
    right: ACCENT,
    dot: INK
  })))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "v2-dark",
    label: "Reversed",
    width: LOCK_W,
    height: LOCK_H
  }, /*#__PURE__*/React.createElement(Stage, {
    bg: INK
  }, /*#__PURE__*/React.createElement(Lockup, {
    wordColor: PAPER,
    wordWeight: 700
  }, /*#__PURE__*/React.createElement(MarkInversion, {
    size: 104,
    left: MINT,
    right: ACCENT,
    dot: PAPER
  })))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "v2-icon",
    label: "App icon",
    width: ICON,
    height: ICON
  }, /*#__PURE__*/React.createElement(Stage, {
    bg: "#F4F6F8"
  }, /*#__PURE__*/React.createElement(IconTile, {
    bg: PAPER
  }, /*#__PURE__*/React.createElement(MarkInversion, {
    size: 88,
    left: MINT,
    right: ACCENT,
    dot: INK
  }))))), /*#__PURE__*/React.createElement(DCSection, {
    id: "v3-continuum",
    title: "03 \xB7 Continuum \u2014 Radical",
    subtitle: "A single unbroken loop (figure-8 / m\xF6bius) gradient-shifting mint \u2192 indigo. Dark-first, integrated, expressive."
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "v3-dark",
    label: "Primary (dark-first)",
    width: LOCK_W,
    height: LOCK_H
  }, /*#__PURE__*/React.createElement(Stage, {
    bg: INK
  }, /*#__PURE__*/React.createElement(Lockup, {
    wordColor: PAPER,
    wordWeight: 800,
    gap: 26
  }, /*#__PURE__*/React.createElement(MarkContinuum, {
    size: 110,
    idSuffix: "d",
    stops: [MINT, ACCENT]
  })))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "v3-light",
    label: "Light",
    width: LOCK_W,
    height: LOCK_H
  }, /*#__PURE__*/React.createElement(Stage, {
    bg: PAPER
  }, /*#__PURE__*/React.createElement(Lockup, {
    wordColor: INK,
    wordWeight: 800,
    gap: 26
  }, /*#__PURE__*/React.createElement(MarkContinuum, {
    size: 110,
    idSuffix: "l",
    stops: [MINTINK, ACCENT]
  })))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "v3-icon",
    label: "App icon",
    width: ICON,
    height: ICON
  }, /*#__PURE__*/React.createElement(Stage, {
    bg: "#F4F6F8"
  }, /*#__PURE__*/React.createElement(IconTile, {
    bg: INK
  }, /*#__PURE__*/React.createElement(MarkContinuum, {
    size: 92,
    idSuffix: "i",
    stops: [MINT, ACCENT]
  }))))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "logo-variants/app.jsx", error: String((e && e.message) || e) }); }

// logo-variants/inverso-marks.jsx
try { (() => {
// Inverso logo exploration — marks, wordmark, lockups
// Built from geometric primitives only (arcs / circles / polygons).
const INK = '#1C1C1C';
const MINT = '#A1E3CB';
const MINTINK = '#3D8262';
const ACCENT = '#5856D6'; // system indigo — the tonal "inverse" of mint
const PAPER = '#FFFFFF';

// ── Wordmark ─────────────────────────────────────────────
// Set in Plus Jakarta Sans (geometric, friendly), lowercase, tight track.
function Wordmark({
  color = INK,
  size = 48,
  weight = 700,
  tracking = '-0.035em'
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: weight,
      fontSize: size,
      letterSpacing: tracking,
      color,
      lineHeight: 1,
      whiteSpace: 'nowrap'
    }
  }, "inverso");
}

// ── Mark 01 · Aperture — refined, perfectly 8-fold pinwheel ──
function MarkAperture({
  size = 120,
  color = MINT
}) {
  // One blade, rotated by 45° eight times. Leans clockwise → swirl,
  // open hub in the centre. (Regularised cousin of the original mark.)
  const blade = 'M60 49 C 56.5 37 52 23 50 12 C 62 17 70.5 25 71 34 C 71.4 42 65.5 49 60 49 Z';
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 120 120",
    fill: "none",
    "aria-label": "Inverso mark"
  }, [0, 45, 90, 135, 180, 225, 270, 315].map(a => /*#__PURE__*/React.createElement("path", {
    key: a,
    d: blade,
    fill: color,
    transform: `rotate(${a} 60 60)`
  })));
}

// ── Mark 02 · Inversion — two mirrored arcs + axis dot ──
// "( )" lens split on a vertical seam: mint half / indigo half = inversion.
function MarkInversion({
  size = 120,
  left = MINT,
  right = ACCENT,
  dot = INK
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 120 120",
    fill: "none",
    "aria-label": "Inverso mark"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M60 16 A 50 50 0 0 0 60 104",
    stroke: left,
    strokeWidth: "13",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 16 A 50 50 0 0 1 60 104",
    stroke: right,
    strokeWidth: "13",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: "9",
    fill: dot
  }));
}

// ── Mark 03 · Continuum — continuous loop (figure-8 / möbius) ──
function MarkContinuum({
  size = 120,
  idSuffix = 'a',
  stops = [MINT, ACCENT]
}) {
  const gid = `inv-grad-${idSuffix}`;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 120 120",
    fill: "none",
    "aria-label": "Inverso mark"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "22",
    y1: "42",
    x2: "98",
    y2: "78",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: stops[0]
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: stops[1]
  }))), /*#__PURE__*/React.createElement("path", {
    d: "M60 60 C 60 38 26 38 26 60 C 26 82 60 82 60 60 C 60 38 94 38 94 60 C 94 82 60 82 60 60 Z",
    stroke: `url(#${gid})`,
    strokeWidth: "11",
    strokeLinejoin: "round",
    fill: "none"
  }));
}

// ── Lockup ───────────────────────────────────────────────
function Lockup({
  children,
  wordColor = INK,
  wordSize = 48,
  wordWeight = 700,
  gap = 22
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap
    }
  }, children, /*#__PURE__*/React.createElement(Wordmark, {
    color: wordColor,
    size: wordSize,
    weight: wordWeight
  }));
}

// ── App-icon tile ────────────────────────────────────────
function IconTile({
  children,
  bg = INK,
  size = 132,
  radius = 30
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: radius,
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.10)'
    }
  }, children);
}
Object.assign(window, {
  Wordmark,
  MarkAperture,
  MarkInversion,
  MarkContinuum,
  Lockup,
  IconTile,
  INK,
  MINT,
  MINTINK,
  ACCENT,
  PAPER
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "logo-variants/inverso-marks.jsx", error: String((e && e.message) || e) }); }

// mobile/screens.jsx
try { (() => {
/* Inverso mobile screens — Home/Dashboard + List/Invoices, light & dark.
   Built on the Inverso design system (mono-forward, mint accent, Inter). */

const THEMES = {
  light: {
    bg: '#F7F9FB',
    surface: '#FFFFFF',
    surfaceAlt: '#F6F6F6',
    text: '#1C1C1C',
    sub: 'rgba(28,28,28,0.6)',
    ter: 'rgba(28,28,28,0.4)',
    border: 'rgba(28,28,28,0.1)',
    borderSoft: 'rgba(28,28,28,0.06)',
    tileInfo: '#E3F5FF',
    tileStrip: '#E5ECF6',
    tileMint: '#D9F2E6',
    tabBg: 'rgba(255,255,255,0.72)',
    tabBorder: 'rgba(28,28,28,0.08)',
    field: '#F0F2F5',
    chip: '#FFFFFF'
  },
  dark: {
    bg: '#000000',
    surface: '#1C1C1E',
    surfaceAlt: '#161618',
    text: '#FFFFFF',
    sub: 'rgba(235,235,245,0.6)',
    ter: 'rgba(235,235,245,0.32)',
    border: 'rgba(255,255,255,0.12)',
    borderSoft: 'rgba(255,255,255,0.07)',
    tileInfo: 'rgba(0,122,255,0.14)',
    tileStrip: 'rgba(255,255,255,0.06)',
    tileMint: 'rgba(170,225,201,0.16)',
    tabBg: 'rgba(28,28,30,0.72)',
    tabBorder: 'rgba(255,255,255,0.1)',
    field: 'rgba(255,255,255,0.08)',
    chip: 'rgba(255,255,255,0.08)'
  }
};
const MINT = '#AAE1C9';
const MINT_INK = '#3D8262';
const GREEN = '#34C759';
const RED = '#FF3B30';
const INTER = "'Inter', -apple-system, system-ui, sans-serif";
const Ph = ({
  name,
  size = 24,
  color,
  weight = 'regular',
  style = {}
}) => /*#__PURE__*/React.createElement("i", {
  className: `ph${weight === 'fill' ? '-fill' : weight === 'bold' ? '-bold' : ''} ph-${name}`,
  style: {
    fontSize: size,
    color,
    lineHeight: 1,
    ...style
  }
});

// ── Screen shell: scroll region + pinned tab bar ───────────────
function Screen({
  t,
  children,
  active = 'house'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: t.bg,
      fontFamily: INTER
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch'
    }
  }, children), /*#__PURE__*/React.createElement(TabBar, {
    t: t,
    active: active
  }));
}
function TabBar({
  t,
  active
}) {
  const items = [{
    id: 'house',
    label: 'Overview',
    icon: 'house'
  }, {
    id: 'chart',
    label: 'Analytics',
    icon: 'chart-line-up'
  }, {
    id: 'receipt',
    label: 'Invoices',
    icon: 'receipt'
  }, {
    id: 'user',
    label: 'Account',
    icon: 'user'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      paddingTop: 10,
      paddingBottom: 30,
      background: t.tabBg,
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      borderTop: `0.5px solid ${t.tabBorder}`
    }
  }, items.map(it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement("div", {
      key: it.id,
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        width: 64
      }
    }, /*#__PURE__*/React.createElement(Ph, {
      name: it.icon,
      size: 24,
      weight: on ? 'fill' : 'regular',
      color: on ? t.text : t.ter
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 500,
        color: on ? t.text : t.ter,
        letterSpacing: 0.1
      }
    }, it.label));
  }));
}

// ── Stat tile ──────────────────────────────────────────────────
function StatTile({
  t,
  label,
  value,
  delta,
  up,
  bg
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 16,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: t.text,
      opacity: 0.85
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      fontWeight: 600,
      color: t.text,
      letterSpacing: -0.5
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      fontSize: 12,
      fontWeight: 600,
      color: up ? GREEN : t.sub
    }
  }, delta, /*#__PURE__*/React.createElement(Ph, {
    name: up ? 'trend-up' : 'trend-down',
    size: 13,
    weight: "bold",
    color: up ? GREEN : t.sub
  }))));
}

// ── Area chart (simple polyline + fill) ────────────────────────
function AreaChart({
  t,
  color = MINT
}) {
  const pts = [22, 30, 26, 42, 38, 54, 48, 66, 60, 78];
  const W = 318,
    H = 96,
    max = 88,
    pad = 6;
  const step = (W - pad * 2) / (pts.length - 1);
  const xy = pts.map((v, i) => [pad + i * step, H - v / max * (H - 10) - 4]);
  const line = xy.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${xy[xy.length - 1][0].toFixed(1)} ${H} L${xy[0][0].toFixed(1)} ${H} Z`;
  const gid = 'g' + (color === MINT ? 'm' : 'x') + (t.bg === '#000000' ? 'd' : 'l');
  return /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: H,
    viewBox: `0 0 ${W} ${H}`,
    preserveAspectRatio: "none",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: t.bg === '#000000' ? 0.5 : 0.55
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: `url(#${gid})`
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: color,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), xy.map((p, i) => i === xy.length - 1 && /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: p[0],
    cy: p[1],
    r: "4",
    fill: t.surface,
    stroke: color,
    strokeWidth: "2.5"
  })));
}
function Card({
  t,
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.surface,
      borderRadius: 16,
      border: `1px solid ${t.borderSoft}`,
      padding: 16,
      ...style
    }
  }, children);
}

// ════════════════════════════════════════════════════════════
//  HOME / DASHBOARD
// ════════════════════════════════════════════════════════════
function HomeScreen({
  dark
}) {
  const t = THEMES[dark ? 'dark' : 'light'];
  const products = [{
    name: 'Annual Subscription',
    val: '$12,480',
    pct: 0.92,
    color: MINT
  }, {
    name: 'Setup & Onboarding',
    val: '$6,240',
    pct: 0.64,
    color: '#B9E1F5'
  }, {
    name: 'Add-on Seats',
    val: '$3,180',
    pct: 0.41,
    color: '#C6C7F8'
  }, {
    name: 'Support Plan',
    val: '$1,920',
    pct: 0.26,
    color: '#FFE89E'
  }];
  return /*#__PURE__*/React.createElement(Screen, {
    t: t,
    active: "house"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '60px 20px 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: t.sub
    }
  }, "Wednesday, Jun 18"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 30,
      fontWeight: 600,
      color: t.text,
      letterSpacing: -0.6
    }
  }, "Overview")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 999,
      overflow: 'hidden',
      border: `1px solid ${t.border}`,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/erik-portrait.jpg",
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px 4px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      background: t.field,
      borderRadius: 999,
      padding: 3,
      gap: 2
    }
  }, ['Today', 'Week', 'Month', 'Year'].map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p,
    style: {
      flex: 1,
      textAlign: 'center',
      padding: '7px 0',
      borderRadius: 999,
      fontSize: 13,
      fontWeight: 600,
      background: i === 1 ? t.surface : 'transparent',
      color: i === 1 ? t.text : t.sub,
      boxShadow: i === 1 ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
    }
  }, p)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px 0',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Revenue",
    value: "$24,981",
    delta: "+15.0%",
    up: true,
    bg: t.tileMint
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Views",
    value: "3,781",
    delta: "+11.0%",
    up: true,
    bg: t.tileInfo
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Orders",
    value: "316",
    delta: "+8.2%",
    up: true,
    bg: t.tileStrip
  }), /*#__PURE__*/React.createElement(StatTile, {
    t: t,
    label: "Customers",
    value: "1,219",
    delta: "-0.3%",
    up: false,
    bg: t.surface
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px 0'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    t: t
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: t.text
    }
  }, "Total Sales"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24,
      fontWeight: 600,
      color: t.text,
      letterSpacing: -0.5
    }
  }, "$48,320")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      fontSize: 12,
      fontWeight: 600,
      color: GREEN,
      background: dark ? 'rgba(52,199,89,0.16)' : 'rgba(52,199,89,0.12)',
      padding: '5px 9px',
      borderRadius: 999
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    name: "trend-up",
    size: 13,
    weight: "bold",
    color: GREEN
  }), "+18.4%")), /*#__PURE__*/React.createElement(AreaChart, {
    t: t,
    color: MINT
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 8
    }
  }, ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => /*#__PURE__*/React.createElement("span", {
    key: d,
    style: {
      fontSize: 11,
      color: t.ter,
      fontWeight: 500
    }
  }, d))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: t.text
    }
  }, "Top Selling Products"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: MINT_INK
    }
  }, "See all")), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0
    }
  }, products.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '13px 16px',
      borderTop: i ? `1px solid ${t.borderSoft}` : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 3,
      background: p.color,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: t.text,
      display: 'block'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      borderRadius: 999,
      background: t.field,
      marginTop: 7,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${p.pct * 100}%`,
      height: '100%',
      background: p.color,
      borderRadius: 999
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: t.text,
      flexShrink: 0
    }
  }, p.val))))));
}

// ════════════════════════════════════════════════════════════
//  LIST / INVOICES
// ════════════════════════════════════════════════════════════
const STATUS = {
  Paid: {
    fg: '#1F8A5B',
    bgL: 'rgba(52,199,89,0.14)',
    bgD: 'rgba(52,199,89,0.2)'
  },
  Pending: {
    fg: '#B26B00',
    bgL: 'rgba(255,149,0,0.16)',
    bgD: 'rgba(255,149,0,0.22)'
  },
  Overdue: {
    fg: '#C8362C',
    bgL: 'rgba(255,59,48,0.13)',
    bgD: 'rgba(255,59,48,0.2)'
  }
};
function Badge({
  t,
  dark,
  status
}) {
  const s = STATUS[status];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: s.fg,
      background: dark ? s.bgD : s.bgL,
      padding: '4px 9px',
      borderRadius: 999,
      whiteSpace: 'nowrap'
    }
  }, status);
}
function InvoiceRow({
  t,
  dark,
  inv,
  last
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '13px 16px',
      borderTop: last ? 'none' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 12,
      background: inv.color,
      color: inv.ink,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 15,
      fontWeight: 600,
      flexShrink: 0
    }
  }, inv.initials), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: t.text,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, inv.client)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: t.sub,
      display: 'block',
      marginTop: 2
    }
  }, inv.id, " \xB7 ", inv.date)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 6,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: t.text
    }
  }, inv.amount), /*#__PURE__*/React.createElement(Badge, {
    t: t,
    dark: dark,
    status: inv.status
  })));
}
function ListScreen({
  dark
}) {
  const t = THEMES[dark ? 'dark' : 'light'];
  const invoices = [{
    id: 'INV-2041',
    client: 'Northwind Trading',
    date: 'Jun 17',
    amount: '$4,820',
    status: 'Paid',
    initials: 'NT',
    color: '#D9F2E6',
    ink: MINT_INK
  }, {
    id: 'INV-2040',
    client: 'Acme Logistics',
    date: 'Jun 16',
    amount: '$1,240',
    status: 'Pending',
    initials: 'AL',
    color: '#FFE89E',
    ink: '#8A6A00'
  }, {
    id: 'INV-2039',
    client: 'Halcyon Media',
    date: 'Jun 14',
    amount: '$9,150',
    status: 'Paid',
    initials: 'HM',
    color: '#B9E1F5',
    ink: '#1B6E94'
  }, {
    id: 'INV-2038',
    client: 'Brightside Co.',
    date: 'Jun 11',
    amount: '$680',
    status: 'Overdue',
    initials: 'BC',
    color: '#FFBAB2',
    ink: '#A8362C'
  }, {
    id: 'INV-2037',
    client: 'Vector Studio',
    date: 'Jun 09',
    amount: '$2,400',
    status: 'Paid',
    initials: 'VS',
    color: '#C6C7F8',
    ink: '#4B4B8A'
  }, {
    id: 'INV-2036',
    client: 'Cedar & Co.',
    date: 'Jun 06',
    amount: '$3,975',
    status: 'Pending',
    initials: 'CC',
    color: '#A9DDE6',
    ink: '#1E7A88'
  }];
  return /*#__PURE__*/React.createElement(Screen, {
    t: t,
    active: "receipt"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '60px 20px 6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 30,
      fontWeight: 600,
      color: t.text,
      letterSpacing: -0.6
    }
  }, "Invoices"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 999,
      background: t.field,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    name: "funnel",
    size: 20,
    color: t.text
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 999,
      background: t.text,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    name: "plus",
    size: 20,
    weight: "bold",
    color: t.bg
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: t.field,
      borderRadius: 12,
      padding: '11px 14px'
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    name: "magnifying-glass",
    size: 18,
    color: t.ter
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: t.ter
    }
  }, "Search client or invoice #"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px 0',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 10
    }
  }, [['Outstanding', '$5,215', RED], ['Paid', '$16,370', GREEN], ['Drafts', '4', t.sub]].map(([l, v, c]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      background: t.surface,
      border: `1px solid ${t.borderSoft}`,
      borderRadius: 14,
      padding: '12px 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: t.sub,
      display: 'block',
      whiteSpace: 'nowrap'
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      color: c,
      letterSpacing: -0.4,
      marginTop: 4,
      display: 'block'
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '16px 20px 4px',
      overflowX: 'auto'
    }
  }, ['All', 'Paid', 'Pending', 'Overdue', 'Drafts'].map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c,
    style: {
      flex: 'none',
      padding: '7px 14px',
      borderRadius: 999,
      fontSize: 13,
      fontWeight: 600,
      background: i === 0 ? t.text : t.chip,
      color: i === 0 ? t.bg : t.sub,
      border: i === 0 ? 'none' : `1px solid ${t.border}`
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px 16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: t.sub,
      display: 'block',
      padding: '0 4px 8px'
    }
  }, "June 2026"), /*#__PURE__*/React.createElement(Card, {
    t: t,
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, invoices.map((inv, i) => /*#__PURE__*/React.createElement("div", {
    key: inv.id,
    style: {
      borderTop: i ? `1px solid ${t.borderSoft}` : 'none'
    }
  }, /*#__PURE__*/React.createElement(InvoiceRow, {
    t: t,
    dark: dark,
    inv: inv,
    last: i === invoices.length - 1
  }))))));
}
Object.assign(window, {
  HomeScreen,
  ListScreen,
  THEMES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "mobile/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/DataTable.jsx
try { (() => {
// DataTable.jsx
function DataTable({
  rows
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F7F9FB',
      borderRadius: 16,
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      marginBottom: 12
    }
  }, "Top Selling Products"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      fontSize: 12,
      color: 'rgba(28,28,28,0.4)',
      paddingBottom: 8,
      borderBottom: '1px solid rgba(28,28,28,0.08)'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Name"), /*#__PURE__*/React.createElement("div", null, "Price"), /*#__PURE__*/React.createElement("div", null, "Quantity"), /*#__PURE__*/React.createElement("div", null, "Amount")), rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      fontSize: 13,
      padding: '10px 0',
      borderBottom: i === rows.length - 1 ? 'none' : '1px solid rgba(28,28,28,0.05)'
    }
  }, /*#__PURE__*/React.createElement("div", null, r.name), /*#__PURE__*/React.createElement("div", null, r.price), /*#__PURE__*/React.createElement("div", null, r.qty), /*#__PURE__*/React.createElement("div", null, r.amount))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/DataTable.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/RightRail.jsx
try { (() => {
// RightRail.jsx
function RailSection({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      marginBottom: 10
    }
  }, title), children);
}
function Row({
  icon,
  color,
  title,
  time
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: '6px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 9999,
      background: color || '#E5ECF6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    className: `ph ph-${icon}`,
    style: {
      fontSize: 14
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#1C1C1C'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'rgba(28,28,28,0.4)'
    }
  }, time)));
}
function Avatar({
  name,
  color
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: '6px 0',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 9999,
      background: color,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 600
    }
  }, name.split(' ').map(s => s[0]).join('')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13
    }
  }, name));
}
function RightRail() {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 280,
      flexShrink: 0,
      background: '#fff',
      borderLeft: '1px solid rgba(28,28,28,0.08)',
      padding: 20,
      boxSizing: 'border-box',
      height: 'calc(100vh - 52px)',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement(RailSection, {
    title: "Notifications"
  }, /*#__PURE__*/React.createElement(Row, {
    icon: "bug",
    color: "#E3F5FF",
    title: "You fixed a bug.",
    time: "Just now"
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "user",
    color: "#E5ECF6",
    title: "New user registered.",
    time: "59 minutes ago"
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "bug",
    color: "#E3F5FF",
    title: "You fixed a bug.",
    time: "12 hours ago"
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "broadcast",
    color: "#E5ECF6",
    title: "Andi Lane subscribed to you.",
    time: "Today, 11:59 AM"
  })), /*#__PURE__*/React.createElement(RailSection, {
    title: "Activities"
  }, /*#__PURE__*/React.createElement(Row, {
    icon: "paint-brush",
    color: "#FFCB9E",
    title: "Changed the style.",
    time: "Just now"
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "tag",
    color: "#C6C7F8",
    title: "Released a new version.",
    time: "59 minutes ago"
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "bug",
    color: "#B9E1F5",
    title: "Submitted a bug.",
    time: "12 hours ago"
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "pencil",
    color: "#BAEDBD",
    title: "Modified A data in Page X.",
    time: "Today, 11:59 AM"
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "trash",
    color: "#FFBAB2",
    title: "Deleted a page in Project X.",
    time: "Feb 2, 2024"
  })), /*#__PURE__*/React.createElement(RailSection, {
    title: "Contacts"
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Natali Craig",
    color: "#AF52DE"
  }), /*#__PURE__*/React.createElement(Avatar, {
    name: "Drew Cano",
    color: "#FF9500"
  }), /*#__PURE__*/React.createElement(Avatar, {
    name: "Andi Lane",
    color: "#5856D6"
  }), /*#__PURE__*/React.createElement(Avatar, {
    name: "Koray Okumus",
    color: "#FFCC00"
  }), /*#__PURE__*/React.createElement(Avatar, {
    name: "Kate Morrison",
    color: "#34C759"
  }), /*#__PURE__*/React.createElement(Avatar, {
    name: "Melody Macy",
    color: "#FF3B30"
  })));
}
Object.assign(__ds_scope, { RightRail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/RightRail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Sidebar.jsx
try { (() => {
// Sidebar.jsx — Inverso dashboard left nav
const {
  useState
} = React;
function NavItem({
  icon,
  label,
  active,
  onClick,
  indent = 0
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: `6px 8px 6px ${8 + indent}px`,
      marginBottom: 2,
      borderRadius: 8,
      background: active ? 'rgba(28,28,28,0.05)' : 'transparent',
      cursor: 'pointer',
      fontSize: 14,
      color: '#1C1C1C',
      fontWeight: active ? 500 : 400
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    className: `ph ph-${icon}`,
    style: {
      fontSize: 18,
      opacity: 0.8
    }
  }), /*#__PURE__*/React.createElement("span", null, label));
}
function SectionLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'rgba(28,28,28,0.4)',
      padding: '10px 8px 4px',
      fontWeight: 400
    }
  }, children);
}
function Sidebar({
  active,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 212,
      flexShrink: 0,
      background: '#fff',
      borderRight: '1px solid rgba(28,28,28,0.08)',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      height: '100vh',
      boxSizing: 'border-box',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '4px 4px 12px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/inverso-icon.png",
    alt: "",
    style: {
      width: 24,
      height: 24
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: 14
    }
  }, "ByeWind")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      padding: '4px 8px',
      fontSize: 13,
      color: 'rgba(28,28,28,0.4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#1C1C1C',
      fontWeight: 400
    }
  }, "Favorites"), /*#__PURE__*/React.createElement("span", null, "Recently")), /*#__PURE__*/React.createElement(NavItem, {
    label: "Overview",
    onClick: () => onSelect('overview'),
    active: active === 'overview',
    indent: 4
  }), /*#__PURE__*/React.createElement(NavItem, {
    label: "Projects",
    onClick: () => onSelect('projects'),
    active: active === 'projects',
    indent: 4
  }), /*#__PURE__*/React.createElement(SectionLabel, null, "Dashboards"), /*#__PURE__*/React.createElement(NavItem, {
    icon: "chart-pie-slice",
    label: "Overview",
    active: active === 'dash-overview',
    onClick: () => onSelect('dash-overview')
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "shopping-bag",
    label: "eCommerce",
    active: active === 'ecommerce',
    onClick: () => onSelect('ecommerce')
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "folder",
    label: "Projects",
    onClick: () => onSelect('dash-projects'),
    active: active === 'dash-projects'
  }), /*#__PURE__*/React.createElement(SectionLabel, null, "Pages"), /*#__PURE__*/React.createElement(NavItem, {
    icon: "user",
    label: "User Profile",
    onClick: () => onSelect('profile'),
    active: active === 'profile'
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "identification-card",
    label: "Account",
    onClick: () => onSelect('account'),
    active: active === 'account'
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "buildings",
    label: "Corporate",
    onClick: () => onSelect('corp'),
    active: active === 'corp'
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "article",
    label: "Blog",
    onClick: () => onSelect('blog'),
    active: active === 'blog'
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "chats-circle",
    label: "Social",
    onClick: () => onSelect('social'),
    active: active === 'social'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      padding: 8
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/inverso-logo.png",
    alt: "",
    style: {
      height: 22
    }
  })));
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/StatTile.jsx
try { (() => {
// StatTile.jsx
function StatTile({
  label,
  value,
  delta,
  tone = 'blue',
  selected,
  onClick
}) {
  const tones = {
    blue: {
      bg: '#E3F5FF'
    },
    purple: {
      bg: '#E5ECF6'
    },
    white: {
      bg: '#F7F9FB'
    }
  };
  const t = tones[tone] || tones.blue;
  const positive = delta && delta.startsWith('+');
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      background: t.bg,
      borderRadius: 16,
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      cursor: 'pointer',
      boxShadow: selected ? '0 0 0 2px #1C1C1C' : 'none',
      transition: 'box-shadow 150ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#1C1C1C'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 600
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: positive ? '#1C1C1C' : 'rgba(28,28,28,0.6)'
    }
  }, delta, /*#__PURE__*/React.createElement("i", {
    className: `ph ph-trend-${positive ? 'up' : 'down'}`,
    style: {
      marginLeft: 4,
      fontSize: 14,
      verticalAlign: 'middle'
    }
  }))));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/StatTile.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/TopBar.jsx
try { (() => {
// TopBar.jsx
function TopBar({
  crumb = 'Default'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 52,
      borderBottom: '1px solid rgba(28,28,28,0.08)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: 16,
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-sidebar",
    style: {
      fontSize: 20,
      cursor: 'pointer'
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: "ph ph-star",
    style: {
      fontSize: 20,
      cursor: 'pointer'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(28,28,28,0.4)'
    }
  }, "Dashboards"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(28,28,28,0.2)'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", null, crumb)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(28,28,28,0.04)',
      padding: '6px 12px',
      borderRadius: 8,
      fontSize: 13,
      color: 'rgba(28,28,28,0.5)',
      minWidth: 240
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-magnifying-glass"
  }), /*#__PURE__*/React.createElement("span", null, "Search"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'ui-monospace, monospace',
      fontSize: 11
    }
  }, "\u2318/")), /*#__PURE__*/React.createElement("i", {
    className: "ph ph-sun",
    style: {
      fontSize: 20,
      cursor: 'pointer'
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: "ph ph-clock-counter-clockwise",
    style: {
      fontSize: 20,
      cursor: 'pointer'
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: "ph ph-bell",
    style: {
      fontSize: 20,
      cursor: 'pointer'
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: "ph ph-sidebar",
    style: {
      fontSize: 20,
      cursor: 'pointer',
      transform: 'scaleX(-1)'
    }
  }));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/invoice/ios-frame.jsx
try { (() => {
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports: IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/invoice/ios-frame.jsx", error: String((e && e.message) || e) }); }

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.RightRail = __ds_scope.RightRail;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.TopBar = __ds_scope.TopBar;

})();
