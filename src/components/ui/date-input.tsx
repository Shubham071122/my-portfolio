import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

export interface DateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
    value?: string | Date;
    defaultValue?: string | Date;
    onChange?: (isoString: string) => void;
    error?: string;
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
    ({ className, value, defaultValue, onChange, error, ...props }, ref) => {

        // Internal helper to convert ISO or Date to YYYY-MM-DD for the input[type="date"]
        const formatDate = (date: string | Date | undefined): string => {
            if (!date) return "";
            try {
                const d = new Date(date);
                if (isNaN(d.getTime())) return "";
                return d.toISOString().split("T")[0];
            } catch (e) {
                return "";
            }
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            if (onChange) {
                if (!val) {
                    onChange("");
                } else {
                    try {
                        const iso = new Date(val).toISOString();
                        onChange(iso);
                    } catch (err) {
                        onChange(val);
                    }
                }
            }
        };

        return (
            <div className="w-full space-y-1">
                <Input
                    type="date"
                    className={className}
                    ref={ref}
                    value={value ? formatDate(value) : undefined}
                    defaultValue={defaultValue ? formatDate(defaultValue) : undefined}
                    onChange={handleChange}
                    {...props}
                />
                {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
        );
    }
);
DateInput.displayName = "DateInput";

export { DateInput };
