import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['id', 'en'],
  defaultLocale: 'id'
});
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
