import test from 'tape';
import { Observable } from 'rx';
import { run } from '@cycle/core';
import { button, makeDOMDriver } from '@cycle/dom';
import { preventDefault, stopPropagation } from '../src/index.js';
const container = document.createElement('div');
container.classList.add('cycle-test');
document.body.appendChild(container);
const domDriver = makeDOMDriver('.cycle-test');
const DOM$ = Observable.just(button());
const button$Factory = DOM => DOM.select('button').observable.skip(1).take(1).flatMap(x => x);
const buttonClick$Factory = DOM => DOM.select('button').events('click');

test.onFinish(window.close);

test('preventDefault', t => {
  const main = ({ DOM }) => ({
    preventDefault: buttonClick$Factory(DOM),
    DOM: DOM$
  });
  const { sources, sinks } = run(main, {
    DOM: domDriver,
    preventDefault
  });
  button$Factory(sources.DOM).subscribe(buttonEl => {
    buttonEl.click();
  });
  sinks.preventDefault.delay(100).take(1).subscribe(ev => {
    t.equal(ev.defaultPrevented, true, 'should have prevented');
    sources.dispose();
    t.end();
  });
});

test('stopPropagation', t => {
  const main = ({ DOM }) => ({
    stopPropagation: buttonClick$Factory(DOM),
    DOM: DOM$
  });
  const { sources, sinks } = run(main, {
    DOM: domDriver,
    stopPropagation
  });
  button$Factory(sources.DOM).subscribe(buttonEl => {
    buttonEl.click();
  });
  sinks.stopPropagation.delay(100).take(1).subscribe(ev => {
    t.equal(ev.propagationHasBeenStopped, true, 'should have stopped propagation');
    sources.dispose();
    t.end();
  });
});
