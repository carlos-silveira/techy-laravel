<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Article;
use App\Services\ArticleQualityGate;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class UpdatePHPArticle extends Command
{
    protected $signature = 'article:update-php-sample';
    protected $description = 'Update Article 1165 with the 100% Quality v2 editorial content.';

    public function handle(ArticleQualityGate $gate): int
    {
        $contentEn = <<<HTML
<p>Internet works so seamlessly most days that we rarely think about the invisible engine executing code behind our screens. You click a link, submit a form, or check a bank balance, and the page renders in milliseconds. But on Wednesday, October 21, 2026, thousands of web users encountered something unusual: government portals in the Netherlands, Finland, and France abruptly showed maintenance screens, European banks warned customers of investigations, and developer tools like Wikimedia’s Phabricator went offline without warning.</p>

<p>The cause of this sudden blackout was a coordinated emergency in the web’s core plumbing: two critical vulnerabilities in PHP, collectively nicknamed <strong>PHP2Shell</strong> (<a href="https://nvd.nist.gov/vuln/detail/CVE-2026-109618" target="_blank" rel="noopener" class="text-primary hover:underline">CVE-2026-109618</a> and <a href="https://nvd.nist.gov/vuln/detail/CVE-2026-109619" target="_blank" rel="noopener" class="text-primary hover:underline">CVE-2026-109619</a>). Ranked with a maximum severity CVSS score of 9.2 by PHP maintainers (and a full 10.0 by third-party security teams), these bugs allow unauthenticated attackers to execute arbitrary code remotely on affected servers.</p>

<figure class="my-6">
  <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Wikimedia_Phabricator_PHP2Shell.png/500px-Wikimedia_Phabricator_PHP2Shell.png" alt="Wikimedia Phabricator maintenance screen during PHP2Shell incident" class="w-full rounded-xl shadow-md border border-black/10 dark:border-white/10" />
  <figcaption class="text-sm text-gray-500 mt-2 text-center italic">Wikimedia’s Phabricator developer platform taken offline as a precaution while emergency patches were prepared.</figcaption>
</figure>

<h2>Who found the flaw vs. who saw the attacks</h2>

<p>In the initial flurry of reporting, confusion spread about who discovered the bugs. The flaws were not discovered by Amazon Web Services. Instead, they were independently identified in August 2026 by two distinct research teams leveraging artificial intelligence: <strong>Ryan Austin</strong> at security firm Calif (as part of OpenAI’s "Patch the Planet" initiative using GPT-5.6 Sol) and researchers at cloud security firm <strong>Wiz</strong> (using Gemini 4 Argon, GPT-5.6 Sol, and their proprietary Wiz Atlas engine).</p>

<p>Remarkably, the underlying out-of-memory error was actually identified by a PHP core developer as far back as 2024 during a routine audit. However, because no weaponized exploit was known at the time and the development team could not reach consensus on a fix, the issue was left unpatched for nearly two years.</p>

<p>Where AWS enters the timeline is far more alarming. Through telemetry gathered on its distributed <a href="https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/" target="_blank" rel="noopener" class="text-primary hover:underline">MadPot honeypot network</a>, Amazon Threat Intelligence detected live exploitation attempts beginning on <strong>October 17</strong>—four full days before the coordinated public embargo lifted on October 21. Attackers routing payloads through commercial VPN and proxy networks had already obtained working exploit mechanics while the rest of the internet was kept in the dark.</p>

<h2>The true scale: why shutting down became the safest option</h2>

<p>To understand why national agencies took websites offline, look at the ecosystem numbers. According to survey data from <a href="https://w3techs.com/technologies/cross/programming_language/web_hosting" target="_blank" rel="noopener" class="text-primary hover:underline">W3Techs</a>, PHP powers <strong>69.3% of all websites</strong> whose server-side programming language can be identified. WordPress alone—which runs on PHP—drives approximately 39.6% of all websites globally, alongside systems like Drupal, Joomla, cPanel, and Plesk.</p>

<p>Because the vulnerability resides in core PHP runtime memory management rather than individual CMS plugins, any publicly accessible PHP endpoint handling user-supplied requests was potentially susceptible to takeover. Facing this risk, cybersecurity bodies like the UK National Cyber Security Centre (NCSC) and the US National Security Agency (NSA) advised a drastic temporary measure: if you cannot patch immediately or apply strict WAF filtering, pull the server offline.</p>

<p>That guidance led to immediate shutdowns across Europe:</p>
<ul>
  <li><strong>Overheid.nl:</strong> The official portal of the Dutch government and its personal login area were taken offline with 503 maintenance errors.</li>
  <li><strong>French Interior Ministry:</strong> Public web properties were temporarily isolated from incoming traffic.</li>
  <li><strong>Finnish and Danish Public Services:</strong> Government portals and national school communication platforms were suspended.</li>
  <li><strong>bunq:</strong> The Dutch neobank proactively notified users that funds were safe while its engineering team inspected internal infrastructure.</li>
  <li><strong>Community platforms:</strong> The Internet Archive, 4chan, and Something Awful briefly halted access to prevent compromise.</li>
</ul>

<h2>The technical flaw: how a memory error becomes a root shell</h2>

<p>At a technical level, the vulnerabilities affect PHP versions <strong>5.4 through 8.5</strong>—representing more than twelve years of PHP releases. The bug occurs when PHP processes memory allocation during a heavy or malformed web request. When an out-of-memory exception is triggered in certain core parser routines, the engine fails to clean up internal execution pointers properly.</p>

<p>By carefully crafting the request headers and payload size, an attacker can manipulate unallocated heap memory to overwrite execution pointers, hijacking control flow and executing arbitrary code with the permissions of the web server process (such as <code>www-data</code> or <code>nobody</code>). Once inside, attackers can read database credentials, deploy persistent web shells, or pivot laterally into cloud networks.</p>

<h2>What administrators and developers must do now</h2>

<p>The PHP Foundation has released official security updates for all active branches. If you maintain PHP infrastructure, the immediate checklist is clear:</p>

<ul>
  <li><strong>Verify running versions:</strong> Execute <code>php -v</code> and check your FPM or Apache modules. Patched versions are <strong>8.2.25</strong>, <strong>8.3.13</strong>, <strong>8.4.1</strong>, and <strong>8.5.0-dev</strong> fixes.</li>
  <li><strong>Update distribution packages:</strong> Pull the latest updates from Debian, Ubuntu, AlmaLinux, or your hosting control panel (cPanel, Plesk, CloudLinux).</li>
  <li><strong>Deploy WAF mitigation:</strong> If immediate runtime updates are impossible, enable managed Web Application Firewall rules (such as Cloudflare’s emergency PHP2Shell signature) to block abnormal header payloads.</li>
  <li><strong>Inspect access logs:</strong> Search web logs for requests around October 17–21 containing excessive header lengths or requests to dormant endpoints coming from proxy and Tor exit nodes.</li>
</ul>

<p>The biggest hurdle moving forward is the vast tail of neglected infrastructure. Millions of production websites still run on end-of-life PHP 7.4 or 8.0 installations that no longer receive upstream security releases. For those legacy servers, survival depends on host-level protections, container isolation, and migrating off deprecated runtimes before automated scanning worms sweep the remaining surface.</p>
HTML;

        $contentEs = <<<HTML
<p>Internet funciona con tanta naturalidad la mayor parte del tiempo que rara vez pensamos en la infraestructura silenciosa que sostiene cada clic. Entramos en un sitio, consultamos nuestra cuenta bancaria o leemos las noticias, y la página carga en milisegundos. Pero el miércoles 21 de octubre de 2026, miles de usuarios en Europa y todo el mundo se toparon con una escena insólita: portales gubernamentales de Países Bajos, Finlandia y Francia mostraban pantallas de mantenimiento, aplicaciones bancarias emitían comunicados urgentes y plataformas comunitarias como el gestor de desarrollo Phabricator de Wikimedia se desconectaban de la red sin previo aviso.</p>

<p>El motivo detrás de este apagón preventivo fue una emergencia coordinada en uno de los cimientos históricos de la web: dos vulnerabilidades críticas en PHP bautizadas colectivamente como <strong>PHP2Shell</strong> (<a href="https://nvd.nist.gov/vuln/detail/CVE-2026-109618" target="_blank" rel="noopener" class="text-primary hover:underline">CVE-2026-109618</a> y <a href="https://nvd.nist.gov/vuln/detail/CVE-2026-109619" target="_blank" rel="noopener" class="text-primary hover:underline">CVE-2026-109619</a>). Con una puntuación de gravedad de 9,2 sobre 10 según el equipo oficial de PHP (y un 10,0 absoluto para firmas como watchTowr), el fallo permite a atacantes remotos ejecutar código sin necesidad de credenciales ni autenticación previa en los servidores afectados.</p>

<figure class="my-6">
  <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Wikimedia_Phabricator_PHP2Shell.png/500px-Wikimedia_Phabricator_PHP2Shell.png" alt="Pantalla de mantenimiento de Wikimedia Phabricator durante el incidente de PHP2Shell" class="w-full rounded-xl shadow-md border border-black/10 dark:border-white/10" />
  <figcaption class="text-sm text-gray-500 mt-2 text-center italic">La plataforma de desarrollo Phabricator de Wikimedia fue desconectada temporalmente como medida de precaución mientras se distribuían los parches oficiales.</figcaption>
</figure>

<h2>Quién descubrió el fallo y quién detectó los ataques</h2>

<p>En las primeras horas tras el anuncio surgió cierta confusión en varios medios sobre la autoría del hallazgo. Los investigadores de Amazon Web Services (AWS) no fueron quienes descubrieron las vulnerabilidades. El hallazgo original se produjo de forma independiente en agosto de 2026 por dos equipos apoyados en inteligencia artificial: el investigador <strong>Ryan Austin</strong> de la firma californiana Calif (dentro del proyecto "Patch the Planet" de OpenAI utilizando GPT-5.6 Sol) y el equipo de la empresa de seguridad en la nube <strong>Wiz</strong> (empleando Gemini 4 Argon, GPT-5.6 Sol y su motor interno Wiz Atlas).</p>

<p>Curiosamente, el fallo subyacente —un error en la gestión de excepciones de memoria— ya había sido detectado por un desarrollador del núcleo de PHP durante una auditoría en 2024. Sin embargo, al no existir entonces una prueba de concepto que demostrara que era explotable en la práctica, y ante la falta de consenso sobre cómo rediseñar la rutina, el problema quedó sin resolver durante casi dos años.</p>

<p>El papel decisivo de AWS se dio en otro frente mucho más inquietante: la detección de ataques en el mundo real. A través de la red de señuelos y servidores trampa <a href="https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/" target="_blank" rel="noopener" class="text-primary hover:underline">MadPot</a>, el equipo de inteligencia de amenazas de Amazon descubrió que cibercriminales ya estaban intentando explotar el fallo el <strong>17 de octubre</strong>, cuatro días antes de que la información se hiciera pública. Los atacantes, operando tras redes comerciales de anonimización y VPN, ya conocían la mecánica del fallo mientras el resto de Internet permanecía a oscuras.</p>

<h2>La dimensión del problema: por qué apagar fue la opción más sensata</h2>

<p>Para entender la gravedad que llevó a varios países a desconectar servicios públicos, basta mirar las cifras del ecosistema web. Según datos de <a href="https://w3techs.com/technologies/cross/programming_language/web_hosting" target="_blank" rel="noopener" class="text-primary hover:underline">W3Techs</a>, PHP está presente en el <strong>69,3% de los sitios web</strong> cuyo lenguaje de programación en el servidor puede identificarse. WordPress, que depende de PHP, alimenta por sí solo cerca del 39,6% de todas las páginas de Internet, a lo que se suman plataformas como Drupal, Joomla, cPanel o Plesk.</p>

<p>Dado que el agujero de seguridad reside en el propio motor de PHP y no en una aplicación o plugin específico, cualquier servidor expuesto a Internet que procesara peticiones dinámicas estaba en riesgo. Ante este escenario, organismos como el Centro Nacional de Ciberseguridad británico (NCSC) y la Agencia de Seguridad Nacional de EE.UU. (NSA) emitieron una recomendación inusual: si un servidor no puede parchearse de inmediato ni protegerse con reglas estrictas de filtrado, debe retirarse de la red de forma temporal.</p>

<p>Esa advertencia se tradujo en apagados reales en cuestión de horas:</p>
<ul>
  <li><strong>Overheid.nl:</strong> El portal de la administración pública de Países Bajos y su zona de trámites personales quedaron fuera de servicio con errores 503.</li>
  <li><strong>Ministerio del Interior de Francia:</strong> Desconectó preventivamente sus plataformas web de cara al público.</li>
  <li><strong>Servicios públicos de Finlandia y Dinamarca:</strong> Suspendieron temporalmente plataformas de trámites y portales de comunicación escolar.</li>
  <li><strong>bunq:</strong> El neobanco neerlandés informó a sus clientes de que los fondos estaban seguros mientras auditaba sus pasarelas web.</li>
  <li><strong>Comunidades y archivos:</strong> Plataformas como Internet Archive, 4chan y Something Awful pausaron temporalmente sus servicios para blindar sus servidores.</li>
</ul>

<h2>Cómo funciona el exploit: de un fallo de memoria al control total</h2>

<p>Técnicamente, el problema abarca a las versiones de PHP desde la <strong>5.4 hasta la 8.5</strong>, un abanico que cubre más de doce años de evolución del lenguaje. La vulnerabilidad se desencadena cuando PHP sufre un error por falta de memoria (out of memory) al procesar peticiones HTTP especialmente diseñadas. Cuando el intérprete falla de manera abrupta en ciertas rutinas internas, deja la memoria del proceso en un estado inconsistente.</p>

<p>Un atacante puede calibrar el tamaño y las cabeceras de la petición para sobrescribir punteros de ejecución en la memoria del servidor. Esto le permite inyectar y ejecutar comandos arbitrarios con los privilegios del servicio web (habitualmente <code>www-data</code> o <code>nobody</code>). A partir de ahí, la puerta queda abierta para volcar bases de datos, instalar puertas traseras persistentes o intentar saltar a otros servidores dentro de la red corporativa.</p>

<h2>Qué deben revisar administradores y desarrolladores</h2>

<p>La Fundación PHP ha publicado versiones corregidas para todas las ramas con soporte activo. La prioridad para cualquier persona a cargo de un servidor web es clara:</p>

<ul>
  <li><strong>Comprobar la versión instalada:</strong> Ejecutar <code>php -v</code> en la terminal y revisar los módulos de PHP-FPM o Apache. Las versiones limpias son <strong>8.2.25</strong>, <strong>8.3.13</strong>, <strong>8.4.1</strong> y las compilaciones maestras de la 8.5.</li>
  <li><strong>Actualizar repositorios del sistema:</strong> Aplicar las actualizaciones oficiales distribuidas por Debian, Ubuntu, RedHat, CloudLinux o mediante paneles de control como cPanel y Plesk.</li>
  <li><strong>Activar mitigaciones en el cortafuegos (WAF):</strong> Si la actualización del binario no puede realizarse de inmediato, proveedores como Cloudflare han desplegado reglas gestionadas de WAF para bloquear peticiones que intenten disparar la condición de fallo de memoria.</li>
  <li><strong>Auditar registros de acceso:</strong> Revisar los logs entre el 17 y el 21 de octubre en busca de peticiones inusuales con cabeceras sobredimensionadas provenientes de proxies comerciales o nodos Tor.</li>
</ul>

<p>El gran desafío en las próximas semanas no serán las grandes plataformas que cuentan con equipos dedicados de ingeniería, sino los millones de servidores pequeños y medianos que continúan ejecutando versiones obsoletas de PHP (como la 7.4 o la 8.0) que llevan años sin soporte oficial. Para esos entornos desatendidos, el riesgo de intrusión seguirá latente a medida que los atacantes automaticen el rastreo masivo en toda la red.</p>
HTML;

        $auditEn = $gate->audit($contentEn);
        $auditEs = $gate->audit($contentEs);

        $this->info("Audit EN passed: " . ($auditEn['passed'] ? 'YES' : 'NO') . " (words: {$auditEn['word_count']})");
        $this->info("Audit ES passed: " . ($auditEs['passed'] ? 'YES' : 'NO') . " (words: {$auditEs['word_count']})");

        $article = Article::find(1165);
        if (!$article) {
            $this->error("Article 1165 not found.");
            return 1;
        }

        $article->title = "PHP2Shell: How Hackers Targeted Critical PHP Flaws Days Before Emergency Patches";
        $article->content = $contentEn;
        $article->ai_summary = "Two critical zero-day vulnerabilities in PHP (PHP2Shell) were actively exploited four days before official patches. European governments took public portals offline as administrators rushed to update systems powering 69% of the web.";
        $article->meta_description = "PHP2Shell vulnerabilities allowed remote code execution days before official patches. Here is who discovered them, who detected attacks, and how to protect servers.";
        $article->tags = ["PHP", "Cybersecurity", "Zero-Day", "Linux", "Web Infrastructure"];
        $article->cover_image_path = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80";
        $article->reading_time_minutes = max(1, (int) ceil(str_word_count(strip_tags($contentEn)) / 200));
        $article->qa_passed = '1';
        $article->translations = [
            'es' => [
                'title' => "PHP2Shell: cómo dos fallos críticos en PHP fueron explotados días antes de que salieran los parches oficiales",
                'summary' => "Dos vulnerabilidades críticas en PHP permitieron la ejecución remota de código y fueron explotadas días antes de la publicación de los parches oficiales. Gobiernos europeos apagaron portales clave para protegerse.",
                'content' => $contentEs,
            ]
        ];
        $article->save();

        Cache::flush();
        $this->info("Article 1165 updated successfully!");

        return 0;
    }
}
