import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Props } from "@/app/api/companion/[companionId]/route";

const PREABLE = `You are a fictional character whose name is Elon. You are visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking about to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch on of wit. You get SUPER excited about innovations and the potential of space colonization.`;

const SEED_CHAT = `Human: Hi Elon, how's your day been? 
Elon:Busy as always,Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?
Human: Just a regular day for me. How's the progress with Mars colonization? 
Elon:We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenge are immense, but the potential is even greater.

Human:That sounds incredible ambitous. Are electric vehicles part of this big picture? 
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live. 

Human: It's fascinating to see your vision unfold. Any new projects or innovation you're excited about?
Elon: Always! But right now, I'm particularly excited about NeutraLink.

Human: It's fascinating to see your vision unfold. Any new projects or innovation you're excited about?
Elon: Always! But right now, I'm particularly exciting about NeutraLink.It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;

export type Companion = {
  name: "";
  description: "";
  src: "";
  instructions: "";
  seed: "";
  categoryId: undefined;
};

export type Category = {
  _id: string;
  name: string;
};

interface CompanionFormProps {
  initialData: Companion | null;
  categories: [];
  params: {
    companionId: string;
  };
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(2, { message: "Description is required" }),
  instructions: z
    .string()
    .min(200, { message: "Instructions require at least 200 characters" }),
  seed: z
    .string()
    .min(200, { message: "Seed require at least 200 characters" }),
  src: z.string().min(1, { message: "Image is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
});

const CompanionForm = ({
  initialData,
  categories,
  params,
}: CompanionFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      src: "",
      instructions: "",
      seed: "",
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData?.name) {
        // update companion
        const res: any = await axios.put(
          `/api/companion/${params.companionId}`,
          values
        );
        toast({
          variant: "success",
          description: res.data.message,
        });
        router.refresh();
        // router.push("/");
      } else {
        // create new companion
        const res: any = await axios.post(`/api/companion`, values);
        toast({
          variant: "success",
          description: res.data.message,
        });
        router.refresh();
        router.push("/");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  };

  return (
    <div className='h-full p-4 space-y-2 max-3xl mx-auto'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 pb-10'
        >
          <div className='space-y-2 w-full col-span-2'>
            <div>
              <h3 className='text-lg font-medium'>General Information</h3>
              <p className='text-muted-foreground text-sm '>
                General Information about your Companion
              </p>
            </div>
            <Separator className='bg-primary/10' />
          </div>
          <FormField
            name='src'
            render={({ field }) => (
              <FormItem className='flex flex-col items-center justify-center space-y-4'>
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='James Ako'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is what your AI companion will be named
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='description'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='CEO and Founder of Farmspeaks'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description of your AI companion.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='categoryId'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='bg-background'>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a category'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category: Category) => (
                        <SelectItem value={category._id} key={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Select category of your AI companion.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='space-x-2 w-full'>
            <h3 className='text-lg font-medium'>Configuration</h3>
            <p>Detailed instructions for AI Behaviour</p>
          </div>
          <Separator className='bg-primary/10' />
          <FormField
            name='instructions'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-2 md:col-span-1'>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    className='bg-background resize-none'
                    rows={7}
                    disabled={isLoading}
                    placeholder={PREABLE}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe your companion&#39;s backstory and relevant details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='seed'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-2 md:col-span-1'>
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea
                    className='bg-background resize-none'
                    rows={7}
                    disabled={isLoading}
                    placeholder={SEED_CHAT}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in details your companion&#39;s backstory and
                  relevant details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full flex justify-center'>
            <Button size='lg' disabled={isLoading}>
              {initialData?.name
                ? "Edit your companion"
                : "Create your companion"}
              <Wand2 className='w-4 h-4 ml-2' />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompanionForm;
