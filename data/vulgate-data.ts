// Latin Vulgate — St. Jerome, 4th century. Public Domain.
// Clementine Vulgate text

export type VulgateVerse = { verse: number; latin: string }
export type VulgateChapter = { chapter: number; verses: VulgateVerse[] }
export type VulgateBook = { id: string; latinName: string; chapters: VulgateChapter[] }

export const VULGATE_BOOKS: VulgateBook[] = [
  {
    id: 'genesis', latinName: 'Liber Genesis',
    chapters: [
      {
        chapter: 1, verses: [
          { verse: 1,  latin: 'In principio creavit Deus caelum et terram.' },
          { verse: 2,  latin: 'Terra autem erat inanis et vacua, et tenebrae erant super faciem abyssi, et spiritus Dei ferebatur super aquas.' },
          { verse: 3,  latin: 'Dixitque Deus: Fiat lux. Et facta est lux.' },
          { verse: 4,  latin: 'Et vidit Deus lucem quod esset bona: et divisit lucem a tenebris.' },
          { verse: 5,  latin: 'Appellavitque lucem Diem, et tenebras Noctem: factumque est vespere et mane, dies unus.' },
          { verse: 26, latin: 'Et ait: Faciamus hominem ad imaginem et similitudinem nostram: et praesit piscibus maris, et volatilibus caeli, et bestiis, universaeque terrae, omnique reptili, quod movetur in terra.' },
          { verse: 27, latin: 'Et creavit Deus hominem ad imaginem suam: ad imaginem Dei creavit illum, masculum et feminam creavit eos.' },
          { verse: 31, latin: 'Viditque Deus cuncta quae fecerat, et erant valde bona. Et factum est vespere et mane, dies sextus.' },
        ],
      },
      {
        chapter: 2, verses: [
          { verse: 7,  latin: 'Formavit igitur Dominus Deus hominem de limo terrae, et inspiravit in faciem ejus spiraculum vitae, et factus est homo in animam viventem.' },
          { verse: 24, latin: 'Quam ob rem relinquet homo patrem suum et matrem, et adhaerebit uxori suae: et erunt duo in carne una.' },
        ],
      },
      {
        chapter: 3, verses: [
          { verse: 15, latin: 'Inimicitias ponam inter te et mulierem, et semen tuum et semen illius: ipsa conteret caput tuum, et tu insidiaberis calcaneo ejus.' },
        ],
      },
    ],
  },
  {
    id: 'psalms', latinName: 'Liber Psalmorum',
    chapters: [
      {
        chapter: 22, verses: [
          { verse: 1, latin: 'Dominus regit me, et nihil mihi deerit.' },
          { verse: 2, latin: 'In loco pascuae ibi me collocavit. Super aquam refectionis educavit me.' },
          { verse: 3, latin: 'Animam meam convertit. Deduxit me super semitas justitiae, propter nomen suum.' },
          { verse: 4, latin: 'Nam, et si ambulavero in medio umbrae mortis, non timebo mala: quoniam tu mecum es. Virga tua, et baculus tuus, ipsa me consolata sunt.' },
          { verse: 5, latin: 'Parasti in conspectu meo mensam, adversus eos qui tribulant me. Impinguasti in oleo caput meum: et calix meus inebrians quam praeclarus est!' },
          { verse: 6, latin: 'Et misericordia tua subsequetur me omnibus diebus vitae meae: et ut inhabitem in domo Domini, in longitudinem dierum.' },
        ],
      },
      {
        chapter: 51, verses: [
          { verse: 1, latin: 'Miserere mei, Deus, secundum magnam misericordiam tuam. Et secundum multitudinem miserationum tuarum, dele iniquitatem meam.' },
          { verse: 10, latin: 'Cor mundum crea in me, Deus: et spiritum rectum innova in visceribus meis.' },
          { verse: 12, latin: 'Redde mihi laetitiam salutaris tui, et spiritu principali confirma me.' },
        ],
      },
    ],
  },
  {
    id: 'isaiah', latinName: 'Liber Isaiae Prophetae',
    chapters: [
      {
        chapter: 7, verses: [
          { verse: 14, latin: 'Propter hoc dabit Dominus ipse vobis signum: Ecce virgo concipiet, et pariet filium, et vocabitur nomen ejus Emmanuel.' },
        ],
      },
      {
        chapter: 9, verses: [
          { verse: 6, latin: 'Parvulus enim natus est nobis, et filius datus est nobis, et factus est principatus super humerum ejus: et vocabitur nomen ejus, Admirabilis, Consiliarius, Deus Fortis, Pater futuri saeculi, Princeps pacis.' },
        ],
      },
      {
        chapter: 53, verses: [
          { verse: 3, latin: 'Despectum et novissimum virorum, virum dolorum et scientem infirmitatem: et quasi absconditus vultus ejus et despectus, unde nec reputavimus eum.' },
          { verse: 5, latin: 'Ipse autem vulneratus est propter iniquitates nostras, attritus est propter scelera nostra: disciplina pacis nostrae super eum, et livore ejus sanati sumus.' },
          { verse: 7, latin: 'Oblatus est quia ipse voluit, et non aperuit os suum: sicut ovis ad occisionem ducetur, et quasi agnus coram tondente se obmutescet, et non aperiet os suum.' },
        ],
      },
    ],
  },
  {
    id: 'matthew', latinName: 'Evangelium Secundum Matthaeum',
    chapters: [
      {
        chapter: 5, verses: [
          { verse: 3, latin: 'Beati pauperes spiritu: quoniam ipsorum est regnum caelorum.' },
          { verse: 4, latin: 'Beati mites: quoniam ipsi possidebunt terram.' },
          { verse: 5, latin: 'Beati qui lugent: quoniam ipsi consolabuntur.' },
          { verse: 6, latin: 'Beati qui esuriunt et sitiunt justitiam: quoniam ipsi saturabuntur.' },
          { verse: 7, latin: 'Beati misericordes: quia ipsi misericordiam consequentur.' },
          { verse: 8, latin: 'Beati mundo corde: quoniam ipsi Deum videbunt.' },
          { verse: 9, latin: 'Beati pacifici: quoniam filii Dei vocabuntur.' },
          { verse: 10, latin: 'Beati qui persecutionem patiuntur propter justitiam: quoniam ipsorum est regnum caelorum.' },
        ],
      },
      {
        chapter: 6, verses: [
          { verse: 9,  latin: 'Sic ergo vos orabitis: Pater noster qui es in caelis, sanctificetur nomen tuum.' },
          { verse: 10, latin: 'Adveniat regnum tuum. Fiat voluntas tua, sicut in caelo et in terra.' },
          { verse: 11, latin: 'Panem nostrum supersubstantialem da nobis hodie.' },
          { verse: 12, latin: 'Et dimitte nobis debita nostra, sicut et nos dimittimus debitoribus nostris.' },
          { verse: 13, latin: 'Et ne nos inducas in tentationem: sed libera nos a malo. Amen.' },
        ],
      },
      {
        chapter: 16, verses: [
          { verse: 18, latin: 'Et ego dico tibi, quia tu es Petrus, et super hanc petram aedificabo Ecclesiam meam, et portae inferi non praevalebunt adversus eam.' },
          { verse: 19, latin: 'Et tibi dabo claves regni caelorum. Et quodcumque ligaveris super terram, erit ligatum et in caelis: et quodcumque solveris super terram, erit solutum et in caelis.' },
        ],
      },
      {
        chapter: 26, verses: [
          { verse: 26, latin: 'Coenantibus autem eis, accepit Jesus panem, et benedixit, ac fregit, deditque discipulis suis, et ait: Accipite, et comedite: Hoc est corpus meum.' },
          { verse: 27, latin: 'Et accipiens calicem, gratias egit: et dedit illis, dicens: Bibite ex hoc omnes.' },
          { verse: 28, latin: 'Hic est enim sanguis meus novi testamenti, qui pro multis effundetur in remissionem peccatorum.' },
        ],
      },
    ],
  },
  {
    id: 'john', latinName: 'Evangelium Secundum Ioannem',
    chapters: [
      {
        chapter: 1, verses: [
          { verse: 1,  latin: 'In principio erat Verbum, et Verbum erat apud Deum, et Deus erat Verbum.' },
          { verse: 2,  latin: 'Hoc erat in principio apud Deum.' },
          { verse: 3,  latin: 'Omnia per ipsum facta sunt: et sine ipso factum est nihil, quod factum est.' },
          { verse: 4,  latin: 'In ipso vita erat, et vita erat lux hominum:' },
          { verse: 5,  latin: 'et lux in tenebris lucet, et tenebrae eam non comprehenderunt.' },
          { verse: 14, latin: 'Et Verbum caro factum est, et habitavit in nobis: et vidimus gloriam ejus, gloriam quasi unigeniti a Patre, plenum gratiae et veritatis.' },
          { verse: 17, latin: 'quia lex per Moysen data est, gratia et veritas per Jesum Christum facta est.' },
          { verse: 18, latin: 'Deum nemo vidit unquam: unigenitus Filius, qui est in sinu Patris, ipse enarravit.' },
          { verse: 29, latin: 'Altera die vidit Joannes Jesum venientem ad se, et ait: Ecce agnus Dei, ecce qui tollit peccatum mundi.' },
        ],
      },
      {
        chapter: 3, verses: [
          { verse: 5,  latin: 'Respondit Jesus: Amen, amen dico tibi, nisi quis renatus fuerit ex aqua et Spiritu Sancto, non potest introire in regnum Dei.' },
          { verse: 16, latin: 'Sic enim Deus dilexit mundum, ut Filium suum unigenitum daret: ut omnis qui credit in eum, non pereat, sed habeat vitam aeternam.' },
          { verse: 17, latin: 'Non enim misit Deus Filium suum in mundum, ut judicet mundum, sed ut salvetur mundus per ipsum.' },
        ],
      },
      {
        chapter: 6, verses: [
          { verse: 35, latin: 'Dixit autem eis Jesus: Ego sum panis vitae: qui venit ad me, non esuriet: et qui credit in me, non sitiet unquam.' },
          { verse: 51, latin: 'Ego sum panis vivus, qui de caelo descendi. Si quis manducaverit ex hoc pane, vivet in aeternum: et panis quem ego dabo, caro mea est pro mundi vita.' },
          { verse: 53, latin: 'Dixit ergo eis Jesus: Amen, amen dico vobis: nisi manducaveritis carnem Filii hominis, et biberitis ejus sanguinem, non habebitis vitam in vobis.' },
          { verse: 54, latin: 'Qui manducat meam carnem, et bibit meum sanguinem, habet vitam aeternam: et ego resuscitabo eum in novissimo die.' },
          { verse: 55, latin: 'Caro enim mea vere est cibus: et sanguis meus vere est potus.' },
        ],
      },
      {
        chapter: 10, verses: [
          { verse: 11, latin: 'Ego sum pastor bonus. Bonus pastor animam suam dat pro ovibus suis.' },
          { verse: 30, latin: 'Ego et Pater unum sumus.' },
        ],
      },
      {
        chapter: 19, verses: [
          { verse: 26, latin: 'Cum vidisset ergo Jesus matrem, et discipulum stantem, quem diligebat, dicit matri suae: Mulier, ecce filius tuus.' },
          { verse: 27, latin: 'Deinde dicit discipulo: Ecce mater tua. Et ex illa hora accepit eam discipulus in sua.' },
        ],
      },
    ],
  },
  {
    id: 'romans', latinName: 'Epistola ad Romanos',
    chapters: [
      {
        chapter: 8, verses: [
          { verse: 28, latin: 'Scimus autem quoniam diligentibus Deum omnia cooperantur in bonum, iis qui secundum propositum vocati sunt sancti.' },
          { verse: 38, latin: 'Certus sum enim quia neque mors, neque vita, neque angeli, neque principatus, neque virtutes, neque instantia, neque futura, neque fortitudo,' },
          { verse: 39, latin: 'neque altitudo, neque profundum, neque creatura alia poterit nos separare a caritate Dei, quae est in Christo Jesu Domino nostro.' },
        ],
      },
    ],
  },
  {
    id: 'revelation', latinName: 'Apocalypsis Ioannis',
    chapters: [
      {
        chapter: 12, verses: [
          { verse: 1, latin: 'Et signum magnum apparuit in caelo: Mulier amicta sole, et luna sub pedibus ejus, et in capite ejus corona stellarum duodecim.' },
        ],
      },
      {
        chapter: 21, verses: [
          { verse: 1, latin: 'Et vidi caelum novum et terram novam. Primum enim caelum et prima terra abiit, et mare jam non est.' },
          { verse: 4, latin: 'Et absterget Deus omnem lacrimam ab oculis eorum: et mors ultra non erit, neque luctus, neque clamor, neque dolor erit ultra, quia prima abierunt.' },
        ],
      },
    ],
  },
]

export function getVulgateChapter(bookId: string, chapter: number): VulgateChapter | undefined {
  return VULGATE_BOOKS.find(b => b.id === bookId)?.chapters.find(c => c.chapter === chapter)
}

export function getVulgateVerse(bookId: string, chapter: number, verse: number): VulgateVerse | undefined {
  return getVulgateChapter(bookId, chapter)?.verses.find(v => v.verse === verse)
}
