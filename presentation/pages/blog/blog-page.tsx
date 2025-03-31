import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { HoverCardImage } from "@/presentation/molecules/hover-card-image/hover-card-image";

export function BlogPage() {
  return (
      <MainLayout>
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <Heading level="h1" className="text-5xl md:text-5xl lg:text-6xl font-bold mt-24">
                Blog
              </Heading>
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
              {[...Array(6)].map((_, index) => (
                <HoverCardImage
                  key={index}
                  title={`Blog Post ${index + 1}`}
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl."
                  tag={
                    index % 3 === 0 ? "Web Development" : index % 3 === 1 ? "Marketing" : "Design"
                  }
                  date="June 10, 2023"
                  image="fotos-prueba/webdevelpment.png"
                  href= "/"
                />
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button variant="outline" className="rounded-full">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

{/* Contact info */}
        <ContactInfo/>

        {/*Place holder calendar */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto mt-10 mb-10">
      {/* Encabezado con mes y flechas de navegación */}
      <div className="flex justify-between items-center mb-4">
        <button className="text-gray-500 hover:text-gray-700">&lt;</button>
        <span className="font-bold text-lg">Abril 2023</span>
        <button className="text-gray-500 hover:text-gray-700">&gt;</button>
      </div>
      
      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day, index) => (
          <div key={index} className="text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {/* Celdas del calendario */}
      <div className="grid grid-cols-7 gap-1 mt-2 text-center">
        {[...Array(42)].map((_, index) => (
          <div
            key={index}
            className="h-10 flex items-center justify-center border rounded text-gray-700"
          >
            {/* Mostrar números del 1 al 30 como ejemplo */}
            {index < 30 ? index + 1 : ''}
          </div>
        ))}
      </div>
    </div>
      </MainLayout>
  );
}