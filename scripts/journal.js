// ===============================================
// Bottom navigation + Trading journal (P&L & history)
// ===============================================
(function(){
    "use strict";

    // ---------- i18n (merged into the main dictionary; falls back to EN) ----------
    const TR = {
        en: {
            nav_signals:"Signals", nav_journal:"Journal", nav_aria:"Main navigation",
            j_title:"Trading journal", j_sub:"Track your results and P&L",
            j_pnl:"Net P&L", j_trades:"trades", j_winrate:"Win rate", j_wins:"Wins", j_losses:"Losses",
            j_stake:"Stake", j_payout:"Payout", j_history:"Trade history", j_clear:"Clear all",
            j_clear_confirm:"Delete all journal entries?",
            j_empty_t:"No trades yet", j_empty_s:"Get a signal and it will appear here",
            j_pending:"Open", j_win:"Win", j_loss:"Loss", j_undo:"Undo", j_delete:"Delete",
            j_pending_hint:"Mark the result"
        },
        ru: {
            nav_signals:"Сигналы", nav_journal:"Журнал", nav_aria:"Основная навигация",
            j_title:"Торговый журнал", j_sub:"Следите за результатами и P&L",
            j_pnl:"Итоговый P&L", j_trades:"сделок", j_winrate:"Винрейт", j_wins:"Плюс", j_losses:"Минус",
            j_stake:"Ставка", j_payout:"Выплата", j_history:"История сделок", j_clear:"Очистить",
            j_clear_confirm:"Удалить все записи журнала?",
            j_empty_t:"Сделок пока нет", j_empty_s:"Получите сигнал — он появится здесь",
            j_pending:"Открыта", j_win:"Плюс", j_loss:"Минус", j_undo:"Отменить", j_delete:"Удалить",
            j_pending_hint:"Отметьте результат"
        },
        es: {
            nav_signals:"Señales", nav_journal:"Diario", nav_aria:"Navegación principal",
            j_title:"Diario de trading", j_sub:"Sigue tus resultados y P&L",
            j_pnl:"P&L neto", j_trades:"operaciones", j_winrate:"Acierto", j_wins:"Ganadas", j_losses:"Perdidas",
            j_stake:"Importe", j_payout:"Pago", j_history:"Historial de operaciones", j_clear:"Borrar todo",
            j_clear_confirm:"¿Eliminar todas las entradas del diario?",
            j_empty_t:"Aún no hay operaciones", j_empty_s:"Obtén una señal y aparecerá aquí",
            j_pending:"Abierta", j_win:"Ganada", j_loss:"Perdida", j_undo:"Deshacer", j_delete:"Eliminar",
            j_pending_hint:"Marca el resultado"
        },
        fr: {
            nav_signals:"Signaux", nav_journal:"Journal", nav_aria:"Navigation principale",
            j_title:"Journal de trading", j_sub:"Suivez vos résultats et votre P&L",
            j_pnl:"P&L net", j_trades:"trades", j_winrate:"Taux de réussite", j_wins:"Gagnés", j_losses:"Perdus",
            j_stake:"Mise", j_payout:"Gain", j_history:"Historique des trades", j_clear:"Tout effacer",
            j_clear_confirm:"Supprimer toutes les entrées du journal ?",
            j_empty_t:"Aucun trade pour l’instant", j_empty_s:"Obtenez un signal, il apparaîtra ici",
            j_pending:"Ouvert", j_win:"Gagné", j_loss:"Perdu", j_undo:"Annuler", j_delete:"Supprimer",
            j_pending_hint:"Indiquez le résultat"
        },
        hi: {
            nav_signals:"सिग्नल", nav_journal:"जर्नल", nav_aria:"मुख्य नेविगेशन",
            j_title:"ट्रेडिंग जर्नल", j_sub:"अपने नतीजे और P&L ट्रैक करें",
            j_pnl:"कुल P&L", j_trades:"ट्रेड", j_winrate:"जीत दर", j_wins:"जीत", j_losses:"हार",
            j_stake:"राशि", j_payout:"पेआउट", j_history:"ट्रेड इतिहास", j_clear:"सब हटाएँ",
            j_clear_confirm:"जर्नल की सभी प्रविष्टियाँ हटाएँ?",
            j_empty_t:"अभी कोई ट्रेड नहीं", j_empty_s:"सिग्नल लें, वह यहाँ दिखेगा",
            j_pending:"खुला", j_win:"जीत", j_loss:"हार", j_undo:"वापस", j_delete:"हटाएँ",
            j_pending_hint:"नतीजा चुनें"
        },
        ar: {
            nav_signals:"الإشارات", nav_journal:"السجل", nav_aria:"التنقل الرئيسي",
            j_title:"سجل التداول", j_sub:"تابع نتائجك والأرباح والخسائر",
            j_pnl:"صافي الربح والخسارة", j_trades:"صفقات", j_winrate:"نسبة الربح", j_wins:"رابحة", j_losses:"خاسرة",
            j_stake:"المبلغ", j_payout:"العائد", j_history:"سجل الصفقات", j_clear:"مسح الكل",
            j_clear_confirm:"حذف جميع إدخالات السجل؟",
            j_empty_t:"لا توجد صفقات بعد", j_empty_s:"احصل على إشارة وستظهر هنا",
            j_pending:"مفتوحة", j_win:"ربح", j_loss:"خسارة", j_undo:"تراجع", j_delete:"حذف",
            j_pending_hint:"حدّد النتيجة"
        },
        ro: {
            nav_signals:"Semnale", nav_journal:"Jurnal", nav_aria:"Navigare principală",
            j_title:"Jurnal de trading", j_sub:"Urmărește rezultatele și P&L",
            j_pnl:"P&L net", j_trades:"tranzacții", j_winrate:"Rată de câștig", j_wins:"Câștigate", j_losses:"Pierdute",
            j_stake:"Miză", j_payout:"Profit", j_history:"Istoric tranzacții", j_clear:"Șterge tot",
            j_clear_confirm:"Ștergi toate intrările din jurnal?",
            j_empty_t:"Nicio tranzacție încă", j_empty_s:"Primește un semnal și va apărea aici",
            j_pending:"Deschisă", j_win:"Câștig", j_loss:"Pierdere", j_undo:"Anulează", j_delete:"Șterge",
            j_pending_hint:"Marchează rezultatul"
        }
    };
    try { Object.keys(TR).forEach(k => { if (typeof I18N !== "undefined" && I18N[k]) Object.assign(I18N[k], TR[k]); }); } catch(_) {}
    const tr = (k) => { const v = (typeof t === "function") ? t(k) : ""; return v || TR.en[k] || k; };

    // ---------- storage ----------
    const KEY = "ps_journal_v1", SET_KEY = "ps_journal_settings_v1", VIEW_KEY = "ps_view_v1", MAX = 200;
    let items = [];
    let settings = { stake: 10, payout: 80 };
    try { items = JSON.parse(localStorage.getItem(KEY) || "[]"); if (!Array.isArray(items)) items = []; } catch(_) { items = []; }
    try { Object.assign(settings, JSON.parse(localStorage.getItem(SET_KEY) || "{}")); } catch(_) {}
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch(_) {} };
    const saveSet = () => { try { localStorage.setItem(SET_KEY, JSON.stringify(settings)); } catch(_) {} };

    // ---------- helpers ----------
    const $ = (s, r) => (r || document).querySelector(s);
    const SVGNS = "http://www.w3.org/2000/svg";
    function h(tag, cls, text){ const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
    function icon(paths, cls){
        const s = document.createElementNS(SVGNS, "svg");
        s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("fill", "none"); s.setAttribute("stroke", "currentColor");
        s.setAttribute("stroke-width", "2"); s.setAttribute("stroke-linecap", "round"); s.setAttribute("stroke-linejoin", "round");
        s.setAttribute("aria-hidden", "true"); if (cls) s.setAttribute("class", cls);
        paths.forEach(d => { const p = document.createElementNS(SVGNS, "path"); p.setAttribute("d", d); s.appendChild(p); });
        return s;
    }
    const ICON_UP = ["M12 19V5", "M5 12l7-7 7 7"], ICON_DOWN = ["M12 5v14", "M19 12l-7 7-7-7"];
    const ICON_TRASH = ["M4 7h16", "M10 11v6", "M14 11v6", "M6 7l1 13h10l1-13", "M9 7V4h6v3"];
    const ICON_BOOK = ["M7 3h10a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z", "M8 15l2.5-3 2.5 2 3-4.5", "M8 7.5h4"];

    const loc = () => (typeof CURRENT_LANG === "string" ? CURRENT_LANG : "en");
    const money = (v) => {
        const a = Math.abs(v), s = a.toLocaleString(loc(), { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return (v < 0 ? "−" : v > 0 ? "+" : "") + "$" + s;
    };
    const pnlOf = (e) => e.status === "win" ? e.stake * e.payout / 100 : e.status === "loss" ? -e.stake : 0;

    // ---------- build DOM (bottom nav + journal view) ----------
    function build(){
        const wrap = $(".app-wrapper"); if (!wrap) return;

        const view = h("section", "journal"); view.id = "viewJournal";
        view.innerHTML = `
          <div class="j-heading"><h1 id="jTitle"></h1><p id="jSub"></p></div>

          <div class="j-card" id="jSummary">
            <div class="j-pnl-top">
              <div><div class="j-label" id="jPnlLabel"></div><div class="j-pnl" id="jPnl">$0.00</div></div>
              <div class="j-chip" id="jCount"></div>
            </div>
            <svg class="j-spark" id="jSpark" viewBox="0 0 300 56" preserveAspectRatio="none" aria-hidden="true">
              <defs><linearGradient id="jGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#39d7b5" stop-opacity=".28"/><stop offset="1" stop-color="#39d7b5" stop-opacity="0"/>
              </linearGradient></defs>
            </svg>
            <div class="j-stats">
              <div class="j-stat"><div class="v" id="jRate">—</div><div class="k" id="jRateK"></div></div>
              <div class="j-stat"><div class="v pos" id="jWins">0</div><div class="k" id="jWinsK"></div></div>
              <div class="j-stat"><div class="v neg" id="jLoss">0</div><div class="k" id="jLossK"></div></div>
            </div>
          </div>

          <div class="j-card j-settings">
            <div class="j-field"><label for="jStake" id="jStakeL"></label>
              <div class="j-input"><input id="jStake" type="number" inputmode="decimal" min="0" step="any"><span class="u">$</span></div></div>
            <div class="j-field"><label for="jPayout" id="jPayoutL"></label>
              <div class="j-input"><input id="jPayout" type="number" inputmode="decimal" min="0" max="1000" step="any"><span class="u">%</span></div></div>
          </div>

          <div class="j-list-head"><h2 id="jHist"></h2><button class="j-clear" id="jClear" type="button"></button></div>
          <div class="j-list" id="jList"></div>`;
        const faq = $(".faq-section");
        wrap.insertBefore(view, faq ? faq.nextSibling : null);

        const nav = h("nav", "bottom-nav"); nav.id = "bottomNav";
        nav.innerHTML = `
          <div class="bottom-nav-inner" role="tablist">
            <button class="nav-tab" type="button" role="tab" data-view="signals" aria-selected="true"><i class="nav-ico"></i><span id="navSignals">Signals</span></button>
            <button class="nav-tab" type="button" role="tab" data-view="journal" aria-selected="false"><i class="nav-ico"></i><span id="navJournal">Journal</span><b class="nav-badge" id="navBadge"></b></button>
          </div>`;
        document.body.appendChild(nav);

        nav.addEventListener("click", (e) => { const b = e.target.closest(".nav-tab"); if (b) setView(b.dataset.view); });

        const st = $("#jStake"), po = $("#jPayout");
        st.value = settings.stake; po.value = settings.payout;
        st.addEventListener("input", () => { const v = parseFloat(st.value); if (isFinite(v) && v >= 0) { settings.stake = v; saveSet(); } });
        po.addEventListener("input", () => { const v = parseFloat(po.value); if (isFinite(v) && v >= 0) { settings.payout = v; saveSet(); } });
        $("#jClear").addEventListener("click", () => { if (items.length && confirm(tr("j_clear_confirm"))) { items = []; save(); render(); } });
        $("#jList").addEventListener("click", onListClick);
    }

    function setView(v){
        if (v !== "signals" && v !== "journal") v = "signals";
        document.body.dataset.view = v;
        document.querySelectorAll("#bottomNav .nav-tab").forEach(b => b.setAttribute("aria-selected", String(b.dataset.view === v)));
        try { localStorage.setItem(VIEW_KEY, v); } catch(_) {}
        window.scrollTo(0, 0);
        if (v === "journal") render();
    }

    // ---------- actions ----------
    function log(e){
        items.unshift({
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            ts: Date.now(), pair: e.pair, isBuy: !!e.isBuy, time: e.time || "", model: e.model || "",
            conf: e.conf || "", status: "pending"
        });
        if (items.length > MAX) items.length = MAX;
        save(); render();
    }
    function onListClick(ev){
        const btn = ev.target.closest("[data-act]"); if (!btn) return;
        const it = items.find(x => x.id === btn.dataset.id); if (!it) return;
        const act = btn.dataset.act;
        if (act === "win" || act === "loss") {
            it.status = act; it.stake = settings.stake; it.payout = settings.payout;
        } else if (act === "undo") {
            it.status = "pending"; delete it.stake; delete it.payout;
        } else if (act === "del") {
            items = items.filter(x => x !== it);
        }
        save(); render();
    }

    // ---------- render ----------
    function sparkline(){
        const svg = $("#jSpark"); if (!svg) return;
        svg.querySelectorAll(".line,.area,.zero").forEach(n => n.remove());
        const closed = items.filter(x => x.status !== "pending").slice().reverse();
        if (closed.length < 2) { svg.style.display = "none"; return; }
        svg.style.display = "";
        let c = 0; const pts = [0].concat(closed.map(x => (c += pnlOf(x))));
        const min = Math.min(0, ...pts), max = Math.max(0, ...pts), span = (max - min) || 1;
        const X = i => (i / (pts.length - 1)) * 300, Y = v => 50 - ((v - min) / span) * 44;
        const d = pts.map((v, i) => (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(v).toFixed(1)).join(" ");
        const z = document.createElementNS(SVGNS, "line");
        z.setAttribute("class", "zero"); z.setAttribute("x1", 0); z.setAttribute("x2", 300); z.setAttribute("y1", Y(0)); z.setAttribute("y2", Y(0));
        const a = document.createElementNS(SVGNS, "path"); a.setAttribute("class", "area"); a.setAttribute("d", d + ` L300 56 L0 56 Z`);
        const l = document.createElementNS(SVGNS, "path"); l.setAttribute("class", "line"); l.setAttribute("d", d);
        l.setAttribute("vector-effect", "non-scaling-stroke");
        const last = pts[pts.length - 1];
        l.style.stroke = last < 0 ? "#ff8b8b" : "#39d7b5";
        svg.append(z, a, l);
    }

    function render(){
        if (!$("#jList")) return;
        const closed = items.filter(x => x.status !== "pending");
        const wins = closed.filter(x => x.status === "win").length, losses = closed.length - wins;
        const total = closed.reduce((s, x) => s + pnlOf(x), 0);
        const pend = items.length - closed.length;

        const pnl = $("#jPnl"); pnl.textContent = money(total);
        pnl.className = "j-pnl" + (total > 0 ? " pos" : total < 0 ? " neg" : "");
        $("#jCount").textContent = items.length + " " + tr("j_trades");
        $("#jRate").textContent = closed.length ? Math.round(wins / closed.length * 100) + "%" : "—";
        $("#jWins").textContent = wins; $("#jLoss").textContent = losses;
        sparkline();

        const badge = $("#navBadge");
        if (badge) { badge.textContent = pend > 99 ? "99+" : pend; badge.classList.toggle("on", pend > 0); }
        $("#jClear").style.visibility = items.length ? "visible" : "hidden";

        const list = $("#jList"); list.replaceChildren();
        if (!items.length) {
            const empty = h("div", "j-card j-empty");
            empty.append(icon(ICON_BOOK), h("b", null, tr("j_empty_t")), h("span", null, tr("j_empty_s")));
            list.appendChild(empty); return;
        }
        items.forEach(it => {
            const card = h("div", "j-item " + (it.status === "pending" ? "" : it.status));
            const row = h("div", "j-row");
            const dir = h("div", "j-dir " + (it.isBuy ? "buy" : "sell")); dir.appendChild(icon(it.isBuy ? ICON_UP : ICON_DOWN));
            const main = h("div", "j-main");
            const when = new Date(it.ts).toLocaleString(loc(), { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
            const dirTxt = (typeof i18nFormatDirection === "function") ? i18nFormatDirection(it.isBuy) : (it.isBuy ? "BUY" : "SELL");
            main.append(h("div", "j-pair", it.pair), h("div", "j-meta", [dirTxt, it.time, when].filter(Boolean).join(" · ")));
            const res = h("div", "j-res");
            if (it.status === "pending") res.appendChild(h("div", "j-amt pend", tr("j_pending")));
            else { const v = pnlOf(it); res.append(h("div", "j-amt " + (v >= 0 ? "pos" : "neg"), money(v))); }
            row.append(dir, main, res);

            const act = h("div", "j-actions");
            const mk = (cls, a, label) => { const b = h("button", "j-btn " + cls, label); b.type = "button"; b.dataset.act = a; b.dataset.id = it.id; return b; };
            if (it.status === "pending") { act.append(mk("win", "win", "✓ " + tr("j_win")), mk("loss", "loss", "✕ " + tr("j_loss"))); }
            else act.append(mk("undo", "undo", "↺ " + tr("j_undo")));
            const del = mk("del", "del", ""); del.setAttribute("aria-label", tr("j_delete")); del.appendChild(icon(ICON_TRASH));
            act.append(del);
            if (it.status !== "pending") { const sp = h("div"); sp.style.flex = "1"; act.insertBefore(sp, del); }
            card.append(row, act); list.appendChild(card);
        });
    }

    function applyI18n(){
        const set = (id, k) => { const e = document.getElementById(id); if (e) e.textContent = tr(k); };
        set("navSignals", "nav_signals"); set("navJournal", "nav_journal");
        $("#bottomNav .bottom-nav-inner")?.setAttribute("aria-label", tr("nav_aria"));
        set("jTitle", "j_title"); set("jSub", "j_sub"); set("jPnlLabel", "j_pnl");
        set("jRateK", "j_winrate"); set("jWinsK", "j_wins"); set("jLossK", "j_losses");
        set("jStakeL", "j_stake"); set("jPayoutL", "j_payout"); set("jHist", "j_history"); set("jClear", "j_clear");
        render();
    }

    function init(){
        build(); applyI18n();
        let v = "signals"; try { v = localStorage.getItem(VIEW_KEY) || "signals"; } catch(_) {}
        setView(v);
        window.scrollTo(0, 0);
    }
    window.Journal = { log, applyI18n, setView };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
