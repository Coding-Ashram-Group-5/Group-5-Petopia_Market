import { ModeToggleLargeScreen } from "./ModeToggleLargeScreen";
import { ModeToggleSmallScreen } from "./ModeToggleSmallScreen";

export function ModeToggle() {
  return (
    <div>
      {/* For large screens */}
      <div className="hidden lg:block">
        <ModeToggleLargeScreen />
      </div>
      {/* For smaller screens */}
      <div className="block lg:hidden">
        <ModeToggleSmallScreen />
      </div>
    </div>
  );
}
