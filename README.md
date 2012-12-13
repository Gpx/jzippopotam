# jzippopotam

Populate a datalist using [zippopotam.us](http://www.zippopotam.us/) API

## Requirements

In order to use jzippopotam your browser must support the _HTML Datalist Element_ `<datalist>`.

In your javascripts requirements include `jquery 1.7+` and the jzippopotam script itself.

## Usage

jzippopotam accepts an object with three fields: `country`, `zip` and `output`.

Country and code can be a jQuery object or a string. If an object is passed jzippopotam will try to access the `data-jzippopotam-value` attribute otherwise it will read the value through jQuery's `val` function.

If a string is passed the script will use that value.

Output is an array of objects. Each object contains two attributes: `fields` and `format`. The first one must be a jQuery object and specifies to which field we need to add a datalist. Format define how every `option` in the datalist is formatted. It uses a syntax similar to many javascripts template engines where you use double curly brackets to mark a variable. The possible values are the one returned by zippopotam in the place object.

Here's a small demo:

```html
  
  <form>
    Country:
    <select id="country" type="text" name="country">
      <option data-jzippopotam-value="us" value="USA">USA</option>
      <option data-jzippopotam-value="de" value="Germany">Germany</option>
      <option data-jzippopotam-value="fr" value="France">France</option>
      <option data-jzippopotam-value="es" value="Spain">Spain</option>
      <option data-jzippopotam-value="it" value="Italy">Italy</option>
    </select>
    <br>

    Zip code: <input id="zip" type="text" name="zip">
    <br>

    Place - State: <input id="state" type="text" name="state">
    <br>

    <button type="submit">Do nothing</button>
  </form>

  <script type="text/javascript" charset="utf-8" src="jquery-1.7.2.min.js"></script>
  <script type="text/javascript" charset="utf-8" src="jzippopotam.js"></script>
  <script type="text/javascript">
    $.jzippopotam({
      country: $('#country'),
      zip: $('#zip'),
      output: [
        {
          field: $('#state'),
          format: '{{place name}} - {{state}}'
        }
      ]
    });
  </script>

```
