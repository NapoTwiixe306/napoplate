import { CheckCircle, Clock, LayoutDashboard, LucideProps } from 'lucide-react';

interface DataCardType {
  icon: React.ComponentType<LucideProps>; 
  title: string;
  description: String;
}

export const DataCard: DataCardType[] = [
  {
    icon: CheckCircle,
    title: "Gestion de tâches",
    description: "Créez, organisez et suivez vos tâches avec des priorités personnalisables et des statuts de progression."
  },
  {
    icon: Clock,
    title: "Rappel intelligents",
    description: "Créez, organisez et suivez vos tâches avec des priorités personnalisables et des statuts de progression."

  },
  {
    icon: LayoutDashboard,
    title: "Vue d'ensemble",
    description: "Créez, organisez et suivez vos tâches avec des priorités personnalisables et des statuts de progression."

  }
];
