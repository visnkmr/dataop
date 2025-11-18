import React, { useEffect } from "react";
import { ListSessions } from "./listsessions";
import classnames from "classnames";
import Fuse, { FuseResult } from "fuse.js"

interface etab {
    title: string,
    url: string
};

interface items {
    sessionname: string,
    browsername: string,
    tablist: Array<etab>
}

interface SessionList {
    sname: string;
    bname: string;
    slength: number;
}

export default function Topbar({ username }: { username: string }) {
    var { isLoading, isError, data } = ListSessions(username);
    const [showdivname, setshowdivname] = React.useState("");
    const [stext, setstext] = React.useState("")
    let sessionlist: SessionList[] = [];

    const options = {
        threshold: 0.15,
        ignoreLocation: true,
        findAllMatches: true,
        includeScore: false,
        keys: ['title', 'url']
    };
    var completetabs: etab[] = [];
    var popresults: FuseResult<etab>[] = [];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                Error loading sessions. Please try again.
            </div>
        );
    }

    let ddata = JSON.parse((data.data))
    let allSessions: items[] = [];
    let savedLinks: etab[] = [];

    ddata.map((eitem: any) => {
        try {
            let item: items = JSON.parse(eitem);
            if (item.tablist) {
                allSessions.push(item);
                completetabs = completetabs.concat(item.tablist);
                sessionlist.push({
                    sname: item.sessionname,
                    bname: item.browsername,
                    slength: item.tablist.length
                });
            }
        } catch (e) {
            if (typeof eitem === 'string' && (eitem.startsWith('http') || eitem.startsWith('www'))) {
                savedLinks.push({
                    title: eitem,
                    url: eitem
                });
            }
        }
    });

    if (savedLinks.length > 0) {
        const savedSession: items = {
            sessionname: "Saved Links",
            browsername: "Mixed",
            tablist: savedLinks
        };
        allSessions.push(savedSession);
        sessionlist.push({
            sname: savedSession.sessionname,
            bname: savedSession.browsername,
            slength: savedSession.tablist.length
        });
        completetabs = completetabs.concat(savedLinks);
    }

    const fuse = new Fuse(completetabs, options);
    const result = stext ? fuse.search(stext) : [];
    popresults = result;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search tabs by title or URL..."
                        value={stext}
                        onChange={(event) => setstext(event.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                    />
                </div>
            </div>

            {stext && popresults.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Results ({popresults.length})</h3>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {popresults.map((eitem: FuseResult<etab>, index: number) => {
                            let etab = eitem.item;
                            return (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                    <h4 className="font-medium text-gray-900 truncate mb-2">{etab.title}</h4>
                                    <a
                                        href={etab.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-indigo-600 hover:text-indigo-800 truncate block"
                                    >
                                        {etab.url}
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Browser Sessions</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {sessionlist.map((slist: SessionList, index: number) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div
                                className="p-4 cursor-pointer hover:bg-gray-50"
                                onClick={() => setshowdivname(showdivname === slist.sname ? "" : slist.sname)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-lg text-gray-900 truncate">{slist.sname}</h3>
                                    <svg
                                        className={`h-5 w-5 text-gray-400 transform transition-transform ${showdivname === slist.sname ? 'rotate-180' : ''}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {slist.bname}
                                    </span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {slist.slength} tabs
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {allSessions.map((titem: items, index: number) => {
                const fuse = new Fuse(titem.tablist, options);
                const result = stext ? fuse.search(stext) : titem.tablist;

                return (
                    <div
                        key={index}
                        className={classnames(
                            showdivname === titem.sessionname ? "block" : "hidden",
                            "mt-6"
                        )}
                    >
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {titem.sessionname} - {titem.browsername}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {Array.isArray(result) ? result.length : 0} tabs
                                </p>
                            </div>
                            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                                {(Array.isArray(result) ? result : []).map((et: any, tabIndex: number) => {
                                    let etab: etab = stext ? et.item : et;
                                    return (
                                        <div key={tabIndex} className="px-6 py-4 hover:bg-gray-50">
                                            <h4 className="font-medium text-gray-900 mb-1">{etab.title}</h4>
                                            <a
                                                href={etab.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-indigo-600 hover:text-indigo-800 truncate block"
                                            >
                                                {etab.url}
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}