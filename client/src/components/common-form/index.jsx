import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {Input} from "../ui/input"; // Assuming Input is a custom component
import CommonButton from "../common-button";

function CommonForm({ formControls = [], handleSubmit, form, butnText }) {

  return (
    <div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {formControls.length > 0 &&
            formControls.map((controlItem) => (
              <FormField
                key={controlItem.id}
                // control={form.control}
                name={controlItem.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{controlItem.label}</FormLabel>
                    {controlItem.componentType === "input" ? (
                      <FormControl>
                        <Input
                          placeholder={controlItem.placeholder}
                          type={controlItem.type}
                          {...field}
                          value={field.value}
                          className="w-full rounded h-[50px] border-none text-black bg-gray-200 text-[16px] outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:bg-gray-100 focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                    ) : controlItem.componentType === "select" ? (
                      <Select {...field} value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full rounded h-[50px] border-none text-black bg-gray-200 text-[16px] outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:bg-gray-100 focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                           {
                            field.value ? <SelectValue className="text-black focus:text-black" placeholder = {controlItem.placeholder}/>:"Select" 
                           }
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          {controlItem.options.map((optionItem) => (
                            <SelectItem
                              key={optionItem.value}
                              value={optionItem.value}
                              className="text-black cursor-pointer focus:text-black"
                            >
                              {optionItem.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : null}
                  </FormItem>
                )}
              />
            ))}

            <div className="mt-5  flex items-center justify-center">
            <CommonButton  type="submit" buttonText={butnText} />
            </div>
          
        
        </form>
      </Form>
    </div>
  );
}

export default CommonForm;
