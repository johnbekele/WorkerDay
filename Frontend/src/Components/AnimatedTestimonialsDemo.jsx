import { AnimatedTestimonials } from "../Components/ui/animated-testimonials";

// This component demonstrates the usage of the AnimatedTestimonials component
export function AnimatedTestimonialsDemo() {
  // Sample testimonials data to be displayed in the AnimatedTestimonials component
 const testimonials = [
    {
      quote:
        "Efficiently manage employee records, access historical data, and track performance metrics. Our comprehensive database makes employee information management seamless and organized.",
      name: "Employee Database", 
      designation: "Centralized Information System", 
      src: "https://th.bing.com/th/id/OIP.vcARkVixrthIZvtr9J64gAHaHg?w=1000&h=1013&rs=1&pid=ImgDetMain",
    },
    {
      quote:
        "Manage and track customer cases effectively. Assign cases to appropriate teams, monitor resolution progress, and ensure timely responses to client needs. Keep detailed case histories for future reference.",
      name: "Case Management",
      designation: "Streamlined Case Tracking System",
      src: "https://img.freepik.com/free-vector/customer-support-illustration_23-2148889374.jpg",
    },
    {
      quote:
        "Streamline request workflows with multi-level authorization processes. Track request status, manage approvals, and maintain complete audit trails for all authorizations.",
      name: "Request & Authorization",
      designation: "Advanced Approval Management System",
      src: "https://img.freepik.com/free-vector/business-approval-concept-illustration_114360-5675.jpg",
    },
    {
      quote:
        "Set and track performance goals, conduct evaluations, and provide feedback through our intuitive performance management system. Drive employee growth and development.",
      name: "Performance Tracker",
      designation: "Employee Evaluation and Growth Platform",
      src: "https://img.freepik.com/free-vector/work-progress-concept-illustration_114360-5241.jpg",
    },
  ];

  // Render the AnimatedTestimonials component and pass the testimonials data as a prop
  return <AnimatedTestimonials testimonials={testimonials} />;
}
