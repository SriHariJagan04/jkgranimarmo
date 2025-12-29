import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./faqs.module.css";

const faqsData = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. Products must be unused and in their original packaging."
  },
  {
    question: "Do you provide international shipping?",
    answer:
      "Yes, we ship worldwide. Delivery times and charges vary depending on location."
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you’ll receive a tracking number via email."
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Orders can be modified or canceled within 12 hours of purchase."
  }
];

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
      <div className={styles.faqContainer}>
        {faqsData.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <button
              className={styles.faqQuestion}
              onClick={() => toggleFaq(index)}
            >
              <span>{faq.question}</span>
              {activeIndex === index ? (
                <ChevronUp className={styles.icon} />
              ) : (
                <ChevronDown className={styles.icon} />
              )}
            </button>
            <div
              className={`${styles.faqAnswer} ${
                activeIndex === index ? styles.show : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faqs;
