
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Guardian name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter."
  }).regex(/[0-9]/, {
    message: "Password must contain at least one number."
  }),
  motivation: z.string().optional(),
});

const GuardianForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [guardianName, setGuardianName] = useState("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      motivation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      // Sign up the user with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            motivation: values.motivation
          }
        }
      });

      if (authError) throw authError;

      // Store guardian name for success message
      setGuardianName(values.name);
      setShowSuccessDialog(true);
      
      // Reset form
      form.reset();
      
    } catch (error) {
      console.error('Error during registration:', error);
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    navigate('/guardian');
  };

  return (
    <div className="min-h-screen bg-guardian-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Shield className="mx-auto h-12 w-12 text-guardian-cyan" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight gradient-text">
            Join the Guardian Network
          </h2>
          <p className="mt-2 text-sm text-guardian-light/70">
            Help protect the digital world and earn rewards for your contributions
          </p>
        </div>

        <div className="glassmorphism border border-guardian-cyan/20 rounded-lg p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guardian Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your guardian name" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs text-guardian-light/60">
                      This will be your public identity in the Guardian Network
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" type="email" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs text-guardian-light/60">
                      We'll never share your email with others
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Create a secure password" type="password" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs text-guardian-light/60">
                      At least 8 characters with one uppercase letter and one number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="motivation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why do you want to protect the web? (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your motivation" 
                        className="min-h-[100px] resize-none bg-guardian-dark/50 border-guardian-cyan/30 text-guardian-light"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full cyber-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Become a Guardian</>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-guardian-dark border border-guardian-cyan/30">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text">Welcome to the Guardian Network!</DialogTitle>
            <DialogDescription className="text-guardian-light text-base pt-2">
              <div className="flex flex-col space-y-4">
                <p>Thank you for joining us, <span className="text-guardian-cyan font-medium">{guardianName}</span>! Together we'll make the digital world safer.</p>
                <p>Your account has been created. You can now access the Guardian dashboard and start protecting the web.</p>
                <div className="border-t border-guardian-cyan/20 pt-4">
                  <Button 
                    onClick={handleSuccessDialogClose} 
                    className="w-full cyber-button"
                  >
                    Go to Guardian Dashboard
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuardianForm;
