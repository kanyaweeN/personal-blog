import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function AppSelect(
    {
        selectContent,
        placeholder,
        ...props
    }
) {
    return (
        <Select
            {...props}
        >
            <SelectTrigger className="w-full py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {selectContent}
            </SelectContent>
        </Select>
    );
}

export default AppSelect;