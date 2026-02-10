import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function defaultProps(props: IconProps, size = 24) {
  const { size: s = size, ...rest } = props;
  return { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, ...rest };
}

/** Compass — navigation, orientation, discovery */
export function CompassIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.15" stroke="none" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
    </svg>
  );
}

/** MapPinAtlas — location with cartographic crosshair */
export function MapPinAtlasIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
      <line x1="12" y1="5" x2="12" y2="6" opacity="0.5" />
      <line x1="12" y1="12" x2="12" y2="13" opacity="0.5" />
      <line x1="8" y1="9" x2="9" y2="9" opacity="0.5" />
      <line x1="15" y1="9" x2="16" y2="9" opacity="0.5" />
    </svg>
  );
}

/** Waypoint — route marker, process step */
export function WaypointIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="8" strokeDasharray="3 3" opacity="0.4" />
      <line x1="12" y1="1" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="23" />
      <line x1="1" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="23" y2="12" />
    </svg>
  );
}

/** Blueprint — schematic, design, plan */
export function BlueprintIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="9" x2="9" y2="21" />
      <rect x="11" y="11" width="8" height="4" rx="1" opacity="0.4" />
      <rect x="11" y="17" width="5" height="2" rx="0.5" opacity="0.4" />
    </svg>
  );
}

/** Sextant — precision, measurement, exploration */
export function SextantIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path d="M12 3L4 21h16L12 3z" />
      <path d="M8 15h8" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="3" x2="12" y2="10" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  );
}

/** Anchor — stability, trust, foundation */
export function AnchorIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <circle cx="12" cy="5" r="3" />
      <line x1="12" y1="8" x2="12" y2="21" />
      <path d="M5 12H2a10 10 0 0020 0h-3" />
      <line x1="9" y1="21" x2="15" y2="21" opacity="0.5" />
    </svg>
  );
}

/** Coordinate — precision, details, data */
export function CoordinateIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <rect x="3" y="3" width="18" height="18" rx="1" strokeDasharray="4 2" opacity="0.3" />
      <line x1="3" y1="12" x2="21" y2="12" opacity="0.2" />
      <line x1="12" y1="3" x2="12" y2="21" opacity="0.2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="7" cy="8" r="1.5" opacity="0.6" />
      <circle cx="17" cy="16" r="1.5" opacity="0.6" />
      <line x1="7" y1="8" x2="12" y2="12" strokeDasharray="2 2" opacity="0.4" />
      <line x1="12" y1="12" x2="17" y2="16" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  );
}

/** RouteIcon — path, journey, process flow */
export function RouteIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="5" r="3" />
      <path d="M18 8v2a4 4 0 01-4 4H8a4 4 0 00-4 4v1" />
    </svg>
  );
}

/** ScreenIcon — monitor/portal, digital interface */
export function ScreenIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="6" y1="8" x2="10" y2="8" opacity="0.4" />
      <line x1="6" y1="11" x2="14" y2="11" opacity="0.4" />
      <rect x="15" y="7" width="3" height="5" rx="0.5" opacity="0.3" />
    </svg>
  );
}

/** ChatIcon — messaging, communication */
export function ChatIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
      <line x1="8" y1="8" x2="16" y2="8" opacity="0.4" />
      <line x1="8" y1="12" x2="13" y2="12" opacity="0.4" />
    </svg>
  );
}

/** FileStackIcon — documents, files */
export function FileStackIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" opacity="0.4" />
      <line x1="8" y1="17" x2="12" y2="17" opacity="0.4" />
    </svg>
  );
}

/** WalletIcon — payments */
export function WalletIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <rect x="2" y="6" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <circle cx="16" cy="15" r="1.5" />
      <path d="M22 6V4a2 2 0 00-2-2H4a2 2 0 00-2 2v2" opacity="0.4" />
    </svg>
  );
}

/** ActivityIcon — timeline, audit log */
export function ActivityIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
