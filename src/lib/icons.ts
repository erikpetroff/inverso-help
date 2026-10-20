import {
  ArrowLeftRight,
  Banknote,
  Briefcase,
  Calculator,
  Coins,
  CreditCard,
  FileText,
  Folder,
  Globe,
  LifeBuoy,
  MessageCircle,
  Receipt,
  Settings,
  Users,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import { createElement } from "react";

export const COLLECTION_ICONS = {
  folder: { title: "Папка", icon: Folder },
  receipt: { title: "Фактура", icon: Receipt },
  "file-text": { title: "Документ", icon: FileText },
  users: { title: "Хора", icon: Users },
  calculator: { title: "Калкулатор", icon: Calculator },
  banknote: { title: "Банкнота", icon: Banknote },
  "arrow-left-right": { title: "Транзакции", icon: ArrowLeftRight },
  "credit-card": { title: "Карта", icon: CreditCard },
  briefcase: { title: "Куфарче", icon: Briefcase },
  globe: { title: "Глобус", icon: Globe },
  coins: { title: "Монети", icon: Coins },
  "message-circle": { title: "Чат", icon: MessageCircle },
  settings: { title: "Настройки", icon: Settings },
  "life-buoy": { title: "Помощ", icon: LifeBuoy },
} satisfies Record<string, { title: string; icon: LucideIcon }>;

export type CollectionIconName = keyof typeof COLLECTION_ICONS;

export function getCollectionIcon(name: string | undefined): LucideIcon {
  return COLLECTION_ICONS[name as CollectionIconName]?.icon ?? Folder;
}

export function CollectionIcon({ name, ...props }: { name?: string } & LucideProps) {
  return createElement(getCollectionIcon(name), props);
}
