import type { LucideIcon } from "lucide-react";

interface TimeEntryProps {
    icon: LucideIcon;
    iconColor: string;
    label: string;
    time: string;
    highlighted?: boolean;
    backgroundColor?: string;
}

export default function TimeEntry({
    icon: Icon,
    iconColor,
    label,
    time,
    highlighted = false,
    backgroundColor = "bg-white"
}: TimeEntryProps) {
    return (
        <div
            className={`flex items-center justify-between p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${backgroundColor} ${highlighted ? "border-2 border-orange-200" : ""}`}
        >
            <div className="flex items-center gap-2 sm:gap-3">
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor} flex-shrink-0`} />
                <span className={`text-sm sm:text-base text-gray-900 ${highlighted ? "font-semibold" : "font-medium"}`}>
                    {label}
                </span>
            </div>
            <span
                className={`text-base sm:text-lg font-bold flex-shrink-0 ml-2 ${highlighted ? "text-orange-600" : "text-primary-600"}`}
            >
                {time}
            </span>
        </div>
    );
}
