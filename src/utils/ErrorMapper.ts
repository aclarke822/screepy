import _ from "lodash";
import SourceMap from 'source-map';
import rawSourceMap = require("../../dist/main.js.map.js");

export class ErrorMapper {
  // Cache consumer
  private static _consumer?: SourceMap.SourceMapConsumer;

  public static get consumer(): SourceMap.SourceMapConsumer {
    const test = async function (consumer: any) {
      const xSquared = await SourceMapConsumer.with(myRawSourceMap, null, async function (consumer) {
        // Use `consumer` inside here and don't worry about remembering
        // to call `destroy`.

        const x = await whatever(consumer);
        return x * x;
      });
    }


    if (this._consumer == null) {
      new SourceMap.SourceMapConsumer(rawSourceMap).then(data => { this._consumer = data as SourceMap.SourceMapConsumer });

      const map = new SourceMap.SourceMapGenerator({
        file: "main.js.map.js"
      });

      if (this._consumer !== undefined) {
        return this._consumer;
      }
    } else {
      return this._consumer;
    }

    throw ERR_INVALID_ARGS;
  }

  // Cache previously mapped traces to improve performance
  public static cache: { [key: string]: string } = {};

  /**
   * Generates a stack trace using a source map generate original symbol names.
   *
   * WARNING - EXTREMELY high CPU cost for first call after reset - >30 CPU! Use sparingly!
   * (Consecutive calls after a reset are more reasonable, ~0.1 CPU/ea)
   *
   * @param {Error | string} error The error or original stack trace
   * @returns {string} The source-mapped stack trace
   */
  public static sourceMappedStackTrace(error: Error | string): string {
    const stack: string = error instanceof Error ? (error.stack as string) : error;
    if (Object.prototype.hasOwnProperty.call(this.cache, stack)) {
      return this.cache[stack];
    }

    // eslint-disable-next-line no-useless-escape
    const re = /^\s+at\s+(.+?\s+)?\(?([0-z._\-\\\/]+):(\d+):(\d+)\)?$/gm;
    let match: RegExpExecArray | null;
    let outStack = error.toString();

    while ((match = re.exec(stack))) {
      if (match[2] === "main") {
        const pos = this.consumer.originalPositionFor({
          column: parseInt(match[4], 10),
          line: parseInt(match[3], 10)
        });

        if (pos.line != null) {
          if (pos.name) {
            outStack += `\n    at ${pos.name} (${pos.source}:${pos.line}:${pos.column})`;
          } else {
            if (match[1]) {
              // no original source file name known - use file name from given trace
              outStack += `\n    at ${match[1]} (${pos.source}:${pos.line}:${pos.column})`;
            } else {
              // no original source file name known or in given trace - omit name
              outStack += `\n    at ${pos.source}:${pos.line}:${pos.column}`;
            }
          }
        } else {
          // no known position
          break;
        }
      } else {
        // no more parseable lines
        break;
      }
    }

    this.cache[stack] = outStack;
    return outStack;
  }

  public static wrapLoop(loop: () => void): () => void {
    return () => {
      try {
        loop();
      } catch (e) {
        if (e instanceof Error) {
          if ("sim" in Game.rooms) {
            const message = `Source maps don't work in the simulator - displaying original error`;
            console.log(`<span style='color:red'>${message}<br>${_.escape(e.stack)}</span>`);
          } else {
            console.log(`<span style='color:red'>${_.escape(this.sourceMappedStackTrace(e))}</span>`);
          }
        } else {
          // can't handle it
          throw e;
        }
      }
    };
  }


}

