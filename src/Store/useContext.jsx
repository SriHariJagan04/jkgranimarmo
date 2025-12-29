import { createContext, useContext } from "react";

export const TestimonialsContext = createContext();

export const useTestimonials = () => {
    return useContext(TestimonialsContext)
}



export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}