import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface ModCardProps {
  title: string;
  author: string;
  category: string;
  downloads: number;
  rating: number;
  image: string;
  description: string;
  fileSize: string;
  isNew?: boolean;
  isPremium?: boolean;
}

export default function ModCard({
  title,
  author,
  category,
  downloads,
  rating,
  image,
  description,
  fileSize,
  isNew = false,
  isPremium = false,
}: ModCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-orange/30 bg-card/80 backdrop-blur">
      <CardHeader className="p-0 relative overflow-hidden">
        <div className="relative aspect-video">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {isNew && (
              <Badge className="bg-orange text-white font-orbitron text-xs">
                NEW
              </Badge>
            )}
            {isPremium && (
              <Badge className="bg-blue text-white font-orbitron text-xs">
                PREMIUM
              </Badge>
            )}
          </div>
          
          {/* Category */}
          <Badge 
            variant="secondary" 
            className="absolute top-3 right-3 bg-background/80 backdrop-blur text-foreground"
          >
            {category}
          </Badge>
          
          {/* Rating */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-background/80 backdrop-blur rounded px-2 py-1">
            <Icon name="Star" size={14} className="fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-orbitron font-bold text-lg leading-tight group-hover:text-orange transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">by {author}</p>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Download" size={14} />
            <span>{downloads.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="HardDrive" size={14} />
            <span>{fileSize}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 space-y-2">
        <Button className="w-full bg-orange hover:bg-orange-600 text-white font-orbitron font-medium">
          <Icon name="Download" size={16} className="mr-2" />
          СКАЧАТЬ
        </Button>
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1">
            <Icon name="Eye" size={14} className="mr-1" />
            Обзор
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Icon name="Heart" size={14} className="mr-1" />
            В избранное
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}