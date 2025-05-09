"use client";
import { GoogleReviewCard } from "@/presentation/molecules/review-card/review-card";
import { Footer } from "@/presentation/organisms/layout/footer";
import { ReviewCardUser } from "@/presentation/molecules/review-card-user/review-card-user";
import { HoverCardWGC } from "@/presentation/molecules/hover-card-wgc/hover-card-wgc";
import { HoverCardImage } from "@/presentation/molecules/hover-card-image/hover-card-image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/presentation/atoms/button/button";
import { toast } from "sonner";
import { DefaultToast } from "@/presentation/atoms/toast/default/default-toast";
import { DefaultSucess } from "@/presentation/atoms/toast/sucess/default-sucess";
import { EstimatedValue } from "@/presentation/atoms/profile-project/request/estimated-value";

export default function TestingComp() {
  const promise = () =>
    new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 2000));

  // Sample data for EstimatedValue
  const sampleEstimates = [
    {
      title: "Website Development Project",
      items: [
        { name: "UI/UX Design", value: 1500 },
        { name: "Frontend Development", value: 2500 },
        { name: "Backend Integration", value: 3000 },
        { name: "Testing & Deployment", value: 1000 }
      ]
    },
    {
      title: "Mobile App Development",
      items: [
        { name: "UI/UX Design", value: 2000 },
        { name: "Frontend Development", value: 3500 },
        { name: "Backend Integration", value: 2800 },
        { name: "Testing & Deployment", value: 1200 }
      ]
    }
  ];

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
          content="Lorem :;V
          ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam risus nec elit luctus, sed vehicula magna suscipit. Donec et sem a"
          date="2023-01-01"
          tag="DefaultTag"
          href="/"
        />
      </div>
      <Footer />

      <p> revisar documentacion https://sonner.emilkowal.ski/styling </p>
      <p> ir a layout.tsx o buscar el nombre markus para editar el color red </p>
      <p> revisar documentacion https://ui.shadcn.com/docs/components/sonner </p>
      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle>Notificaciones Toast</CardTitle>
          <CardDescription>Diferentes tipos de notificaciones emergentes</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Button variant="outline" onClick={() => DefaultToast.normal("add toast")}>
            Normal
          </Button>
          <Button variant="outline" onClick={() => DefaultToast.title("add toast", "esta tiene titulo")}>
            Normal titulo
          </Button>
          <Button variant="outline" onClick={() => DefaultToast.normalStart("add toast")}>
            Normal estrella
          </Button>
          <Button variant="outline" onClick={() => DefaultToast.titleStart("add toast", "estrella")}>
            Titulo estrella
          </Button>
          <Button variant="outline" onClick={() => DefaultSucess()}>
            Éxito
          </Button>
          <Button variant="outline" onClick={() => toast.info("Event has been created")}>
            Información
          </Button>
          <Button variant="outline" onClick={() => toast.warning("Event has been created")}>
            Advertencia
          </Button>
          <Button variant="outline" onClick={() => toast.error("Event has been created")}>
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.promise(promise, {
                loading: "Cargando...",
                success: (data: any) => {
                  return `${data.name} toast has been added`;
                },
                error: "Error",
              })
            }
          >
            Promesa
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", {
                action: {
                  label: "Deshacer",
                  onClick: () => alert("Acción de deshacer"),
                },
              })
            }
          >
            Con acción
          </Button>
          <Button
            variant="outline"
            onClick={() => toast(<div>A custom toast with default styling</div>)}
          >
            Custom
          </Button>
        </CardContent>
      </Card>

      {/* EstimatedValue Component */}
      <Card className="w-full p-6 mt-8 bg-white">
        <CardHeader>
          <CardTitle className="text-[#0B1A33]">Estimated Value Component</CardTitle>
          <CardDescription>Multiple estimate cards with accept/decline functionality</CardDescription>
        </CardHeader>
        <CardContent>
          <EstimatedValue
            estimates={sampleEstimates}
            currencySymbol="$"
            onAccept={(index) => toast.success(`Estimate #${index + 1} accepted!`)}
            onDecline={(index, reason) => toast.error(`Estimate #${index + 1} declined: ${reason || "No reason provided"}`)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
