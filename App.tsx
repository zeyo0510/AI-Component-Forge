import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import Breadcrumbs from './components/Breadcrumbs';
import Card from './components/Card';
import RadioButton from './components/RadioButton';
import CheckButton from './components/CheckButton';
import ToggleButton from './components/ToggleButton';
import Menu from './components/Menu';
import Status from './components/Status';
import TreeView from './components/TreeView';
import ListView from './components/ListView';
import DataTable from './components/DataTable';
import Graph from './components/Graph';
import DropDown from './components/DropDown';
import ComboBox from './components/ComboBox';
import StatusBar from './components/StatusBar';
import SideBar from './components/SideBar';
import Window from './components/Window';
import Text from './components/Text';
import Tab from './components/Tab';
import Editor from './components/Editor';
import Paint from './components/Paint';
import Node from './components/Node';
import Calendar from './components/Calendar';
import Color from './components/Color';
import Icon from './components/Icon';
import Table from './components/Table';
import TextBox from './components/TextBox';
import Slider from './components/Slider';
import ProgressBar from './components/ProgressBar';
import Dialog from './components/Dialog';
import Segment from './components/Segment';
import Tooltip from './components/Tooltip';
import ScrollArea from './components/ScrollBar';
import Diagram from './components/Diagram';
import Chart from './components/Chart';
import MindMap from './components/MindMap';
import Report from './components/Report';
import VideoPlayer from './components/VideoPlayer';
import AudioPlayer from './components/AudioPlayer';
import Timeline from './components/Timeline';
import Grid from './components/Grid';
import Schedule from './components/Schedule';
import Job from './components/Job';
import Range from './components/Range';
import Workflow from './components/Workflow';
import Countdown from './components/Countdown';
import MenuBar from './components/MenuBar';
import ToolBar, { ToolBarSeparator, ToolBarGroup } from './components/ToolBar';
import TrackBar from './components/TrackBar';
import Board from './components/Board';
import Rating from './components/Rating';
import Timer from './components/Timer';
import Rectangle from './components/Rectangle';
import Circle from './components/Circle';
import Triangle from './components/Triangle';
import Spreadsheet from './components/Spreadsheet';
import Slideshow from './components/Slideshow';
import Slide from './components/Slide';
import Document from './components/Document';
import FormControl from './components/FormControl';
import Ribbon from './components/Ribbon';
import RibbonMenu from './components/RibbonMenu';
import SlideDeck, { SlideData } from './components/SlideDeck';
import Image from './components/Image';
import Splitter from './components/Splitter';
import Stepper from './components/Stepper';
import PivotGrid from './components/PivotGrid';
import TreeList from './components/TreeList';
import Gantt from './components/Gantt';
import Gauge from './components/Gauge';
import NumericTextBox from './components/NumericTextBox';
import SplitButton from './components/SplitButton';
import Paginator from './components/Paginator';
import ColorPicker from './components/ColorPicker';
import AngleSlider from './components/AngleSlider';
import Skeleton from './components/Skeleton';
import Blockquote from './components/Blockquote';
import DataGrid from './components/DataGrid';
import Marquee from './components/Marquee';
import CompareSlider from './components/CompareSlider';
import DatePicker from './components/DatePicker';
import Tour from './components/Tour';
import TimePicker from './components/TimePicker';
import PivotTable from './components/PivotTable';
import Dashboard from './components/Dashboard';
import Gallery, { GalleryItem } from './components/Gallery';
import Map from './components/Map';
import Accordion from './components/Accordion';
import Carousel, { CarouselItem } from './components/Carousel';
import Drawer from './components/Drawer';
import LevelMeter from './components/LevelMeter';
import PinTextBox from './components/PinTextBox';
import MaskedTextBox from './components/MaskedTextBox';
import TreeMap from './components/TreeMap';
import NavigationBar from './components/NavigationBar';
import Avatar, { AvatarGroup } from './components/Avatar';
import Link from './components/Link';
import Spinner from './components/Spinner';
import Divider from './components/Divider';

import { 
  RadioOption, 
  MenuItem, 
  GeneratedContent, 
  TreeItem, 
  ListItem, 
  DataTableColumn, 
  DataGridColumn,
  GraphDataPoint, 
  SelectOption,
  TabItem,
  ScheduleTask,
  JobState,
  WorkflowStep,
  BoardColumn,
  RibbonTabItem,
  StepperItem,
  TreeListDataItem,
  TreeListColumn,
  StatusType,
  GanttTask,
  TourStep,
  MapLocation,
  TreeMapNode,
  NavItem
} from './types';
import { generateDemoContent } from './services/geminiService';

const treeData: TreeItem[] = [
  {
    id: '1',
    label: 'Root Folder',
    children: [
      { id: '1-1', label: 'Documents', children: [{ id: '1-1-1', label: 'Resume.pdf' }] },
      { id: '1-2', label: 'Images', children: [{ id: '1-2-1', label: 'Avatar.png' }] },
    ]
  },
  { id: '2', label: 'Settings.json' }
];

const listData: ListItem[] = [
  { id: '1', title: 'New Message', description: 'You received a new message from Jane.', metadata: '2m ago', icon: <span>✉️</span> },
  { id: '2', title: 'Update Available', description: 'Version 2.0 is now ready to install.', metadata: '1h ago', icon: <span>⚙️</span> },
  { id: '3', title: 'Storage Warning', description: 'Your disk space is running low.', metadata: 'Yesterday', icon: <span>⚠️</span> },
];

const tableColumns: DataTableColumn[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'User Name' },
  { key: 'email', header: 'Email Address' },
  { key: 'role', header: 'Role', align: 'center' },
];

const tableData = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
];

const radioOptions: RadioOption[] = [
  { id: 'r1', label: 'Standard Tier', value: 'option-1' },
  { id: 'r2', label: 'Premium Tier', value: 'option-2' },
  { id: 'r3', label: 'Enterprise Tier', value: 'option-3' },
];

const menuItems: MenuItem[] = [
  { label: 'View Profile', onClick: () => alert('View Profile'), icon: <span>👤</span> },
  { label: 'Account Settings', onClick: () => alert('Settings'), icon: <span>⚙️</span> },
  { type: 'separator' },
  { label: 'Download Data', onClick: () => alert('Downloading...'), icon: <span>💾</span>, disabled: true },
  { label: 'System Logs', onClick: () => alert('Opening Logs'), icon: <span>📋</span> },
  { type: 'separator' },
  { label: 'Log Out', onClick: () => alert('Log Out'), variant: 'danger', icon: <span>🚪</span> },
];

const sidebarItems = [
  { id: 'general', label: 'General', icon: <span>⚙️</span> },
  { id: 'security', label: 'Security', icon: <span>🔒</span> },
  { id: 'billing', label: 'Billing', icon: <span>💳</span> },
];

const scheduleTasks: ScheduleTask[] = [
  { id: 's1', title: 'Gemini 3 Integration Sync', startHour: 9, duration: 1.5, type: 'info', category: 'TEAM SYNC' },
  { id: 's2', title: 'Security Audit Review', startHour: 11, duration: 1, type: 'warning', category: 'COMPLIANCE' },
  { id: 's3', title: 'UI Component Stress Test', startHour: 13, duration: 2, type: 'success', category: 'QA' },
  { id: 's4', title: 'Product Launch Webinar', startHour: 16, duration: 1.5, type: 'error', category: 'MARKETING' },
];

const activeJobs: JobState[] = [
  { 
    id: 'JOB-9021', 
    name: 'Vector Embeddings Sync', 
    status: 'running', 
    progress: 64, 
    runtime: '12m 45s', 
    logs: ['[INFO] Connecting to pinecone cluster...', '[INFO] Fetching metadata...', '[INFO] Upserting 4500 vectors...'] 
  },
  { 
    id: 'JOB-8812', 
    name: 'Nightly Backup Task', 
    status: 'completed', 
    progress: 100, 
    runtime: '4m 12s', 
    logs: ['[INFO] Init backup...', '[SUCCESS] Backup verified.'] 
  },
  { 
    id: 'JOB-7734', 
    name: 'Legacy Cleanup', 
    status: 'failed', 
    progress: 22, 
    runtime: '1m 02s', 
    logs: ['[ERROR] Socket timeout exception', '[ERROR] Job aborted.'] 
  },
];

const demoWorkflow: WorkflowStep[] = [
  { id: 'w1', label: 'Initialize Build', status: 'completed', description: 'Setting up environment and installing dependencies from registry.', duration: '12s' },
  { id: 'w2', label: 'Run Unit Tests', status: 'completed', description: 'Executing 452 test cases across 12 modules. All tests passed.', duration: '1m 24s' },
  { id: 'w3', label: 'Security Scan', status: 'completed', description: 'Running static analysis (SAST) and credential leak detection.', duration: '45s' },
  { id: 'w4', label: 'Deploy to Staging', status: 'running', description: 'Provisioning AWS resources and updating ECS clusters.', duration: 'Running...' },
  { id: 'w5', label: 'Database Migration', status: 'pending', description: 'Applying v2.5 schema updates to PostgreSQL production mirror.' },
  { id: 'w6', label: 'Smoke Tests', status: 'pending', description: 'Verification of core application endpoints post-deployment.' },
];

const demoMenuBar: { label: string; items: MenuItem[] }[] = [
  {
    label: 'File',
    items: [
      { label: 'New Project', icon: <span>➕</span>, onClick: () => {} },
      { label: 'Open...', icon: <span>📂</span>, onClick: () => {} },
      { type: 'separator' },
      { label: 'Save All', icon: <span>💾</span>, onClick: () => {} },
      { label: 'Export to PDF', icon: <span>📑</span>, onClick: () => {} },
    ]
  },
  {
    label: 'Edit',
    items: [
      { label: 'Undo', icon: <span>↩️</span>, onClick: () => {} },
      { label: 'Redo', icon: <span>↪️</span>, onClick: () => {} },
      { type: 'separator' },
      { label: 'Cut', onClick: () => {} },
      { label: 'Copy', onClick: () => {} },
      { label: 'Paste', onClick: () => {} },
    ]
  },
  {
    label: 'Terminal',
    items: [
      { label: 'New Terminal', icon: <span>💻</span>, onClick: () => {} },
      { label: 'Run Build Task', icon: <span>🔨</span>, onClick: () => {} },
      { label: 'Clear Logs', icon: <span>🗑️</span>, onClick: () => {} },
    ]
  },
  {
    label: 'Help',
    items: [
      { label: 'Documentation', onClick: () => {} },
      { label: 'Check for Updates', onClick: () => {} },
      { label: 'About Forge', onClick: () => {} },
    ]
  }
];

const demoBoard: BoardColumn[] = [
  {
    id: 'col-1',
    title: 'To Do',
    tasks: [
      { id: 't-1', title: 'Implement Auth Middleware', description: 'Setup JWT verification for all secure routes.', priority: 'high', tags: ['security', 'backend'], assignee: { name: 'Alice' } },
      { id: 't-2', title: 'Style Component Documentation', description: 'Write CSS guides for the new design system.', priority: 'medium', tags: ['documentation'], assignee: { name: 'Bob' } },
    ]
  },
  {
    id: 'col-2',
    title: 'In Progress',
    tasks: [
      { id: 't-3', title: 'Gemini 3.0 Integration', description: 'Refactor current AI calls to use the new native audio and image models.', priority: 'high', tags: ['ai', 'feature'], assignee: { name: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=charlie' } },
      { id: 't-4', title: 'Performance Audit', description: 'Identify bottleneck in the data visualization rendering engine.', priority: 'medium', tags: ['qa'], assignee: { name: 'Dave' } },
    ]
  },
  {
    id: 'col-3',
    title: 'Done',
    tasks: [
      { id: 't-5', title: 'Finalize Branding', description: 'Approve final logo and color palette for Component Forge.', priority: 'low', tags: ['design'], assignee: { name: 'Eve', avatar: 'https://i.pravatar.cc/150?u=eve' } },
      { id: 't-6', title: 'Setup CI/CD Pipeline', description: 'Automate deployments to AWS using GitHub Actions.', priority: 'high', tags: ['devops'], assignee: { name: 'Alice' } },
    ]
  }
];

const spreadsheetDemoData = [
  ['Financial Forecast Q4', '', '', '', '', '', '', ''],
  ['', 'Oct', 'Nov', 'Dec', 'Avg', 'Total', 'Goal', 'Status'],
  ['Inference Cost', '1250', '1400', '1650', '1433', '4300', '4000', 'OVER'],
  ['Storage (S3)', '450', '460', '480', '463', '1390', '1500', 'OK'],
  ['Vector Ops', '890', '920', '1100', '970', '2910', '3000', 'OK'],
  ['Auth Layer', '120', '120', '125', '121', '365', '400', 'OK'],
  ['Total Opex', '2710', '2900', '3355', '2988', '8965', '8900', 'LIMIT'],
  ['', '', '', '', '', '', '', ''],
  ['Revenue (SaaS)', '12500', '14200', '18900', '15200', '45600', '40000', 'HIT'],
  ['Net Profit', '9790', '11300', '15545', '12211', '36635', '31100', 'WOW'],
  ...Array(5).fill(Array(8).fill(''))
];

const demoPivotData = [
  { region: 'North America', category: 'Cloud', year: '2024', revenue: 125000 },
  { region: 'North America', category: 'Hardware', year: '2024', revenue: 84000 },
  { region: 'North America', category: 'Cloud', year: '2025', revenue: 158000 },
  { region: 'Europe', category: 'Cloud', year: '2024', revenue: 95000 },
  { region: 'Europe', category: 'Hardware', year: '2024', revenue: 112000 },
  { region: 'Europe', category: 'Cloud', year: '2025', revenue: 110000 },
  { region: 'Asia Pacific', category: 'Cloud', year: '2024', revenue: 180000 },
  { region: 'Asia Pacific', category: 'Hardware', year: '2025', revenue: 45000 },
  { region: 'Asia Pacific', category: 'SaaS', year: '2025', revenue: 72000 },
  { region: 'North America', category: 'SaaS', year: '2024', revenue: 44000 },
  { region: 'Europe', category: 'SaaS', year: '2025', revenue: 58000 },
];

const demoPivotTableData = [
  { category: 'Electronics', subcategory: 'Mobile', region: 'North America', sales: 45000 },
  { category: 'Electronics', subcategory: 'Mobile', region: 'Europe', sales: 38000 },
  { category: 'Electronics', subcategory: 'Laptops', region: 'North America', sales: 82000 },
  { category: 'Electronics', subcategory: 'Laptops', region: 'Europe', sales: 71000 },
  { category: 'Clothing', subcategory: 'Shoes', region: 'North America', sales: 12000 },
  { category: 'Clothing', subcategory: 'Shoes', region: 'Europe', sales: 15000 },
  { category: 'Clothing', subcategory: 'Apparel', region: 'North America', sales: 22000 },
  { category: 'Clothing', subcategory: 'Apparel', region: 'Europe', sales: 19000 },
  { category: 'Electronics', subcategory: 'Mobile', region: 'Asia', sales: 95000 },
  { category: 'Clothing', subcategory: 'Shoes', region: 'Asia', sales: 25000 },
  { category: 'Electronics', subcategory: 'Audio', region: 'Asia', sales: 18000 },
  { category: 'Electronics', subcategory: 'Audio', region: 'Europe', sales: 24000 },
];

const demoGalleryItems: GalleryItem[] = [
  { id: 'g1', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800', alt: 'Ether Cycles', category: 'Abstract', title: 'Ether Cycles', description: 'A fluid exploration of digital motion and light gradients.' },
  { id: 'g2', src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800', alt: 'Deep Canopy', category: 'Nature', title: 'Deep Canopy', description: 'Capturing the interplay of sunlight through ancient woodland.' },
  { id: 'g3', src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', alt: 'Glass Monolith', category: 'Architecture', title: 'Glass Monolith', description: 'Minimalist perspective of modern commercial infrastructure.' },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800', alt: 'Alpine Peak', category: 'Nature', title: 'Alpine Peak', description: 'Dusk settling over the northern mountain ranges.' },
  { id: 'g5', src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800', alt: 'Retro Hardware', category: 'Tech', title: 'Retro Hardware', description: 'Nostalgic close-up of early computing aesthetic.' },
  { id: 'g6', src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800', alt: 'Paper Fold', category: 'Abstract', title: 'Paper Fold', description: 'Geometric shadows created by complex origami structures.' },
  { id: 'g7', src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800', alt: 'Interface Focus', category: 'Tech', title: 'Interface Focus', description: 'Precision human-computer interaction workspace.' },
  { id: 'g8', src: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800', alt: 'Urban Symmetry', category: 'Architecture', title: 'Urban Symmetry', description: 'Reflective surfaces of a high-density living complex.' },
];

const demoMapLocations: MapLocation[] = [
  { id: 'LOC-NYC', name: 'New York (East Hub)', x: 22, y: 32, status: 'success', metrics: [{label: 'Traffic', value: '42 TB/s'}, {label: 'Latency', value: '12ms'}] },
  { id: 'LOC-LND', name: 'London (EU Primary)', x: 46, y: 28, status: 'info', metrics: [{label: 'Traffic', value: '28 TB/s'}, {label: 'Latency', value: '18ms'}] },
  { id: 'LOC-TOK', name: 'Tokyo (AP-North)', x: 82, y: 35, status: 'success', metrics: [{label: 'Traffic', value: '56 TB/s'}, {label: 'Latency', value: '9ms'}] },
  { id: 'LOC-SYD', name: 'Sydney (OC Cluster)', x: 85, y: 78, status: 'warning', details: 'Performing routine maintenance on redundant power rails.', metrics: [{label: 'Traffic', value: '12 TB/s'}, {label: 'Latency', value: '45ms'}] },
  { id: 'LOC-SFO', name: 'San Francisco (HQ)', x: 12, y: 35, status: 'success', metrics: [{label: 'Traffic', value: '88 TB/s'}, {label: 'Latency', value: '4ms'}] },
  { id: 'LOC-BLR', name: 'Bangalore (Dev Node)', x: 70, y: 55, status: 'info', metrics: [{label: 'Traffic', value: '34 TB/s'}, {label: 'Latency', value: '24ms'}] },
  { id: 'LOC-GRU', name: 'São Paulo (SA Node)', x: 30, y: 75, status: 'error', details: 'Critical underwater cable interruption detected. Rerouting via satellite.', metrics: [{label: 'Traffic', value: '2 TB/s'}, {label: 'Latency', value: '250ms'}] },
];

const demoCarouselItems: CarouselItem[] = [
  { 
    id: 'c1', 
    backgroundImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200',
    content: (
      <div className="flex flex-col justify-center h-full p-12 md:p-20 text-white max-w-2xl">
        <Status type="info" label="NEW RELEASE" />
        <h2 className="text-4xl md:text-6xl font-black mt-4 mb-6 leading-tight">Quantum Mesh Engine 2.0</h2>
        <p className="text-lg text-slate-200 mb-8 leading-relaxed">Experience the next generation of real-time component orchestration with our upgraded spatial reasoning layer.</p>
        <div className="flex gap-4">
          <Button size="lg">Explore V2.0</Button>
          <Button variant="ghost" className="text-white border border-white/20 hover:bg-white/10" size="lg">Documentation</Button>
        </div>
      </div>
    )
  },
  { 
    id: 'c2', 
    backgroundImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200',
    content: (
      <div className="flex flex-col justify-center h-full p-12 md:p-20 text-white max-w-2xl">
        <Status type="success" label="CLOUD NATIVE" />
        <h2 className="text-4xl md:text-6xl font-black mt-4 mb-6 leading-tight">Infinite Scaling Infrastructure</h2>
        <p className="text-lg text-slate-200 mb-8 leading-relaxed">Deployed globally across 42 regions, ensuring sub-10ms latency for all AI inference requests.</p>
        <Button size="lg" className="w-fit">View Global Map</Button>
      </div>
    )
  },
  { 
    id: 'c3', 
    backgroundImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    content: (
      <div className="flex flex-col justify-center h-full p-12 md:p-20 text-white max-w-2xl">
        <Status type="warning" label="BETA ACCESS" />
        <h2 className="text-4xl md:text-6xl font-black mt-4 mb-6 leading-tight">Zero-Trust Security Layer</h2>
        <p className="text-lg text-slate-200 mb-8 leading-relaxed">Protect your high-fidelity UI assets with our proprietary hardware-level encryption protocols.</p>
        <Button size="lg" variant="success" className="w-fit">Request Invitation</Button>
      </div>
    )
  }
];

const demoDataGridColumns: DataGridColumn[] = [
  { key: 'nodeId', header: 'Node', width: '100px', sortable: true },
  { key: 'location', header: 'Region', sortable: true },
  { key: 'status', header: 'Status', render: (v: StatusType) => <Status type={v} label={v.toUpperCase()} /> },
  { key: 'load', header: 'Load', render: (v: number) => <ProgressBar progress={v} variant={v > 80 ? 'error' : 'default'} /> }
];

const demoDataGridData = [
  { nodeId: 'NODE-A1', location: 'US-EAST', status: 'success' as StatusType, load: 42 },
  { nodeId: 'NODE-B2', location: 'EU-CENTRAL', status: 'info' as StatusType, load: 15 },
  { nodeId: 'NODE-C3', location: 'AP-EAST', status: 'warning' as StatusType, load: 78 },
  { nodeId: 'NODE-D4', location: 'US-WEST', status: 'error' as StatusType, load: 92 },
  { nodeId: 'NODE-E5', location: 'SA-EAST', status: 'success' as StatusType, load: 20 },
  { nodeId: 'NODE-F6', location: 'AF-SOUTH', status: 'neutral' as StatusType, load: 5 },
];

const demoGanttTasks: GanttTask[] = [
  { id: '1', label: 'System Analysis', startDay: 0, duration: 5, progress: 100, type: 'success' },
  { id: '2', label: 'UI Prototyping', startDay: 5, duration: 10, progress: 60, type: 'info' },
  { id: '3', label: 'Backend Logic', startDay: 15, duration: 15, progress: 10, type: 'warning' },
];

const demoTreeListColumns: TreeListColumn[] = [
  { key: 'name', header: 'Name', width: '250px' },
  { key: 'type', header: 'Type' },
  { key: 'size', header: 'Size', align: 'right' }
];

const demoTreeListData: TreeListDataItem[] = [
  { id: '1', name: 'src', type: 'Folder', size: '2.4 MB', children: [
    { id: '1-1', name: 'components', type: 'Folder', size: '1.8 MB' },
    { id: '1-2', name: 'App.tsx', type: 'TypeScript', size: '42 KB' },
  ]},
  { id: '2', name: 'public', type: 'Folder', size: '500 KB' }
];

const demoSteps: StepperItem[] = [
  { label: 'Step 1', description: 'Environment Setup' },
  { label: 'Step 2', description: 'Core Framework Build' },
  { label: 'Step 3', description: 'Component Validation' },
  { label: 'Step 4', description: 'Production Launch' },
];

const demoSlideDeck: SlideData[] = [
  { id: '1', title: 'Visual Forge', subtitle: 'v2.5 Release', content: 'Introducing high-fidelity UI orchestration with Gemini 3 Pro integration.', layout: 'hero', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200' },
  { id: '2', title: 'Atomic Principles', content: 'Our components follow strict atomic design principles ensuring absolute layout predictability.', layout: 'split' },
];

const demoRibbonTabs: RibbonTabItem[] = [
  { id: 'home', label: 'Home', groups: [{ label: 'Clipboard', items: [{ label: 'Paste', icon: '📋', onClick: () => {}, size: 'large' }, { label: 'Copy', icon: '📄', onClick: () => {} }] }] }
];

const demoTourSteps: TourStep[] = [
  { targetSelector: '#app-header', title: 'Application Header', content: 'This area contains the main breadcrumbs and global actions.', position: 'bottom' },
  { targetSelector: '#component-sidebar', title: 'Navigation Explorer', content: 'Browse through the complete component library using this sidebar.', position: 'right' },
  { targetSelector: '#ai-lab-card', title: 'Gemini AI Integration', content: 'Trigger real-time content generation via Gemini Flash 3.0.', position: 'top' },
];

const demoTreeMapData: TreeMapNode = {
  name: 'Root',
  children: [
    {
      name: 'Infrastructure',
      children: [
        { name: 'AWS Cluster', value: 4500, color: '#6366f1' },
        { name: 'GCP Nodes', value: 3200, color: '#4f46e5' },
        { name: 'Azure Edge', value: 1800, color: '#4338ca' },
      ]
    },
    {
      name: 'Services',
      children: [
        { name: 'Auth API', value: 2100, color: '#10b981' },
        { name: 'Vector DB', value: 3800, color: '#059669' },
        { name: 'Storage', value: 1200, color: '#047857' },
      ]
    },
    {
      name: 'AI Models',
      children: [
        { name: 'Gemini Flash', value: 5600, color: '#f59e0b' },
        { name: 'Gemini Pro', value: 2800, color: '#d97706' },
        { name: 'Imagen', value: 1500, color: '#b45309' },
      ]
    },
    {
      name: 'Analytics',
      children: [
        { name: 'Telemetry', value: 900, color: '#ec4899' },
        { name: 'User Logs', value: 1400, color: '#db2777' },
      ]
    }
  ]
};

const demoNavItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <span>🏠</span> },
  { id: 'projects', label: 'Projects', icon: <span>📁</span>, badge: 12 },
  { id: 'analytics', label: 'Analytics', icon: <span>📊</span> },
  { id: 'settings', label: 'Settings', icon: <span>⚙️</span> },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('option-1');
  const [checkedItems, setCheckedItems] = useState({ check1: true, check2: false });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<GeneratedContent | null>(null);
  const [selectedDropdown, setSelectedDropdown] = useState('react');
  const [innerSideBarTab, setInnerSideBarTab] = useState('general');
  const [currentAppTab, setCurrentAppTab] = useState('tab1');
  const [activeColor, setActiveColor] = useState('#4f46e5');
  const [activeNavId, setActiveNavId] = useState('home');

  const [sliderVal, setSliderVal] = useState(45);
  const [trackBarVal, setTrackBarVal] = useState(72);
  const [freqVal, setFreqVal] = useState(440);
  const [rangeVal, setRangeVal] = useState<[number, number]>([25, 75]);
  const [segmentVal, setSegmentVal] = useState('monthly');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [textBoxValue, setTextBoxValue] = useState('');
  const [chartType, setChartType] = useState<'pie' | 'line'>('pie');
  const [userRating, setUserRating] = useState(4);
  const [activeStep, setActiveStep] = useState(1);
  const [isTourActive, setIsTourActive] = useState(false);

  const [mockCpu, setMockCpu] = useState(42);
  const [mockRam, setMockRam] = useState(68);
  const [mockNet, setMockNet] = useState(12);

  // Drawer States
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogsOpen, setIsLogsOpen] = useState(false);

  // Pagination states
  const [paginatorPage, setPaginatorPage] = useState(1);
  const [longPaginatorPage, setLongPaginatorPage] = useState(4);

  // NumericTextBox states
  const [demoPrice, setDemoPrice] = useState(1250);
  const [demoPercent, setDemoPercent] = useState(75.5);
  const [demoPrecision, setDemoPrecision] = useState(0.0042);

  // ColorPicker state
  const [themeColor, setThemeColor] = useState('#6366f1');

  // AngleSlider state
  const [demoAngle, setDemoAngle] = useState(45);

  // DatePicker state
  const [demoDate, setDemoDate] = useState<Date | undefined>(new Date());
  const [emptyDate, setEmptyDate] = useState<Date | undefined>(undefined);

  // TimePicker state
  const [demoTime24, setDemoTime24] = useState("14:30");
  const [demoTime12, setDemoTime12] = useState("02:30 PM");

  // Live simulation for Gauges
  useEffect(() => {
    const interval = setInterval(() => {
      setMockCpu(prev => Math.max(10, Math.min(95, prev + (Math.random() * 20 - 10))));
      setMockRam(prev => Math.max(30, Math.min(90, prev + (Math.random() * 6 - 3))));
      setMockNet(prev => Math.max(2, Math.min(100, prev + (Math.random() * 40 - 20))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const componentsList = [
    'Overview', 'Spinner', 'Link', 'Avatar', 'NavigationBar', 'TreeMap', 'MaskedTextBox', 'PinTextBox', 'LevelMeter', 'Divider', 'Drawer', 'Carousel', 'Accordion', 'Map', 'Gallery', 'Dashboard', 'PivotTable', 'TimePicker', 'Tour', 'DatePicker', 'CompareSlider', 'Marquee', 'DataGrid', 'Blockquote', 'Skeleton', 'AngleSlider', 'ColorPicker', 'Paginator', 'SplitButton', 'NumericTextBox', 'Gauges', 'Gantt', 'TreeList', 'PivotGrid', 'Stepper', 'Splitter', 'Image', 'SlideDeck', 'RibbonMenu', 'Ribbon', 'Controls', 'Document', 'Slideshow', 'Spreadsheet', 'Rectangle', 'Circle', 'Triangle', 'Timer', 'Rating', 'Board', 'TrackBar', 'MenuBar', 'ToolBar', 'Countdown', 'Workflow', 'Schedule', 'Job', 'Range', 'Button', 'Breadcrumbs', 'Card', 'RadioButton', 'CheckButton', 
    'ToggleButton', 'Menu', 'Status', 'TreeView', 'ListView', 'DataTable',
    'Graph', 'Chart', 'Diagram', 'MindMap', 'Report', 'VideoPlayer', 'AudioPlayer',
    'Timeline', 'Grid', 'DropDown', 'ComboBox', 'StatusBar', 
    'SideBar', 'Window', 'Text', 'Tab', 'Editor', 'Paint', 'Node', 'Calendar', 
    'Color', 'Icon', 'Table', 'TextBox', 'Slider', 'ProgressBar', 'Dialog', 
    'Segment', 'Tooltip', 'ScrollBar'
  ];

  const appTabs: TabItem[] = [
    { id: 'tab1', label: 'Activity', icon: <span>🔥</span> },
    { id: 'tab2', label: 'Performance', icon: <span>📈</span> },
    { id: 'tab3', label: 'Log', icon: <span>📝</span> },
  ];

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 12);
  futureDate.setHours(futureDate.getHours() + 4);

  const criticalDate = new Date();
  criticalDate.setSeconds(criticalDate.getSeconds() + 45);

  const renderContent = () => {
    switch (activeTab) {
      case 'Spinner':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <header>
              <Text variant="h3">Loading Spinners</Text>
              <Text variant="small">Visual indicators for asynchronous operations, providing feedback that a process is underway.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Sizes" subtitle="From extra small to extra large.">
                <div className="flex items-center gap-8 py-4">
                  <Spinner size="xs" />
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                  <Spinner size="xl" />
                </div>
              </Card>

              <Card title="Variants" subtitle="Different color styles for various backgrounds.">
                <div className="flex items-center gap-8 py-4">
                  <Spinner variant="primary" />
                  <Spinner variant="secondary" />
                  <Spinner variant="slate" />
                  <div className="p-2 bg-indigo-600 rounded-lg">
                    <Spinner variant="white" />
                  </div>
                </div>
              </Card>

              <Card title="Thickness" subtitle="Adjusting the weight of the spinner ring.">
                <div className="flex items-center gap-8 py-4">
                  <Spinner thickness="thin" size="lg" />
                  <Spinner thickness="normal" size="lg" />
                  <Spinner thickness="thick" size="lg" />
                </div>
              </Card>

              <Card title="With Labels" subtitle="Providing textual context to the loading state.">
                <div className="flex flex-wrap gap-8 py-4">
                  <Spinner label="Loading data..." />
                  <Spinner variant="secondary" label="Processing..." />
                  <Spinner size="lg" label="Please wait" />
                </div>
              </Card>
            </div>

            <Card title="Practical Examples" subtitle="How spinners look in common UI patterns.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 border border-slate-200 rounded-xl flex items-center justify-center bg-slate-50 min-h-[120px]">
                  <Spinner size="lg" label="Fetching system logs" />
                </div>
                <div className="p-6 border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-4">
                  <Text variant="small" className="text-center">Your report is being generated. This may take a few moments.</Text>
                  <Spinner variant="secondary" thickness="thick" />
                </div>
              </div>
            </Card>
          </div>
        );
      case 'Link':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <header>
              <Text variant="h3">Interactive Links</Text>
              <Text variant="small">Navigation elements that connect users to other pages or resources with various styles and behaviors.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Variants & Colors" subtitle="Different visual styles for different contexts.">
                <div className="flex flex-col gap-4 py-4">
                  <Link href="#" variant="primary">Primary Link (Indigo)</Link>
                  <Link href="#" variant="secondary">Secondary Link (Slate)</Link>
                  <Link href="#" variant="subtle">Subtle Link (Light Slate)</Link>
                  <Link href="#" variant="danger">Danger Link (Rose)</Link>
                </div>
              </Card>

              <Card title="Underline Behaviors" subtitle="Controlling when the underline appears.">
                <div className="flex flex-col gap-4 py-4">
                  <Link href="#" underline="hover">Underline on Hover (Default)</Link>
                  <Link href="#" underline="always">Always Underlined</Link>
                  <Link href="#" underline="none">No Underline</Link>
                </div>
              </Card>

              <Card title="Icons & Positions" subtitle="Enhancing links with visual cues.">
                <div className="flex flex-col gap-4 py-4">
                  <Link href="#" icon={<span>🌐</span>}>Visit Website</Link>
                  <Link href="#" icon={<span>↗️</span>} iconPosition="right">External Resource</Link>
                  <Link href="#" icon={<span>📥</span>} variant="secondary">Download Assets</Link>
                  <Link href="#" icon={<span>🗑️</span>} variant="danger">Delete Permanently</Link>
                </div>
              </Card>

              <Card title="Sizes" subtitle="Adapting to different content densities.">
                <div className="flex items-end gap-6 py-4">
                  <Link href="#" size="sm">Small Link</Link>
                  <Link href="#" size="md">Medium Link</Link>
                  <Link href="#" size="lg">Large Link</Link>
                </div>
              </Card>
            </div>

            <Card title="Inline Usage" subtitle="How links look within a block of text.">
              <div className="p-4 bg-slate-50 rounded-xl">
                <Text>
                  Welcome to our platform! Please read our <Link href="#" underline="always">Privacy Policy</Link> and <Link href="#" underline="always">Terms of Service</Link> before continuing. If you have any questions, you can <Link href="#" icon={<span>📧</span>}>contact our support team</Link> at any time. We are here to help you <Link href="#" variant="secondary" underline="always">succeed</Link> in your journey.
                </Text>
              </div>
            </Card>
          </div>
        );
      case 'Avatar':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <header>
              <Text variant="h3">User Identity Avatars</Text>
              <Text variant="small">Visual representations of users or entities with support for images, initials, status indicators, and grouping.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Sizes & Shapes" subtitle="From extra small to extra large in various forms.">
                <div className="space-y-8 py-4">
                  <div className="flex items-end gap-4">
                    <Avatar size="xs" name="John Doe" />
                    <Avatar size="sm" name="John Doe" />
                    <Avatar size="md" name="John Doe" />
                    <Avatar size="lg" name="John Doe" />
                    <Avatar size="xl" name="John Doe" />
                  </div>
                  <div className="flex items-end gap-4">
                    <Avatar size="xs" shape="square" name="Jane Smith" />
                    <Avatar size="sm" shape="square" name="Jane Smith" />
                    <Avatar size="md" shape="square" name="Jane Smith" />
                    <Avatar size="lg" shape="square" name="Jane Smith" />
                    <Avatar size="xl" shape="square" name="Jane Smith" />
                  </div>
                </div>
              </Card>

              <Card title="Status Indicators" subtitle="Visual feedback for user availability." accent="primary">
                <div className="flex flex-wrap gap-8 py-4">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar size="lg" status="online" src="https://picsum.photos/seed/user1/200" />
                    <Text variant="small">Online</Text>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar size="lg" status="away" src="https://picsum.photos/seed/user2/200" />
                    <Text variant="small">Away</Text>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar size="lg" status="busy" src="https://picsum.photos/seed/user3/200" />
                    <Text variant="small">Busy</Text>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar size="lg" status="offline" src="https://picsum.photos/seed/user4/200" />
                    <Text variant="small">Offline</Text>
                  </div>
                </div>
              </Card>

              <Card title="Avatar Groups" subtitle="Displaying multiple users in a compact stack." accent="info">
                <div className="space-y-8 py-4">
                  <AvatarGroup max={3}>
                    <Avatar name="Alice" src="https://picsum.photos/seed/a/100" />
                    <Avatar name="Bob" src="https://picsum.photos/seed/b/100" />
                    <Avatar name="Charlie" src="https://picsum.photos/seed/c/100" />
                    <Avatar name="David" src="https://picsum.photos/seed/d/100" />
                    <Avatar name="Eve" src="https://picsum.photos/seed/e/100" />
                  </AvatarGroup>
                  
                  <AvatarGroup max={5} size="sm">
                    <Avatar name="User 1" />
                    <Avatar name="User 2" />
                    <Avatar name="User 3" />
                    <Avatar name="User 4" />
                    <Avatar name="User 5" />
                    <Avatar name="User 6" />
                    <Avatar name="User 7" />
                  </AvatarGroup>
                </div>
              </Card>

              <Card title="Fallbacks & Borders" subtitle="Handling missing images and high-contrast backgrounds.">
                <div className="flex gap-4 py-4">
                  <Avatar name="System Admin" border />
                  <Avatar name="Guest User" border className="bg-indigo-600 text-white" />
                  <Avatar src="broken-link" name="Fallback User" />
                  <div className="p-2 bg-slate-900 rounded-xl">
                    <Avatar name="Dark Mode" border />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      case 'NavigationBar':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <header>
              <Text variant="h3">System Navigation Bar</Text>
              <Text variant="small">A high-fidelity top-level navigation component for application-wide routing and global actions.</Text>
            </header>

            <div className="space-y-8">
              <Card title="Default Variant" subtitle="Clean, standard navigation for most applications." padding="none">
                <NavigationBar 
                  title="FORGE OS" 
                  items={demoNavItems} 
                  activeId={activeNavId} 
                  onSelect={setActiveNavId}
                  rightContent={
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">🔔</Button>
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black">JD</div>
                    </div>
                  }
                />
                <div className="h-32 flex items-center justify-center bg-slate-50 text-slate-400 text-xs italic">
                  Main content area for: {activeNavId.toUpperCase()}
                </div>
              </Card>

              <Card title="Glassmorphism Variant" subtitle="Modern, translucent design for immersive interfaces." padding="none" className="bg-gradient-to-br from-indigo-500/20 to-rose-500/20 p-8">
                <NavigationBar 
                  variant="glass"
                  title="AETHER" 
                  items={demoNavItems.slice(0, 3)} 
                  activeId={activeNavId} 
                  onSelect={setActiveNavId}
                  className="rounded-2xl shadow-2xl shadow-indigo-500/10"
                />
                <div className="h-32" />
              </Card>

              <Card title="Dark Variant" subtitle="High-contrast navigation for dark mode or specific themes." padding="none">
                <NavigationBar 
                  variant="dark"
                  title="TERMINAL" 
                  items={demoNavItems} 
                  activeId={activeNavId} 
                  onSelect={setActiveNavId}
                  rightContent={<Status type="success" label="SYSTEM ONLINE" />}
                />
                <div className="h-32 bg-slate-950 flex items-center justify-center text-emerald-500 font-mono text-xs">
                  [root@forge ~]# cd /var/log/syslog
                </div>
              </Card>
            </div>
          </div>
        );
      case 'TreeMap':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <header>
              <Text variant="h3">Hierarchical Data Map</Text>
              <Text variant="small">Visualizing complex nested structures using area-proportional tiling for instant resource distribution analysis.</Text>
            </header>

            <Card title="System Resource Distribution" subtitle="Proportional allocation across infrastructure and services" accent="primary">
              <div className="p-4">
                <TreeMap data={demoTreeMapData} height={500} />
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Interactive Exploration" variant="outline">
                <Text variant="small" className="mb-4">Hover over segments to view precise values and metadata. The color coding helps distinguish between different logical groups.</Text>
                <div className="flex flex-wrap gap-2">
                  <Status type="info" label="Infrastructure" />
                  <Status type="success" label="Services" />
                  <Status type="warning" label="AI Models" />
                  <Status type="error" label="Analytics" />
                </div>
              </Card>
              <Card title="Dynamic Scaling" variant="outline">
                <Text variant="small">The TreeMap automatically recalculates its layout when the container size changes, ensuring optimal use of available screen real estate.</Text>
              </Card>
            </div>
          </div>
        );
      case 'MaskedTextBox':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <header>
              <Text variant="h3">Input Masking System</Text>
              <Text variant="small">Enforce specific data formats for sensitive or structured inputs like phone numbers, credit cards, and license keys.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Financial Data" subtitle="Credit card and currency formatting" accent="primary">
                <div className="space-y-6 py-4">
                  <MaskedTextBox 
                    label="Card Number" 
                    mask="9999-9999-9999-9999" 
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                  />
                  <MaskedTextBox 
                    label="Expiry Date" 
                    mask="99/99" 
                    placeholder="MM/YY"
                  />
                </div>
              </Card>

              <Card title="Contact Information" subtitle="Phone and regional formatting">
                <div className="space-y-6 py-4">
                  <MaskedTextBox 
                    label="US Phone Number" 
                    mask="(999) 999-9999" 
                  />
                  <MaskedTextBox 
                    label="International ID" 
                    mask="AAA-999-***" 
                    placeholder="ABC-123-XYZ"
                  />
                </div>
              </Card>

              <Card title="System Credentials" subtitle="Software keys and serial numbers" accent="info">
                <div className="space-y-6 py-4">
                  <MaskedTextBox 
                    label="Product License" 
                    mask="AAAAA-AAAAA-AAAAA-AAAAA" 
                    placeholder="5-CHAR GROUPS"
                  />
                  <MaskedTextBox 
                    label="Hardware Serial" 
                    mask="99-AAA-9999" 
                  />
                </div>
              </Card>

              <Card title="Validation States" subtitle="Error and disabled feedback" accent="error">
                <div className="space-y-6 py-4">
                  <MaskedTextBox 
                    label="Invalid Zip Code" 
                    mask="99999-9999" 
                    value="123"
                    error="Incomplete zip code format"
                  />
                  <MaskedTextBox 
                    label="Locked Field" 
                    mask="999-99-9999" 
                    disabled
                    placeholder="LOCKED"
                  />
                </div>
              </Card>
            </div>

            <Card title="Pattern Reference" variant="outline">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                  <div className="space-y-2">
                    <Text variant="h4">9 (Numeric)</Text>
                    <Text variant="small">Restricts input to digits 0-9. Perfect for dates, amounts, and phone numbers.</Text>
                  </div>
                  <div className="space-y-2">
                    <Text variant="h4">A (Alpha)</Text>
                    <Text variant="small">Restricts input to letters A-Z (case insensitive). Useful for codes and IDs.</Text>
                  </div>
                  <div className="space-y-2">
                    <Text variant="h4">* (Wildcard)</Text>
                    <Text variant="small">Allows any alphanumeric character. Ideal for mixed-format serial keys.</Text>
                  </div>
               </div>
            </Card>
          </div>
        );
      case 'PinTextBox':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <header>
              <Text variant="h3">Secure PIN Input</Text>
              <Text variant="small">Individual character input fields for multi-factor authentication, security codes, or transaction verification.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Standard Verification" subtitle="6-digit numeric code entry">
                <div className="py-6 flex flex-col items-center">
                  <PinTextBox 
                    label="Verification Code" 
                    onComplete={(pin) => alert(`PIN Completed: ${pin}`)} 
                  />
                  <Text variant="small" className="mt-6 text-slate-400">A 6-digit code was sent to your registered device.</Text>
                </div>
              </Card>

              <Card title="Masked Input" subtitle="Secure 4-digit password entry" accent="primary">
                <div className="py-6 flex flex-col items-center">
                  <PinTextBox 
                    length={4} 
                    mask 
                    label="Security PIN" 
                    onComplete={(pin) => alert(`Secure PIN: ${pin}`)} 
                  />
                  <Text variant="small" className="mt-6 text-slate-400">Enter your 4-digit security PIN to proceed.</Text>
                </div>
              </Card>

              <Card title="Error State" subtitle="Validation feedback visualization" accent="error">
                <div className="py-6 flex flex-col items-center">
                  <PinTextBox 
                    length={5} 
                    error="Invalid code. Please try again." 
                    label="Access Token" 
                  />
                </div>
              </Card>

              <Card title="Disabled State" subtitle="Read-only or locked input" variant="flat">
                <div className="py-6 flex flex-col items-center">
                  <PinTextBox 
                    disabled 
                    label="System Locked" 
                  />
                  <Text variant="small" className="mt-6 text-slate-400">Input is disabled during system maintenance.</Text>
                </div>
              </Card>
            </div>

            <Card title="Implementation Details" variant="outline">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                  <div className="space-y-2">
                    <Text variant="h4">Auto-Focus</Text>
                    <Text variant="small">Automatically shifts focus to the next input field upon character entry for a seamless user experience.</Text>
                  </div>
                  <div className="space-y-2">
                    <Text variant="h4">Paste Support</Text>
                    <Text variant="small">Supports pasting full codes from the clipboard, automatically distributing characters across fields.</Text>
                  </div>
                  <div className="space-y-2">
                    <Text variant="h4">Smart Navigation</Text>
                    <Text variant="small">Handles backspace navigation and numeric-only validation to prevent invalid input.</Text>
                  </div>
               </div>
            </Card>
          </div>
        );
      case 'LevelMeter':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <header>
              <Text variant="h3">Hardware Level Meter</Text>
              <Text variant="small">High-precision segmented visualization for signal strength, audio levels, or resource utilization.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Signal Monitoring" subtitle="Horizontal multi-segment meters">
                <div className="space-y-8 py-4">
                  <LevelMeter label="Primary Channel" value={75} segments={30} />
                  <LevelMeter label="Secondary Channel" value={42} segments={30} />
                  <LevelMeter label="Peak Signal" value={95} segments={30} />
                </div>
              </Card>

              <Card title="Vertical Orientation" subtitle="Compact vertical level indicators">
                <div className="flex justify-around items-end h-64 py-4 bg-slate-950 rounded-xl border border-slate-800">
                  <LevelMeter orientation="vertical" value={65} label="L" segments={15} />
                  <LevelMeter orientation="vertical" value={82} label="R" segments={15} />
                  <LevelMeter orientation="vertical" value={45} label="C" segments={15} />
                  <LevelMeter orientation="vertical" value={92} label="LFE" segments={15} />
                </div>
              </Card>
            </div>

            <Card title="Live Telemetry Simulation" subtitle="Dynamic level updates from mock data stream">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                  <div className="space-y-2">
                    <Text variant="caption">CPU LOAD</Text>
                    <LevelMeter value={mockCpu} segments={40} showValue={false} />
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>0%</span>
                      <span>{Math.round(mockCpu)}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Text variant="caption">MEMORY USAGE</Text>
                    <LevelMeter value={mockRam} segments={40} showValue={false} />
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>0%</span>
                      <span>{Math.round(mockRam)}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Text variant="caption">NETWORK IO</Text>
                    <LevelMeter value={mockNet} segments={40} showValue={false} />
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>0%</span>
                      <span>{Math.round(mockNet)}%</span>
                      <span>100%</span>
                    </div>
                  </div>
               </div>
            </Card>
          </div>
        );
      case 'Divider':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
              <Text variant="h3">Content Separator</Text>
              <Text variant="small">A subtle interface element used to organize hierarchy and distinguish between complex data sections.</Text>
            </header>

            <div className="grid grid-cols-1 gap-12">
              <Card title="Horizontal Variants" subtitle="Base usage with different line styles.">
                <div className="space-y-8 py-4">
                  <div className="space-y-2">
                    <Text variant="caption" className="text-[9px]">Solid (Default)</Text>
                    <Divider />
                  </div>
                  <div className="space-y-2">
                    <Text variant="caption" className="text-[9px]">Dashed Variant</Text>
                    <Divider variant="dashed" />
                  </div>
                  <div className="space-y-2">
                    <Text variant="caption" className="text-[9px]">Dotted Variant</Text>
                    <Divider variant="dotted" />
                  </div>
                </div>
              </Card>

              <Card title="Labeled Dividers" subtitle="Embedded typography for structural context.">
                <div className="space-y-10 py-6">
                  <Divider label="PROJECT SPECIFICATIONS" labelAlign="start" />
                  <Divider label="INTERNAL SYSTEM LOGS" labelAlign="center" variant="dashed" />
                  <Divider label="ARCHIVE DATA 2024" labelAlign="end" />
                </div>
              </Card>

              <Card title="Vertical Context" subtitle="Separating inline items in toolbars or headers.">
                <div className="h-20 flex items-center justify-center gap-6 p-8 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-center">
                      <Text variant="h4" className="text-indigo-600">42</Text>
                      <Text variant="caption" className="text-[8px]">Nodes</Text>
                    </div>
                    <Divider orientation="vertical" />
                    <div className="flex flex-col items-center">
                      <Text variant="h4" className="text-emerald-600">98%</Text>
                      <Text variant="caption" className="text-[8px]">Uptime</Text>
                    </div>
                    <Divider orientation="vertical" variant="dashed" />
                    <div className="flex flex-col items-center">
                      <Text variant="h4" className="text-rose-600">12ms</Text>
                      <Text variant="caption" className="text-[8px]">Latency</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      case 'Drawer':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <header>
              <Text variant="h3">Interactive Slide Panels</Text>
              <Text variant="small">Overlay containers that slide from any edge of the viewport, perfect for focused tasks or configuration.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card title="User Context" subtitle="Right-side profile drawer example" accent="primary" hoverable>
                  <div className="py-8 flex flex-col items-center">
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                       <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth="2"/></svg>
                    </div>
                    <Button onClick={() => setIsProfileOpen(true)}>Open Profile Settings</Button>
                  </div>
               </Card>

               <Card title="System Telemetry" subtitle="Bottom-up log inspection drawer" accent="info" hoverable>
                  <div className="py-8 flex flex-col items-center">
                    <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center text-sky-600 mb-6">
                       <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="2"/></svg>
                    </div>
                    <Button variant="secondary" onClick={() => setIsLogsOpen(true)}>View Runtime Logs</Button>
                  </div>
               </Card>
            </div>

            {/* Profile Drawer Implementation */}
            <Drawer 
              isOpen={isProfileOpen} 
              onClose={() => setIsProfileOpen(false)}
              title="Identity & Access"
              footer={
                <>
                  <Button className="flex-1" onClick={() => setIsProfileOpen(false)}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsProfileOpen(false)}>Cancel</Button>
                </>
              }
            >
              <div className="space-y-8">
                <div className="flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-20 h-20 bg-indigo-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white text-3xl font-black mb-4">JD</div>
                  <Text variant="h4">John Forge-son</Text>
                  <Status type="success" label="Active Lead" />
                </div>

                <FormControl label="Display Name">
                   <TextBox value="John Forge-son" />
                </FormControl>

                <FormControl label="Access Tier">
                   <RadioButton 
                    name="tier" 
                    options={[{id: 't1', label: 'Standard', value: 's'}, {id: 't2', label: 'Enterprise', value: 'e'}]} 
                    value="e" 
                    onChange={() => {}} 
                   />
                </FormControl>

                <section className="pt-4 border-t border-slate-100">
                   <Text variant="caption" className="block mb-3">Linked Accounts</Text>
                   <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded-xl">
                         <span className="text-xs font-bold text-slate-600">GitHub</span>
                         <Status type="success" label="CONNECTED" />
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded-xl opacity-50">
                         <span className="text-xs font-bold text-slate-600">Slack</span>
                         <span className="text-[10px] font-black text-slate-400">NOT LINKED</span>
                      </div>
                   </div>
                </section>
              </div>
            </Drawer>

            {/* Logs Drawer Implementation */}
            <Drawer 
              isOpen={isLogsOpen} 
              onClose={() => setIsLogsOpen(false)}
              position="bottom"
              size="lg"
              title="Global Node Log Stream"
            >
              <div className="bg-slate-900 rounded-2xl p-6 font-mono text-xs text-emerald-400 min-h-[300px] overflow-auto custom-scrollbar">
                <div className="flex items-center gap-4 mb-4 border-b border-slate-800 pb-4">
                   <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> <span className="text-white font-bold">STREAM: LIVE</span></div>
                   <div className="text-slate-500 uppercase tracking-tighter">Region: US-EAST-1</div>
                </div>
                <div className="space-y-2 opacity-80">
                   <div>[14:20:01] <span className="text-indigo-400">INFO</span> Initiating handshake with Gemini protocol...</div>
                   <div>[14:20:03] <span className="text-emerald-400">SUCCESS</span> Auth token verified.</div>
                   <div>[14:20:05] <span className="text-indigo-400">INFO</span> Processing layout inference for sector Delta-9...</div>
                   <div>[14:20:08] <span className="text-amber-400">WARN</span> Sub-optimal caching detected on edge node CF-012.</div>
                   <div>[14:20:12] <span className="text-indigo-400">INFO</span> Token usage: 125/10000 quota.</div>
                   <div className="text-slate-500 italic">$ tail -f forge.log_</div>
                </div>
              </div>
            </Drawer>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card title="Focus Management" variant="flat">
                  <Text variant="small">Automatically captures Escape key events and handles document overflow to ensure the background remains stable while a modal task is active.</Text>
               </Card>
               <Card title="Slide Animation" variant="flat">
                  <Text variant="small">Position-aware entry animations ensure intuitive spatial mapping (e.g. bottom drawer slides up, right drawer slides left).</Text>
               </Card>
               <Card title="Aesthetic Layering" variant="flat">
                  <Text variant="small">The combination of backdrop-blur and deep shadows creates a clear visual hierarchy for secondary complex interfaces.</Text>
               </Card>
            </div>
          </div>
        );
      case 'Carousel':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <header>
              <Text variant="h3">High-Fidelity Carousel</Text>
              <Text variant="small">Dynamic sliding container with hardware acceleration and touch support for professional presentation layers.</Text>
            </header>

            <Carousel 
              items={demoCarouselItems} 
              className="mb-8"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card title="Custom Node Carousel" variant="outline" accent="info">
                <Text variant="small" className="mb-6">The carousel handles arbitrary React nodes, allowing for complex interactive slides beyond simple images.</Text>
                <Carousel 
                  aspectRatio="square"
                  items={[
                    { id: 'n1', content: <div className="h-full flex items-center justify-center bg-indigo-600 text-white font-black text-4xl">SLIDE A</div> },
                    { id: 'n2', content: <div className="h-full flex items-center justify-center bg-emerald-600 text-white font-black text-4xl">SLIDE B</div> },
                    { id: 'n3', content: <div className="h-full flex items-center justify-center bg-rose-600 text-white font-black text-4xl">SLIDE C</div> },
                  ]}
                />
              </Card>
              <Card title="Ultra-Wide Mode" variant="outline" accent="primary">
                <Text variant="small" className="mb-6">Configure the aspect ratio for wide banners or compact squares to fit various layout contexts.</Text>
                <Carousel 
                  aspectRatio="wide"
                  autoPlay={false}
                  items={[
                    { id: 'w1', backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200', content: <div className="flex items-center justify-center h-full text-white font-bold uppercase tracking-[1em]">Infinity</div> },
                    { id: 'w2', backgroundImage: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&q=80&w=1200', content: <div className="flex items-center justify-center h-full text-white font-bold uppercase tracking-[1em]">Compute</div> },
                  ]}
                />
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card title="Cubic Easing" variant="flat">
                  <Text variant="small">Utilizes professional cubic-bezier timing functions to simulate physical inertia and smooth deceleration.</Text>
               </Card>
               <Card title="Touch Optimized" variant="flat">
                  <Text variant="small">Built-in swipe detection with delta thresholds to distinguish between scrolling and intent-based navigation.</Text>
               </Card>
               <Card title="Smart Timing" variant="flat">
                  <Text variant="small">The interval engine automatically pauses on user interaction (hover/touch) to ensure a high-quality UX.</Text>
               </Card>
            </div>
          </div>
        );
      case 'Accordion':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <header>
              <Text variant="h3">Interactive Disclosure System</Text>
              <Text variant="small">Smooth-transition collapsible panels for managing information density and progressive disclosure.</Text>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <Text variant="caption">Platform FAQ (Single Mode)</Text>
                <Accordion 
                  allowMultiple={false}
                  items={[
                    { 
                      id: 'q1', 
                      title: 'How does Gemini 3 integration work?', 
                      content: 'Component Forge uses a semantic grounding layer that automatically feeds the current UI schema to Gemini, allowing it to reason about component relationships in real-time.',
                      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    },
                    { 
                      id: 'q2', 
                      title: 'What are the performance limits?', 
                      content: 'Our core library has zero runtime dependencies beyond React and Tailwind. Component states are optimized using specialized hooks to maintain 60FPS even with complex data grids.',
                      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    },
                    { 
                      id: 'q3', 
                      title: 'Can I export components to other frameworks?', 
                      content: 'While optimized for React, the underlying utility-first CSS approach allows for relatively simple porting to any framework supporting PostCSS and Tailwind.',
                      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    }
                  ]} 
                />
              </div>

              <div className="space-y-6">
                <Text variant="caption">System Configuration (Multiple Mode)</Text>
                <Accordion 
                  allowMultiple={true}
                  items={[
                    { 
                      id: 's1', 
                      title: 'Network & Connectivity', 
                      subtitle: 'Status: ONLINE',
                      status: 'success',
                      content: (
                        <div className="space-y-4 pt-2">
                           <div className="flex justify-between items-center"><span className="text-xs font-bold text-slate-400">Node Cluster</span><Status type="info" label="US-EAST-1" /></div>
                           <ProgressBar progress={85} label="Bandwidth Utilization" />
                        </div>
                      )
                    },
                    { 
                      id: 's2', 
                      title: 'Security Protocols', 
                      subtitle: 'Encrypted',
                      status: 'info',
                      content: (
                        <div className="space-y-3 pt-2">
                          <CheckButton id="sec1" label="AES-256 Payload Encryption" checked={true} onChange={() => {}} />
                          <CheckButton id="sec2" label="Hardware Root of Trust" checked={true} onChange={() => {}} />
                          <CheckButton id="sec3" label="Biometric Override" checked={false} onChange={() => {}} />
                        </div>
                      )
                    },
                    { 
                      id: 's3', 
                      title: 'Maintenance Logs', 
                      subtitle: 'Warning Detected',
                      status: 'warning',
                      content: 'Last system backup failed due to storage overflow. Maintenance recommended within 24 hours. Check volume CF-ROOT-01.'
                    }
                  ]} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card title="A11y Pattern" variant="flat">
                  <Text variant="small">Utilizes standard button elements for headers to ensure focus-ring visibility and keyboard triggering via Space/Enter.</Text>
               </Card>
               <Card title="Dynamic Height" variant="flat">
                  <Text variant="small">Leverages CSS transition on max-height with cubic-bezier easing to ensure fluid animations regardless of content size.</Text>
               </Card>
               <Card title="Mode Logic" variant="flat">
                  <Text variant="small">Integrated state management allows for exclusive single-open behavior or permissive multi-expansion workflows.</Text>
               </Card>
            </div>
          </div>
        );
      case 'Map':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <header>
              <Text variant="h3">Interactive Spatial Intelligence</Text>
              <Text variant="small">SVG-based global mesh visualizer with real-time status markers and telemetry integration.</Text>
            </header>

            <Map 
              title="Global Edge Operations" 
              locations={demoMapLocations} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card title="Pulse Technology" variant="outline" accent="info">
                  <Text variant="small">Markers utilize a pure CSS pulse animation to indicate live activity, ensuring a high-performance visual experience without the need for heavyweight libraries.</Text>
               </Card>
               <Card title="Digital Twin Strategy" variant="outline" accent="primary">
                  <Text variant="small">Each geographic node is directly mapped to a backend instance, allowing for a 1:1 visual-to-infrastructure monitoring ratio.</Text>
               </Card>
            </div>
          </div>
        );
      case 'Gallery':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <header>
              <Text variant="h3">Asset Discovery Center</Text>
              <Text variant="small">High-fidelity media gallery with categorical filtering and immersive lightbox support.</Text>
            </header>

            <Gallery items={demoGalleryItems} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card title="UX Pattern: Lightbox" variant="outline" accent="info">
                  <Text variant="small">Utilizes a backdrop-blur overlay with high-contrast UI controls to maintain focus on the primary visual content while providing context.</Text>
               </Card>
               <Card title="Dynamic Filtering" variant="outline" accent="primary">
                  <Text variant="small">State-driven filtering allows for instantaneous re-ordering of assets without expensive page reloads or layout shifts.</Text>
               </Card>
            </div>
          </div>
        );
      case 'Dashboard':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <Text variant="h3">System Operations Center</Text>
                <Text variant="small">Real-time infrastructure health and commercial performance metrics.</Text>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => alert('Refreshing...')}>Refresh</Button>
                <Button size="sm">Export Report</Button>
              </div>
            </header>

            {/* Metric Row */}
            <Dashboard.Container>
              <Dashboard.Metric 
                label="Active Subscriptions" 
                value="12,482" 
                trend={{ value: 12.5, isUp: true }} 
                status="success"
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="2"/></svg>}
              />
              <Dashboard.Metric 
                label="Monthly Revenue" 
                value="$452.9K" 
                trend={{ value: 8.2, isUp: true }} 
                status="info"
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2"/></svg>}
              />
              <Dashboard.Metric 
                label="Avg. Latency" 
                value="24ms" 
                trend={{ value: 4.1, isUp: false }} 
                status="warning"
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2"/></svg>}
              />
              <Dashboard.Metric 
                label="Security Incidents" 
                value="0" 
                status="success"
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth="2"/></svg>}
              />
            </Dashboard.Container>

            {/* Middle Row: Chart & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <Dashboard.Widget title="Traffic Analysis" subtitle="Inbound requests per second" span={2}>
                  <div className="h-64 pt-4">
                     <Graph data={[
                        { label: '08:00', value: 450, color: 'bg-indigo-500' },
                        { label: '09:00', value: 720, color: 'bg-indigo-500' },
                        { label: '10:00', value: 890, color: 'bg-indigo-600' },
                        { label: '11:00', value: 640, color: 'bg-indigo-500' },
                        { label: '12:00', value: 980, color: 'bg-indigo-700' },
                        { label: '13:00', value: 1200, color: 'bg-emerald-500' },
                     ]} />
                  </div>
               </Dashboard.Widget>

               <Dashboard.Widget title="Live Events" subtitle="Recent infrastructure triggers">
                  <ScrollArea height="260px">
                     <Timeline events={[
                        { time: '2m ago', title: 'Backup Successful', status: 'success' },
                        { time: '15m ago', title: 'New Region: Tokyo', status: 'info' },
                        { time: '1h ago', title: 'Threshold Alert', description: 'Node US-West-2 reached 85% CPU.', status: 'warning' },
                        { time: '4h ago', title: 'System Deploy', status: 'success' },
                     ]} />
                  </ScrollArea>
               </Dashboard.Widget>
            </div>

            {/* Bottom Row: Cluster Health & Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
               <Dashboard.Widget title="Telemetry" span={1} className="flex items-center justify-center">
                  <Gauge value={mockCpu} label="CPU Core" unit="%" status={mockCpu > 80 ? 'error' : 'info'} size={180} />
               </Dashboard.Widget>

               <Dashboard.Widget title="Cluster Inventory" span={3}>
                  <DataGrid 
                    columns={[
                      { key: 'nodeId', header: 'Node', width: '100px' },
                      { key: 'location', header: 'Region' },
                      { key: 'status', header: 'Status', render: (v: StatusType) => <Status type={v} label={v.toUpperCase()} /> },
                      { key: 'load', header: 'Load', render: (v) => <ProgressBar progress={v} variant={v > 80 ? 'error' : 'default'} /> }
                    ]} 
                    data={demoDataGridData.slice(0, 5)} 
                    rowsPerPage={5} 
                  />
               </Dashboard.Widget>
            </div>
          </div>
        );
      case 'PivotTable':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
              <Text variant="h3">Advanced Pivot Table</Text>
              <Text variant="small">High-performance data summarization tool with hierarchical row grouping and automatic totals.</Text>
            </header>

            <Card title="Global Sales Intelligence" subtitle="Interactive breakdown of quarterly performance.">
               <div className="py-4">
                  <PivotTable 
                    data={demoPivotTableData}
                    rowFields={['category', 'subcategory']}
                    columnFields={['region']}
                    measureField="sales"
                    aggregator="sum"
                  />
               </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card title="Hierarchical Rendering" variant="outline" accent="info">
                  <Text variant="small">The table automatically generates a tree structure from row dimensions, allowing users to drill down into sub-categories while maintaining aggregate context.</Text>
               </Card>
               <Card title="Cross-Tabulation" variant="outline" accent="primary">
                  <Text variant="small">Seamlessly map multiple dimensions into columns. Values are automatically distributed and summarized across the entire pivot matrix.</Text>
               </Card>
            </div>
          </div>
        );
      case 'TimePicker':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
              <Text variant="h3">Interactive Time Selector</Text>
              <Text variant="small">High-fidelity time selection with support for 12h/24h formats and scrollable column logic.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="System Log Analysis" subtitle="24-hour military format." accent="primary">
                <div className="py-4 space-y-6">
                   <TimePicker 
                      label="Select Log Timestamp"
                      value={demoTime24} 
                      onChange={setDemoTime24} 
                   />
                   <div className="p-4 bg-slate-900 rounded-2xl flex items-center justify-between border border-slate-800">
                       <div className="flex flex-col">
                          <Text variant="caption" className="text-slate-500">ISO Format</Text>
                          <Text variant="small" className="font-mono text-emerald-400 font-bold">
                            T{demoTime24}:00Z
                          </Text>
                       </div>
                       <Status type="info" label="SYNCHRONIZED" />
                    </div>
                </div>
              </Card>

              <Card title="Patient Scheduling" subtitle="12-hour AM/PM format with 15m intervals." variant="outline">
                <div className="py-4 space-y-6">
                   <TimePicker 
                      label="Available Slot"
                      use12Hours={true}
                      minuteStep={15}
                      value={demoTime12} 
                      onChange={setDemoTime12} 
                   />
                   <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between">
                       <div className="flex flex-col">
                          <Text variant="caption">Appointment Time</Text>
                          <Text variant="small" className="font-bold text-indigo-700">
                            {demoTime12}
                          </Text>
                       </div>
                       <Button size="sm">Book Now</Button>
                    </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card title="Column Scrolling" variant="flat">
                  <Text variant="small">Features independent scrollable columns for hours and minutes, ensuring rapid selection without keyboard overhead.</Text>
               </Card>
               <Card title="Format Agnostic" variant="flat">
                  <Text variant="small">Internal logic seamlessly translates between string-based state and selection UI, supporting localization needs.</Text>
               </Card>
               <Card title="Granular Steps" variant="flat">
                  <Text variant="small">Configure minute increments (e.g., 5, 15, 30) to streamline user selection for specific business rules.</Text>
               </Card>
            </div>
          </div>
        );
      case 'Tour':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
              <Text variant="h3">Interactive Guided Tour</Text>
              <Text variant="small">Onboarding tool that highlights key features with spotlight effects and contextual popovers.</Text>
            </header>

            <Card title="Start Experience" subtitle="Trigger a multi-step platform tour." accent="primary">
               <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                     <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                  </div>
                  <Text variant="h4" className="mb-2">New User? Start Here</Text>
                  <Text variant="small" className="mb-8 max-w-sm text-slate-400">Our interactive guide will walk you through the core sections of Component Forge in less than 30 seconds.</Text>
                  <Button size="lg" onClick={() => setIsTourActive(true)}>Launch Guided Tour</Button>
               </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card title="Spotlight Mask" variant="flat">
                  <Text variant="small">Utilizes dynamic SVG masking to dim the interface while focusing user attention on specific atomic elements.</Text>
               </Card>
               <Card title="Smart Popovers" variant="flat">
                  <Text variant="small">Automatically detects the best position (Top, Bottom, etc.) based on the target element's viewport coordinates.</Text>
               </Card>
               <Card title="Smooth Navigation" variant="flat">
                  <Text variant="small">Built-in support for scrolling target elements into view before highlighting, ensuring a consistent UX.</Text>
               </Card>
            </div>
          </div>
        );
      case 'DatePicker':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
              <Text variant="h3">Interactive Date Picker</Text>
              <Text variant="small">High-fidelity date selection component with calendar popup and month navigation.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Appointment Booking" subtitle="Standard usage in form structures." accent="primary">
                 <div className="py-4 space-y-6">
                    <DatePicker 
                      label="Select Launch Date"
                      value={demoDate} 
                      onChange={setDemoDate} 
                    />
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between">
                       <div className="flex flex-col">
                          <Text variant="caption">Formatted Value</Text>
                          <Text variant="small" className="font-bold text-indigo-700">
                            {demoDate?.toDateString() || 'No date selected'}
                          </Text>
                       </div>
                       <Button size="sm" onClick={() => setDemoDate(new Date())}>Reset to Now</Button>
                    </div>
                 </div>
              </Card>

              <Card title="Empty State & Configuration" subtitle="Handling optional values." variant="outline">
                <div className="py-4 space-y-6">
                   <DatePicker 
                      label="Deadline (Optional)"
                      value={emptyDate} 
                      onChange={setEmptyDate} 
                      placeholder="Pick a deadline..."
                   />
                   <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 italic text-xs text-slate-400">
                      Users can trigger the picker by clicking anywhere on the input surface. Outside clicks automatically close the panel.
                   </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card title="Calendar Math" variant="flat">
                  <Text variant="small">Built-in logic for calculating month boundaries and first-day alignments across different calendar years.</Text>
               </Card>
               <Card title="UX Focused" variant="flat">
                  <Text variant="small">Features a clear visual hierarchy for the active month and year, with intuitive arrows for navigation.</Text>
               </Card>
               <Card title="Today Shortcut" variant="flat">
                  <Text variant="small">Includes a one-tap shortcut to reset the view to the current date, improving workflow efficiency.</Text>
               </Card>
            </div>
          </div>
        );
      case 'CompareSlider':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
              <Text variant="h3">Visual Comparison Slider</Text>
              <Text variant="small">Interactive overlay slider for comparing two visual states, components, or images.</Text>
            </header>

            <div className="grid grid-cols-1 gap-12">
              <Card title="Image Post-Processing" subtitle="Drag the handle to see the HDR effect." accent="primary">
                 <div className="py-4">
                    <CompareSlider 
                      className="aspect-video"
                      before={<img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=40&w=1200&sat=-100" className="w-full h-full object-cover" alt="Grayscale" />}
                      after={<img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Color" />}
                      beforeLabel="Original (RAW)"
                      afterLabel="Processed (HDR)"
                    />
                 </div>
              </Card>

              <Card title="UI Theme Transformation" subtitle="Comparing interface variants." accent="info" variant="outline">
                <div className="py-4">
                  <CompareSlider 
                    className="h-80 border border-slate-200"
                    before={
                      <div className="w-full h-full bg-slate-50 p-8 flex flex-col justify-center gap-4">
                        <div className="w-2/3 h-4 bg-slate-200 rounded" />
                        <div className="w-full h-4 bg-slate-200 rounded" />
                        <div className="w-1/2 h-4 bg-slate-200 rounded" />
                        <div className="mt-4 flex gap-2">
                           <div className="w-20 h-8 bg-indigo-500 rounded-lg" />
                           <div className="w-20 h-8 bg-slate-200 rounded-lg" />
                        </div>
                      </div>
                    }
                    after={
                      <div className="w-full h-full bg-slate-900 p-8 flex flex-col justify-center gap-4">
                        <div className="w-2/3 h-4 bg-slate-700 rounded" />
                        <div className="w-full h-4 bg-slate-700 rounded" />
                        <div className="w-1/2 h-4 bg-slate-700 rounded" />
                        <div className="mt-4 flex gap-2">
                           <div className="w-20 h-8 bg-indigo-600 rounded-lg" />
                           <div className="w-20 h-8 bg-slate-200 rounded-lg" />
                        </div>
                      </div>
                    }
                    beforeLabel="Light Mode"
                    afterLabel="Dark Mode"
                  />
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card title="Clip-Path Engine" variant="flat">
                  <Text variant="small">Uses high-performance CSS `clip-path` for rendering the overlay, ensuring zero layout shift and smooth interactions.</Text>
               </Card>
               <Card title="Responsive Handling" variant="flat">
                  <Text variant="small">Automatically recalculates relative offsets using `getBoundingClientRect` to support fluid containers and viewport resizing.</Text>
               </Card>
               <Card title="Dual Support" variant="flat">
                  <Text variant="small">Not just for images! CompareSlider supports any React Nodes, allowing for complex UI component comparisons.</Text>
               </Card>
            </div>
          </div>
        );
      case 'Marquee':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
              <Text variant="h3">Infinite Marquee</Text>
              <Text variant="small">Smooth, high-performance scrolling containers for dynamic content highlighting.</Text>
            </header>

            <div className="space-y-10">
              <Card title="Brand & Tech Stack Flow" subtitle="Horizontal scrolling with edge fading." accent="primary">
                 <div className="py-4">
                    <Marquee speed={30}>
                      <div className="flex items-center gap-12 text-slate-400 font-black text-2xl tracking-tighter italic">
                         <div className="flex items-center gap-2"><span>REACT</span><div className="w-1.5 h-1.5 rounded-full bg-sky-400"/></div>
                         <div className="flex items-center gap-2"><span>TYPESCRIPT</span><div className="w-1.5 h-1.5 rounded-full bg-blue-500"/></div>
                         <div className="flex items-center gap-2"><span>TAILWIND</span><div className="w-1.5 h-1.5 rounded-full bg-teal-400"/></div>
                         <div className="flex items-center gap-2"><span>GEMINI AI</span><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"/></div>
                         <div className="flex items-center gap-2"><span>NEXT.JS</span><div className="w-1.5 h-1.5 rounded-full bg-slate-800"/></div>
                      </div>
                    </Marquee>
                 </div>
              </Card>

              <Card title="Breaking News Ticker" subtitle="Fast directional scrolling without fading." accent="error" variant="outline">
                <Marquee speed={15} direction="right" fade={false} className="bg-rose-50 rounded-xl">
                   <div className="flex items-center gap-8 text-rose-700 font-bold uppercase tracking-widest text-xs">
                      <span>• CRITICAL SECURITY PATCH DEPLOYED TO EDGE NODES</span>
                      <span>• GEMINI 3 PRO INTEGRATION NOW LIVE</span>
                      <span>• SYSTEM PERFORMANCE INCREASED BY 42%</span>
                      <span>• NEW WORKFLOW ENGINE BETA INVITES SENT</span>
                   </div>
                </Marquee>
              </Card>

              <Card title="Unlimited Testimonials" subtitle="Custom component scrolling with hover pause." accent="info">
                 <div className="py-2">
                    <Marquee speed={40} pauseOnHover={true}>
                       {[1, 2, 3, 4].map(i => (
                         <div key={i} className="w-72 bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col gap-3 shadow-sm">
                            <Rating value={5} size="sm" readOnly />
                            <p className="text-xs text-slate-600 italic">"The component forge has transformed our internal prototyping speed. Incredible AI integration!"</p>
                            <div className="flex items-center gap-3 mt-1">
                               <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200" />
                               <div className="flex flex-col">
                                  <span className="text-[10px] font-black text-slate-700">USER_ID_{i}024</span>
                                  <span className="text-[8px] font-bold text-slate-400 uppercase">Principal Architect</span>
                               </div>
                            </div>
                         </div>
                       ))}
                    </Marquee>
                 </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card title="Hardware Accelerated" variant="flat">
                  <Text variant="small">Utilizes CSS transforms instead of left/margin offsets to ensure zero jank even with complex children.</Text>
               </Card>
               <Card title="Seamless Loops" variant="flat">
                  <Text variant="small">Internally duplicates content strings to ensure the animation cycle never shows a blank gap during resets.</Text>
               </Card>
               <Card title="Fade Masking" variant="flat">
                  <Text variant="small">Built-in SVG/Gradient masks allow for professional fade-in/out effects that automatically match container background.</Text>
               </Card>
            </div>
          </div>
        );
      case 'DataGrid':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
              <Text variant="h3">Enterprise Data Grid</Text>
              <Text variant="small">High-performance grid with native sorting, pagination, and semantic status rendering.</Text>
            </header>

            <Card title="Infrastructure Monitoring Hub" subtitle="Live edge node performance and health status.">
              <div className="py-4">
                <DataGrid 
                  columns={demoDataGridColumns} 
                  data={demoDataGridData} 
                  rowsPerPage={5}
                  onRowClick={(item) => alert(`Selected Node: ${item.nodeId}`)}
                />
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card title="Integrated Sorting" variant="flat">
                  <Text variant="small">Built-in logic for both numeric and string-based column sorting with intuitive UI feedback.</Text>
               </Card>
               <Card title="Paginated Views" variant="flat">
                  <Text variant="small">Handles large datasets by chunking data into manageable views to maintain high framerate rendering.</Text>
               </Card>
               <Card title="Custom Cells" variant="flat">
                  <Text variant="small">The render hook allows for complex logic within cells, such as progress bars or semantic status badges.</Text>
               </Card>
            </div>
          </div>
        );
      case 'Blockquote':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
              <Text variant="h3">Quotes & Callouts</Text>
              <Text variant="small">Elegant blockquotes for highlighting key insights, testimonials, or critical notices.</Text>
            </header>

            <div className="space-y-8">
              <Card title="Standard Quotation" subtitle="Default indigo variant with author attribution." accent="primary">
                 <div className="py-4">
                    <Blockquote 
                      author="Sam Altman" 
                      cite="CEO, OpenAI"
                    >
                      "The level of AI capability that we're going to see in the next few years will be the most significant technological development in human history."
                    </Blockquote>
                 </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card title="Success Notice" variant="outline" accent="success">
                  <Blockquote variant="success">
                    Performance benchmarks show a 40% reduction in token latency across all edge nodes.
                  </Blockquote>
                </Card>
                <Card title="Critical Alert" variant="outline" accent="error">
                  <Blockquote variant="error">
                    API rate limits have been reached for the current billing cycle. Immediate action required.
                  </Blockquote>
                </Card>
              </div>

              <Card title="Contextual Informational" subtitle="Using cite without author." variant="flat" accent="info">
                <Blockquote variant="info" cite="Architecture Documentation v2.5">
                  Component Forge utilizes a semantic grounding layer to ensure Gemini 3 responses are always contextually aware of the current UI state.
                </Blockquote>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card title="Decorative UI" variant="flat">
                  <Text variant="small">Features an oversized, low-opacity SVG quotation mark to provide instant visual context without cluttering the layout.</Text>
               </Card>
               <Card title="Semantic Variants" variant="flat">
                  <Text variant="small">Automatically adapts colors and borders based on StatusType, making it versatile for both content and system messages.</Text>
               </Card>
               <Card title="Typography Focus" variant="flat">
                  <Text variant="small">Utilizes a refined italic serif-style weight with optimized leading for superior readability in long-form quotes.</Text>
               </Card>
            </div>
          </div>
        );
      case 'Skeleton':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
              <Text variant="h3">Skeleton Placeholder</Text>
              <Text variant="small">Modern loading indicators that mimic actual content layout to reduce perceived latency.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Profile Card Example */}
              <Card title="Profile Loading" subtitle="Circle and Text variant combination" variant="outline">
                <div className="flex items-center gap-4 py-4">
                  <Skeleton variant="circle" width={64} height={64} />
                  <div className="flex-1">
                    <Skeleton variant="text" width="60%" height={16} />
                    <Skeleton variant="text" width="40%" height={12} />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </div>
              </Card>

              {/* Media Card Example */}
              <Card title="Article Loading" subtitle="Rect and Text variant combination" variant="outline">
                <Skeleton variant="rect" width="100%" height={120} className="mb-4" />
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" height={12} />
                <Skeleton variant="text" height={12} />
                <div className="flex gap-2 mt-4">
                   <Skeleton variant="rect" width={60} height={24} className="rounded-full" />
                   <Skeleton variant="rect" width={60} height={24} className="rounded-full" />
                </div>
              </Card>
            </div>

            <Card title="Atomic Variants" subtitle="Standard shapes for building custom layouts">
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-4">
                  <div className="flex flex-col items-center gap-2">
                    <Skeleton variant="circle" width={80} height={80} />
                    <Text variant="caption">Circle</Text>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full space-y-2">
                       <Skeleton variant="text" />
                       <Skeleton variant="text" />
                       <Skeleton variant="text" />
                    </div>
                    <Text variant="caption">Text Lines</Text>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Skeleton variant="rect" width="100%" height={80} />
                    <Text variant="caption">Rectangle Block</Text>
                  </div>
               </div>
            </Card>
          </div>
        );
      case 'AngleSlider':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
              <Text variant="h3">Rotary Controls</Text>
              <Text variant="small">High-fidelity circular angle picker for graphic adjustments, 3D rotations, and directional mapping.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Interactive Demonstration" subtitle="Drag the handle to change the angle." accent="primary">
                 <div className="py-12 flex flex-col items-center">
                    <AngleSlider 
                      label="Rotation Degree"
                      value={demoAngle} 
                      onChange={setAngle => setDemoAngle(setAngle)} 
                    />
                    <div className="mt-8 flex gap-4">
                       <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl">
                          <Text variant="caption" className="block">Current</Text>
                          <Text variant="h4" className="font-mono">{demoAngle}°</Text>
                       </div>
                       <Button variant="outline" size="sm" onClick={() => setDemoAngle(0)}>Reset</Button>
                    </div>
                 </div>
              </Card>

              <Card title="Visual Application" subtitle="Synchronized CSS transform example." variant="outline">
                <div className="h-full flex flex-col items-center justify-center p-8 space-y-8">
                   <div 
                      className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center transition-transform duration-150"
                      style={{ transform: `rotate(${demoAngle}deg)` }}
                   >
                      <svg className="w-12 h-12 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
                      </svg>
                   </div>
                   <Text variant="small" className="text-center italic text-slate-400">
                      The container above is rotated <span className="font-bold text-indigo-600">{demoAngle} degrees</span> using CSS.
                   </Text>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card title="Polar Math" variant="flat">
                  <Text variant="small">Calculates angles using `Math.atan2` for precise 360° input tracking with responsive touch support.</Text>
               </Card>
               <Card title="Design Language" variant="flat">
                  <Text variant="small">Incorporates SVG tick marks and a center readout following the Component Forge atomic design specs.</Text>
               </Card>
               <Card title="Precision" variant="flat">
                  <Text variant="small">Values are rounded to the nearest integer, ensuring consistent state updates across the rendering pipeline.</Text>
               </Card>
            </div>
          </div>
        );
      case 'ColorPicker':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
              <Text variant="h3">Advanced Color Management</Text>
              <Text variant="small">High-fidelity color选取器 with presets, hex input, and visual preview for design-heavy applications.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="System Theme Configuration" subtitle="Define the primary branding color." accent="primary">
                 <div className="py-6 flex flex-col items-center">
                    <ColorPicker 
                      label="Primary Theme Color"
                      value={themeColor} 
                      onChange={setThemeColor} 
                    />
                    <div className="mt-8 w-full p-4 rounded-xl border border-slate-100 flex items-center justify-between transition-colors duration-500" style={{ backgroundColor: `${themeColor}11` }}>
                       <div className="flex flex-col">
                          <Text variant="caption">Preview Status</Text>
                          <Text variant="small" className="font-bold" style={{ color: themeColor }}>Dynamic Theme Applied</Text>
                       </div>
                       <Button size="sm" style={{ backgroundColor: themeColor, borderColor: themeColor }}>Save Theme</Button>
                    </div>
                 </div>
              </Card>

              <Card title="Contextual Palette" subtitle="Custom presets and inline usage." variant="outline">
                <div className="space-y-8">
                   <FormControl label="Border Accent">
                      <ColorPicker 
                        value="#10b981" 
                        onChange={() => {}} 
                        presets={['#10b981', '#34d399', '#059669']}
                      />
                   </FormControl>
                   <FormControl label="Alert Highlighting">
                      <ColorPicker 
                        value="#ef4444" 
                        onChange={() => {}} 
                        presets={['#ef4444', '#dc2626', '#b91c1c']}
                      />
                   </FormControl>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card title="Hex Validation" variant="flat">
                  <Text variant="small">Built-in RegEx validation for Hex codes, ensuring users can only input valid 3 or 6 digit hexadecimal values.</Text>
               </Card>
               <Card title="Native Integration" variant="flat">
                  <Text variant="small">Leverages the system's native color engine for the actual selector, providing access to eyedropper tools and advanced sliders while keeping a custom Forge UI shell.</Text>
               </Card>
               <Card title="Responsive Design" variant="flat">
                  <Text variant="small">Optimized for touch and mouse interactions with large hit areas for presets and an easy-to-tap color preview box.</Text>
               </Card>
            </div>
          </div>
        );
      case 'Paginator':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
              <Text variant="h3">Data Navigation</Text>
              <Text variant="small">Scalable pagination controls for navigating large datasets with support for smart truncation.</Text>
            </header>

            <div className="grid grid-cols-1 gap-8">
              <Card title="Standard Pagination" subtitle="Basic usage with few pages." accent="primary">
                <div className="py-12 flex flex-col items-center gap-6">
                  <Paginator 
                    currentPage={paginatorPage} 
                    totalItems={50} 
                    itemsPerPage={10} 
                    onPageChange={setPaginatorPage} 
                  />
                  <Text variant="small" className="text-slate-400">Showing page <span className="text-indigo-600 font-bold">{paginatorPage}</span> of 5</Text>
                </div>
              </Card>

              <Card title="Smart Truncation" subtitle="Handling massive page counts (e.g. 500 pages)." accent="info">
                <div className="py-12 flex flex-col items-center gap-6">
                  <Paginator 
                    currentPage={longPaginatorPage} 
                    totalItems={5000} 
                    itemsPerPage={10} 
                    onPageChange={setLongPaginatorPage} 
                  />
                  <div className="max-w-md text-center">
                    <Text variant="small" className="text-slate-400">
                      The component automatically calculates buffer zones and adds ellipsis to maintain a fixed width even with <span className="text-indigo-600 font-bold">500 total pages</span>.
                    </Text>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Accessibility" variant="flat">
                <Text variant="small">Includes full ARIA navigation support, allowing screen readers to correctly identify pagination roles and current page states.</Text>
              </Card>
              <Card title="Haptic Feel" variant="flat">
                <Text variant="small">Features smooth scaling animations and shadow transitions on active states for a high-fidelity interaction experience.</Text>
              </Card>
              <Card title="Boundary Logic" variant="flat">
                <Text variant="small">Intelligently disables 'Next' and 'Previous' buttons at the edges of the dataset to prevent out-of-bounds requests.</Text>
              </Card>
            </div>
          </div>
        );
      case 'SplitButton':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
              <Text variant="h3">Split Actions</Text>
              <Text variant="small">A combined interface for a primary action and a secondary set of related commands.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Contextual Commands" subtitle="Standard usage in dashboards." accent="primary">
                <div className="py-6 flex flex-wrap gap-4 items-center">
                  <SplitButton 
                    label="Save Project" 
                    onClick={() => alert('Main: Project Saved')} 
                    menuItems={[
                      { label: 'Save and Deploy', onClick: () => alert('Menu: Deploying...'), icon: <span>🚀</span> },
                      { label: 'Save as Template', onClick: () => alert('Menu: Template created'), icon: <span>📄</span> },
                      { type: 'separator' },
                      { label: 'Export JSON', onClick: () => alert('Menu: Exporting...'), icon: <span>💾</span> }
                    ]}
                  />

                  <SplitButton 
                    variant="success"
                    label="Publish Changes" 
                    onClick={() => alert('Main: Published')} 
                    menuItems={[
                      { label: 'Schedule Post', onClick: () => {} },
                      { label: 'Draft Mode', onClick: () => {} }
                    ]}
                  />
                </div>
              </Card>

              <Card title="Destructive & System" subtitle="Danger variants and small sizes." accent="error">
                <div className="py-6 flex flex-wrap gap-4 items-center">
                  <SplitButton 
                    variant="danger"
                    label="Delete Repository" 
                    onClick={() => alert('Primary Delete')} 
                    menuItems={[
                      { label: 'Archive Instead', onClick: () => {}, icon: <span>📦</span> },
                      { label: 'Wipe All History', variant: 'danger', onClick: () => {} }
                    ]}
                  />

                  <SplitButton 
                    size="sm"
                    variant="secondary"
                    label="Edit Metadata" 
                    onClick={() => {}} 
                    menuItems={[
                      { label: 'View Logs', onClick: () => {} },
                      { label: 'Check Status', onClick: () => {} }
                    ]}
                  />
                </div>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Accessibility" variant="flat">
                <Text variant="small">The right-side arrow is a separate button with dedicated keyboard focus and ARIA labels, ensuring screen readers can distinguish between the main action and the menu.</Text>
              </Card>
              <Card title="Consistency" variant="flat">
                <Text variant="small">Reuses the atomic 'Button' and 'Menu' primitives to ensure styling, ripple effects, and transition timings are identical across the entire forge.</Text>
              </Card>
              <Card title="State Handling" variant="flat">
                <Text variant="small">Built-in support for loading states. When the primary action is processing, both sides of the split button are automatically synchronized to prevent duplicate triggers.</Text>
              </Card>
            </div>
          </div>
        );
      case 'NumericTextBox':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
             <header>
               <Text variant="h3">Precise Numeric Inputs</Text>
               <Text variant="small">High-fidelity inputs with steppers, boundaries, and precision formatting for mission-critical data entry.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card title="Financial Context" subtitle="Currency and pricing entry." accent="success">
                  <div className="py-4 space-y-6">
                    <NumericTextBox 
                      label="Product Unit Price"
                      value={demoPrice} 
                      onChange={setDemoPrice} 
                      min={0} 
                      step={50}
                      prefix="$"
                      precision={2}
                    />
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 flex justify-between items-center">
                       <span className="text-xs font-bold text-emerald-800 uppercase tracking-tighter">Gross Calculation</span>
                       <span className="font-mono font-bold text-emerald-700">${(demoPrice * 1.15).toFixed(2)} <span className="text-[10px] opacity-60">(+15% Tax)</span></span>
                    </div>
                  </div>
               </Card>

               <Card title="Scientific & System" subtitle="High precision and bounded values." accent="primary">
                  <div className="py-4 space-y-6">
                    <NumericTextBox 
                      label="Inference Threshold"
                      value={demoPercent} 
                      onChange={setDemoPercent} 
                      min={0} 
                      max={100}
                      suffix="%"
                      precision={1}
                    />
                    <NumericTextBox 
                      label="Quantum Coefficient"
                      value={demoPrecision} 
                      onChange={setDemoPrecision} 
                      step={0.0001}
                      precision={6}
                    />
                  </div>
               </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <Card title="Boundary Logic" variant="flat">
                  <Text variant="small">Automatically clamps values to defined min/max on blur or enter key, ensuring data integrity within system limits.</Text>
               </Card>
               <Card title="Stepper Controls" variant="flat">
                  <Text variant="small">Includes integrated micro-buttons and support for Arrow keys, allowing for quick adjustments without manual typing.</Text>
               </Card>
               <Card title="Formatting" variant="flat">
                  <Text variant="small">Built-in support for fixed precision, decimal points, and visual decorators like prefixes or suffixes.</Text>
               </Card>
            </div>
          </div>
        );
      case 'Gauges':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
             <header>
               <Text variant="h3">System Telemetry</Text>
               <Text variant="small">High-precision radial and semi-circular gauges for visualizing critical infrastructure health in real-time.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <Card title="CPU Core Load" accent="primary" hoverable className="flex items-center justify-center py-10">
                  <Gauge 
                    value={mockCpu} 
                    label="Processor" 
                    unit="%" 
                    status={mockCpu > 80 ? 'error' : mockCpu > 60 ? 'warning' : 'info'} 
                  />
               </Card>
               <Card title="Memory Usage" accent="success" hoverable className="flex items-center justify-center py-10">
                  <Gauge 
                    value={mockRam} 
                    label="ECC-RAM" 
                    unit="%" 
                    status={mockRam > 85 ? 'error' : 'success'} 
                  />
               </Card>
               <Card title="Disk I/O Rate" accent="warning" hoverable className="flex items-center justify-center py-10">
                  <Gauge 
                    value={mockNet} 
                    variant="semi" 
                    label="Throughput" 
                    unit="MB/s" 
                    max={200}
                    status="warning"
                  />
               </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card title="Precision Graphics" subtitle="SVG Arc Calculations">
                  <Text variant="small">Built using pure SVG paths, these gauges support arbitrary angles and boundaries while maintaining crisp rendering at any zoom level or resolution.</Text>
               </Card>
               <Card title="Contextual Feedback" subtitle="Dynamic Thresholds">
                  <Text variant="small">Semantic statuses allow the gauges to change color based on value thresholds, providing instant non-verbal cues for critical system states.</Text>
               </Card>
            </div>
          </div>
        );
      case 'Gantt':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
             <header>
               <Text variant="h3">Schedule Visualizer</Text>
               <Text variant="small">A professional Gantt chart for tracking task durations, overlaps, and resource allocation across a project timeline.</Text>
            </header>

            <Card title="Product Engineering Timeline" subtitle="Q4 Infrastructure Modernization Sprint">
               <div className="py-4">
                  <Gantt tasks={demoGanttTasks} totalDays={30} />
               </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card title="Progress Overlays" subtitle="Visualizing velocity">
                  <Text variant="small">Each task bar includes an internal progress fill, allowing project managers to instantly identify lagging items vs. completed milestones.</Text>
               </Card>
               <Card title="Interactive Context" subtitle="Density management">
                  <Text variant="small">Built-in tooltips and a sticky task sidebar ensure that metadata and context remain accessible even when navigating dense, high-duration schedules.</Text>
               </Card>
            </div>
          </div>
        );
      case 'TreeList':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
             <header>
               <Text variant="h3">Hierarchical Data Grid</Text>
               <Text variant="small">A sophisticated table for nested data structures with individual node controls.</Text>
            </header>

            <Card title="Project Work Breakdown Structure" subtitle="Managing complex nesting of tasks and resources.">
               <div className="py-4">
                  <TreeList 
                    data={demoTreeListData}
                    columns={demoTreeListColumns}
                  />
               </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card title="Recursive Rendering" subtitle="Deep nesting support">
                  <Text variant="small">The TreeList uses a recursive component pattern to allow for infinite levels of depth without losing column alignment integrity.</Text>
               </Card>
               <Card title="Contextual UI" subtitle="Dynamic column types">
                  <Text variant="small">Support for custom renderers in any column allows for badges, avatars, or interactive controls while maintaining the structural hierarchy.</Text>
               </Card>
            </div>
          </div>
        );
      case 'PivotGrid':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
             <header>
               <Text variant="h3">Multi-Dimensional Analysis</Text>
               <Text variant="small">A powerful data engine for summarizing complex hierarchical datasets across multiple axes.</Text>
            </header>

            <Card title="Sales Intelligence Hub" subtitle="Analyzing global revenue by region and product category.">
               <div className="py-4">
                  <PivotGrid 
                    data={demoPivotData}
                    rows={[{key: 'region', label: 'Region'}]}
                    columns={[{key: 'year', label: 'Year'}, {key: 'category', label: 'Product'}]}
                    measures={[{key: 'revenue', label: 'Revenue', aggregator: 'sum'}]}
                  />
               </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card title="Dynamic Aggregation" subtitle="Sum vs. Count">
                  <Text variant="small">Built-in support for different mathematical aggregators. The grid can automatically switch between measuring totals, averages, or record frequencies.</Text>
               </Card>
               <Card title="Fixed-Axis Scrolling" subtitle="Handling density">
                  <Text variant="small">Optimized for high-density information with sticky headers for both row dimensions and column hierarchies, ensuring context is never lost during navigation.</Text>
               </Card>
            </div>
          </div>
        );
      case 'Stepper':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
             <header>
               <Text variant="h3">Progress Stepper</Text>
               <Text variant="small">A guiding interface for multi-stage workflows with animated status transitions and branching logic support.</Text>
            </header>

            <Card title="Interactive Demonstration" subtitle="Control the flow and see state updates.">
               <div className="py-10">
                  <Stepper steps={demoSteps} currentStep={activeStep} onStepClick={setActiveStep} />
               </div>
               
               <div className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-2xl p-6 mt-4">
                  <div className="flex flex-col">
                    <Text variant="caption">Current Stage</Text>
                    <Text variant="h4" className="text-indigo-600 font-black uppercase">{demoSteps[activeStep]?.label || 'End'}</Text>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setActiveStep(prev => Math.max(0, prev - 1))} disabled={activeStep === 0}>Back</Button>
                    <Button size="sm" onClick={() => setActiveStep(prev => Math.min(demoSteps.length - 1, prev + 1))} disabled={activeStep === demoSteps.length - 1}>Next Step</Button>
                  </div>
               </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Vertical Orientation" subtitle="Ideal for sidebars or complex wizards">
                 <div className="py-4">
                    <Stepper steps={demoSteps.slice(0, 3)} currentStep={1} orientation="vertical" />
                 </div>
              </Card>
              <Card title="Customized State" subtitle="Semantic feedback and icons">
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center"><svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg></div>
                       <Text variant="small" className="font-bold text-slate-700 uppercase tracking-tighter">Status: Completed</Text>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full border-2 border-indigo-600 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"/></div>
                       <Text variant="small" className="font-bold text-slate-700 uppercase tracking-tighter">Status: Active (Processing)</Text>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center"><span className="text-[10px] font-black text-slate-300">3</span></div>
                       <Text variant="small" className="font-bold text-slate-400 uppercase tracking-tighter">Status: Pending</Text>
                    </div>
                 </div>
              </Card>
            </div>
          </div>
        );
      case 'Splitter':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 h-[600px] flex flex-col">
             <header>
               <Text variant="h3">Layout Splitter</Text>
               <Text variant="small">Fluid, resizable panel containers for dynamic application shells.</Text>
            </header>

            <Card className="flex-1 overflow-hidden" padding="none">
               <Splitter orientation="horizontal" initialSize={25} minSize={15} maxSize={40}>
                  {/* Left Sidebar Panel */}
                  <div className="bg-slate-50 h-full border-r border-slate-200">
                    <div className="p-4 border-b border-slate-200 bg-white">
                      <Text variant="caption" className="font-black text-indigo-600">Explorer</Text>
                    </div>
                    <div className="p-2">
                       <TreeView items={treeData} />
                    </div>
                  </div>

                  {/* Right Content Area (Vertical Split) */}
                  <Splitter orientation="vertical" initialSize={70}>
                    {/* Top Main Editor */}
                    <div className="h-full bg-white flex flex-col">
                       <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                         <div className="flex gap-2">
                            <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Main.tsx</span>
                            <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Styles.css</span>
                         </div>
                       </div>
                       <div className="flex-1 p-6">
                         <Editor initialValue={`// Resizable IDE Mockup\nexport function Component() {\n  return <div>Hello World</div>;\n}`} />
                       </div>
                    </div>

                    {/* Bottom Console/Terminal */}
                    <div className="h-full bg-slate-900 text-emerald-400 font-mono text-xs p-4 overflow-auto custom-scrollbar">
                      <div className="opacity-50 mb-2 border-b border-slate-800 pb-2">TERMINAL • BASH</div>
                      <div>$ npm run build</div>
                      <div className="text-white">✓ Build complete in 1.2s</div>
                      <div className="animate-pulse">_</div>
                    </div>
                  </Splitter>
               </Splitter>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 shrink-0">
               <Card title="Nested Layouts" subtitle="Unlimited depth support">
                  <Text variant="small">The Splitter component can be nested infinitely, allowing you to create complex multi-pane layouts with independent resizing logic for each section.</Text>
               </Card>
               <Card title="Orientation Support" subtitle="Horizontal & Vertical">
                  <Text variant="small">Switch between side-by-side or stacked panels with a single property. Constraints ensure your UI never breaks into unusable dimensions.</Text>
               </Card>
            </div>
          </div>
        );
      case 'Image':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
             <header>
               <Text variant="h3">Asset Container</Text>
               <Text variant="small">High-fidelity image wrapper with aspect ratio handling, lazy-load effects, and stylized filters.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Standard Variants" subtitle="Rounded corners and shadows">
                <div className="grid grid-cols-2 gap-4">
                  <Image 
                    src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=400" 
                    alt="Abstract Art" 
                    aspectRatio="1:1"
                  />
                  <Image 
                    src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=400" 
                    alt="Gradient" 
                    aspectRatio="1:1" 
                    rounded="full"
                    zoomOnHover
                  />
                </div>
                <Text variant="caption" className="mt-4 text-center block">Fixed 1:1 Aspect Ratio (Square / Circle)</Text>
              </Card>

              <Card title="Interactive Overlays" subtitle="Captions and buttons">
                <Image 
                  src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=600" 
                  alt="Cityscape" 
                  aspectRatio="16:9"
                  zoomOnHover
                  overlay={
                    <div className="absolute inset-0 bg-black/40 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white">
                        <h4 className="font-black uppercase tracking-widest text-xs">Project Alpha</h4>
                        <p className="text-[10px] opacity-80">Rendered in high-fidelity 4K</p>
                      </div>
                    </div>
                  }
                />
                <Text variant="caption" className="mt-4 text-center block">Fixed 16:9 Aspect Ratio (Video Style)</Text>
              </Card>

              <Card title="Artistic Filters" subtitle="CSS-driven aesthetics">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <Image 
                      src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=300" 
                      alt="Forest" 
                      filter="grayscale" 
                      aspectRatio="1:1"
                    />
                    <Text variant="caption" className="text-center block">Grayscale</Text>
                   </div>
                   <div className="space-y-2">
                    <Image 
                      src="https://images.unsplash.com/photo-1501854140801-50d01674aa3e?auto=format&fit=crop&q=80&w=300" 
                      alt="Hills" 
                      filter="blur" 
                      aspectRatio="1:1"
                    />
                    <Text variant="caption" className="text-center block">Soft Blur</Text>
                   </div>
                </div>
              </Card>

              <Card title="Portrait Scaling" subtitle="Mobile-first dimensions">
                <div className="flex justify-center">
                  <Image 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300" 
                    alt="Portrait" 
                    aspectRatio="9:16" 
                    className="w-48"
                    zoomOnHover
                  />
                </div>
                <Text variant="caption" className="mt-4 text-center block">9:16 Portrait Ratio</Text>
              </Card>
            </div>
          </div>
        );
      case 'SlideDeck':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
             <header>
               <Text variant="h3">Interactive SlideDeck</Text>
               <Text variant="small">A professional presentation component with overview mode, fullscreen support, and keyboard navigation.</Text>
            </header>

            <SlideDeck slides={demoSlideDeck} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card title="Shortcuts" subtitle="Keyboard interactivity">
                  <div className="space-y-2 text-xs font-mono text-slate-500">
                    <div className="flex justify-between p-2 bg-slate-50 rounded"><span>Next Slide</span><span className="bg-white px-1 border rounded shadow-sm">Space / →</span></div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded"><span>Prev Slide</span><span className="bg-white px-1 border rounded shadow-sm">←</span></div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded"><span>Overview</span><span className="bg-white px-1 border rounded shadow-sm">O</span></div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded"><span>Fullscreen</span><span className="bg-white px-1 border rounded shadow-sm">F</span></div>
                  </div>
               </Card>
               <Card title="Layout Engine" subtitle="Responsive slide compositions">
                  <Text variant="small">Supports 'Hero', 'Split', and 'Centered' layouts out of the box, with automatic dark/light background optimization based on contrast.</Text>
               </Card>
            </div>
          </div>
        );
      case 'RibbonMenu':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
             <header>
               <Text variant="h3">Command Ribbon</Text>
               <Text variant="small">A dense, productivity-focused interface for professional toolsets and complex control surfaces.</Text>
            </header>

            <Card title="Live Demonstration" subtitle="Switch tabs and explore categorized command groups.">
               <div className="py-4">
                  <RibbonMenu tabs={demoRibbonTabs} />
               </div>
               <div className="mt-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center italic text-slate-400">
                  Select a command from the ribbon above to perform an action.
               </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card title="Categorical Grouping" subtitle="Logical separation of concerns">
                  <Text variant="small">Items are grouped into semantic sections with labels at the bottom, making dense interfaces much easier to navigate and learn.</Text>
               </Card>
               <Card title="Adaptive Sizing" subtitle="Large vs. Small controls">
                  <Text variant="small">Primary actions use large tiles for visual hierarchy, while secondary or related utility actions use compact list-style controls.</Text>
               </Card>
            </div>
          </div>
        );
      case 'Ribbon':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
             <header>
               <Text variant="h3">Corner Adornments</Text>
               <Text variant="small">High-impact diagonal ribbons for highlighting specific statuses or features.</Text>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <Card padding="none" className="h-64 relative overflow-hidden group">
                  <Ribbon text="New" variant="primary" size="sm" />
                  <div className="p-6 flex flex-col items-center justify-center h-full">
                     <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                     </div>
                     <Text variant="h4">Small Ribbon</Text>
                  </div>
               </Card>

               <Card padding="none" className="h-64 relative overflow-hidden group border-emerald-100 bg-emerald-50/10">
                  <Ribbon text="Beta 2.0" variant="success" size="md" />
                  <div className="p-6 flex flex-col items-center justify-center h-full">
                     <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 group-hover:rotate-12 transition-transform">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                     </div>
                     <Text variant="h4">Medium Success</Text>
                  </div>
               </Card>

               <Card padding="none" className="h-64 relative overflow-hidden group border-rose-100 bg-rose-50/10">
                  <Ribbon text="Critical" variant="error" size="lg" />
                  <div className="p-6 flex flex-col items-center justify-center h-full">
                     <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-4 animate-pulse">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                     </div>
                     <Text variant="h4">Large Alert</Text>
                  </div>
               </Card>
            </div>

            <Card title="Positional Variants" subtitle="Ribbons can be placed on either the top-left or top-right corner.">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                  <div className="h-48 border-2 border-dashed border-slate-200 rounded-2xl relative overflow-hidden flex items-center justify-center">
                     <Ribbon text="Top Left" position="top-left" variant="info" />
                     <Text variant="small">Position: Top-Left</Text>
                  </div>
                  <div className="h-48 border-2 border-dashed border-slate-200 rounded-2xl relative overflow-hidden flex items-center justify-center">
                     <Ribbon text="Top Right" position="top-right" variant="warning" />
                     <Text variant="small">Position: Top-Right</Text>
                  </div>
               </div>
            </Card>
          </div>
        );
      case 'Controls':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
             <header>
               <Text variant="h3">Form Infrastructure</Text>
               <Text variant="small">Standardized wrappers for consistent labeling, validation, and layout logic.</Text>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Input Synergy" subtitle="TextBox + FormControl">
                <div className="space-y-6">
                  <FormControl 
                    label="Username" 
                    description="Enter a unique handle for your forge profile."
                    required
                  >
                    <TextBox placeholder="@handle" />
                  </FormControl>
                  
                  <FormControl 
                    label="Emergency Email" 
                    error="This email domain is blacklisted."
                  >
                    <TextBox value="admin@malicious.com" />
                  </FormControl>
                </div>
              </Card>

              <Card title="Selection Controls" subtitle="Dropdown + Radio + Toggle">
                <div className="space-y-6">
                   <FormControl label="Deployment Region">
                      <DropDown 
                        options={[{label: 'US East (Virginia)', value: 'us-east-1'}, {label: 'EU West (Dublin)', value: 'eu-west-1'}]} 
                        value="us-east-1" 
                        onChange={() => {}}
                      />
                   </FormControl>

                   <FormControl label="Notification Sensitivity">
                      <RadioButton 
                        name="sensitivity" 
                        options={[{id: 'low', label: 'Critical Only', value: 'low'}, {id: 'high', label: 'All Activity', value: 'high'}]} 
                        value="low" 
                        onChange={() => {}}
                      />
                   </FormControl>

                   <FormControl label="Real-time Sync" description="Enable peer-to-peer data synchronization.">
                      <ToggleButton enabled={toggleEnabled} setEnabled={setToggleEnabled} />
                   </FormControl>
                </div>
              </Card>

              <Card title="Continuous Inputs" subtitle="Slider + Range">
                <div className="space-y-8 py-2">
                  <FormControl label="Inference Precision" description="Balance between speed and accuracy.">
                    <Slider value={sliderVal} onChange={setSliderVal} />
                  </FormControl>

                  <FormControl label="Compute Threshold (ms)">
                    <Range min={0} max={2000} value={rangeVal} onChange={setRangeVal} />
                  </FormControl>
                </div>
              </Card>

              <Card title="Complex Selection" subtitle="CheckButtons">
                <FormControl label="Required Modules" description="Select the core services to include in this build.">
                  <div className="flex flex-col gap-3 mt-1">
                    <CheckButton id="c1" label="Authentication Engine" checked={checkedItems.check1} onChange={(v) => setCheckedItems({...checkedItems, check1: v})} />
                    <CheckButton id="c2" label="Vector Database Layer" checked={checkedItems.check2} onChange={(v) => setCheckedItems({...checkedItems, check2: v})} />
                    <CheckButton id="c3" label="Websocket Gateway" checked={true} onChange={() => {}} />
                  </div>
                </FormControl>
              </Card>
            </div>
          </div>
        );
      case 'Document':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
               <Text variant="h3">Document Editor Showcase</Text>
               <Text variant="small">A sophisticated interface for reading and managing structured internal knowledge.</Text>
            </header>
            <Document 
              title="Architecture Overview: Component Forge Engine"
              author="Senior Architect Team"
              date="October 25, 2025"
              status="info"
              tags={['technical', 'internal', 'v2.5']}
              content={
                <>
                  <h2>1. Introduction</h2>
                  <p>
                    Component Forge is designed as an intelligent atomic design system. It bridges the gap between static design specs 
                    and dynamic, functional code by leveraging <strong>Gemini 3 Pro</strong> reasoning.
                  </p>
                  <h2>2. Core Principles</h2>
                  <ul>
                    <li><strong>Predictability:</strong> Every component must behave consistently across all viewports.</li>
                    <li><strong>Performance:</strong> Zero-dependency core logic with lightweight CSS footprint.</li>
                    <li><strong>Intelligence:</strong> Built-in hooks for real-time data synthesis.</li>
                  </ul>
                  <h2>3. Roadmap</h2>
                  <p>
                    Phase 2 focuses on real-time collaboration and multi-speaker TTS support within the Documentation layer.
                  </p>
                  <blockquote>
                    "The future of engineering is not writing every line of code, but orchestrating the systems that do."
                  </blockquote>
                </>
              }
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
              <Card title="Typography Optimized" subtitle="Readability first">
                <Text variant="small">Features custom serif stacks and optimized line-heights for long-form technical reading.</Text>
              </Card>
              <Card title="Export Capabilities" subtitle="Multi-format support">
                <Text variant="small">Supports seamless conversion to PDF, Markdown, and clean HTML structures.</Text>
              </Card>
            </div>
          </div>
        );
      case 'Slideshow':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header>
               <Text variant="h3">Presentation Engine</Text>
               <Text variant="small">Smooth transitions and flexible slide layouts for high-impact visual delivery.</Text>
            </header>
            <Slideshow autoPlay interval={6000}>
              <Slide 
                layout="hero"
                subtitle="Vision 2025"
                title="The Future of Component Engineering"
                content="Harnessing the power of Gemini 3.0 to automate high-fidelity UI generation."
                background="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-600"
                image="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200"
              />
              <Slide 
                layout="split"
                subtitle="Technical Architecture"
                title="Atomic Design with AI Integration"
                content={
                  <div className="space-y-4">
                    <p className="text-slate-600">Our components are built on a some strict atomic structure, allowing the AI to compose complex layouts from primitive elements.</p>
                    <ul className="list-disc list-inside text-slate-500 text-sm space-y-2">
                      <li>Strict Tailwind utility constraints</li>
                      <li>Semantic HTML hierarchy</li>
                      <li>Direct access to GenAI context</li>
                      <li>Real-time visual feedback loops</li>
                    </ul>
                  </div>
                }
                image="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=600"
              />
              <Slide 
                layout="centered"
                subtitle="Conclusion"
                title="Build Smarter, Not Harder."
                content="Component Forge is more than a library—it's an intelligent workspace for the modern engineer."
                background="bg-slate-50"
              />
            </Slideshow>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Keyboard Support" subtitle="Left/Right navigation">
                <Text variant="small">The slideshow supports full keyboard accessibility for manual override during auto-play sessions.</Text>
              </Card>
              <Card title="Responsive Scaling" subtitle="Viewport optimization">
                <Text variant="small">Slides automatically adjust their internal content scaling to ensure readability across all devices.</Text>
              </Card>
            </div>
          </div>
        );
      case 'Spreadsheet':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <header>
               <Text variant="h3">Interactive Grid Engine</Text>
               <Text variant="small">A data-intensive spreadsheet container with real-time editing and navigation.</Text>
            </header>
            <Card padding="none" variant="outline" className="border-slate-200">
              <Spreadsheet data={spreadsheetDemoData} />
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Cell Validation" subtitle="Built-in data sanitization.">
                <Text variant="small">Automatically formatting strings and numbers based on column headers.</Text>
              </Card>
              <Card title="Virtual Scrolling" subtitle="Handling massive datasets.">
                <Text variant="small">Efficiently rendering 10k+ rows using viewport slicing techniques.</Text>
              </Card>
              <Card title="Formula Support" subtitle="Algebraic expression engine.">
                <Text variant="small">Supports standard functions like SUM, AVG, and conditional logic.</Text>
              </Card>
            </div>
          </div>
        );
      case 'Rectangle':
        return (
          <div className="space-y-8">
            <Card title="Rectangle Showcase" subtitle="Base geometric container with various configurations.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Text variant="caption">Default Variant</Text>
                  <Rectangle />
                </div>
                <div className="space-y-4">
                  <Text variant="caption">Accent Border & Rounded-3xl</Text>
                  <Rectangle color="bg-indigo-50" border rounded="3xl" />
                </div>
                <div className="space-y-4">
                  <Text variant="caption">Dark Gradient</Text>
                  <Rectangle color="bg-gradient-to-br from-slate-800 to-slate-900" />
                </div>
                <div className="space-y-4">
                  <Text variant="caption">Warning Flat</Text>
                  <Rectangle color="bg-amber-400" shadow={false} rounded="none" />
                </div>
              </div>
            </Card>
          </div>
        );
      case 'Circle':
        return (
          <div className="space-y-8">
            <Card title="Circle Showcase" subtitle="Standard circular elements for avatars or indicators.">
              <div className="flex flex-wrap items-center justify-around gap-8 py-10">
                <div className="flex flex-col items-center gap-4">
                  <Text variant="caption">Small</Text>
                  <Circle size="sm" color="bg-indigo-600" />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Text variant="caption">Medium Pulse</Text>
                  <Circle size="md" color="bg-emerald-500" pulse />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Text variant="caption">Large</Text>
                  <Circle size="lg" color="bg-rose-500" />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Text variant="caption">Hero (2XL)</Text>
                  <Circle size="2xl" color="bg-gradient-to-tr from-indigo-500 to-sky-500" />
                </div>
              </div>
            </Card>
          </div>
        );
      case 'Triangle':
        return (
          <div className="space-y-8">
            <Card title="Triangle Showcase" subtitle="SVG-based directional indicators.">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
                <div className="flex flex-col items-center gap-4">
                  <Text variant="caption">Up</Text>
                  <Triangle direction="up" size={80} color="#6366f1" />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Text variant="caption">Right</Text>
                  <Triangle direction="right" size={80} color="#10b981" />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Text variant="caption">Down</Text>
                  <Triangle direction="down" size={80} color="#f43f5e" />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Text variant="caption">Left</Text>
                  <Triangle direction="left" size={80} color="#f59e0b" />
                </div>
              </div>
            </Card>
          </div>
        );
      case 'Timer':
        return (
          <div className="max-w-md mx-auto py-10">
            <Card title="Interactive Timer" subtitle="Standard countdown tool for task management.">
              <Timer initialSeconds={600} />
            </Card>
          </div>
        );
      case 'Rating':
        return (
          <div className="space-y-10">
            <Card title="Interactive Feedback" subtitle="Star-based evaluation components." accent="primary">
              <div className="max-w-md py-6 space-y-8">
                <Rating 
                  label="Rate your experience" 
                  value={userRating} 
                  onChange={setUserRating} 
                  size="lg" 
                />
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                  <Text variant="small" className="text-indigo-800">
                    User selected: <span className="font-black">{userRating} stars</span>
                  </Text>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Display Only" subtitle="Static rating visualization.">
                <div className="space-y-4">
                  <Rating label="System Integrity" value={5} readOnly size="sm" />
                  <Rating label="Average Latency" value={3} readOnly size="sm" />
                </div>
              </Card>
              <Card title="Scale Variants" subtitle="Customizing max value and sizing.">
                <div className="space-y-4">
                  <Rating value={7} max={10} size="sm" label="10-Point Scale" />
                  <Rating value={1} size="md" label="Medium Alert Level" />
                </div>
              </Card>
            </div>
          </div>
        );
      case 'Board':
        return (
          <div className="space-y-8">
            <header className="flex items-center justify-between mb-2">
              <div>
                <Text variant="h3">Project Kanban</Text>
                <Text variant="small">Component Forge Sprint #14 - Q4 2025</Text>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Filters</Button>
                <Button size="sm">New Task</Button>
              </div>
            </header>
            <Board columns={demoBoard} onTaskClick={(t) => alert(`Clicked task: ${t.title}`)} />
          </div>
        );
      case 'TrackBar':
        return (
          <div className="space-y-10">
            <Card title="Calibrated Controls" subtitle="Precision input with scale visualization." accent="primary">
              <div className="max-w-xl py-6 space-y-12">
                <TrackBar 
                  label="Master Output Gain (dB)" 
                  min={-60} 
                  max={12} 
                  step={0.5} 
                  value={trackBarVal} 
                  onChange={setTrackBarVal} 
                />
                
                <TrackBar 
                  label="Reference Frequency (Hz)" 
                  min={20} 
                  max={20000} 
                  step={10} 
                  value={freqVal} 
                  onChange={setFreqVal}
                  tickInterval={2000}
                />
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Granular Precision" subtitle="Small step values for fine-tuning.">
                <TrackBar 
                  min={0} 
                  max={1} 
                  step={0.01} 
                  value={0.42} 
                  onChange={() => {}} 
                  label="Opacity"
                />
              </Card>
              <Card title="Simplified UI" subtitle="Ticks only, no labels variant.">
                <TrackBar 
                  min={0} 
                  max={10} 
                  value={5} 
                  onChange={() => {}} 
                  showLabels={false}
                  label="Snap Strength"
                />
              </Card>
            </div>
          </div>
        );
      case 'MenuBar':
        return (
          <div className="space-y-8">
            <Card title="Application MenuBar" subtitle="Classic horizontal menu structure for enterprise apps." padding="none">
              <MenuBar categories={demoMenuBar} />
              <div className="h-64 bg-slate-50 flex items-center justify-center">
                <Text variant="small">Main application content area below the MenuBar.</Text>
              </div>
            </Card>

            <Card title="Inside Window Example" subtitle="Combining MenuBar with a floating window container.">
              <Window title="VS Code - Forge Project">
                 <MenuBar categories={demoMenuBar.slice(0, 2)} className="rounded-t-lg -mx-6 -mt-6 mb-4" />
                 <div className="bg-slate-900 rounded-lg p-6 font-mono text-xs text-indigo-400">
                    <p>// Welcome to the forge workspace</p>
                    <p>const app = new ForgeApplication();</p>
                    <p>app.init();</p>
                 </div>
              </Window>
            </Card>
          </div>
        );
      case 'ToolBar':
        return (
          <div className="space-y-8">
            <Card title="Editor ToolBar" subtitle="Standard grouping of controls for rich text or graphics editors.">
              <ToolBar>
                <ToolBarGroup>
                  <Tooltip content="Bold"><Button variant="ghost" size="sm" className="px-2"><b>B</b></Button></Tooltip>
                  <Tooltip content="Italic"><Button variant="ghost" size="sm" className="px-2"><i>I</i></Button></Tooltip>
                  <Tooltip content="Underline"><Button variant="ghost" size="sm" className="px-2"><u>U</u></Button></Tooltip>
                </ToolBarGroup>
                
                <ToolBarSeparator />
                
                <ToolBarGroup>
                  <Tooltip content="Align Left"><Button variant="ghost" size="sm" className="px-2">左</Button></Tooltip>
                  <Tooltip content="Align Center"><Button variant="ghost" size="sm" className="px-2">中</Button></Tooltip>
                  <Tooltip content="Align Right"><Button variant="ghost" size="sm" className="px-2">右</Button></Tooltip>
                </ToolBarGroup>

                <ToolBarSeparator />

                <ToolBarGroup>
                   <div className="w-32"><DropDown options={[{label: 'Inter', value: 'inter'}, {label: 'Monospace', value: 'mono'}]} value="inter" onChange={() => {}} /></div>
                </ToolBarGroup>

                <div className="flex-1" />

                <ToolBarGroup>
                  <Button variant="primary" size="sm">Publish</Button>
                </ToolBarGroup>
              </ToolBar>

              <div className="mt-4 h-32 border border-slate-200 rounded-xl bg-white p-4 italic text-slate-400 text-sm">
                Start typing your content here...
              </div>
            </Card>

            <Card title="Utility ToolBar" subtitle="Flat variant often used in sidebars or footers." variant="flat">
               <ToolBar variant="flat">
                  <Button variant="ghost" size="sm">🔄</Button>
                  <Button variant="ghost" size="sm">🔍</Button>
                  <ToolBarSeparator />
                  <div className="flex-1 px-4"><Slider value={50} onChange={() => {}} /></div>
                  <ToolBarSeparator />
                  <Button variant="ghost" size="sm">⚙️</Button>
               </ToolBar>
            </Card>
          </div>
        );
      case 'Countdown':
        return (
          <div className="space-y-12">
            <Card title="Hero Countdown" subtitle="High-impact timer for major events." variant="glass" padding="lg">
              <Countdown 
                targetDate={futureDate} 
                title="MAINFRAME UPGRADE PHASE 2" 
                size="lg" 
              />
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Success Variant" subtitle="Subtle and positive progress." accent="success">
                <Countdown 
                  targetDate={futureDate} 
                  variant="success" 
                  size="md" 
                />
              </Card>

              <Card title="Critical Alert" subtitle="Urgent countdown with pulse effect." accent="error">
                <Countdown 
                  targetDate={criticalDate} 
                  variant="danger" 
                  size="md" 
                  title="EMERGENCY SHUTDOWN INITIATED"
                />
              </Card>

              <Card title="Compact View" subtitle="Fits in toolbars or sidebars." padding="sm">
                <Countdown 
                  targetDate={futureDate} 
                  size="sm" 
                />
              </Card>
            </div>
          </div>
        );
      case 'Workflow':
        return (
          <Card title="CI/CD Workflow Pipeline" subtitle="Visualizing automated build and deployment sequences." accent="primary" hoverable>
            <div className="py-4">
              <Workflow steps={demoWorkflow} />
            </div>
            <div className="mt-8 p-4 bg-slate-900 rounded-xl font-mono text-[10px] text-emerald-400 overflow-hidden relative">
               <div className="absolute top-2 right-3 flex space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-700" />
                  <div className="w-2 h-2 rounded-full bg-slate-700" />
               </div>
               <div className="opacity-60">[LOG] Attempting deployment to region us-east-1...</div>
               <div className="opacity-60">[LOG] Uploading assets to S3... 85%</div>
               <div className="animate-pulse">[RUN] node scripts/verify-checksums.js</div>
            </div>
          </Card>
        );
      case 'Graph':
        return (
          <Card 
            title="System Performance Visualizer" 
            subtitle="Real-time resource allocation and process throughput."
            accent="primary"
            hoverable
          >
            <div className="p-4">
              <Graph data={[
                { label: 'Jan', value: 450, color: 'bg-gradient-to-t from-slate-700 to-slate-500' },
                { label: 'Feb', value: 720, color: 'bg-gradient-to-t from-indigo-700 to-indigo-500' },
                { label: 'Mar', value: 380, color: 'bg-gradient-to-t from-slate-700 to-slate-500' },
                { label: 'Apr', value: 910, color: 'bg-gradient-to-t from-emerald-600 to-emerald-400' },
                { label: 'May', value: 640, color: 'bg-gradient-to-t from-indigo-700 to-indigo-500' },
                { label: 'Jun', value: 850, color: 'bg-gradient-to-t from-indigo-700 to-indigo-500' },
              ]} />
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
              <div className="text-center">
                <div className="text-[10px] font-black text-slate-400 uppercase">Avg Throughput</div>
                <div className="text-xl font-black text-slate-800">658 <span className="text-[10px] font-medium text-slate-400">MB/s</span></div>
              </div>
              <div className="text-center border-x border-slate-100">
                <div className="text-[10px] font-black text-slate-400 uppercase">Peak Load</div>
                <div className="text-xl font-black text-emerald-600">910 <span className="text-[10px] font-medium text-slate-400">REQ/s</span></div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-black text-slate-400 uppercase">Efficiency</div>
                <div className="text-xl font-black text-indigo-600">94.2 <span className="text-[10px] font-medium text-slate-400">%</span></div>
              </div>
            </div>
          </Card>
        );
      case 'Card':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card title="Default Variant" subtitle="Subtle shadow and white background" hoverable>
              <Text variant="body">The default card is perfect for grouping common dashboard elements.</Text>
            </Card>
            
            <Card title="Outline Variant" variant="outline" subtitle="No shadow, solid borders">
              <Text variant="body">Useful for secondary information that shouldn't draw too much attention.</Text>
            </Card>

            <Card title="Accent Variants" subtitle="Themed status borders" accent="primary" hoverable>
              <Text variant="body">Top border accents allow you to categorize cards by status or type.</Text>
              <div className="flex gap-2 mt-4">
                <Status type="success" label="Healthy" />
                <Status type="info" label="Active" />
              </div>
            </Card>

            <Card title="Glassmorphism" variant="glass" subtitle="Blurs the background" className="bg-gradient-to-br from-indigo-500/10 to-rose-500/10">
              <Text variant="body">Perfect for overlays or high-impact creative sections. Requires backdrop-blur support.</Text>
            </Card>

            <Card title="Interactive Card" subtitle="Click this card" hoverable onClick={() => alert('Card Clicked!')} accent="info">
              <div className="py-4 flex items-center justify-center">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                </div>
              </div>
            </Card>

            <Card title="Compact Formatting" padding="sm" subtitle="Minimal padding variant" accent="warning">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <Text variant="small">Densely packed information for toolbars or sidebars.</Text>
              </div>
            </Card>
          </div>
        );
      case 'Range':
        return (
          <Card title="Range Picker" subtitle="Dual-handled slider for selecting numeric intervals.">
            <div className="max-w-md space-y-12 py-6">
              <Range 
                label="Price Interval ($)" 
                min={0} 
                max={1000} 
                step={10} 
                value={rangeVal} 
                onChange={setRangeVal} 
              />
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                 <Text variant="caption" className="mb-2 block">Current Selection</Text>
                 <div className="flex gap-4">
                    <div className="flex-1">
                      <span className="text-[10px] text-slate-400 font-bold">MIN</span>
                      <div className="text-xl font-black text-slate-900">${rangeVal[0]}</div>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] text-slate-400 font-bold">MAX</span>
                      <div className="text-xl font-black text-slate-900">${rangeVal[1]}</div>
                    </div>
                 </div>
              </div>
            </div>
          </Card>
        );
      case 'Schedule':
        return (
          <div className="space-y-6">
            <Schedule tasks={scheduleTasks} />
            <Card title="Usage Note" subtitle="Schedule component handles overlapping tasks and high-density time management scenarios.">
               <Text variant="small">It supports multiple status types and absolute positioning based on fractional hours.</Text>
            </Card>
          </div>
        );
      case 'Job':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeJobs.map(j => <Job key={j.id} job={j} />)}
          </div>
        );
      case 'Report':
        return (
          <Report 
            title="System Audit Analysis"
            subtitle="Detailed verification of neural-net inference logs and security heartbeats."
            metrics={[
              { label: 'Efficiency', value: '98.4%', trend: 'up', status: 'success' },
              { label: 'Latency', value: '24ms', trend: 'down', status: 'info' },
              { label: 'Security', value: 'High', status: 'success' },
              { label: 'System Load', value: '42%', trend: 'up', status: 'warning' },
            ]}
            data={[
              { id: '001', service: 'Edge-Primary', uptime: '99.9%', load: '12%' },
              { id: '002', service: 'Auth-Gateway', uptime: '98.5%', load: '85%' },
              { id: '003', service: 'Database-V4', uptime: '99.9%', load: '30%' },
            ]}
          />
        );
      case 'VideoPlayer':
        return (
          <Card title="Themed Video Player" subtitle="Custom UI components for high-quality video content">
            <VideoPlayer />
          </Card>
        );
      case 'AudioPlayer':
        return (
          <Card title="Music & Audio" subtitle="Compact player for podcasts or soundtracks">
            <div className="space-y-6">
               <AudioPlayer title="Midnight Drive" artist="Neon Synthesis" />
               <AudioPlayer 
                  title="Gemini 3 Keynote" 
                  artist="Google DeepMind" 
                  cover="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=200" 
                />
            </div>
          </Card>
        );
      case 'Timeline':
        return (
          <Card title="Project Activity" subtitle="Historical audit of system events">
            <Timeline events={[
              { time: '10:30 AM', title: 'System Deployed', description: 'Version 2.5.4 successfully pushed to production edge clusters.', status: 'success' },
              { time: '09:15 AM', title: 'Security Patch', description: 'Mandatory rotation of JWT encryption keys completed.', status: 'info' },
              { time: 'Yesterday', title: 'Database Outage', description: 'A query spike in the vector DB caused a 2-minute partial service degradation.', status: 'error' },
              { time: 'Oct 12', title: 'Sprint Review', status: 'warning' },
            ]} />
          </Card>
        );
      case 'Grid':
        return (
          <Card title="Grid Playground" subtitle="Demonstrating layout flexibility across different viewports">
            {/* Added explicit null children to satisfy required props check in strict environments */}
            <Grid>{null}</Grid>
          </Card>
        );
      case 'MindMap':
        return (
          <Card title="Organic Mind Map" subtitle="Brainstorming concepts with fluid connections">
            {/* Added explicit null children to satisfy required props check in strict environments */}
            <MindMap>{null}</MindMap>
          </Card>
        );
      case 'Diagram':
        return (
          <Card title="Flow Diagram" subtitle="Visualizing automated process chains">
            {/* Added explicit null children to satisfy required props check in strict environments */}
            <Diagram>{null}</Diagram>
          </Card>
        );
      case 'Chart':
        return (
          <Card 
            title="Data Visualizers" 
            subtitle="SVG charts with high precision rendering"
            headerAction={
              <Segment 
                options={[
                  { label: 'Pie/Donut', value: 'pie' },
                  { label: 'Line Area', value: 'line' },
                ]}
                value={chartType}
                onChange={(v) => setChartType(v as any)}
              />
            }
          >
            {/* Added explicit null children to satisfy required props check in strict environments */}
            <Chart 
              type={chartType} 
              data={[
                { label: 'Cloud', value: 340, color: '#6366f1' },
                { label: 'Edge', value: 120, color: '#10b981' },
                { label: 'On-Prem', value: 85, color: '#f59e0b' },
                { label: 'Hybrid', value: 195, color: '#ec4899' },
              ]} 
            >{null}</Chart>
          </Card>
        );
      case 'ScrollBar':
        return (
          <div className="space-y-8">
            <Card title="Vertical Scroll Area" subtitle="Custom scrollbar with smooth utility actions">
              <ScrollArea height="250px">
                <div className="space-y-4">
                  <Text variant="h3">Long Form Content Example</Text>
                  {Array.from({ length: 15 }).map((_, i) => (
                    <p key={i} className="text-sm text-slate-500">
                      Paragraph {i + 1}: This container utilizes the .custom-scrollbar class defined in our global styles. 
                      It features a smooth indigo thumb and a transparent track for a modern, minmal aesthetic.
                    </p>
                  ))}
                  <Text variant="h4" className="pt-4">End of Document</Text>
                </div>
              </ScrollArea>
            </Card>

            <Card title="Horizontal Scroll Area" subtitle="Useful for large datasets or image carousels">
              <ScrollArea height="auto" horizontal>
                <div className="inline-flex space-x-4 py-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="w-48 h-32 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      Item {i + 1}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        );
      case 'TextBox':
        return (
          <Card title="Input Components" subtitle="Standard text and textarea fields">
            <div className="space-y-6 max-w-md">
              <TextBox 
                label="Email Address" 
                placeholder="you@example.com" 
                value={textBoxValue}
                onChange={(e) => setTextBoxValue(e.target.value)}
              />
              <TextBox 
                label="Project Description" 
                multiline 
                placeholder="Describe your goals..." 
              />
              <TextBox 
                label="API Key" 
                error="Invalid API key detected" 
                value="sk-1234567890" 
                readOnly
              />
            </div>
          </Card>
        );
      case 'Slider':
        return (
          <Card title="Range Selection" subtitle="Tactile slider for numeric input">
            <div className="max-w-md space-y-8 py-4">
              <Slider label="Volume" value={sliderVal} onChange={setSliderVal} />
              <Slider label="Brightness" min={0} max={10} step={0.5} value={sliderVal / 10} onChange={(v) => setSliderVal(v * 10)} />
            </div>
          </Card>
        );
      case 'ProgressBar':
        return (
          <Card title="Progress Indicators" subtitle="Visualizing completion states">
            <div className="space-y-8 max-w-md">
              <ProgressBar label="System Health" progress={sliderVal} />
              <ProgressBar label="Deployment" progress={75} variant="success" />
              <ProgressBar label="Critical Tasks" progress={30} variant="error" />
              <ProgressBar label="Disk usage" progress={90} variant="warning" />
            </div>
          </Card>
        );
      case 'Dialog':
        return (
          <Card title="Modals" subtitle="Overlays for critical interactions">
            <div className="py-10 text-center">
              <Button onClick={() => setIsDialogOpen(true)}>Open Confirmation Dialog</Button>
              <Dialog 
                isOpen={isDialogOpen} 
                onClose={() => setIsDialogOpen(false)}
                title="Save Changes?"
                description="Are you sure you want to save the current configuration to the cloud?"
              >
                <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg flex items-start space-x-3">
                  <span className="text-amber-500 text-lg">⚠️</span>
                  <p className="text-xs text-amber-800">Saving this will overwrite your previous build settings. This action is not reversible.</p>
                </div>
              </Dialog>
            </div>
          </Card>
        );
      case 'Segment':
        return (
          <Card title="Segmented Control" subtitle="Toggling between exclusive views">
            <div className="space-y-6">
              <Segment 
                options={[
                  { label: 'Monthly', value: 'monthly' },
                  { label: 'Quarterly', value: 'quarterly' },
                  { label: 'Yearly', value: 'yearly' },
                ]}
                value={segmentVal}
                onChange={setSegmentVal}
              />
              <p className="text-sm text-slate-500">Active View: <span className="font-bold text-indigo-600">{segmentVal}</span></p>
            </div>
          </Card>
        );
      case 'Tooltip':
        return (
          <Card title="Context Tooltips" subtitle="Hover feedback components">
            <div className="flex flex-wrap gap-10 py-10">
              <Tooltip content="Deletes the current entry forever">
                <Button variant="danger">Delete Item</Button>
              </Tooltip>
              <Tooltip content="Sync with cloud storage" position="bottom">
                <Button variant="outline">Cloud Sync</Button>
              </Tooltip>
              <Tooltip content="View detailed analytics" position="right">
                <div className="p-3 bg-indigo-50 rounded-lg cursor-help text-indigo-600 font-bold">Hover Me</div>
              </Tooltip>
            </div>
          </Card>
        );
      case 'Tab':
        return (
          <Card title="Tab Navigation" subtitle="Switchable content panes">
            <div className="space-y-8">
              <div className="space-y-2">
                <Text variant="caption">Underline Variant</Text>
                <Tab tabs={appTabs} activeTab={currentAppTab} onTabChange={setCurrentAppTab} variant="underline" />
              </div>
              <div className="space-y-2">
                <Text variant="caption">Pills Variant</Text>
                <Tab tabs={appTabs} activeTab={currentAppTab} onTabChange={setCurrentAppTab} variant="pills" />
              </div>
            </div>
          </Card>
        );
      case 'Editor':
        return (
          <Card title="Code Editor" subtitle="Monospace text with syntax feel">
            <Editor initialValue={`import { GoogleGenAI } from "@google/genai";\n\nconst ai = new GoogleGenAI({ apiKey: process.env.API_KEY });\n\nasync function main() {\n  const response = await ai.models.generateContent({\n    model: "gemini-3-flash-preview",\n    contents: "Hello world!",\n  });\n  console.log(response.text);\n}`} />
          </Card>
        );
      case 'Paint':
        return (
          <Card title="Sketch Pad" subtitle="Interactive HTML5 canvas sketching">
            <Paint />
          </Card>
        );
      case 'Node':
        return (
          <Card title="Flow Nodes" subtitle="Visual logic building blocks">
            <div className="flex flex-wrap gap-10 justify-center p-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <Node title="API Request" type="input" status="success">Fetch data from Gemini endpoint.</Node>
              <Node title="Logic Processor" type="logic" status="info">Transform raw bytes to JSON.</Node>
              <Node title="Error Handler" type="logic" status="error">Catch and log failures.</Node>
              <Node title="Terminal Output" type="output" status="warning">Display result to user.</Node>
            </div>
          </Card>
        );
      case 'Calendar':
        return (
          <Card title="Event Calendar" subtitle="Date-based scheduling view">
            <Calendar events={[
              { date: '2025-10-12', title: 'Gemini Hackathon', type: 'info' },
              { date: '2025-10-15', title: 'System Maintenance', type: 'warning' },
              { date: '2025-10-21', title: 'Project Launch', type: 'success' },
            ]} />
          </Card>
        );
      case 'Color':
        return (
          <Card title="Color Picker" subtitle="Selection swatches and hex control">
            <Color value={activeColor} onChange={setActiveColor} />
          </Card>
        );
      case 'Icon':
        return (
          <Card title="Icon Gallery" subtitle="Standard SVG interface icons">
            <Icon />
          </Card>
        );
      case 'Table':
        return (
          <Card title="Simple Table" subtitle="Semantic HTML table data">
            <Table 
              headers={['ID', 'Name', 'Role', 'Status']} 
              data={[
                { id: '001', name: 'Alice', role: 'Dev', status: 'Online' },
                { id: '002', name: 'Bob', role: 'Design', status: 'Away' },
                { id: '003', name: 'Charlie', role: 'Manager', status: 'Offline' },
              ]} 
            />
          </Card>
        );
      case 'DropDown':
        return (
          <Card title="Custom Select" subtitle="Styled dropdown for single selection">
            <div className="max-w-xs space-y-4">
              <DropDown 
                label="Preferred Framework" 
                options={[
                  { label: 'React Framework', value: 'react' },
                  { label: 'Vue.js', value: 'vue' },
                  { label: 'Angular', value: 'angular' },
                ]} 
                value={selectedDropdown} 
                onChange={setSelectedDropdown} 
              />
              <p className="text-xs text-slate-400">Selected: <span className="font-bold text-indigo-600 uppercase">{selectedDropdown}</span></p>
            </div>
          </Card>
        );
      case 'ComboBox':
        return (
          <Card title="Searchable ComboBox" subtitle="Hybrid input with filtering results">
            <div className="max-w-md">
              <ComboBox 
                label="Find a Library" 
                options={[
                  { label: 'React', value: 'react' },
                  { label: 'Redux', value: 'redux' },
                  { label: 'Tailwind', value: 'tailwind' },
                  { label: 'Gemini AI', value: 'gemini' },
                ]} 
                onSelect={(val) => alert(`Selected: ${val}`)} 
              />
            </div>
          </Card>
        );
      case 'StatusBar':
        return (
          <Card title="System Status Bar" subtitle="Application footer feedback">
            <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
              <p className="text-slate-500">The status bar is currently active at the bottom of the screen.</p>
            </div>
          </Card>
        );
      case 'SideBar':
        return (
          <Card title="Internal Navigation" subtitle="Secondary layout sidebar component">
            <div className="flex h-64 border border-slate-200 rounded-xl overflow-hidden bg-white">
              <SideBar items={sidebarItems} activeId={innerSideBarTab} onSelect={setInnerSideBarTab} />
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                <Text variant="h4">Current View: {innerSideBarTab.toUpperCase()}</Text>
                <Text variant="small">Secondary content area within a sidebar layout.</Text>
              </div>
            </div>
          </Card>
        );
      case 'Window':
        return (
          <div className="max-w-2xl mx-auto py-10">
            <Window title="Developer Terminal" icon={<span>💻</span>}>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-emerald-400 text-sm">
                <p>$ npm install @google/genai</p>
                <p className="text-slate-500">Installing dependencies...</p>
                <p>$ gemini build --mode production</p>
                <p className="text-white mt-2">✓ Application successfully built in 142ms</p>
              </div>
            </Window>
          </div>
        );
      case 'Text':
        return (
          <Card title="Typography System" subtitle="Variants and hierarchies">
            <div className="space-y-6">
              <Text variant="h1">Level 1 Heading</Text>
              <Text variant="h2">Level 2 Heading</Text>
              <Text variant="h3">Level 3 Subheading</Text>
              <Text variant="h4">Level 4 Minor Heading</Text>
              <Text variant="body">Standard body text for readable paragraphs.</Text>
              <Text variant="small">Small utility text for metadata.</Text>
              <Text variant="caption">Capitalized Caption Labels</Text>
            </div>
          </Card>
        );
      case 'TreeView':
        return <Card title="Tree View" subtitle="Hierarchical data structure"><TreeView items={treeData} /></Card>;
      case 'ListView':
        return <Card title="List View" subtitle="Sequential item display"><ListView items={listData} onItemClick={(i) => alert(i.title)} /></Card>;
      case 'DataTable':
        return <Card title="Data Table" subtitle="Structured tabular data"><DataTable columns={tableColumns} data={tableData} /></Card>;
      case 'Button':
        return (
          <Card title="Buttons" subtitle="Interactive action triggers">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
              <Button isLoading>Loading</Button>
            </div>
          </Card>
        );
      case 'Breadcrumbs':
        return <Card title="Breadcrumbs" subtitle="Path navigation"><Breadcrumbs items={[{label: 'Forge'}, {label: activeTab}]} /></Card>;
      case 'RadioButton':
        return (
          <Card title="Radio Group" subtitle="Single selection options">
            <RadioButton name="app_radio" options={radioOptions} value={selectedRadio} onChange={setSelectedRadio} />
          </Card>
        );
      case 'CheckButton':
        return (
          <Card title="Checkbox" subtitle="Multiple selection toggle">
            <div className="flex flex-col gap-4">
              <CheckButton id="c1" label="Newsletter" checked={checkedItems.check1} onChange={(v) => setCheckedItems({...checkedItems, check1: v})} />
              <CheckButton id="c2" label="Notifications" checked={checkedItems.check2} onChange={(v) => setCheckedItems({...checkedItems, check2: v})} />
            </div>
          </Card>
        );
      case 'ToggleButton':
        return <Card title="Toggle" subtitle="Binary state switch"><ToggleButton enabled={toggleEnabled} setEnabled={setToggleEnabled} label="Dark Mode" /></Card>;
      case 'Menu':
        return <Card title="Menu" subtitle="Overlay navigation with groups and disabled states"><Menu trigger={<Button variant="outline">Open Advanced Menu</Button>} items={menuItems} /></Card>;
      case 'Status':
        return (
          <Card title="Status" subtitle="Visual state badges">
            <div className="flex gap-2">
              <Status type="success" label="Healthy" />
              <Status type="warning" label="Warning" />
              <Status type="error" label="Error" />
              <Status type="info" label="Info" />
            </div>
          </Card>
        );
      case 'Overview':
      default:
        return (
          <div className="space-y-8 animate-in fade-in duration-500 pb-12">
             <Card title="Welcome to Component Forge" subtitle="An AI-powered design system playground">
                <div id="welcome-text">
                  <Text variant="body">
                    Explore our comprehensive suite of enterprise UI components. This playground is built to showcase high-quality, 
                    responsive, and accessible React components designed with Tailwind CSS and integrated with Google's Gemini API.
                  </Text>
                </div>
             </Card>

             <Card 
              id="ai-lab-card"
              title="AI Content Lab" 
              subtitle="Generate dynamic data with Gemini"
              headerAction={
                <Button size="sm" onClick={async () => {
                  setIsGenerating(true);
                  const res = await generateDemoContent("A modern landing page description");
                  setGeneratedData(res);
                  setIsGenerating(false);
                }} isLoading={isGenerating}>Generate Data</Button>
              }
            >
              {generatedData ? (
                <div className="space-y-2">
                  <Text variant="h3">{generatedData.title}</Text>
                  <Text variant="body">{generatedData.description}</Text>
                  <div className="flex gap-2 pt-2">
                    {generatedData.tags.map(t => <Status key={t} type="info" label={t} />)}
                  </div>
                </div>
              ) : <div className="p-8 text-center text-slate-400 italic">No data generated yet. Click the button above to test Gemini integration.</div>}
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col bg-slate-50">
      <div className="max-w-7xl mx-auto w-full space-y-10 flex-grow pb-16">
        <header id="app-header" className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8 bg-white/50 backdrop-blur-sm -mx-4 px-4 sticky top-0 z-50">
          <div>
            <Breadcrumbs items={[{label: 'Forge'}, {label: activeTab}]} />
            <Text variant="h1">Component Forge</Text>
            <Text variant="small">High-fidelity UI components for professional applications.</Text>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => window.open('https://github.com', '_blank')}>Source</Button>
            <Button size="sm">Download</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <aside id="component-sidebar" className="lg:col-span-3">
            <div className="sticky top-32 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
              <nav className="flex flex-col space-y-1.5">
                <Text variant="caption" className="mb-2 px-2">Navigation</Text>
                {componentsList.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveTab(item)}
                    className={`flex items-center px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      activeTab === item
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                        : 'text-slate-600 hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-9 space-y-6">
             <div className="flex items-center justify-between">
                <Text variant="h2">{activeTab}</Text>
                {activeTab !== 'Overview' && <Button variant="ghost" size="sm" onClick={() => setActiveTab('Overview')}>← Overview</Button>}
             </div>
             {renderContent()}
          </main>
        </div>
      </div>
      
      <div id="status-bar-bottom">
        <StatusBar 
          status="CONNECTED" 
          items={[
            {label: 'View', value: activeTab},
            {label: 'Lang', value: 'TypeScript'}
          ]} 
        />
      </div>

      <Tour 
        steps={demoTourSteps} 
        isActive={isTourActive} 
        onFinish={() => setIsTourActive(false)} 
        onCancel={() => setIsTourActive(false)} 
      />
    </div>
  );
};

export default App;
