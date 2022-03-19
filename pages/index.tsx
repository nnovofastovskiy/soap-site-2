import { withLayout } from '../layout/ClientLayout/Layout';
import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { Hero } from '../components';

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles['hero-img']}>
          <Image
            src={process.env.NEXT_PUBLIC_DOMAIN + '/images/IMG_7894.jpg'}
            // width={1900}
            // height={600}
            quality={80}
            priority
            objectPosition={'50% 50%'}
            objectFit={'cover'}
            layout={'fill'}
          />
        </div>
        <Hero className={styles.hero} />
      </div>
      <section>
        <h2>ПОПУЛЯРНОЕ</h2>
      </section>
      <Link href={'/products'}>Products</Link>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni, nihil voluptatem harum sunt, voluptatibus deleniti voluptates est repudiandae in assumenda quo vero libero porro quas sed quae, explicabo nostrum debitis.
        Ipsam totam ad maxime porro provident, molestiae aspernatur, sint dolor eaque officia repellendus nostrum sapiente facere exercitationem est iste? Accusantium, nam? Esse facilis reiciendis assumenda exercitationem quia consequatur pariatur quod.
        Rerum, repellat odio minus ut consequatur a hic nulla pariatur dolorum temporibus itaque fugiat ipsum voluptatum libero beatae excepturi tempore aliquid rem exercitationem id aperiam dolore. Ad tenetur excepturi ipsam?
        Minima, doloribus mollitia consequuntur cumque ipsum ratione hic facere rem recusandae ea officiis tempora facilis harum animi reprehenderit excepturi at! Pariatur, quaerat ad. Vitae veniam ipsa assumenda repellendus atque est!
        Incidunt iure voluptas dolores dolor quam quidem assumenda dolorum, illum itaque magnam eum labore voluptates officiis quos illo optio ut aliquam. Dicta quis eius corporis facere sint ratione quasi delectus.
        Quis dolorum consequuntur eligendi odio fugit consequatur officiis neque non a. Ipsum numquam facere voluptate adipisci asperiores velit dolorem blanditiis, tempora cumque culpa distinctio voluptatibus repudiandae vero quisquam obcaecati dicta.
        Quos similique reprehenderit accusantium facilis excepturi tempore et, mollitia blanditiis tempora perspiciatis inventore omnis saepe dolore dolorum laudantium voluptatibus nobis nulla modi eveniet minus porro. Veniam similique est dicta nulla.
        Cupiditate natus a voluptate, maiores pariatur accusamus doloremque eos labore modi dolore rerum suscipit nulla exercitationem eaque accusantium consequuntur odio, quas aut libero aliquam nostrum veritatis? Cum iste nisi veritatis?
        Quisquam dolorem nihil deleniti sapiente aut, quo culpa velit quasi blanditiis sed obcaecati repellat excepturi nemo deserunt, suscipit officiis provident consectetur odit incidunt. In voluptate neque id vero adipisci porro?
        Assumenda, rerum, nemo enim optio quidem, dignissimos voluptatibus dolores sit ab soluta odit perferendis minima. Accusantium eaque blanditiis assumenda dolores repellendus inventore dolore dolorum rem! Non facilis voluptatibus accusamus itaque.
        Qui rem, temporibus suscipit aliquid dicta doloremque fugiat illo aperiam doloribus esse. Officiis, quasi magnam cumque modi aliquam id ratione veritatis eum consequuntur voluptate minus porro distinctio, a minima fugiat.
        Sunt, voluptas voluptatem? Delectus, eos libero! Voluptates voluptate magnam ut quam unde a error! Iure error fugiat explicabo in atque delectus, reprehenderit saepe dignissimos iste harum, quaerat sed est voluptas.
        Perspiciatis modi possimus aperiam autem consectetur, corporis maiores ad beatae corrupti earum, suscipit, ipsam vel porro labore blanditiis quo! Vel eius porro quis tempora ratione ullam dolorum facere blanditiis totam.
        Minus maiores tempora recusandae, id assumenda expedita, in eum alias necessitatibus voluptas laudantium dolorem fugit illum cum eaque dolores velit incidunt debitis. Incidunt dolor quisquam ipsum sunt accusamus, exercitationem tempora!
        Nihil ullam, aperiam asperiores dicta qui delectus iusto maxime eveniet unde magni, impedit officia adipisci quidem nam recusandae odio minima dolores aspernatur! Maxime optio officia porro consequuntur doloribus quidem ex.
        Cupiditate esse hic consequuntur fugit sunt ratione doloribus, nisi quo nobis veritatis pariatur! Perferendis sunt quae odit possimus? Odit esse culpa reprehenderit nobis consequatur, deleniti fuga doloribus quasi libero hic.
        Consequatur in voluptates id non similique esse earum ut laborum! Perspiciatis tempora eius consectetur voluptates at vero alias dicta libero possimus saepe eligendi, aliquid repellat aperiam veniam, et illum reiciendis!
        Animi minus perspiciatis quis, explicabo commodi eaque veniam omnis repellat atque officiis placeat officia. Omnis quo nam doloribus fugit vero rerum inventore consequuntur pariatur, minus illo odit nisi repellat debitis!
        Quae laudantium quis laboriosam eius repellendus iste quo aliquam, voluptatem autem quaerat nulla ea atque at vel laborum beatae debitis rerum ex. Laborum totam sequi impedit dolor architecto qui veniam!
        Ea officiis cupiditate nulla mollitia perferendis. Veritatis laudantium architecto in minima. Repellat itaque iste atque nesciunt? Eius sed suscipit iusto, odio voluptatem dignissimos distinctio saepe ipsum labore velit porro incidunt!
        Consequatur, voluptates aliquam! Culpa nostrum odit aut, earum magnam accusamus! Quod dolore at laborum blanditiis perspiciatis exercitationem modi, ipsa dolores architecto aut suscipit, tenetur enim accusantium repellat totam accusamus dolorem!
        Earum illo harum quibusdam modi blanditiis! Delectus dolorum amet mollitia consequatur quod. Voluptates, nostrum. Cupiditate aliquid, eligendi autem deleniti commodi magni adipisci sit nostrum esse accusamus modi nobis excepturi nisi?
        Iusto officia incidunt numquam eveniet? Cupiditate numquam porro ipsum at maxime, illo vero reiciendis quam natus, laboriosam id quod sit amet voluptatibus corporis consequatur beatae aperiam dolorem aliquam illum veniam.
        Accusantium molestias doloremque debitis magni temporibus quam sit nesciunt, blanditiis modi soluta, itaque iure et repellendus qui iusto ut mollitia veniam. Laborum at quidem debitis hic provident, amet incidunt doloribus!
        Voluptates, aliquid! Sint ut aliquam voluptate consequatur cupiditate. Est amet velit alias officia natus dolorum neque quae, molestias aliquid cupiditate quos porro architecto deserunt rem exercitationem dolor, assumenda quo nostrum?
        Praesentium nesciunt aliquam minima sit maiores! Repudiandae ducimus cum ullam tempora, iste ipsa beatae, nemo sequi aspernatur aut quos obcaecati maiores dicta minus non. Laboriosam porro sed commodi cumque itaque?
        Ipsum et itaque, fuga omnis nihil, consectetur enim in nulla facere animi unde consequatur impedit accusantium perferendis eaque ullam laudantium corrupti cupiditate quibusdam placeat! Amet atque animi nesciunt laborum pariatur!
        Mollitia nisi officiis, nemo exercitationem quis perferendis est deserunt deleniti laborum illo, et vitae eum magni dolore aut iure autem quisquam aliquid enim corrupti necessitatibus distinctio! Harum sint officiis tenetur!
        Laudantium voluptate laborum, atque optio facere, accusamus odio voluptatibus in nostrum, nobis corporis quidem deserunt modi voluptatum nesciunt praesentium? Aut quo adipisci soluta quam dolorem voluptatum sunt autem enim quia.
        Placeat, explicabo, ea doloribus maiores maxime dicta officiis, itaque perferendis ex enim architecto quae totam. Atque maxime, sapiente debitis vel sit aut praesentium, sed itaque excepturi unde iure sint quidem?
        Reiciendis illum nisi praesentium incidunt ipsa culpa deleniti commodi corporis, iure fuga, cumque tenetur at. Unde ipsa laborum odio pariatur voluptates maxime sed dolores, incidunt sequi ut vel autem at?
        Harum amet maiores, laborum officiis provident ab omnis eaque quae nihil modi. Doloremque natus ipsa esse quibusdam at molestias dolorum, earum commodi doloribus odio cumque, quas deleniti, consequuntur sapiente voluptate.
        Omnis reprehenderit autem ullam sed quisquam impedit ipsum, expedita optio ea adipisci illum, est cum soluta asperiores vitae commodi ipsa placeat sint? Distinctio sint est quo quasi aut. Quo, veniam?
        Fugiat adipisci, deleniti maiores quo tenetur dignissimos praesentium, omnis, labore est perferendis dolore amet in. Esse ex ducimus minima dolorum eaque quasi nulla doloremque! Consequuntur quis doloremque nemo distinctio recusandae?
        Omnis voluptatem accusamus rerum necessitatibus, delectus commodi? Amet porro quo minima voluptate dolorem quis temporibus pariatur itaque cum beatae! Non explicabo ab odio eligendi consectetur et ullam! Dicta, corporis! Cumque.
        Incidunt aperiam hic ab veniam in? Distinctio laudantium illum facilis culpa placeat illo magni porro, consequuntur doloribus, a debitis esse fuga similique recusandae quisquam nemo perspiciatis maxime itaque nostrum accusamus.
        Fuga, alias unde est quaerat cum, accusamus facilis, dolorum minus earum soluta illum sequi. Labore, laboriosam exercitationem odit vero omnis at necessitatibus iure eveniet illo dignissimos, atque voluptatem sequi. Quos.
        Accusantium blanditiis tempora, alias dolorem sit animi? Laudantium repellat nobis iure beatae laborum voluptas aut deleniti nisi, officiis ea aperiam praesentium provident maxime nemo recusandae ullam iusto saepe quibusdam natus?
        Adipisci illum quasi enim laboriosam velit neque quae fugit cupiditate iste, impedit voluptatibus perspiciatis. Nulla odio eveniet non tenetur adipisci autem quibusdam vitae in provident vero. Recusandae natus quos ut.
        Voluptate corrupti, incidunt atque, illo commodi eveniet amet neque porro omnis tempore laudantium veniam! Natus explicabo deserunt possimus molestiae eveniet qui deleniti reiciendis beatae. Repudiandae, veniam corrupti. Molestiae, fugiat nobis!
        Porro rem dolorem laudantium obcaecati quaerat optio, nihil quod eum ducimus, labore id vitae at quos. Doloremque delectus dolorum aliquid minus natus illum adipisci aperiam excepturi fugiat labore, reiciendis error.
        Soluta, numquam eius velit corrupti sint, a, temporibus dolorem sunt expedita eos doloremque quidem id perspiciatis magnam libero ipsum! Debitis sit laboriosam officia! Unde repellat, eaque omnis dolorum soluta facere.
        Consequatur ullam odio cumque quam necessitatibus quasi provident maxime error, in, libero, sed ducimus? Cum, tempora dolor. Aspernatur debitis eligendi, earum rerum quia, doloribus, explicabo corrupti quos sit reiciendis enim.
        Veniam enim vel ea sapiente dolor facere officiis, recusandae repudiandae distinctio nisi animi dicta consequuntur deserunt quaerat non incidunt reprehenderit quae? Repellat, inventore provident. Ab placeat eligendi repudiandae sed officiis?
        Temporibus magni consequatur laudantium vel quos! Possimus, voluptas. Labore ad quia beatae? Facilis fugit asperiores accusantium voluptas reprehenderit ipsa eius animi, mollitia possimus suscipit obcaecati earum ad facere reiciendis esse?
        Quaerat unde aliquid quasi impedit quisquam, neque consequuntur, molestiae voluptates adipisci nobis veniam. Nisi assumenda eius reiciendis nostrum repellendus doloribus optio vero modi nulla quibusdam quia, possimus numquam ipsum quasi.
        Rerum eveniet velit blanditiis pariatur sunt temporibus porro cupiditate, non praesentium iste odio nostrum quisquam ipsam rem cumque ex accusantium nihil at quidem eligendi culpa? Impedit quae perspiciatis repellat nesciunt.
        Neque ipsa temporibus pariatur incidunt eligendi voluptatum et provident nobis culpa? Corporis at alias ratione consequuntur adipisci, incidunt deserunt ipsa id sequi? Placeat dignissimos libero quas eligendi expedita aperiam! Placeat.
        Voluptatum voluptatem ducimus cumque consequatur ut maxime atque porro eligendi voluptates amet reiciendis reprehenderit illum iure veniam minus possimus, nostrum ipsum. Quia molestias quo, eius unde voluptates veniam iusto necessitatibus?
        Corrupti quod hic doloribus ex veritatis, quaerat cupiditate cum minima, tenetur aspernatur iusto repudiandae at similique laudantium optio nam voluptate veniam explicabo neque id odit fugiat, libero fugit. Pariatur, atque?
        Vitae cum omnis aut explicabo exercitationem consequatur totam error hic soluta corrupti, numquam nam sunt culpa porro dicta amet officia consectetur enim deserunt! Voluptatibus esse rem sequi, dolorem harum iusto.
        Nesciunt consectetur doloribus a vel enim quidem harum reprehenderit ad delectus ipsum voluptates laboriosam provident eligendi voluptas, pariatur voluptate asperiores eaque excepturi cupiditate veritatis esse sapiente aliquam consequatur necessitatibus? Libero!
        Ipsa nam impedit harum facere vitae eligendi quam illo, dolore, blanditiis adipisci quae laudantium exercitationem reprehenderit aut! Dolor magni obcaecati beatae maiores odit, est natus repellat optio atque, placeat nesciunt!
        Unde alias rerum ex quas modi eius dolor tempore aspernatur, culpa fugiat tempora illum maiores optio consequatur nam voluptatum sunt assumenda cum similique. Nemo quas tempore nesciunt aspernatur, rem laudantium?
        Impedit numquam ullam soluta ea sapiente unde recusandae laboriosam facere debitis dolorum. Iste eius itaque molestiae pariatur repudiandae sequi aliquam amet praesentium. Vitae, vel corrupti sint facere sunt optio repellat.
        Unde facilis sed error quis molestiae, eaque optio illo perferendis maiores autem quaerat ut nesciunt enim, debitis, dolores impedit iure fugit dolor iusto quas a. Dignissimos repellat pariatur accusantium sunt.
        Voluptatibus consectetur laboriosam deleniti sunt nisi ut! Exercitationem asperiores dolorum nostrum voluptatibus corporis optio nesciunt, nemo fugiat dignissimos? Suscipit saepe cupiditate consectetur obcaecati, consequatur nesciunt dignissimos sit facilis deserunt cumque.
        A, quisquam ea. Commodi, ducimus nulla? Explicabo consectetur quod cupiditate ratione reiciendis placeat suscipit in perspiciatis. Quisquam corrupti enim tenetur voluptates, pariatur voluptas velit sed quos omnis deserunt distinctio laboriosam.
        Dolor praesentium minima officia ipsa labore architecto modi corrupti omnis, animi dolores maxime minus ipsum ea quia ut at eligendi. Commodi minima est dolores alias provident ipsum ea harum voluptatibus.
        Nobis facere recusandae consequuntur neque, temporibus quam ullam officiis quaerat est ea blanditiis vel consectetur, sint odit earum fuga, corporis eos suscipit. Perferendis quas delectus earum sint doloremque ex sunt.
        Nam dolores ab tenetur hic rerum, exercitationem tempore inventore iusto possimus illum nihil, blanditiis sed saepe vel ad voluptas placeat aliquid. Facere hic consequuntur illum temporibus in cum voluptatibus obcaecati.
        Dolorem aperiam voluptatibus ab nemo explicabo voluptatem, consectetur, culpa beatae est delectus aliquam iusto omnis dignissimos corporis rerum expedita ea excepturi eligendi impedit minus ullam magnam ad quae tempore! Adipisci.
        Dignissimos doloremque tempora minus non ut provident natus accusantium, recusandae corporis architecto esse. Illum quisquam nulla quas sapiente reiciendis molestias, itaque quia natus aliquid veritatis placeat, dolorem, quo omnis pariatur.
        Temporibus ea labore ipsa quibusdam facere adipisci omnis, tempora doloribus consectetur quo ad tenetur earum corrupti deleniti ducimus, fugiat alias. Aliquam quibusdam consequatur mollitia error eos alias impedit sequi incidunt!
        Eligendi ratione veniam veritatis ipsam culpa modi animi quis eum ea facilis saepe deserunt id aperiam alias dolores at magni accusamus, reiciendis blanditiis? Nisi ullam quidem hic. Iste, perspiciatis dicta.
        Aspernatur illum atque minus vitae, molestiae praesentium labore nobis blanditiis ad? Dignissimos sequi deserunt error aperiam, sit officiis voluptas, libero maiores ea nam itaque, voluptatum consequatur ut dolor ullam atque.
        At labore magni laudantium quidem saepe dignissimos id quisquam, nam cumque ab dolorum officia, quam animi error totam commodi numquam. Voluptas quis ullam animi beatae doloribus, voluptates possimus similique quam.
        Esse, voluptas natus. Voluptate, natus laudantium culpa, dolor architecto nostrum cumque modi mollitia nesciunt eveniet cum nisi corporis a nemo incidunt ex, saepe laboriosam consequatur? Dolor quos placeat id magnam.
        Laudantium nesciunt obcaecati alias rem sapiente quis, at eius, corporis inventore reiciendis saepe vero provident nam aliquid rerum recusandae. Incidunt aliquam minima ratione harum, numquam consequatur adipisci illum iste non.
        Eligendi, recusandae praesentium quia quo voluptatem id ea perspiciatis tempora debitis mollitia aliquam eos numquam possimus saepe quibusdam culpa sed, libero corporis aliquid. Fugit magni, autem inventore temporibus pariatur enim.
        Eaque nobis in reprehenderit at sed repudiandae officia dolorum neque enim, obcaecati ipsam quis facilis sint soluta aliquid. Quam qui molestias animi dicta veritatis blanditiis? Consequuntur molestias cumque mollitia ullam?
        Necessitatibus recusandae illum itaque, tempora quasi excepturi non voluptatem tenetur neque beatae repellat voluptate provident error quisquam ratione tempore est? Voluptatem, quasi earum libero provident dolor dicta quisquam iste necessitatibus?
        Nisi totam odio sint natus possimus laudantium cum quia laboriosam harum inventore molestias, voluptates tempore veritatis beatae quidem modi nemo fugiat sed consequuntur necessitatibus ipsam itaque tempora quibusdam eos. Explicabo?
        Illo magnam, obcaecati ad, quae illum ex ipsam est quam et, beatae repellendus. Commodi, voluptate eaque? Nostrum corrupti nihil, fugiat vel laboriosam, numquam in nam, eum est facere asperiores sint.
        Ducimus, veritatis tenetur ab molestiae in id mollitia nisi quam asperiores explicabo, velit laboriosam minima culpa suscipit repellendus temporibus dolorem reiciendis enim sapiente nesciunt, dignissimos modi! Inventore id ab corrupti.
        Quidem ullam similique, at, dolorem deleniti inventore minima, qui esse debitis fugiat sit nesciunt? Delectus sit dolorum similique quis qui magni commodi recusandae dolor quos optio doloremque, aliquid tempore mollitia?
        Assumenda labore, quod non maxime fuga accusantium deserunt nostrum quibusdam illum culpa odio autem, hic corrupti fugiat modi? Et, nisi! Sint aliquid aperiam fuga earum mollitia architecto harum assumenda quasi?
        Rerum odio culpa quasi ut asperiores velit voluptatum vero? Quas deleniti in accusantium. Quidem voluptatibus debitis doloremque numquam, optio veniam at fugit. Omnis tempore maxime ipsa consequatur perspiciatis repellendus porro.
        Pariatur voluptatibus molestiae ipsum repellat odio. Reprehenderit a voluptatem iure consequuntur animi minus doloribus ad quos, maiores ea autem assumenda ducimus rerum delectus numquam corporis facilis ipsam adipisci in! Minima?
        Molestiae voluptatibus sint cupiditate excepturi omnis quo mollitia quisquam rem libero officia modi nam, culpa maiores illo exercitationem officiis magni error quod veniam assumenda iste. Dolorem soluta non fugit alias?
        Mollitia fugit inventore aliquam itaque illo dignissimos facilis necessitatibus iste qui nulla quasi corporis quidem nesciunt quo, pariatur, alias modi porro excepturi ipsum? Dignissimos quasi itaque perspiciatis commodi, est neque.
        Quasi impedit excepturi eius velit obcaecati, unde libero architecto cumque. Molestiae labore, aut itaque incidunt inventore facere laborum sed quia. Accusantium facilis quasi labore. Atque iure nemo consectetur tempore deserunt.
        Commodi, perferendis odit delectus possimus quas expedita amet error nemo ab inventore ea dolores ratione voluptas dolore hic a iusto voluptatibus voluptates, numquam rerum et itaque voluptatum. Illo, nostrum magni!
        Veritatis quibusdam similique minima error praesentium nesciunt! Harum fugit, maiores reiciendis obcaecati nam vel perferendis eveniet quidem aspernatur accusantium! Voluptates itaque veniam odio reprehenderit error dolores nostrum, commodi architecto quo?
        Quaerat consectetur dignissimos suscipit laudantium veniam nisi at vitae, officiis tempore obcaecati ad eveniet ratione est iusto ea quisquam voluptatum nam vero natus voluptate ipsam unde dicta? Eos, quae fugit!
        Nobis nam doloribus reiciendis! Alias totam voluptas quos deserunt eum a, quas necessitatibus, similique fuga reprehenderit quod, architecto est iusto non fugiat vero. Exercitationem, ducimus. Aspernatur recusandae ipsam sunt nulla!
        Reiciendis doloremque voluptatibus consequatur quo. Ex, quidem. Accusamus maxime quidem amet soluta quo esse vel deleniti veniam tenetur odit fugiat velit corporis minima nulla, eos placeat! In provident porro a!
        Animi quod sequi ipsum, harum voluptas neque earum doloribus. Autem nostrum adipisci libero, temporibus itaque beatae est assumenda cupiditate sed qui eaque recusandae veritatis illo, quisquam quam laboriosam expedita! Quasi.
        Minima, quas asperiores? Possimus est laudantium eveniet sit necessitatibus. Debitis nihil earum placeat rerum minus iste fugiat accusantium quia alias modi quae, id veritatis dolorem neque ratione laborum soluta dolor!
        Nostrum beatae hic unde consequuntur perferendis dolores commodi veritatis aperiam obcaecati explicabo, quasi, inventore aut. Recusandae quis nobis, libero ducimus cupiditate earum sed eius qui praesentium ullam voluptatum molestiae accusamus.
        Unde accusamus, quaerat dolorem in at laudantium impedit quibusdam exercitationem nostrum aliquam delectus expedita cum, repudiandae magnam, incidunt sapiente sint? Cupiditate dolores delectus aliquid dignissimos cumque fuga quae magnam! Accusamus?
        Tempore amet odio possimus iusto sapiente quia, expedita quos corporis veritatis nisi sequi id! Ducimus voluptate maxime, non architecto iure id libero iste sed. Repudiandae facilis debitis autem optio molestiae?
        Ab vitae minima reprehenderit error deserunt eaque aliquam, voluptas veritatis magni rerum ad, quibusdam beatae qui? Et eaque mollitia, harum alias, quis quasi rem obcaecati consectetur enim culpa maiores eveniet.
        Assumenda exercitationem sapiente laboriosam expedita similique dolorum ullam voluptate accusamus quo asperiores. Iure, voluptatem repellat necessitatibus dicta repudiandae inventore animi exercitationem accusantium labore, modi quos, itaque iusto sunt tempora est!
        Pariatur enim harum vitae ea beatae ducimus sed nemo quod officia maxime reiciendis, nostrum et recusandae tempora voluptatum modi similique nobis, voluptatem, soluta aut? Cupiditate nemo expedita repellendus est explicabo?
        Animi laborum nihil possimus debitis officia dolorem natus ipsa minima expedita, cumque veritatis asperiores similique quam, at totam error facilis quae. Aperiam iure porro, culpa iusto animi autem voluptatem. Reiciendis.
        Sapiente corporis, sit velit molestiae placeat debitis aliquam! Facere quasi, asperiores architecto, vitae esse mollitia cumque aliquam aperiam eos nobis modi non molestiae ea est nulla sed laborum, atque ullam.
        A eaque molestiae sapiente facilis debitis rerum vero ipsa atque nihil. Ullam voluptate et natus, velit distinctio animi asperiores saepe laboriosam, laudantium molestias sed iusto. Sequi velit quo a eaque.
        Aut tempora perferendis, dolor iste vel facere sequi perspiciatis in similique odit maiores esse ea aliquam incidunt dolorem quasi eligendi. Quo quidem consequuntur id perferendis, corporis dignissimos voluptatem culpa accusantium!
        Facere unde quos cum corrupti soluta autem esse, ipsam libero rem deserunt placeat possimus, aliquam id odio illum sit est ipsum perferendis? Soluta, asperiores esse nesciunt optio quasi minus eligendi!
      </div>
    </>
  );
};

export default withLayout(Home);
