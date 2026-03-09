"use client";

import { useEffect, useState, useRef } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Building2,
  Users,
  Package,
  TrendingUp,
  Truck,
  Wallet,
  MapPin,
  Coffee,
  Wheat,
  Sparkles,
  Cookie,
  CircleDot,
  CheckCircle2,
  Clock,
  ArrowRight,
  Activity,
  Zap,
  Globe,
  Database,
  Layers,
  ShieldCheck,
  Leaf,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { SMART_VILLAGE_DASHBOARD } from "@/data/mocks";

// =====================
// Animated Counter Hook
// =====================
function useAnimatedCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  const animateCount = () => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!startOnView) {
      animateCount();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          animateCount();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasStarted, startOnView]);

  return { count, ref };
}

// =====================
// Format Functions
// =====================
function formatCurrency(value: number): string {
  if (value >= 1000000000000) {
    return `Rp${(value / 1000000000000).toFixed(1)}T`;
  }
  if (value >= 1000000000) {
    return `Rp${(value / 1000000000).toFixed(1)}M`;
  }
  if (value >= 1000000) {
    return `Rp${(value / 1000000).toFixed(1)}Jt`;
  }
  return `Rp${value.toLocaleString("id-ID")}`;
}

function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}Jt`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}Rb`;
  }
  return value.toLocaleString("id-ID");
}

// =====================
// Stat Card Component
// =====================
function StatCard({
  title,
  value,
  suffix,
  icon: Icon,
  color,
  trend,
  delay = 0,
}: {
  title: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
  color: string;
  trend?: number;
  delay?: number;
}) {
  const { count, ref } = useAnimatedCounter(value);

  return (
    <Card
      ref={ref}
      className="relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${color}, transparent 50%)`,
        }}
      />
      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <div className="flex items-baseline gap-1">
              <span
                className="text-3xl font-bold tabular-nums"
                style={{ color }}
              >
                {count.toLocaleString("id-ID")}
              </span>
              {suffix && (
                <span className="text-lg text-muted-foreground">{suffix}</span>
              )}
            </div>
            {trend !== undefined && (
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp
                  className={`h-3 w-3 ${trend >= 0 ? "text-green-500" : "text-red-500"}`}
                />
                <span className={trend >= 0 ? "text-green-500" : "text-red-500"}>
                  {trend >= 0 ? "+" : ""}{trend}%
                </span>
                <span className="text-muted-foreground">vs bulan lalu</span>
              </div>
            )}
          </div>
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="h-6 w-6" style={{ color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// =====================
// Province Map Placeholder
// =====================
function ProvinceMap() {
  const provinces = SMART_VILLAGE_DASHBOARD.villageStats;
  
  // Simulated map dots for provinces
  const mapDots = [
    { x: 45, y: 75, count: 5941, name: "Jawa Barat" },
    { x: 50, y: 78, count: 8559, name: "Jawa Tengah" },
    { x: 58, y: 80, count: 8503, name: "Jawa Timur" },
    { x: 35, y: 35, count: 6263, name: "Sumatera Utara" },
    { x: 62, y: 70, count: 3033, name: "Sulawesi Selatan" },
    { x: 25, y: 55, count: 4500, name: "Sumatera Barat" },
    { x: 40, y: 68, count: 3800, name: "Lampung" },
    { x: 55, y: 75, count: 4200, name: "DIY" },
    { x: 48, y: 72, count: 3100, name: "Banten" },
    { x: 65, y: 45, count: 2900, name: "Kalimantan Timur" },
  ];

  return (
    <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Distribusi Desa per Provinsi
            </CardTitle>
            <CardDescription>Pemetaan 83.763 desa di seluruh Indonesia</CardDescription>
          </div>
          <Badge variant="outline" className="gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Real-time
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Map Placeholder */}
        <div className="relative aspect-[16/10] bg-gradient-to-br from-muted/50 to-muted rounded-xl overflow-hidden mb-6">
          {/* Indonesia outline simulation */}
          <svg
            viewBox="0 0 100 60"
            className="w-full h-full opacity-20"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M15,30 Q20,25 25,28 Q30,32 35,30 Q40,28 42,32 L45,35 Q48,38 52,36 L55,32 Q58,30 62,33 L65,38 Q68,42 72,40 L75,35 Q78,32 82,35 L85,40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary"
            />
          </svg>
          
          {/* Province dots */}
          {mapDots.map((dot, index) => (
            <div
              key={index}
              className="absolute group cursor-pointer"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="rounded-full animate-pulse"
                style={{
                  width: `${Math.max(8, dot.count / 500)}px`,
                  height: `${Math.max(8, dot.count / 500)}px`,
                  backgroundColor: `rgba(212, 175, 55, ${Math.min(0.8, dot.count / 10000)})`,
                  boxShadow: `0 0 ${dot.count / 500}px rgba(212, 175, 55, 0.5)`,
                }}
              />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                {dot.name}: {dot.count.toLocaleString("id-ID")} desa
              </div>
            </div>
          ))}
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 text-xs">
            <p className="font-medium mb-2">Intensitas Desa</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                <span className="text-muted-foreground">Rendah</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="text-muted-foreground">Sedang</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-yellow-500" />
                <span className="text-muted-foreground">Tinggi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Provinces List */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Top 5 Provinsi</h4>
          <div className="space-y-2">
            {provinces.map((province, index) => (
              <div
                key={province.province}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                    style={{
                      backgroundColor: index === 0 ? "#D4AF3720" : "transparent",
                      color: index === 0 ? "#D4AF37" : "inherit",
                    }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{province.province}</p>
                    <p className="text-xs text-muted-foreground">
                      {province.memberCount.toLocaleString("id-ID")} anggota
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{province.villageCount.toLocaleString("id-ID")}</p>
                  <p className="text-xs text-muted-foreground">desa</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// =====================
// Commodity Breakdown Chart
// =====================
const commodityChartConfig = {
  value: {
    label: "Nilai Produksi",
  },
  kopi: {
    label: "Kopi",
    color: "#8B4513",
  },
  beras: {
    label: "Beras",
    color: "#DAA520",
  },
  rempah: {
    label: "Rempah",
    color: "#DC143C",
  },
  coklat: {
    label: "Coklat",
    color: "#8B0000",
  },
  kelapa: {
    label: "Kelapa",
    color: "#228B22",
  },
} satisfies ChartConfig;

function CommodityBreakdown() {
  const commodities = SMART_VILLAGE_DASHBOARD.commodityBreakdown;
  
  const chartData = commodities.map((c) => ({
    name: c.name,
    value: c.value / 1000000000,
    volume: c.volume,
    growth: c.growth,
    fill:
      c.name === "Kopi"
        ? "#8B4513"
        : c.name === "Beras"
        ? "#DAA520"
        : c.name === "Rempah"
        ? "#DC143C"
        : c.name === "Coklat"
        ? "#8B0000"
        : "#228B22",
  }));

  const iconMap: Record<string, React.ElementType> = {
    Coffee: Coffee,
    Wheat: Wheat,
    Sparkles: Sparkles,
    Cookie: Cookie,
    CircleDot: CircleDot,
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Komoditas Unggulan
        </CardTitle>
        <CardDescription>Distribusi nilai produksi per komoditas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bar Chart */}
        <ChartContainer config={commodityChartConfig} className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" barSize={24}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                tickLine={false}
                axisLine={false}
                width={70}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name, item) => (
                      <div className="text-xs">
                        <p className="font-medium">{item.payload.name}</p>
                        <p>Nilai: Rp{value.toFixed(0)}M</p>
                        <p>Volume: {item.payload.volume.toLocaleString("id-ID")} ton</p>
                        <p className="text-green-500">+{item.payload.growth}% growth</p>
                      </div>
                    )}
                  />
                }
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Commodity Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {commodities.map((commodity) => {
            const Icon = iconMap[commodity.icon] || Package;
            return (
              <div
                key={commodity.name}
                className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-green-600 bg-green-500/10">
                    +{commodity.growth}%
                  </Badge>
                </div>
                <h4 className="font-semibold mb-1">{commodity.name}</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    Volume: <span className="text-foreground font-medium">{commodity.volume.toLocaleString("id-ID")} ton</span>
                  </p>
                  <p className="text-muted-foreground">
                    Nilai: <span className="text-foreground font-medium">{formatCurrency(commodity.value)}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// =====================
// Logistics Stat Item
// =====================
function LogisticsStatItem({
  stat,
  index,
}: {
  stat: {
    label: string;
    value: number;
    suffix?: string;
    prefix?: string;
    icon: React.ElementType;
    color: string;
  };
  index: number;
}) {
  const adjustedValue = stat.value >= 1000000 ? Math.floor(stat.value / 1000) : stat.value;
  const { count, ref } = useAnimatedCounter(adjustedValue);
  const displayValue =
    stat.value >= 1000000
      ? `${count}K`
      : stat.prefix
      ? `${stat.prefix}${count}`
      : count;

  return (
    <div
      ref={ref}
      className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all text-center group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
        style={{ backgroundColor: `${stat.color}20` }}
      >
        <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
      </div>
      <p className="text-2xl font-bold tabular-nums">{displayValue}</p>
      <p className="text-xs text-muted-foreground">{stat.label}</p>
    </div>
  );
}

// =====================
// Logistics Status Section
// =====================
function LogisticsStatus() {
  const { logisticsStatus } = SMART_VILLAGE_DASHBOARD;
  
  const stats = [
    {
      label: "Total Paket",
      value: logisticsStatus.totalPackages,
      icon: Package,
      color: "#3b82f6",
    },
    {
      label: "Terkirim",
      value: logisticsStatus.deliveredPackages,
      icon: CheckCircle2,
      color: "#22c55e",
    },
    {
      label: "Agen Aktif",
      value: logisticsStatus.activeAgents,
      icon: Users,
      color: "#D4AF37",
    },
    {
      label: "Rata-rata Pengiriman",
      value: logisticsStatus.averageDeliveryTime,
      suffix: "hari",
      icon: Truck,
      color: "#f59e0b",
    },
    {
      label: "Total Komisi",
      value: logisticsStatus.commission,
      prefix: "Rp",
      icon: Wallet,
      color: "#8b5cf6",
    },
  ];

  const deliveryRate = (logisticsStatus.deliveredPackages / logisticsStatus.totalPackages) * 100;

  return (
    <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              Status Logistik
            </CardTitle>
            <CardDescription>Monitoring pengiriman real-time</CardDescription>
          </div>
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <Activity className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Delivery Progress */}
        <div className="p-4 rounded-xl bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Tingkat Pengiriman Sukses</span>
            <span className="text-2xl font-bold text-green-500">{deliveryRate.toFixed(1)}%</span>
          </div>
          <Progress value={deliveryRate} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {logisticsStatus.deliveredPackages.toLocaleString("id-ID")} dari{" "}
            {logisticsStatus.totalPackages.toLocaleString("id-ID")} paket terkirim
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <LogisticsStatItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// =====================
// Roadmap Progress Section
// =====================
function RoadmapProgress() {
  const { roadmapProgress } = SMART_VILLAGE_DASHBOARD;

  const statusColors = {
    COMPLETED: { bg: "bg-green-500", text: "text-green-500", label: "Completed" },
    IN_PROGRESS: { bg: "bg-yellow-500", text: "text-yellow-500", label: "In Progress" },
    UPCOMING: { bg: "bg-gray-400", text: "text-muted-foreground", label: "Upcoming" },
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          Roadmap Integrasi Desa
        </CardTitle>
        <CardDescription>Progress menuju 83.763 desa terintegrasi</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {roadmapProgress.map((phase, index) => {
          const status = statusColors[phase.status];
          return (
            <div
              key={phase.phase}
              className="relative p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      phase.status === "COMPLETED"
                        ? "bg-green-500/20"
                        : phase.status === "IN_PROGRESS"
                        ? "bg-yellow-500/20"
                        : "bg-muted"
                    }`}
                  >
                    {phase.status === "COMPLETED" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : phase.status === "IN_PROGRESS" ? (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{phase.phase}</h4>
                      <Badge variant="outline" className="text-xs">
                        {phase.year}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{phase.target}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`${status.text} border-current`}
                >
                  {status.label}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className={`font-medium ${status.text}`}>{phase.progress}%</span>
                </div>
                <Progress
                  value={phase.progress}
                  className={`h-2 ${phase.status === "COMPLETED" ? "[&>div]:bg-green-500" : ""}`}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

// =====================
// Village Category Item
// =====================
function VillageCategoryItem({
  category,
}: {
  category: {
    name: string;
    count: number;
    color: string;
    icon: React.ElementType;
    description: string;
  };
}) {
  const { count, ref } = useAnimatedCounter(category.count);

  return (
    <div
      ref={ref}
      className="relative p-4 rounded-xl border border-border/50 hover:border-border transition-all group overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
        style={{ backgroundColor: category.color }}
      />
      <div className="relative flex items-start gap-4">
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: `${category.color}15` }}
        >
          <category.icon className="h-6 w-6" style={{ color: category.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <Badge
              variant="outline"
              className="font-medium"
              style={{ borderColor: category.color, color: category.color }}
            >
              {category.name}
            </Badge>
          </div>
          <p className="text-2xl font-bold tabular-nums mb-1">
            {count.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-muted-foreground">{category.description}</p>
        </div>
      </div>
    </div>
  );
}

// =====================
// Village Categories Section
// =====================
function VillageCategories() {
  const categories = [
    {
      name: "Desa Terintegrasi Penuh",
      count: 12450,
      color: "#22c55e",
      icon: ShieldCheck,
      description: "Semua komponen terintegrasi dan aktif",
    },
    {
      name: "Desa Onboarding",
      count: 28500,
      color: "#3b82f6",
      icon: Clock,
      description: "Dalam proses integrasi sistem",
    },
    {
      name: "Desa Pilot",
      count: 5200,
      color: "#D4AF37",
      icon: Zap,
      description: "Program percontohan berhasil",
    },
    {
      name: "Desa Target",
      count: 37613,
      color: "#8b5cf6",
      icon: TargetIcon,
      description: "Target integrasi mendatang",
    },
  ];

  return (
    <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Kategori Desa
        </CardTitle>
        <CardDescription>Status integrasi 83.763 desa</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category) => (
            <VillageCategoryItem key={category.name} category={category} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

// =====================
// Main Page Component
// =====================
export default function SmartVillagePage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { summary } = SMART_VILLAGE_DASHBOARD;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 py-12 lg:py-16 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Badge */}
            <div className="flex justify-center">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2" />
                Live Data • Blockchain Verified
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-gradient-gold">Smart Village</span>
              <br />
              <span className="text-foreground">Dashboard</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Pemantauan Real-time{" "}
              <span className="text-primary font-semibold">83.763 Desa Indonesia</span>
            </p>

            {/* Last Updated */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last updated: {currentTime.toLocaleString("id-ID", {
                dateStyle: "medium",
                timeStyle: "medium",
              })}</span>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">38 Provinsi</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
                <Database className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium">8.500 Komponen</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
                <Leaf className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Rp2.5T Produksi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Stats Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <StatCard
            title="Total Desa"
            value={summary.totalVillages}
            icon={Building2}
            color="#D4AF37"
            trend={12.5}
            delay={0}
          />
          <StatCard
            title="Anggota Terdaftar"
            value={summary.totalMembers}
            suffix="+"
            icon={Users}
            color="#3b82f6"
            trend={23.8}
            delay={100}
          />
          <StatCard
            title="Komponen Terintegrasi"
            value={summary.integratedComponents}
            icon={Layers}
            color="#8b5cf6"
            trend={18.2}
            delay={200}
          />
          <StatCard
            title="Nilai Produksi"
            value={summary.productionValue}
            suffix=""
            icon={TrendingUp}
            color="#22c55e"
            trend={15.3}
            delay={300}
          />
          <StatCard
            title="Agen Aktif"
            value={summary.activeAgents}
            icon={Truck}
            color="#f59e0b"
            trend={8.7}
            delay={400}
          />
          <StatCard
            title="Volume Transaksi"
            value={summary.transactionVolume}
            suffix=""
            icon={Wallet}
            color="#DC143C"
            trend={32.1}
            delay={500}
          />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Province Map */}
          <ProvinceMap />

          {/* Commodity Breakdown */}
          <CommodityBreakdown />
        </div>
      </section>

      {/* Logistics & Roadmap */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LogisticsStatus />
          <RoadmapProgress />
        </div>
      </section>

      {/* Village Categories */}
      <section className="container mx-auto px-4 py-8">
        <VillageCategories />
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-8 lg:p-12">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="relative max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Siap Berpartisipasi dalam{" "}
              <span className="text-gradient-gold">Smart Village</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Bergabung dengan ribuan desa yang telah terintegrasi dalam ekosistem KNMP
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2 px-8">
                <MapPin className="h-5 w-5" />
                Lihat Desa Anda
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 px-8 border-secondary text-secondary hover:bg-secondary/10"
              >
                <Building2 className="h-5 w-5" />
                Integrasikan Desa Anda
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © 2026 KNMP - Koperasi Nusantara Merah Putih. Smart Village Dashboard.
          </p>
        </div>
      </footer>
    </div>
  );
}
