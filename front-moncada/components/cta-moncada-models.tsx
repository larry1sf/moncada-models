import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconArrowRight, IconStar, IconTruck, IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { promesa_de_confienza, logistica_de_elite } from "@/lib/info-cts";
import SectionHeader from "@/components/sections/section-header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CtaMoncadaModels() {
  return (
    <section className="relative pt-16 border-t border-border">
      <div className="max-w-300 mx-auto px-4 md:px-8">
        <SectionHeader
          badgeContent="Compromiso con la Excelencia"
          title="Por qué elegir Moncada Models"
          description="Tu satisfacción es nuestra prioridad. Descubre los beneficios de comprar con nosotros"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <FeatureCard
            {...promesa_de_confienza}

          />
          <FeatureCard
            {...logistica_de_elite}
          />
        </div>

        <QuickStats
          stats={[
            { value: "100%", label: "Hecho en Colombia" },
            { value: "Express", label: "Envío Nacional" },
            { value: "4.9/5", label: "Satisfacción VIP" },
          ]}
          ctaLabel="Ver Colecciones"
          className="mt-6"
        />
      </div>
    </section>
  );
}


// QuickStats
interface StatItem {
  value: string;
  label: string;
  icon?: React.ElementType;
}

interface QuickStatsProps {
  stats: StatItem[];
  className?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const defaultIcons = [IconCircleCheck, IconTruck, IconStar];

function QuickStats({
  stats,
  className = "",
        ctaLabel = "Explorar Colección",
        ctaHref = "/colecciones"
}: QuickStatsProps) {
  return (
        <div className={cn("w-full relative pt-8 pb-12", className)}>
          {/* Background decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-3/4 bg-accent/5 blur-[120px] rounded-full -z-10 animate-pulse" />

          <Card className="relative overflow-hidden border-2 border-accent/20 bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-2xl transition-all duration-700 hover:shadow-accent/10 border-y-accent/30">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-accent/0 via-accent/40 to-accent/0" />

            <div className="grid grid-cols-1 md:grid-cols-4 items-stretch">
              {/* Stats Columns */}
              {stats.slice(0, 3).map((stat, index) => {
                const Icon = stat.icon || defaultIcons[index] || IconStar;
                return (
                  <CardContent
                    key={index}
                    className={cn(
                      "flex flex-col items-center justify-center gap-4 py-8 md:py-12 px-6 md:px-8 relative group transition-all duration-500",
                      "border-b md:border-b-0 md:border-r border-accent/10 last:md:border-r-0 last:border-b-0"
                    )}
                    role="listitem"
                  >
                    {/* Hover background effect */}
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-all duration-500 rounded-xl" />

                    <div className="relative z-10 flex flex-col items-center gap-4">
                      {/* Icon Container with multi-layered shadow/bg */}
                      <div className="relative">
                        <div className="p-3 md:p-4 rounded-4xl bg-accent/30 text-accent transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-accent group-hover:text-white shadow-xl shadow-accent/5 border border-accent/10">
                          <Icon size={24} stroke={1.5} />
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-1 text-center font-sans">
                        <div className="text-xl sm:text-2xl md:text-3xl font-black text-text-dark tracking-tighter group-hover:scale-105 transition-transform duration-500 flex items-baseline">
                          {stat.value}
                        </div>
                        <div className="text-[9px] md:text-[10px] text-text-medium font-black uppercase tracking-[0.2em] md:tracking-[0.4em] transition-colors duration-500 group-hover:text-accent">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                );
              })}

              {/* Premium CTA Column */}
              <div className="relative flex items-center justify-center p-6 overflow-hidden group/cta-container">
                <Button
                  asChild
                  variant="default"
                  className="relative z-10 w-full px-8 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Link href={ctaHref} className="flex items-center justify-center gap-2 md:gap-3">
                    <span className="flex-1 text-center text-[9px] md:text-[10px]">
                      {ctaLabel}
                    </span>
                    <div className="w-8 h-8 md:w-10 md:h-10 hidden xl:flex rounded-full items-center justify-center transition-all duration-500 group-hover:bg-accent group-hover:text-text-dark">
                      <IconArrowRight className="w-4 h-4 md:w-5 md:h-5" stroke={3} />
                    </div>
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div >
        );
}


        // feature-card
        interface Step {
          number: number;
        title: string;
        description: string;
}

        interface FeatureCardProps {
          title: string;
        icon: React.ElementType;
        points: string[];
        linkText: string;
        rotateIcon?: boolean;
        steps?: Step[];
}

        function FeatureCard({
          title,
          icon: Icon,
        points,
        linkText,
        rotateIcon = false,
        steps = [],
}: FeatureCardProps) {
  return (
        <Card className="group relative bg-white rounded-4xl p-6 md:p-10 shadow-2xl border-2 border-accent/20 hover-lift transition-all duration-700">
          <CardContent className="p-0 flex flex-col justify-between h-full">
            {/* Icon Background */}
            <div
              className={`absolute -top-4 -left-4 md:-top-6 md:-left-6 w-16 h-16 md:w-20 md:h-20 bg-text-dark rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl border-2 border-accent transition-transform duration-500 ${rotateIcon ? "group-hover:rotate-12" : "group-hover:-rotate-12"}`}
            >
              <Icon className="w-8 h-8 md:w-10 md:h-10 text-accent" />
            </div>

            <div className="pt-6 md:pt-8">
              <h3 className="font-display text-2xl md:text-3xl font-black text-text-dark mb-6 tracking-tight leading-tight">
                {title}
              </h3>

              <div className="space-y-4 md:space-y-6">
                {points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 md:gap-4">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-accent rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_#C4A47A]" />
                    <p className="text-text-dark text-sm md:text-base leading-relaxed font-bold">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-8 border-t-2 border-accent/20">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    type="button"
                    className="cursor-pointer text-cream text-xs font-bold transition-all duration-300"
                  >
                    {linkText}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] lg:max-w-6xl max-h-[90vh] overflow-y-auto bg-linear-to-br from-cream via-bg-light to-bg-dark border-2 border-accent/30 shadow-2xl">
                  <DialogHeader className="space-y-4 pb-6 border-b-2 border-accent/20">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-text-dark rounded-2xl flex items-center justify-center shadow-xl border-2 border-accent shrink-0">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                      </div>
                      <DialogTitle className="font-display text-2xl md:text-3xl lg:text-4xl font-black text-text-dark tracking-tight">
                        {title}
                      </DialogTitle>
                    </div>
                    <DialogDescription className="text-text-medium text-sm md:text-base lg:text-lg leading-relaxed font-medium">
                      Descubre el proceso detallado que garantiza una experiencia
                      excepcional en cada paso del camino.
                    </DialogDescription>
                  </DialogHeader>

                  {/* Steps Container - Grid Layout */}
                  <section className="relative pt-8 pb-4">
                    {/* Horizontal connecting line for desktop */}
                    <div className="hidden lg:block absolute top-18 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-accent/30 to-transparent" />

                    <div
                      className={`grid grid-cols-1 ${steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-6 lg:gap-4 xl:gap-6`}
                    >
                      {steps.map((step, index) => (
                        <div
                          key={step.number}
                          className="group/step relative"
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animation: "fade-in-up 0.6s ease-out forwards",
                          }}
                        >
                          {/* Step Card */}
                          <article className="relative bg-white rounded-3xl p-5 md:p-6 lg:p-5 xl:p-6 shadow-lg border-2 border-accent/10 hover:border-accent/30 transition-all duration-500 hover-lift h-full flex flex-col">
                            {/* Step Number Badge */}
                            <div className="mx-auto mb-4 w-14 h-14 md:w-16 md:h-16 bg-linear-to-br from-accent to-accent-hover rounded-2xl flex items-center justify-center shadow-xl border-3 border-white group-hover/step:scale-110 transition-transform duration-300 relative z-10">
                              <span className="font-display text-2xl md:text-3xl font-black text-white">
                                {step.number}
                              </span>
                            </div>

                            {/* Vertical connecting line for mobile */}
                            {index < steps.length - 1 && (
                              <div className="lg:hidden absolute left-1/2 -bottom-6 w-0.5 h-6 bg-linear-to-b from-accent/40 to-transparent -translate-x-1/2" />
                            )}

                            {/* Step Content */}
                            <div className="text-center flex-1 flex flex-col">
                              <h4 className="font-display text-lg md:text-xl lg:text-lg xl:text-xl font-bold text-text-dark mb-3 tracking-tight leading-tight">
                                {step.title}
                              </h4>
                              <p className="text-text-medium text-xs md:text-sm lg:text-xs xl:text-sm leading-relaxed">
                                {step.description}
                              </p>
                            </div>

                            {/* Decorative corner accent */}
                            <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-accent/20 rounded-tr-xl group-hover/step:border-accent/40 transition-colors duration-300" />
                            <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-accent/20 rounded-bl-xl group-hover/step:border-accent/40 transition-colors duration-300" />
                          </article>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Footer CTA */}
                  <div className="mt-6 pt-6 border-t-2 border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-text-medium text-xs md:text-sm lg:text-base font-medium text-center sm:text-left">
                      ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
                    </p>
                    <Button
                      asChild
                      variant="default"
                      className="bg-text-dark hover:bg-cta-dark-hover text-cream font-bold px-6 md:px-8 py-2.5 md:py-3 rounded-2xl shadow-lg transition-all duration-300 whitespace-nowrap"
                    >
                      <Link href={"/nosotros/contactanos"}>
                        Contactar Soporte
                      </Link>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        );
}
