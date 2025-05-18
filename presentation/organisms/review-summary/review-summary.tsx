import { GoogleReviewCard } from "@/presentation/molecules/review-card/review-card";
import { reviewItems } from "@/components/const/reviewItems";
//import { reviewItems } from "@/lib/constants2";
import { ReviewCardUser } from "@/presentation/molecules/review-card-user/review-card-user";

export function ReviewSummary() {
    return (
        <div>
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
    )
}
