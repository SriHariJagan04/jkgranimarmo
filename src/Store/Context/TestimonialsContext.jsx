import { useState, useEffect } from "react";
import { TestimonialsContext } from "../useContext";
import { URLS } from "../../urls";

const TestimonialsProvider = ({ children }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const res = await fetch(URLS.testimonials, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }

        const data = await res.json();
        setTestimonials(data || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching testimonials:", err);
          setError(err.message || "Failed to load testimonials");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();

    return () => controller.abort();
  }, []);

  const addTestimonial = async (newData) => {
    try {
      const res = await fetch(URLS.testimonials, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (!res.ok) {
        throw new Error(`Failed to add testimonial: ${res.statusText}`);
      }

      const saved = await res.json();
      setTestimonials((prev) => [saved, ...prev]);
      return { success: true, data: saved };
    } catch (err) {
      console.error("Error adding testimonial:", err);
      return { success: false, error: err.message };
    }
  };

  const updateTestimonial = async (updatedData) => {
    try {
      // Extract id and the rest of the fields separately
      const { id, ...dataWithoutId } = updatedData;

      const token = localStorage.getItem("token"); // or wherever you store your JWT

      const res = await fetch(`${URLS.testimonials}/${id}`, {
        // Note trailing slash added here
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(dataWithoutId), // Send all fields except id
      });

      if (!res.ok) {
        throw new Error(`Failed to update testimonial: ${res.statusText}`);
      }

      const updated = await res.json();

      setTestimonials((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );

      return { success: true, data: updated };
    } catch (err) {
      console.error("Error updating testimonial:", err);
      return { success: false, error: err.message };
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      const token = localStorage.getItem("token"); // get the saved token

      const res = await fetch(`${URLS.testimonials}/${id}`, {
        // note trailing slash if needed by your API
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // pass token here
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete testimonial: ${res.statusText}`);
      }

      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      return { success: true };
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      return { success: false, error: err.message };
    }
  };

  return (
    <TestimonialsContext.Provider
      value={{
        testimonials,
        loading,
        error,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
      }}
    >
      {children}
    </TestimonialsContext.Provider>
  );
};

export default TestimonialsProvider;
