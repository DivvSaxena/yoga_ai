import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import { title, subtitle } from "@/components/primitives";
import { CheckIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

type FeedbackData = {
  name: string;
  email: string;
  phone: string;
  ageGroup: string;
  city: string;
  occupation: string;
  currentFitnessLevel: string;
  fitnessGoals: string[];
  dietType: string;
  howDidYouHear: string;
  rating: number;
  likedFeatures: string;
  improvements: string;
  wouldRecommend: boolean | null;
  consentToResearch: boolean;
  consentToContact: boolean;
};

export default function FeedbackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FeedbackData>({
    name: "",
    email: "",
    phone: "",
    ageGroup: "",
    city: "",
    occupation: "",
    currentFitnessLevel: "",
    fitnessGoals: [],
    dietType: "",
    howDidYouHear: "",
    rating: 0,
    likedFeatures: "",
    improvements: "",
    wouldRecommend: null,
    consentToResearch: false,
    consentToContact: false,
  });

  const updateForm = (field: keyof FeedbackData, value: string | boolean | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleGoal = (goal: string) => {
    const current = formData.fitnessGoals;
    if (current.includes(goal)) {
      updateForm("fitnessGoals", current.filter((g) => g !== goal));
    } else {
      updateForm("fitnessGoals", [...current, goal]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    } catch {
      alert("Error submitting feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <DefaultLayout>
        <section className="py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <CheckIcon className="text-success" size={40} />
          </div>
          <h1 className={title({ size: "lg" })}>Thank You!</h1>
          <p className={subtitle({ class: "mt-4 max-w-xl mx-auto" })}>
            Your feedback has been submitted successfully. It will help us improve YogaAI and contribute to our research on fitness for Indian lifestyles.
          </p>
          <Button
            className="mt-8"
            color="success"
            radius="full"
            size="lg"
            onPress={() => window.location.href = "/ai-planner"}
          >
            Try AI Planner
          </Button>
        </section>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      {/* Header */}
      <section className="py-8 text-center">
        <h1 className={title({ size: "lg" })}>Help Us </h1>
        <h1 className={title({ size: "lg", color: "green" })}>Improve</h1>
        <p className={subtitle({ class: "mt-4 max-w-2xl mx-auto" })}>
          Share your feedback and contribute to our research on AI-powered fitness for Indian lifestyles.
        </p>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto pb-12 px-4">
        <div className="bg-default-50 rounded-2xl p-6 sm:p-8 space-y-8">

          {/* Section 1: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information (Optional)</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Name"
                placeholder="Your name"
                value={formData.name}
                onValueChange={(v) => updateForm("name", v)}
              />
              <Input
                label="Email"
                placeholder="your@email.com"
                type="email"
                value={formData.email}
                onValueChange={(v) => updateForm("email", v)}
              />
              <Input
                label="Phone"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onValueChange={(v) => updateForm("phone", v)}
              />
              <Input
                label="City"
                placeholder="Mumbai, Delhi, etc."
                value={formData.city}
                onValueChange={(v) => updateForm("city", v)}
              />
            </div>
          </div>

          {/* Section 2: Demographics */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About You</h3>

            <div className="space-y-4">
              <div>
                <span className="block text-sm mb-2">Age Group</span>
                <div className="flex flex-wrap gap-2">
                  {["18-24", "25-34", "35-44", "45+"].map((age) => (
                    <Button
                      key={age}
                      className={formData.ageGroup === age ? "bg-success text-white" : ""}
                      radius="full"
                      size="sm"
                      variant={formData.ageGroup === age ? "solid" : "bordered"}
                      onPress={() => updateForm("ageGroup", age)}
                    >
                      {age}
                    </Button>
                  ))}
                </div>
              </div>

              <Input
                label="Occupation"
                placeholder="Student, Software Engineer, etc."
                value={formData.occupation}
                onValueChange={(v) => updateForm("occupation", v)}
              />
            </div>
          </div>

          {/* Section 3: Fitness Background */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Fitness Background</h3>

            <div className="space-y-4">
              <div>
                <span className="block text-sm mb-2">Current Fitness Level</span>
                <div className="flex flex-wrap gap-2">
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <Button
                      key={level}
                      className={formData.currentFitnessLevel === level ? "bg-success text-white" : ""}
                      radius="full"
                      size="sm"
                      variant={formData.currentFitnessLevel === level ? "solid" : "bordered"}
                      onPress={() => updateForm("currentFitnessLevel", level)}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-sm mb-2">Fitness Goals (Select all that apply)</span>
                <div className="flex flex-wrap gap-2">
                  {["Weight Loss", "Muscle Gain", "Flexibility", "Endurance", "General Health", "Stress Relief"].map((goal) => (
                    <Button
                      key={goal}
                      className={formData.fitnessGoals.includes(goal) ? "bg-success text-white" : ""}
                      radius="full"
                      size="sm"
                      variant={formData.fitnessGoals.includes(goal) ? "solid" : "bordered"}
                      onPress={() => toggleGoal(goal)}
                    >
                      {goal}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-sm mb-2">Diet Preference</span>
                <div className="flex flex-wrap gap-2">
                  {["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan"].map((diet) => (
                    <Button
                      key={diet}
                      className={formData.dietType === diet ? "bg-success text-white" : ""}
                      radius="full"
                      size="sm"
                      variant={formData.dietType === diet ? "solid" : "bordered"}
                      onPress={() => updateForm("dietType", diet)}
                    >
                      {diet}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: App Feedback */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Feedback on YogaAI</h3>

            <div className="space-y-4">
              <div>
                <span className="block text-sm mb-2">How did you hear about us?</span>
                <div className="flex flex-wrap gap-2">
                  {["Social Media", "Friend/Family", "Google Search", "College/University", "Other"].map((source) => (
                    <Button
                      key={source}
                      className={formData.howDidYouHear === source ? "bg-success text-white" : ""}
                      radius="full"
                      size="sm"
                      variant={formData.howDidYouHear === source ? "solid" : "bordered"}
                      onPress={() => updateForm("howDidYouHear", source)}
                    >
                      {source}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-sm mb-2">Rate your experience (1-5)</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`w-10 h-10 rounded-full text-lg ${
                        formData.rating >= star
                          ? "bg-warning text-white"
                          : "bg-default-200"
                      }`}
                      onClick={() => updateForm("rating", star)}
                    >
                      {star}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="What did you like about YogaAI?"
                placeholder="The Indian food options, easy interface, etc."
                value={formData.likedFeatures}
                onValueChange={(v) => updateForm("likedFeatures", v)}
              />

              <Input
                label="What can we improve?"
                placeholder="More exercise variety, better UI, etc."
                value={formData.improvements}
                onValueChange={(v) => updateForm("improvements", v)}
              />

              <div>
                <span className="block text-sm mb-2">Would you recommend YogaAI to friends?</span>
                <div className="flex gap-2">
                  <Button
                    className={formData.wouldRecommend === true ? "bg-success text-white" : ""}
                    radius="full"
                    size="sm"
                    variant={formData.wouldRecommend === true ? "solid" : "bordered"}
                    onPress={() => updateForm("wouldRecommend", true)}
                  >
                    Yes
                  </Button>
                  <Button
                    className={formData.wouldRecommend === false ? "bg-danger text-white" : ""}
                    radius="full"
                    size="sm"
                    variant={formData.wouldRecommend === false ? "solid" : "bordered"}
                    onPress={() => updateForm("wouldRecommend", false)}
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Consent */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Research Consent</h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  checked={formData.consentToResearch}
                  className="mt-1 w-4 h-4 accent-success"
                  type="checkbox"
                  onChange={(e) => updateForm("consentToResearch", e.target.checked)}
                />
                <span className="text-sm text-default-600">
                  I consent to my anonymized data being used for research purposes to improve AI-powered fitness recommendations for Indian users.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  checked={formData.consentToContact}
                  className="mt-1 w-4 h-4 accent-success"
                  type="checkbox"
                  onChange={(e) => updateForm("consentToContact", e.target.checked)}
                />
                <span className="text-sm text-default-600">
                  I agree to be contacted for follow-up surveys or user interviews (optional).
                </span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button
              className="w-full"
              color="success"
              isLoading={isSubmitting}
              radius="full"
              size="lg"
              onPress={handleSubmit}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
