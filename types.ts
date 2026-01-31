
import React from 'react';

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface RadioOption {
  id: string;
  label: string;
  value: string;
}

export interface MenuItem {
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'danger';
  type?: 'item' | 'separator';
  disabled?: boolean;
}

export interface GeneratedContent {
  title: string;
  description: string;
  status: StatusType;
  tags: string[];
}

export interface TreeItem {
  id: string;
  label: string;
  children?: TreeItem[];
  icon?: React.ReactNode;
}

export interface ListItem {
  id: string;
  title: string;
  description?: string;
  metadata?: string;
  icon?: React.ReactNode;
}

export interface DataTableColumn {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
}

export interface DataGridColumn {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, item: any) => React.ReactNode;
}

export interface GraphDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface CalendarEvent {
  date: string;
  title: string;
  type: StatusType;
}

export interface ScheduleTask {
  id: string;
  title: string;
  startHour: number; // 0-23
  duration: number; // in hours
  type: StatusType;
  category: string;
}

export interface JobState {
  id: string;
  name: string;
  status: 'running' | 'queued' | 'completed' | 'failed';
  progress: number;
  runtime: string;
  logs: string[];
}

export interface WorkflowStep {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  description: string;
  duration?: string;
}

export interface BoardTask {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  tags?: string[];
  assignee?: {
    name: string;
    avatar?: string;
  };
}

export interface BoardColumn {
  id: string;
  title: string;
  tasks: BoardTask[];
}

export interface RibbonButtonItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  size?: 'large' | 'small';
  disabled?: boolean;
}

export interface RibbonGroupItem {
  label: string;
  items: RibbonButtonItem[];
}

export interface RibbonTabItem {
  id: string;
  label: string;
  groups: RibbonGroupItem[];
}

export interface StepperItem {
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface PivotField {
  key: string;
  label: string;
}

export interface PivotMeasure extends PivotField {
  aggregator: 'sum' | 'count';
}

export interface TreeListDataItem {
  id: string;
  children?: TreeListDataItem[];
  [key: string]: any;
}

export interface TreeListColumn {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, item: TreeListDataItem) => React.ReactNode;
}

export interface GanttTask {
  id: string;
  label: string;
  startDay: number;
  duration: number;
  progress: number;
  type: StatusType;
  assignee?: string;
}
