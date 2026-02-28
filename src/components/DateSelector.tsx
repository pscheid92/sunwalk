import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface DateSelectorProps {
    date: Date;
    onDateChange: (date: Date) => void;
    onPreviousDay: () => void;
    onNextDay: () => void;
}

function toDateString(date: Date): string {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function fromDateString(value: string): Date {
    let [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
}

export default function DateSelector({ date, onDateChange, onPreviousDay, onNextDay }: DateSelectorProps) {
    return (
        <div className="rounded-lg shadow-lg border-2 border-gray-200 bg-white p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Datum</h3>
            </div>

            <div className="flex gap-2 sm:gap-3 items-center">
                <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg shadow hover:shadow-md hover:bg-gray-100 transition-shadow flex-shrink-0"
                    onClick={onPreviousDay}
                >
                    <ChevronLeft className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Gestern</span>
                </button>

                <div className="flex-1 min-w-0">
                    <input
                        type="date"
                        value={toDateString(date)}
                        onChange={(e) => onDateChange(fromDateString(e.target.value))}
                        className="block w-full p-2.5 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>

                <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg shadow hover:shadow-md hover:bg-gray-100 transition-shadow flex-shrink-0"
                    onClick={onNextDay}
                >
                    <span className="hidden sm:inline">Morgen</span>
                    <ChevronRight className="w-4 h-4 sm:ml-2" />
                </button>
            </div>
        </div>
    );
}
