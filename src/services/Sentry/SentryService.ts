import * as Sentry from "@sentry/react";
import { sentryConfig } from "./sentry.config";

export class SentryService {
  public static async initialize(): Promise<void> {
    if (!sentryConfig.dsn) {

      return;
    }

    try {
      const activeSentry = Sentry.getClient();

      if (!activeSentry) {
        Sentry.init({
          dsn: sentryConfig.dsn,
          environment: sentryConfig.environment,
          release: sentryConfig.release,
          integrations: [
            Sentry.replayIntegration(),
            Sentry.browserTracingIntegration({
              instrumentPageLoad: false,
              instrumentNavigation: true,
            }),
          ],
          ignoreErrors: sentryConfig.ignoreErrors,
          sampleRate: sentryConfig.sampleRate,
          replaysSessionSampleRate: sentryConfig.replaysSessionSampleRate,
          replaysOnErrorSampleRate: sentryConfig.replaysOnErrorSampleRate,
          tracesSampleRate: sentryConfig.tracesSampleRate,
          debug: sentryConfig.debug,
        });
      }
    } catch (e) {
      e;
    }
  }

  public static setUserAndTags(user: Sentry.User, tags: Record<string, string>): void {
    try {
      if (user) {
        Sentry.setUser(user);
      } else {

        Sentry.setUser(null);
      }

      Object.keys(tags).forEach((key) => {
        if (tags[key]) {
          Sentry.setTag(key, tags[key]);
        } else {

          Sentry.setTag(key, undefined);
        }
      });
    } catch (e) {
      e;
    }
  }

  public static startTransaction(transaction: string, type: string): void {
    try {
      Sentry.startSpan({ name: transaction, op: type, forceTransaction: true }, () => { });
    } catch (e) {
      e;
    }
  }
}

export default SentryService;
