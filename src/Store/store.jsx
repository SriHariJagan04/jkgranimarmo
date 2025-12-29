import AuthProvider from "./Context/AuthContext";
import TestimonialsProvider from "./Context/TestimonialsContext";

const ContextStore = ({children}) => {
    return (
        <AuthProvider>
            <TestimonialsProvider>
                {children}
            </TestimonialsProvider>
        </AuthProvider>
    )
}

export default ContextStore;