import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function BlogPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute -right-20 top-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50"></div>

        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Heading level="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Our Blog
            </Heading>
            <p className="text-lg text-muted-foreground">
              Insights, tips, and trends in web development, digital marketing, and design.
            </p>

            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10 bg-background/5 border-gray-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=800&width=1200&text=Featured+Post"
                alt="Featured blog post"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium">
                  Digital Marketing
                </div>
                <div className="text-sm text-muted-foreground">June 15, 2023</div>
              </div>
              <h2 className="text-3xl font-bold">
                10 Proven Strategies to Boost Your Website Conversion Rate
              </h2>
              <p className="text-muted-foreground">
                Learn the top strategies that have helped our clients increase their website
                conversion rates by an average of 150%. From UX improvements to persuasive
                copywriting, these tactics will help you turn more visitors into customers.
              </p>
              <Button asChild className="rounded-full">
                <Link href="/blog/conversion-rate-strategies">Read Article</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-12">
            <Heading level="h2" className="text-3xl font-bold">
              Recent Articles
            </Heading>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="rounded-full">
                All
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                Web Development
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                Marketing
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                Design
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <BlogCard
                key={index}
                title={`Blog Post ${index + 1}`}
                excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl."
                category={
                  index % 3 === 0 ? "Web Development" : index % 3 === 1 ? "Marketing" : "Design"
                }
                date="June 10, 2023"
                image={`/placeholder.svg?height=400&width=600&text=Blog+${index + 1}`}
                href={`/blog/post-${index + 1}`}
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

      {/* Newsletter Section */}
      <section className="py-20 bg-primary/10 border-y border-primary/20">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Subscribe to Our Newsletter
            </Heading>
            <p className="text-muted-foreground text-lg mb-8">
              Get the latest insights, tips, and trends delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-background/5 border-gray-800"
              />
              <Button className="rounded-full">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  href: string;
}

function BlogCard({ title, excerpt, category, date, image, href }: BlogCardProps) {
  return (
    <Link href={href} className="group">
      <div className="bg-background/5 border border-gray-800 rounded-lg overflow-hidden hover:border-primary transition-colors">
        <div className="relative h-[200px] w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-primary">{category}</div>
            <div className="text-xs text-muted-foreground">{date}</div>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{excerpt}</p>
        </div>
      </div>
    </Link>
  );
}
