/* @ds-bundle: {"format":4,"namespace":"LARI30DesignSystem_0ed06a","components":[{"name":"Card","sourcePath":"components/content/Card.jsx"},{"name":"SectionKicker","sourcePath":"components/content/SectionKicker.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"}],"sourceHashes":{"components/content/Card.jsx":"ac5780850661","components/content/SectionKicker.jsx":"70601d327493","components/core/Badge.jsx":"018fe327aac5","components/core/Button.jsx":"ce063bfa15ce","components/core/Chip.jsx":"a5056ee8d9a0","components/core/Input.jsx":"efdc4c3a1a4c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LARI30DesignSystem_0ed06a = window.LARI30DesignSystem_0ed06a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/Card.jsx
try { (() => {
function Card({
  kicker,
  title,
  children,
  tone = 'white'
}) {
  const bg = {
    white: 'var(--white)',
    cream: 'var(--warm-cream)',
    pink: 'var(--accent-blush)'
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      border: 'var(--border-w) solid var(--border-default)',
      boxShadow: 'var(--shadow-hard)',
      borderRadius: 'var(--radius-sharp)',
      padding: 'var(--space-5)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, kicker && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-kicker)',
      letterSpacing: 'var(--kicker-tracking)',
      textTransform: 'uppercase',
      color: 'var(--coral)'
    }
  }, kicker), title && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-display-sm)',
      color: 'var(--ink)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--text-muted)'
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionKicker.jsx
try { (() => {
function SectionKicker({
  children,
  align = 'left'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-kicker)',
      letterSpacing: 'var(--kicker-tracking)',
      textTransform: 'uppercase',
      color: 'var(--coral)'
    }
  }, children), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 40",
    preserveAspectRatio: "none",
    style: {
      width: 120,
      height: 12,
      display: 'block',
      margin: align === 'center' ? '4px auto 0' : '4px 0 0'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 20 Q25 0 50 20 T100 20 T150 20 T200 20 T250 20 T300 20 T350 20 T400 20",
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "4"
  })));
}
Object.assign(__ds_scope, { SectionKicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionKicker.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function Badge({
  children,
  tone = 'bubblegum'
}) {
  const bg = {
    bubblegum: 'var(--bubblegum)',
    coral: 'var(--coral)',
    yellow: 'var(--sun-yellow)',
    blue: 'var(--pool-blue)'
  }[tone];
  const color = tone === 'yellow' ? 'var(--ink)' : '#fff';
  return /*#__PURE__*/React.createElement("span", {
    className: "sticker",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 96,
      height: 96,
      borderRadius: '50%',
      background: bg,
      color,
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 14,
      textAlign: 'center',
      lineHeight: 1.05,
      padding: 8
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  ...rest
}) {
  const bg = variant === 'primary' ? 'var(--coral)' : variant === 'secondary' ? 'var(--ink)' : 'transparent';
  const color = variant === 'ghost' ? 'var(--ink)' : variant === 'secondary' ? 'var(--warm-cream)' : '#fff';
  const border = variant === 'ghost' ? '2px solid var(--ink)' : 'none';
  const pad = size === 'sm' ? '8px 18px' : size === 'lg' ? '16px 32px' : '12px 24px';
  const fs = size === 'sm' ? '13px' : size === 'lg' ? '17px' : '15px';
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: fs,
      letterSpacing: '0.01em',
      padding: pad,
      background: bg,
      color,
      border,
      borderRadius: 'var(--radius-pill)',
      boxShadow: variant === 'ghost' ? 'none' : 'var(--shadow-hard-sm)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      transition: 'transform var(--dur-fast) var(--ease-pop), box-shadow var(--dur-fast)'
    },
    onMouseDown: e => {
      e.currentTarget.style.transform = 'translate(3px,3px)';
      e.currentTarget.style.boxShadow = 'none';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = variant === 'ghost' ? 'none' : 'var(--shadow-hard-sm)';
    }
  }), icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function Chip({
  children,
  selected = false,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 14,
      padding: '8px 16px',
      borderRadius: 'var(--radius-pill)',
      border: '2px solid var(--ink)',
      background: selected ? 'var(--sun-yellow)' : 'var(--white)',
      color: 'var(--ink)',
      cursor: 'pointer'
    }
  }, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  placeholder,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--ink)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    placeholder: placeholder,
    style: {
      font: 'var(--text-body)',
      padding: '12px 14px',
      border: '2px solid var(--ink)',
      borderRadius: 'var(--radius-sharp)',
      background: 'var(--white)',
      color: 'var(--ink)',
      outline: 'none'
    },
    onFocus: e => e.currentTarget.style.boxShadow = '0 0 0 3px var(--focus-ring)',
    onBlur: e => e.currentTarget.style.boxShadow = 'none'
  })));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Card = __ds_scope.Card;

__ds_ns.SectionKicker = __ds_scope.SectionKicker;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Input = __ds_scope.Input;

})();
