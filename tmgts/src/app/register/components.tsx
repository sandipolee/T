import { FormControl, FormField } from "@/components/ui/form";
import { SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";


export function InuptCourse(){
    return(
        <>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="class" />
                      </SelectTrigger>
                    </FormControl>
                     <SelectContent></SelectContent>


        </>
    )
                    
           
}

