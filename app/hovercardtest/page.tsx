import { HoverCardImage } from "@/presentation/molecules/hover-card-image/hover-card-image";
import { HoverCardWGC } from "@/presentation/molecules/hover-card-wgc/hover-card-wgc";

export default function TestHoverCard() {
  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4 gap-2">
      <HoverCardImage
        image="/images/test-icon.png" 
        title="Test Card Title"
        content="This is some sample content for the hover card component. It demonstrates how the component will display a title, an image icon, some content, and a link."
        date = "01/4/2024"
        tag = "Test"
      />
      <HoverCardWGC 
        icon="/iconos_2/Vector.png"
        title="Sample Hover Card"
        content="This is a sample content for the hover card to show some details about the example."
        link="https://example.com"
      />

    </div>
  );
}