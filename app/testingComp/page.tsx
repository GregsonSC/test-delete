import { GoogleReviewCard } from "@/presentation/molecules/review-card/review-card";
import { Footer } from "@/presentation/organisms/footer/footer";
import { ReviewCardUser } from "@/presentation/molecules/review-card-user/review-card-user";
import { HoverCardWGC } from "@/presentation/molecules/hover-card-wgc/hover-card-wgc";
import { HoverCardImage } from "@/presentation/molecules/hover-card-image/hover-card-image";

export default function TestingComp() {
  return (
    <div className="w-screen h-screen flex-row items-center">
        <div className="flex flex-col items-center justify-center gap-10">
            <GoogleReviewCard />
            <ReviewCardUser />
            <HoverCardWGC 
                icon="iconos_2/Vector.png"
                title="Default Title"
                content="Default Content"
                link="#"
            />
            <HoverCardImage 
              image="/fotos-prueba/joe.jpg" 
              title="Default Image" 
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam risus nec elit luctus, sed vehicula magna suscipit. Donec et sem a" 
              date="2023-01-01" 
              tag="DefaultTag"
            />
         </div>
        <Footer/>

    </div>
  );
}
