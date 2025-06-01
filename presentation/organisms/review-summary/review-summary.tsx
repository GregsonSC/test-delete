import { GoogleReviewCard } from "@/presentation/molecules/review-card/review-card";
import { reviewItems } from "@/components/const/reviewItems";
//import { reviewItems } from "@/lib/constants2";
import { ReviewCardUser } from "@/presentation/molecules/review-card-user/review-card-user";

export function ReviewSummary() {
    return (
        <section
        className=" flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat mb-[150px]"
        style={{ backgroundImage: "url('/images/marketing/reviews.jpg')" }}
      >
        <div className="container px-8 sm:px-4 md:px-6 mx-auto flex items-center justify-center h-full">
          <div className="max-w-5xl mx-auto w-full">
            {/* Content container */}
            <div className="bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8 md:p-12 mx-auto max-w-5xl relative overflow-hidden my-[120px]">
              <div className="text-center mb-8">
                <h3 className="text-[32px] md:text-[36px] font-bold text-white mb-4">
                  Testimonials Section
                </h3>
                <p className="text-[16px] md:text-[18px] text-gray-300 max-w-2xl mx-auto">
                  See the results of dozens of businesses in Miami that have trusted Senavia and
                  seen positive returns. We offer a unique experience where you are our #1 priority.
                </p>
              </div>

              {/* Google Reviews Summary */}
              <div className="flex justify-center mb-12">
                <GoogleReviewCard rating={5.0} totalReviews={25} />
              </div>

              {/* Individual Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviewItems.map((review, index) => (
                  <ReviewCardUser
                    key={index}
                    profilePicture={review.profilePicture}
                    name={review.name}
                    rating={review.rating}
                    review={review.review}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}
