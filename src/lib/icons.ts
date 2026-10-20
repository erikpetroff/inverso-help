import {
  ArrowsLeftRight,
  Bank,
  Briefcase,
  Buildings,
  Calculator,
  ChartBar,
  ChatsCircle,
  Coins,
  CreditCard,
  CrownSimple,
  FileText,
  Folder,
  FolderSimple,
  GearSix,
  Globe,
  Lifebuoy,
  Package,
  Plug,
  Question,
  Receipt,
  ShieldCheck,
  Users,
  UsersThree,
  Wallet,
} from "@phosphor-icons/react/ssr";
import type { Icon, IconProps } from "@phosphor-icons/react";
import { createElement } from "react";

export const COLLECTION_ICONS = {
  receipt: { title: "Фактура", icon: Receipt },
  users: { title: "Клиенти", icon: Users },
  package: { title: "Пакет / услуги", icon: Package },
  "credit-card": { title: "Карта / плащания", icon: CreditCard },
  "arrows-left-right": { title: "Транзакции", icon: ArrowsLeftRight },
  "crown-simple": { title: "Абонамент", icon: CrownSimple },
  "folder-simple": { title: "Проекти", icon: FolderSimple },
  "users-three": { title: "Екип", icon: UsersThree },
  buildings: { title: "Организации", icon: Buildings },
  bank: { title: "Банка / финансиране", icon: Bank },
  "chats-circle": { title: "Чат", icon: ChatsCircle },
  "gear-six": { title: "Настройки", icon: GearSix },
  folder: { title: "Папка", icon: Folder },
  "file-text": { title: "Документ", icon: FileText },
  wallet: { title: "Портфейл", icon: Wallet },
  coins: { title: "Монети", icon: Coins },
  calculator: { title: "Калкулатор", icon: Calculator },
  "chart-bar": { title: "Отчети", icon: ChartBar },
  briefcase: { title: "Куфарче", icon: Briefcase },
  globe: { title: "Глобус", icon: Globe },
  plug: { title: "Интеграции", icon: Plug },
  "shield-check": { title: "Сигурност", icon: ShieldCheck },
  lifebuoy: { title: "Помощ", icon: Lifebuoy },
  question: { title: "Въпрос", icon: Question },
} satisfies Record<string, { title: string; icon: Icon }>;

export type CollectionIconName = keyof typeof COLLECTION_ICONS;

export function getCollectionIcon(name: string | undefined): Icon {
  return COLLECTION_ICONS[name as CollectionIconName]?.icon ?? Folder;
}

export function CollectionIcon({ name, ...props }: { name?: string } & IconProps) {
  return createElement(getCollectionIcon(name), props);
}
