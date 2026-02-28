import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface TimesCardProps {
    title: string;
    icon: LucideIcon;
    iconGradient: string;
    borderColor: string;
    children: ReactNode;
}

export default function TimesCard({ title, icon: Icon, iconGradient, borderColor, children }: TimesCardProps) {
    return (
        <div className={`rounded-lg shadow-lg border-2 ${borderColor} bg-white p-4 sm:p-6`}>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className={`p-2 ${iconGradient} rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            </div>

            <div className="space-y-2 sm:space-y-3">{children}</div>
        </div>
    );
}
