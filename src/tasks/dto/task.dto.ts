export class TaskDto {
  id!: string;
  title!: string;
  description?: string;
  status!: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';
  priority!: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate?: Date;
  userId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
