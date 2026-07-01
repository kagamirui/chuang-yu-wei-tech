/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
  badge?: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  target: string;
  icon: string;
}

export interface AdvantageItem {
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
}

export interface ProjectConfig {
  selectedServices: string[];
  timeline: string;
  budgetRange: string;
  companyName: string;
  contactPerson: string;
  contactInfo: string;
  needsDescription: string;
}
