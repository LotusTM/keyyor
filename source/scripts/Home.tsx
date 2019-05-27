import { Vue, Component, Watch } from 'vue-property-decorator'
import { SITE } from '@data'

interface Form {
  phrases: string | null,
  negatives: string | null,
  positives: string | null
}

interface Phrase {
  value: string
  negatived: boolean
  positived: boolean
}

type Phrases = ReadonlyArray<Phrase>
type RawPhrases = ReadonlyArray<string>

@Component
export default class Home extends Vue {
  form: Form = {
    phrases: null,
    negatives: null,
    positives: null
  }
  formLocalStoragePath = `${SITE.name}.form`

  saveFormToLocalStorage (form: Form): void { window.localStorage.setItem(this.formLocalStoragePath, JSON.stringify(form)) }

  getFormFromLocalStorage (): Form | void {
    const form = window.localStorage.getItem(this.formLocalStoragePath)
    if (typeof form === 'string') return JSON.parse(form)
  }

  created () {
    const form = this.getFormFromLocalStorage()
    if (form) this.form = form
  }

  @Watch('form', { deep: true })
  onFormChanged (form: Form): void { this.saveFormToLocalStorage(form) }

  get rawPhrases (): RawPhrases { return this.prepareList(this.form.phrases) }
  get rawNegatives (): RawPhrases { return this.prepareList(this.form.negatives) }
  get rawPositives (): RawPhrases { return this.prepareList(this.form.positives) }

  get phrases (): Phrases {
    return this.processPhrases({
      phrases: this.rawPhrases,
      negatives: this.rawNegatives,
      positives: this.rawPositives
    })
  }

  prepareList (input: string | null): RawPhrases {
    if (!input) return []
    return input
      .split('\n')
      // Remove empty phrases
      .filter((phrase) => !/^\s*$/.test(phrase))
      // Normalize spaces
      .map((phrase) => phrase.replace(/\s+/, ' '))
  }

  processPhrases (
    { phrases, negatives, positives }:
    { phrases: RawPhrases, negatives: RawPhrases, positives: RawPhrases }
  ): Phrases {
    return phrases.map((phrase) => {
      const preparedPhrase = phrase.toLowerCase()
      const isNegatived = negatives.some((negative) => preparedPhrase.includes(negative.toLowerCase()))
      const isPositived = positives.some((positive) => preparedPhrase.includes(positive.toLowerCase()))

      return {
        value: phrase,
        negatived: !isPositived && isNegatived,
        positived: isNegatived && isPositived
      }
    })
  }

  render () {
    return (
      <div>

        {/* <header class='h-flex h-flex-x--between h-flex-y--center h-childs-displace h-margin-bottom+'>

          <div class='h-flex h-flex-y--center'>
            <h1 class='h-margin-bottom0 h-margin-right'>Главная</h1>
          </div>

          <div />

        </header> */}

        <div class='o-grid h-childs-displace'>

          <div class='o-grid__item h-1/3'>

            <label for='phrases' class='h-block h-h6 h-opacity--50 h-margin-bottom'>Phrases</label>
            <textarea
              v-model={this.form.phrases}
              name='phrases'
              id='phrases'
              class='h-1/1'
              rows='30'
            />

            <label for='negatives' class='h-block h-h6 h-opacity--50 h-margin-bottom h-margin-top'>Negatives</label>
            <textarea
              v-model={this.form.negatives}
              name='negatives'
              id='negatives'
              class='h-1/1'
              rows='30'
            />

            <label for='positives' class='h-block h-h6 h-opacity--50 h-margin-bottom h-margin-top'>Positives</label>
            <textarea
              v-model={this.form.positives}
              name='positives'
              id='positives'
              class='h-1/1'
              rows='30'
            />

          </div>

          <div class='o-grid__item h-1/3'>
            <div style='position: sticky; top: 24px; bottom: 24px;'>
              <h2 class='h-h6 h-opacity--50'>Result</h2>
              <div class='Box h-padding'>{
                this.phrases.map(
                  ({ value, negatived, positived }) => negatived
                    ? <span>👿 <del>{value}</del><br /></span>
                    : <span>{positived && '🙏'} {value}<br /></span>
                )
              }</div>
            </div>
          </div>

          <div class='o-grid__item h-1/3'>
            <div style='position: sticky; top: 24px; bottom: 24px;'>
              <h2 class='h-h6 h-opacity--50'>Negatives</h2>
              <div class='Box h-padding'>{''}</div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
